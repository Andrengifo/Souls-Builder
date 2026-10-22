// Convierte cada <select data-slot> en una casilla visual con panel de selección

function crearSlot(select) {
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
    abrirPanel(select, actualizarBoton);
  });

  actualizarBoton();
}

function abrirPanel(select, alElegir) {
  const fondo = document.createElement("div");
  fondo.className = "panel-fondo";

  const caja = document.createElement("div");
  caja.className = "panel-seleccion";

  const titulo = document.createElement("h3");
  titulo.textContent = "Elige un ítem";
  caja.appendChild(titulo);

  function cerrar() {
    fondo.remove();
    document.removeEventListener("keydown", cerrarConEsc);
  }

  function cerrarConEsc(evento) {
    if (evento.key === "Escape") cerrar();
  }

  for (const opcion of select.options) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "opcion-slot";
    item.textContent = opcion.value ? opcion.text : "Quitar";

    item.addEventListener("click", function() {
      select.value = opcion.value;
      // Avisa al resto de la app para que recalcule en vivo
      select.dispatchEvent(new Event("input", { bubbles: true }));
      alElegir();
      cerrar();
    });

    caja.appendChild(item);
  }

  // Clic fuera de la caja = cerrar
  fondo.addEventListener("click", function(evento) {
    if (evento.target === fondo) cerrar();
  });
  document.addEventListener("keydown", cerrarConEsc);

  fondo.appendChild(caja);
  document.body.appendChild(fondo);
}

document.querySelectorAll("select[data-slot]").forEach(crearSlot);