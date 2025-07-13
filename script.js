document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Estado inicial: bloquear todos los que tienen prerequisitos
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      ramo.classList.add("bloqueado");
    }
  });

  // Evento al hacer clic
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      actualizarDesbloqueos();
    });
  });

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
