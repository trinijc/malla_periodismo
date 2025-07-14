// script.js

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      const requisitos = prereqs.split(",").map(p => p.trim());
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!todosAprobados) {
        ramo.classList.add("bloqueado");
      }
    }

 ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado") && !ramo.classList.contains("aprobado")) {
        aprobarCurso(ramo);
      }
    });
  });
});

function aprobarCurso(ramo) {
  ramo.classList.add("aprobado");

  const id = ramo.id;
  const dependientes = document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`);

  dependientes.forEach(dep => {
    const prereqList = dep.dataset.prereqs.split(",").map(p => p.trim());
    const todosAprobados = prereqList.every(pid => {
      const prereqEl = document.getElementById(pid);
      return prereqEl && prereqEl.classList.contains("aprobado");
    });

    if (todosAprobados) {
      dep.classList.remove("bloqueado");
    }
  });
}
