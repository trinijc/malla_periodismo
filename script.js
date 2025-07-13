document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // 1. Inicialmente bloquea los ramos con prerequisitos
  ramos.forEach(ramo => {
    if (ramo.dataset.prereqs) {
      ramo.classList.add("bloqueado");
    }
  });

  // 2. Función que actualiza qué ramos desbloquear
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prereqs;
      if (prereqs) {
        const prereqIds = prereqs.split(",").map(id => id.trim());
        // Todos los prerequisitos aprobados?
        const todosAprobados = prereqIds.every(id => {
          const prereqRamo = document.getElementById(id);
          return prereqRamo && prereqRamo.classList.contains("aprobado");
        });
        if (todosAprobados) {
          ramo.classList.remove("bloqueado");
        } else {
          ramo.classList.add("bloqueado");
          ramo.classList.remove("aprobado"); // si el ramo estaba aprobado y se bloquea, se desmarca
        }
      }
    });
  }

  // 3. Evento click para aprobar/desaprobar ramos desbloqueados
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return; // no hace nada si está bloqueado

      // Toggle aprobado
      ramo.classList.toggle("aprobado");

      // Actualiza los desbloqueos después de cada clic
      actualizarDesbloqueos();
    });
  });
});
