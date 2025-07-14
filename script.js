// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Inicialmente bloquea los ramos que tienen requisitos no cumplidos
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      const requisitos = prereqs.split(",").map(id => id.trim()).filter(Boolean);
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!todosAprobados) {
        ramo.classList.add("bloqueado");
      }
    }

    // Agrega el evento clic a todos los ramos
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado") && !ramo.classList.contains("aprobado")) {
        aprobarCurso(ramo);
      }
    });
  });
});

function aprobarCurso(ramo) {
  ramo.classList.add("aprobado");

  // Verifica si desbloquea a otros cursos
  const id = ramo.id;
  const dependientes = document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`);

  dependientes.forEach(dep => {
    const prereqList = dep.dataset.prereqs.split(",").map(p => p.trim()).filter(Boolean);
    const todosAprobados = prereqList.every(pid => {
      const prereqEl = document.getElementById(pid);
      return prereqEl && prereqEl.classList.contains("aprobado");
    });

    if (todosAprobados) {
      dep.classList.remove("bloqueado");
    }
  });
}
