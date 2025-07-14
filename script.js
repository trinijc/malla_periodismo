// script.js

window.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".ramo");

  cursos.forEach(curso => {
    const prereqs = curso.dataset.prereqs;
    if (prereqs) {
      curso.classList.add("bloqueado");
    }

    const btn = curso.querySelector(".btn-aprobar");
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que se dispare el click en el div
        aprobarCurso(curso);
      });
    }
  });
});

function aprobarCurso(curso) {
  if (curso.classList.contains("aprobado")) return;

  curso.classList.remove("bloqueado");
  curso.classList.add("aprobado");

  // Buscar cursos que dependan de este
  const id = curso.id;
  const dependientes = document.querySelectorAll(`[data-prereqs*="${id}"]`);

  dependientes.forEach(dep => {
    const prereqIds = dep.dataset.prereqs.split(",").map(p => p.trim());
    const todosListos = prereqIds.every(pid => {
      const el = document.getElementById(pid);
      return el && el.classList.contains("aprobado");
    });

    if (todosListos) {
      dep.classList.remove("bloqueado");
    }
  });
}
