document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;

    // Asegura que siempre tenga el listener
    ramo.addEventListener("click", () => {
      if (!ramo.classList.contains("bloqueado") && !ramo.classList.contains("aprobado")) {
        aprobarCurso(ramo);
      }
    });

    // Si tiene requisitos, verifica si ya están aprobados
    if (prereqs && prereqs.trim() !== "") {
      const requisitos = prereqs.split(",").map(id => id.trim());
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });

      if (!todosAprobados) {
        ramo.classList.add("bloqueado");
      }
    }
  });
});

function aprobarCurso(ramo) {
  ramo.classList.add("aprobado");

  // Revisa si desbloquea otros cursos
  const id = ramo.id;
  const dependientes = document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`);

  dependientes.forEach(dep => {
    const prereqList = dep.dataset.prereqs.split(",").map(p => p.trim()).filter(Boolean);
    const todosAprobados = prereqList.every(pid => {
      const prereqEl = document.getElementById(pid);
      return prereqEl && prereqEl.classList.contains("aprobado");
    });

document.getElementById("resetear").addEventListener("click", () => {
  document.querySelectorAll(".ramo.aprobado").forEach(r => r.classList.remove("aprobado"));
  document.querySelectorAll(".ramo").forEach(r => { if (r.dataset.prereqs) r.classList.add("bloqueado"); });
  localStorage.removeItem("ramosAprobados");
});
/* --- HOVER PARA VER DEPENDENCIAS --- */
document.querySelectorAll(".ramo").forEach(ramo => {
  ramo.addEventListener("mouseenter", () => {
    const id = ramo.id;
    document.querySelectorAll(`.ramo[data-prereqs*="${id}"]`)
      .forEach(dep => dep.classList.add("highlight"));
  });
  ramo.addEventListener("mouseleave", () => {
    document.querySelectorAll(".highlight").forEach(d => d.classList.remove("highlight"));
  });
});
function actualizarProgreso() {
  const total = document.querySelectorAll(".ramo").length;
  const ok = document.querySelectorAll(".ramo.aprobado").length;
  document.getElementById("progreso-bar").style.width = `${(ok/total)*100}%`;
}
document.addEventListener("DOMContentLoaded", actualizarProgreso);
document.addEventListener("click", actualizarProgreso);

    if (todosAprobados) {
      dep.classList.remove("bloqueado");
    }
  });
}
