document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Paso 1: Bloquear ramos con prerequisitos
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      ramo.classList.add("bloqueado");
    }
  });

  // Paso 2: Agregar eventos de clic
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      // Si está bloqueado, no hacer nada
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar clase de aprobado
      ramo.classList.toggle("aprobado");

      // Actualizar desbloqueos
      actualizarDesbloqueos();
    });
  });

  // Paso 3: Desbloquear ramos cuyos requisitos están cumplidos
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prereqs;
      if (prereqs) {
        const ids = prereqs.split(",");
        const todosAprobados = ids.every(id => {
          const prereqRamo = document.getElementById(id.trim());
          return prereqRamo && prereqRamo.classList.contains("aprobado");
        });

        if (todosAprobados) {
          ramo.classList.remove("bloqueado");
        } else {
          ramo.classList.add("bloqueado");
          ramo.classList.remove("aprobado");
        }
      }
    });
  }
});
