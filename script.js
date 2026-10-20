// data.js

// Todos los datos agrupados por juego
const datos = {
  ds3: {
    personajeBase: {
    vigor: 10,
    attunement: 10,
    endurance: 10,
    vitality: 10,
    strength: 20,
    dexterity: 10,
    intelligence: 10,
    faith: 10,
    luck: 10
  },
    armas: {
  longsword: {
    nombre: "Longsword",
    peso: 3.0,
    requisitos: { strength: 10, dexterity: 10 },
    niveles: {
      10: {
        danoBase: { physical: 220 },
        scaling: { strength: "C", dexterity: "D" }
      }
    }
  },
  spear: {
    nombre: "Spear",
    peso: 4.5,
    requisitos: { strength: 11, dexterity: 10 },
    niveles: {
      10: {
        danoBase: { physical: 208 },
        scaling: { strength: "D", dexterity: "C" }
      }
    }
  },
  dagger: {
    nombre: "Dagger",
    peso: 1.5,
    requisitos: { strength: 5, dexterity: 9 },
    niveles: {
      10: {
        danoBase: { physical: 130 },
        scaling: { strength: "E", dexterity: "B" }
      }
    }
  },
  claymore: {
    nombre: "Claymore",
    peso: 9.0,
    requisitos: { strength: 16, dexterity: 13 },
    niveles: {
      10: {
        danoBase: { physical: 276 },
        scaling: { strength: "C", dexterity: "D" }
      }
    }
  },
  battle_axe: {
    nombre: "Battle Axe",
    peso: 4.0,
    requisitos: { strength: 12, dexterity: 8 },
    niveles: {
      10: {
        danoBase: { physical: 250 },
        scaling: { strength: "C", dexterity: "D" }
      }
    }
  }
},
    armaduras: {
  casco_caballero_elite: {
    nombre: "Elite Knight Helm",
    tipo: "casco",
    peso: 5.2,
    defensaFisica: 4.9
  },
  armadura_caballero_elite: {
    nombre: "Elite Knight Armor",
    tipo: "armadura",
    peso: 8.9,
    defensaFisica: 12.1
  },
  guantes_caballero_elite: {
    nombre: "Elite Knight Gauntlets",
    tipo: "guantes",
    peso: 3.4,
    defensaFisica: 3.4
  },
  botas_caballero_elite: {
    nombre: "Elite Knight Leggings",
    tipo: "botas",
    peso: 6.8,
    defensaFisica: 5.552 
  }
},
    anillos: {
  ring_favor: {
    nombre: "Ring of Favor",
    peso: 1.5,
    efectos: {
      bonusHP: 0.03,
      bonusStamina: 0.085,
      bonusEquipLoad: 0.05
    }
  },
  hornet_ring: {
    nombre: "Hornet Ring",
    peso: 1.1,
    efectos: {
      bonusDanoCritico: 0.30 // pendiente: la app aún no calcula daño crítico
    }
  },
  flynns_ring: {
    nombre: "Flynn's Ring",
    peso: 0.9,
    efectos: {
      bonusDanoMaximo: 0.15 // pendiente: depende del peso total equipado
    }
  }
},
    hechizos: {
  soul_arrow: {
    nombre: "Soul Arrow",
    tipo: "hechicería",
    casillas: 1,
    costoFP: 7,
    requisitos: { intelligence: 10 }
  },
  heavy_soul_arrow: {
    nombre: "Heavy Soul Arrow",
    tipo: "hechicería",
    casillas: 1,
    costoFP: 11,
    requisitos: { intelligence: 13 }
  },
  great_soul_arrow: {
    nombre: "Great Soul Arrow",
    tipo: "hechicería",
    casillas: 1,
    costoFP: 10,
    requisitos: { intelligence: 15 }
  },
  soul_stream: {
    nombre: "Soul Stream",
    tipo: "hechicería",
    casillas: 2,
    costoFP: 55,
    requisitos: { intelligence: 45 }
  },
  heal: {
    nombre: "Heal",
    tipo: "milagro",
    casillas: 1,
    costoFP: 45,
    requisitos: { faith: 12 }
  },
  great_heal: {
    nombre: "Great Heal",
    tipo: "milagro",
    casillas: 1,
    costoFP: 65,
    requisitos: { faith: 25 }
  },
  fireball: {
  nombre: "Fireball",
  tipo: "piromancia",
  casillas: 1,
  costoFP: 10,
  requisitos: { intelligence: 6, faith: 6 }
},
firestorm: {
  nombre: "Firestorm",
  tipo: "piromancia",
  casillas: 1,
  costoFP: 38, // 2 FP por pilar, hasta 19 pilares
  requisitos: { intelligence: 18 }
},
black_serpent: {
  nombre: "Black Serpent",
  tipo: "piromancia",
  casillas: 1,
  costoFP: 19,
  requisitos: { intelligence: 15, faith: 15 } // daño oscuro
}
},
    tablaVigorHP: [
  { vigor: 1, hp: 200 },
  { vigor: 10, hp: 510 },
  { vigor: 20, hp: 730 },
  { vigor: 27, hp: 1000 },
  { vigor: 30, hp: 1050 },
  { vigor: 40, hp: 1300 },
  { vigor: 50, hp: 1400 },
  { vigor: 99, hp: 1450 }
  ],
    tablaEnduranceStamina: [
  { endurance: 1, stamina: 80 },
  { endurance: 9, stamina: 92 },
  { endurance: 10, stamina: 94 },
  { endurance: 15, stamina: 102 },
  { endurance: 20, stamina: 112 },
  { endurance: 25, stamina: 122 },
  { endurance: 30, stamina: 134 },
  { endurance: 35, stamina: 146 },
  { endurance: 40, stamina: 160 },
  { endurance: 99, stamina: 160 }
],
    tablaAttunementCasillas: [
  { minimo: 99, casillas: 10 },
  { minimo: 80, casillas: 9 },
  { minimo: 60, casillas: 8 },
  { minimo: 50, casillas: 7 },
  { minimo: 40, casillas: 6 },
  { minimo: 30, casillas: 5 },
  { minimo: 24, casillas: 4 },
  { minimo: 18, casillas: 3 },
  { minimo: 14, casillas: 2 },
  { minimo: 10, casillas: 1 },
  { minimo: 0, casillas: 0 }
]
  }
};

const juegoActual = "ds3";
const datosJuego = datos[juegoActual];

// Función genérica de interpolación (sirve para HP, Stamina, y futuros stats similares)
function interpolarTabla(valorStat, tabla, nombreStat, nombreResultado) {
  if (valorStat <= tabla[0][nombreStat]) return tabla[0][nombreResultado];
  if (valorStat >= tabla[tabla.length - 1][nombreStat]) {
    return tabla[tabla.length - 1][nombreResultado];
  }

  for (let i = 0; i < tabla.length - 1; i++) {
    const actual = tabla[i];
    const siguiente = tabla[i + 1];

    if (valorStat >= actual[nombreStat] && valorStat <= siguiente[nombreStat]) {
      const rango = siguiente[nombreStat] - actual[nombreStat];
      const rangoResultado = siguiente[nombreResultado] - actual[nombreResultado];
      const progreso = (valorStat - actual[nombreStat]) / rango;

      return Math.round(actual[nombreResultado] + progreso * rangoResultado);
    }
  }
}

function calcularHP(vigor) {
  return interpolarTabla(vigor, datosJuego.tablaVigorHP, "vigor", "hp");
}

function calcularStamina(endurance) {
  return interpolarTabla(endurance, datosJuego.tablaEnduranceStamina, "endurance", "stamina");
}
// Busca cuántas casillas corresponden según el Attunement actual
function calcularCasillas(attunement) {
  for (const nivel of datosJuego.tablaAttunementCasillas) {
    if (attunement >= nivel.minimo) {
      return nivel.casillas;
    }
  }
  return 0;
}
// Suma las casillas que ocupan los hechizos seleccionados
function calcularCasillasUsadas(hechizosSeleccionados) {
  let usadas = 0;

  for (const hechizo of hechizosSeleccionados) {
    usadas += hechizo.casillas;
  }

  return usadas;
}

// Devuelve una lista de avisos: casillas excedidas y requisitos no cumplidos
function obtenerAvisosHechizos(personaje, hechizosSeleccionados, casillasDisponibles) {
  const avisos = [];

  const usadas = calcularCasillasUsadas(hechizosSeleccionados);
  if (usadas > casillasDisponibles) {
    avisos.push(`Te pasas por ${usadas - casillasDisponibles} casilla(s)`);
  }

  for (const hechizo of hechizosSeleccionados) {
    for (const stat in hechizo.requisitos) {
      if (personaje[stat] < hechizo.requisitos[stat]) {
        avisos.push(`${hechizo.nombre} requiere ${hechizo.requisitos[stat]} de ${stat}`);
      }
    }
  }

  return avisos;
}
// Convierte la letra de scaling en un multiplicador numérico
function letraAMultiplicador(letra) {
    const tabla = {
      S: 1.0,
      A: 0.8,
      B: 0.6,
      C: 0.4,
      D: 0.2,
      E: 0.1
    };
    return tabla[letra] || 0;
  }
  // Calcula el porcentaje de penalización según los stats faltantes
function calcularPenalizacion(personaje, arma) {
  let statsFaltantes = 0;

  for (const stat in arma.requisitos) {
    const requerido = arma.requisitos[stat];
    const actual = personaje[stat];

    if (actual < requerido) {
      const faltante = requerido - actual;
      statsFaltantes += faltante;
    }
  }

  if (statsFaltantes === 0) {
    return 1; // sin penalización, 100% del daño
  }

  // Penalización aproximada: 5% menos de daño por cada punto faltante
  const penalizacionPorcentaje = statsFaltantes * 0.05;

  // La limitamos para que nunca baje de 50% del daño (evita números negativos/absurdos)
  const multiplicadorFinal = Math.max(1 - penalizacionPorcentaje, 0.5);

  return multiplicadorFinal;
}
// Devuelve los datos de daño/scaling del arma para un nivel de mejora.
// Si el arma aún usa la estructura antigua (sin "niveles"), usa los datos directos.
function obtenerDatosNivel(arma, nivel = 10) {
  if (arma.niveles) {
    return arma.niveles[nivel];
  }
  return arma;
}
// Calcula el daño total de un arma según los stats del personaje
function calcularDano(personaje, arma, nivel = 10) {
  const datos = obtenerDatosNivel(arma, nivel);
  let danoTotal = datos.danoBase.physical;

  for (const stat in datos.scaling) {
    const letra = datos.scaling[stat];
    const multiplicador = letraAMultiplicador(letra);
    const valorStat = personaje[stat];

    danoTotal += valorStat * multiplicador;
  }

  const penalizacion = calcularPenalizacion(personaje, arma);
  danoTotal = danoTotal * penalizacion;

  return Math.round(danoTotal);
}
// Calcula el peso total equipado (armas + armadura + anillos)
function calcularEquipLoad(armaDerecha, armaIzquierda, piezasArmadura, listaAnillos) {
  let pesoTotal = 0;

  if (armaDerecha) {
    pesoTotal += armaDerecha.peso;
  }

  if (armaIzquierda) {
    pesoTotal += armaIzquierda.peso;
  }

  for (const pieza of piezasArmadura) {
    if (pieza) { // puede ser null si no seleccionó esa pieza
      pesoTotal += pieza.peso;
    }
  }

  if (listaAnillos) {
    for (const anillo of listaAnillos) {
      if (anillo) {
        pesoTotal += anillo.peso;
      }
    }
  }

  return pesoTotal;
}
// Suma el porcentaje total de un efecto específico entre los anillos equipados
function obtenerBonusPorcentaje(listaAnillos, nombreEfecto) {
  let totalPorcentaje = 0;

  for (const anillo of listaAnillos) {
    if (anillo && anillo.efectos && anillo.efectos[nombreEfecto]) {
      totalPorcentaje += anillo.efectos[nombreEfecto];
    }
  }

  return totalPorcentaje;
}
// Devuelve un factor de 0 a 1 según qué tan liviano es el equipo.
// 1 = peso muy bajo (bonus completo), 0 = peso alto (sin bonus).
// APROXIMACIÓN: lineal entre 2.4 y 30 unidades de peso (según la wiki, el bonus
// completo requiere menos de ~2.4 y desaparece cerca de las 30).
function calcularFactorLigereza(pesoTotal) {
  const pesoMinimo = 2.4;
  const pesoMaximo = 30;

  if (pesoTotal <= pesoMinimo) return 1;
  if (pesoTotal >= pesoMaximo) return 0;

  return (pesoMaximo - pesoTotal) / (pesoMaximo - pesoMinimo);
}

// Max Equip Load base en DS3: 40 + 1 por cada punto de Vitality (tope 139 a 99)
function calcularMaxEquipLoad(vitality) {
  return 40 + vitality;
}
// Suma la defensa física de las piezas de armadura equipadas
function calcularDefensaFisica(piezasArmadura) {
  let total = 0;

  for (const pieza of piezasArmadura) {
    if (pieza) { // puede ser null si no hay pieza en ese slot
      total += pieza.defensaFisica;
    }
  }

  return total;
}

// Determina la banda de movimiento según el % de peso
function obtenerBandaMovimiento(porcentaje) {
  if (porcentaje <= 30) return "Rápida (fast roll)";
  if (porcentaje <= 70) return "Normal (medium roll)";
  if (porcentaje <= 100) return "Lenta (fat roll)";
  return "No puedes rodar";
}  




  