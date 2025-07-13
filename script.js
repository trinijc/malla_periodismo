document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Al cargar la página, bloquear los ramos que tienen prerequisitos
  ramos.forEach(ramo => {
    if (ramo.dataset.prereqs) {
      ramo.classList.add("bloqueado");
    }
  });

  // Función para actualizar el desbloqueo basado en requisitos aprobados
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prereqs;
      if (prereqs) {
        const prereqIds = prereqs.split(",").map(id => id.trim());
        const todos
