// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;

    // Si tiene prerrequisitos y no están todos aprobados, lo bloqueamos
    if (prereqs) {
      const requisitos = prereqs.split(",").map(id => id.trim());
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!todosAprobados) {
        ramo.classList.add("bloqueado");
      }
    }

    // Siempre le agregamos el event listener
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
ramo.addEventListener("click", () => {
  console.log("Clicked on:", ramo.id);
  if (!ramo.classList.contains("bloqueado") && !ramo.classList.contains("aprobado")) {
    aprobarCurso(ramo);
  }
});
    if (todosAprobados) {
      dep.classList.remove("bloqueado");
    }
  });
}
/* --------- MALLA INTERACTIVA --------- */
document.addEventListener("DOMContentLoaded", () => {

  const ramos = document.querySelectorAll(".ramo");

  // 1) Bloquear ramos con requisitos pendientes
  ramos.forEach(ramo => {
    prepararEstadoInicial(ramo);

    // 2) Añadir click: aprobar si está desbloqueado
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;
      aprobarRamo(ramo);
    });
  });

});

/* ----- Función: marca aprobado y desbloquea dependientes ----- */
function aprobarRamo(ramo) {
  ramo.classList.add("aprobado");

  // Desbloquear ramos que dependan de éste
  const id = ramo.id;
  document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`).forEach(dep => {
    if (todosPrereqsAprobados(dep)) dep.classList.remove("bloqueado");
  });
}

/* ----- Comprueba si un ramo ya cumple todos sus prerequisitos ----- */
function todosPrereqsAprobados(ramo) {
  const prereqs = (ramo.dataset.prereqs || "")
                   .split(",").map(p => p.trim()).filter(Boolean);
  if (prereqs.length === 0) return true;
  return prereqs.every(pid => {
    const req = document.getElementById(pid);
    return req && req.classList.contains("aprobado");
  });
}

/* ----- Al iniciar, decide si un ramo parte bloqueado o no ----- */
function prepararEstadoInicial(ramo) {
  if (!todosPrereqsAprobados(ramo)) {
    ramo.classList.add("bloqueado");
  }
}
