
/* script.js */

// Al cargar la página, bloqueamos todos los cursos con prerequisitos
window.addEventListener("DOMContentLoaded", () => {
  const cursos = document.querySelectorAll(".ramo");
  cursos.forEach(curso => {
    const prereqs = curso.dataset.prereqs;
    if (prereqs) {
      curso.classList.add("bloqueado");
    }
    // Añadimos el listener a todos (aunque bloqueados no reaccionarán)
    curso.addEventListener("click", () => aprobarCurso(curso));
  });
});

function aprobarCurso(curso) {
  // Evita aprobar dos veces
  if (curso.classList.contains("aprobado")) return;

  curso.classList.add("aprobado");

  // Desbloquea los que dependan de éste
  const id = curso.id;
  const dependientes = document.querySelectorAll(`[data-prereqs*="${id}"]`);

  dependientes.forEach(dep => {
    // Comprueba si todos sus prerequisitos están aprobados
    const prereqIds = dep.dataset.prereqs.split(",").map(p => p.trim());
    const todosListos = prereqIds.every(pid => {
      const prereqEl = document.getElementById(pid);
      return prereqEl && prereqEl.classList.contains("aprobado");
    });
    if (todosListos) {
      dep.classList.remove("bloqueado");
      // Vuelve a aplicar su color original (por si era tipo especial)
    }
  });
}
