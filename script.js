// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;

    if (prereqs) {
      const requisitos = prereqs.split(",").map(id => id.trim());
      const aprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!aprobados) {
        ramo.classList.add("bloqueado");
      }
    }

    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado") && !ramo.classList.contains("aprobado")) {
        ramo.classList.add("aprobado");

        // Revisar si desbloquea otros
        const id = ramo.id;
        const dependientes = document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`);

        dependientes.forEach(dep => {
          const requisitos = dep.dataset.prereqs.split(",").map(p => p.trim());
          const listos = requisitos.every(pid => {
            const prereqEl = document.getElementById(pid);
            return prereqEl && prereqEl.classList.contains("aprobado");
          });

          if (listos) {
            dep.classList.remove("bloqueado");
          }
        });
      }
    });
  });
});
