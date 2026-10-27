// Convierte cada <select data-slot> en una casilla visual con panel desplegable

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
    const opcion = select.options[select.selectedIndex];
    boton.textContent = select.value ? opcion.text : "+ Vacío";
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
    item.textContent = opcion.value ? opcion.text : "Quitar";

    // Si el ítem ya está equipado en otro slot del mismo grupo, se bloquea
    if (opcion.value && select.dataset.grupo) {
      const repetido = Array.from(
        document.querySelectorAll(`select[data-grupo="${select.dataset.grupo}"]`)
      ).some(function(otro) {
        return otro !== select && otro.value === opcion.value;
      });

      if (repetido) {
        item.disabled = true;
        item.textContent += " (ya equipado)";
      }
    }

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

document.querySelectorAll("select[data-slot]").forEach(crearSlot);