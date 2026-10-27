// Convierte cada <select data-slot> en una casilla visual con panel desplegable

const LISTAS_ITEMS = ["armas", "armaduras", "anillos", "hechizos"];

const ABREVIATURAS_STATS = {
  strength: "STR",
  dexterity: "DEX",
  intelligence: "INT",
  faith: "FTH"
};

// Busca un ítem por su clave en las listas de datosJuego
function buscarItem(clave) {
  if (!clave) return null;
  for (const lista of LISTAS_ITEMS) {
    if (datosJuego[lista] && datosJuego[lista][clave]) {
      return { lista: lista, datos: datosJuego[lista][clave] };
    }
  }
  return null;
}

// Texto pequeño con los datos útiles del ítem (peso, defensa, requisitos)
function detalleItem(clave) {
  const encontrado = buscarItem(clave);
  if (!encontrado) return "";

  const datos = encontrado.datos;
    if (encontrado.lista === "hechizos") {
    const reqs = Object.keys(datos.requisitos).map(function(stat) {
      return `${ABREVIATURAS_STATS[stat] || stat} ${datos.requisitos[stat]}`;
    });
    return `${datos.tipo} · ${datos.casillas} cas. · FP ${datos.costoFP} · Req ${reqs.join(" / ")}`;
  }
  const partes = [`Peso ${datos.peso}`];

  if (encontrado.lista === "armaduras") {
    partes.push(`Def ${+datos.defensaFisica.toFixed(2)}`);
  }

  if (encontrado.lista === "armas" && datos.requisitos) {
    const requisitos = Object.keys(datos.requisitos).map(function(stat) {
      return `${ABREVIATURAS_STATS[stat] || stat} ${datos.requisitos[stat]}`;
    });
    partes.push(`Req ${requisitos.join(" / ")}`);
  }

  return partes.join(" · ");
}

// Arma el contenido de un slot u opción: nombre arriba, detalle abajo
function crearContenidoItem(nombre, detalle) {
  const fragmento = document.createDocumentFragment();

  const spanNombre = document.createElement("span");
  spanNombre.className = "item-nombre";
  spanNombre.textContent = nombre;
  fragmento.appendChild(spanNombre);

  if (detalle) {
    const spanDetalle = document.createElement("span");
    spanDetalle.className = "item-detalle";
    spanDetalle.textContent = detalle;
    fragmento.appendChild(spanDetalle);
  }

  return fragmento;
}

let panelAbierto = null; // guarda el panel que está abierto en este momento

function cerrarPanel() {
  if (!panelAbierto) return;
  panelAbierto.panel.remove();
  panelAbierto.boton.classList.remove("slot-abierto");
  document.removeEventListener("click", cerrarSiClicFuera);
  document.removeEventListener("keydown", cerrarConEsc);
  panelAbierto = null;
}

function cerrarSiClicFuera(evento) {
  if (panelAbierto && !panelAbierto.contenedor.contains(evento.target)) {
    cerrarPanel();
  }
}

function cerrarConEsc(evento) {
  if (evento.key === "Escape") cerrarPanel();
}

function crearSlot(select) {
  const contenedor = select.parentElement; // el div .campo-slot

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "slot-visual";
  select.insertAdjacentElement("afterend", boton);

  function actualizarBoton() {
    boton.replaceChildren();

    if (select.value) {
      const opcion = select.options[select.selectedIndex];
      boton.appendChild(crearContenidoItem(opcion.text, detalleItem(select.value)));
    } else {
      boton.textContent = "+ Vacío";
    }

    boton.classList.toggle("slot-lleno", Boolean(select.value));
  }

  boton.addEventListener("click", function() {
    const eraEste = panelAbierto && panelAbierto.boton === boton;
    cerrarPanel();
    // Si el panel abierto era el de este mismo slot, solo se cierra
    if (!eraEste) abrirPanel(select, boton, contenedor, actualizarBoton);
  });

  actualizarBoton();
}

function abrirPanel(select, boton, contenedor, alElegir) {
  const panel = document.createElement("div");
  panel.className = "panel-desplegable";

  for (const opcion of select.options) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "opcion-slot";

    let nombre = opcion.value ? opcion.text : "Quitar";
    const detalle = opcion.value ? detalleItem(opcion.value) : "";

    // Si el ítem ya está equipado en otro slot del mismo grupo, se bloquea
    if (opcion.value && select.dataset.grupo) {
      const repetido = Array.from(
        document.querySelectorAll(`select[data-grupo="${select.dataset.grupo}"]`)
      ).some(function(otro) {
        return otro !== select && otro.value === opcion.value;
      });

      if (repetido) {
        item.disabled = true;
        nombre += " (ya equipado)";
      }
    }

    item.appendChild(crearContenidoItem(nombre, detalle));

    item.addEventListener("click", function() {
      select.value = opcion.value;
      // Avisa al resto de la app para que recalcule en vivo
      select.dispatchEvent(new Event("input", { bubbles: true }));
      alElegir();
      cerrarPanel();
    });

    panel.appendChild(item);
  }

  contenedor.appendChild(panel);
  boton.classList.add("slot-abierto");
  panelAbierto = { panel: panel, boton: boton, contenedor: contenedor };

  document.addEventListener("click", cerrarSiClicFuera);
  document.addEventListener("keydown", cerrarConEsc);
}
// Casillas de hechizo: se crean todas (máximo 10) y se muestran las que permite el Attunement
const MAX_SLOTS_HECHIZOS = 10;

function crearSlotsHechizos() {
  const contenedor = document.getElementById("listaHechizos");
  contenedor.replaceChildren();

  for (let i = 1; i <= MAX_SLOTS_HECHIZOS; i++) {
    const campo = document.createElement("div");
    campo.className = "campo-slot";

    const etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta-slot";
    etiqueta.textContent = `Hechizo ${i}`;

    const select = document.createElement("select");
    select.id = `hechizo${i}Seleccionado`;
    select.hidden = true;
    select.setAttribute("data-slot", "");
    select.dataset.grupo = "hechizos";

    const vacia = document.createElement("option");
    vacia.value = "";
    vacia.textContent = "-- Ninguno --";
    select.appendChild(vacia);

    for (const clave in datosJuego.hechizos) {
      const opcion = document.createElement("option");
      opcion.value = clave;
      opcion.textContent = datosJuego.hechizos[clave].nombre;
      select.appendChild(opcion);
    }

    campo.appendChild(etiqueta);
    campo.appendChild(select);
    contenedor.appendChild(campo);
  }
}

// Muestra solo las primeras N casillas; las demás se ocultan pero conservan su hechizo
function mostrarSlotsHechizos(cantidad) {
  document.querySelectorAll("#listaHechizos .campo-slot").forEach(function(campo, i) {
    campo.hidden = i >= cantidad;
  });
}

crearSlotsHechizos();
document.querySelectorAll("select[data-slot]").forEach(crearSlot);