// Crear la lista de hechizos a partir de los datos
const contenedorHechizos = document.getElementById("listaHechizos");

for (const clave in datosJuego.hechizos) {
  const hechizo = datosJuego.hechizos[clave];

  const etiqueta = document.createElement("label");
  etiqueta.className = "hechizo";

  const casilla = document.createElement("input");
  casilla.type = "checkbox";
  casilla.value = clave;

  const texto = `${hechizo.nombre} (${hechizo.casillas} casilla${hechizo.casillas > 1 ? "s" : ""})`;

  etiqueta.appendChild(casilla);
  etiqueta.appendChild(document.createTextNode(texto));
  contenedorHechizos.appendChild(etiqueta);
}

function calcular() {
  const personajeActual = {
    vigor: Number(document.getElementById("vigor").value),
    attunement: Number(document.getElementById("attunement").value),
    endurance: Number(document.getElementById("endurance").value),
    vitality: Number(document.getElementById("vitality").value),
    strength: Number(document.getElementById("strength").value),
    dexterity: Number(document.getElementById("dexterity").value),
    intelligence: Number(document.getElementById("intelligence").value),
    faith: Number(document.getElementById("faith").value),
    luck: Number(document.getElementById("luck").value)
  };

  // 1. Leer todo lo equipado
const nombreArmaDerecha = document.getElementById("armaDerechaSeleccionada").value;
const armaDerecha = datosJuego.armas[nombreArmaDerecha] || null;
const nombreArmaIzquierda = document.getElementById("armaIzquierdaSeleccionada").value;
const armaIzquierda = datosJuego.armas[nombreArmaIzquierda] || null;

const casco = datosJuego.armaduras[document.getElementById("cascoSeleccionado").value] || null;
const armadura = datosJuego.armaduras[document.getElementById("armaduraSeleccionada").value] || null;
const guantes = datosJuego.armaduras[document.getElementById("guantesSeleccionados").value] || null;
const botas = datosJuego.armaduras[document.getElementById("botasSeleccionadas").value] || null;
const piezasArmadura = [casco, armadura, guantes, botas];

const anillo1 = datosJuego.anillos[document.getElementById("anillo1Seleccionado").value] || null;
const anillo2 = datosJuego.anillos[document.getElementById("anillo2Seleccionado").value] || null;
const anillo3 = datosJuego.anillos[document.getElementById("anillo3Seleccionado").value] || null;
const anillo4 = datosJuego.anillos[document.getElementById("anillo4Seleccionado").value] || null;
const listaAnillos = [anillo1, anillo2, anillo3, anillo4];

  // 2. Equip load (va primero porque Flynn's Ring depende del peso)
  const equipLoad = calcularEquipLoad(armaDerecha, armaIzquierda, piezasArmadura, listaAnillos);
  const maxEquipLoadBase = calcularMaxEquipLoad(personajeActual.vitality);
  const bonusEquipLoad = obtenerBonusPorcentaje(listaAnillos, "bonusEquipLoad");
  const maxEquipLoad = maxEquipLoadBase * (1 + bonusEquipLoad);
  const porcentaje = (equipLoad / maxEquipLoad) * 100;
  const banda = obtenerBandaMovimiento(porcentaje);
  const defensaFisica = calcularDefensaFisica(piezasArmadura);
  document.getElementById("resultadoDefensa").textContent = defensaFisica.toFixed(2);

  // 3. Bonus de Flynn's Ring: bonus máximo del anillo x factor según el peso
  const bonusMaximoFlynn = obtenerBonusPorcentaje(listaAnillos, "bonusDanoMaximo");
  const bonusFlynn = bonusMaximoFlynn * calcularFactorLigereza(equipLoad);

  // 4. Daño de cada mano, con el bonus de Flynn's aplicado
  const danoDerecha = armaDerecha
    ? Math.round(calcularDano(personajeActual, armaDerecha) * (1 + bonusFlynn))
    : 0;
  const danoIzquierda = armaIzquierda
    ? Math.round(calcularDano(personajeActual, armaIzquierda) * (1 + bonusFlynn))
    : 0;

  // 5. HP, Stamina y casillas (con bonus de anillos)
  const hp = Math.round(calcularHP(personajeActual.vigor) * (1 + obtenerBonusPorcentaje(listaAnillos, "bonusHP")));
  const stamina = Math.round(calcularStamina(personajeActual.endurance) * (1 + obtenerBonusPorcentaje(listaAnillos, "bonusStamina")));
  const casillas = calcularCasillas(personajeActual.attunement);

  // 6.Leer hechizos seleccionados
const hechizosSeleccionados = [];
document.querySelectorAll("#listaHechizos input:checked").forEach(function(casilla) {
  hechizosSeleccionados.push(datosJuego.hechizos[casilla.value]);
});

const casillasUsadas = calcularCasillasUsadas(hechizosSeleccionados);
const avisos = obtenerAvisosHechizos(personajeActual, hechizosSeleccionados, casillas);

  // 7. Mostrar en pantalla
  document.getElementById("resultadoDanoDerecha").textContent = danoDerecha;
  document.getElementById("resultadoDanoIzquierda").textContent = danoIzquierda;
  document.getElementById("resultadoHP").textContent = hp;
  document.getElementById("resultadoStamina").textContent = stamina;
  document.getElementById("resultadoCasillas").textContent = `${casillasUsadas} / ${casillas}`;
  document.getElementById("avisoHechizos").textContent = avisos.join(" · ");
  document.getElementById("resultadoEquipLoad").textContent = `${equipLoad.toFixed(1)} / ${maxEquipLoad.toFixed(1)} unidades`;
  document.getElementById("resultadoPorcentaje").textContent = `${porcentaje.toFixed(1)}%`;
  document.getElementById("resultadoBanda").textContent = banda;
}

// Recalcular en vivo cada vez que cambia un stat, un select o un hechizo
document.querySelector(".contenedor-build").addEventListener("input", calcular);

// Calcular una vez al cargar, para que no aparezcan los guiones "-"
calcular();