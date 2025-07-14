// script.js
document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");
document.getElementById("resetear").addEventListener("click", () => {
  document.querySelectorAll(".ramo.aprobado").forEach(r => r.classList.remove("aprobado"));
  document.querySelectorAll(".ramo").forEach(r => { if (r.dataset.prereqs) r.classList.add("bloqueado"); });
  localStorage.removeItem("ramosAprobados");
});
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
/* --- PEQUEÑA ANIMACIÓN Y SONIDO --- */
const pop = new Audio("https://cdn.jsdelivr.net/gh/immersive-translate/sfx@main/pop.mp3");

function aprobarCurso(ramo) {
  // tu código original...
  ramo.classList.add("aprobado");
  pop.play();                           // sonido
  ramo.animate([{transform:"scale(1)"},{transform:"scale(1.1)"},{transform:"scale(1)"}],
               {duration:300});
  // resto de tu lógica de desbloqueo...
}
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
    if (todosAprobados) {
      dep.classList.remove("bloqueado");
    }
  });
}
