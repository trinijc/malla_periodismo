document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;

    if (prereqs && prereqs.trim() !== "") {
      const requisitos = prereqs.split(",").map(id => id.trim());
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!todosAprobados) {
        ramo.classList.add("bloqueado");
      } else {
        ramo.classList.remove("bloqueado"); // Asegura que si ya cumple prereqs no quede bloqueado
      }
    } else {
      ramo.classList.remove("bloqueado"); // Sin prereqs, no bloqueado
    }

    // Listener para marcar como aprobado
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;

      ramo.classList.add("aprobado");

      // Desbloquea los dependientes
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
    });
  });
});
ocument.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los ramos que tengan estas clases
  const especiales = document.querySelectorAll(".ramo.tipo-lila, .ramo.tipo-celeste, .ramo.tipo-opr");

  especiales.forEach(ramo => {
    // Quita la clase 'bloqueado' para que no bloqueen el click
    ramo.classList.remove("bloqueado");

    // Agrega listener para marcar como aprobado al click
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("aprobado")) {
        ramo.classList.add("aprobado");

        // Desbloquea cursos dependientes
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
    });
  });
});
