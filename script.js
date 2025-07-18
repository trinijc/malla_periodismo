document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramo => {
    const prereqs = (ramo.dataset.prereqs || "").trim();

    // Evalúa si debe estar bloqueado o no al cargar
    if (prereqs !== "") {
      const requisitos = prereqs.split(",").map(id => id.trim());
      const todosAprobados = requisitos.every(id => {
        const req = document.getElementById(id);
        return req && req.classList.contains("aprobado");
      });
      ramo.classList.toggle("bloqueado", !todosAprobados);
    } else {
      ramo.classList.remove("bloqueado");
    }

    // Asegura que los ramos especiales sean siempre clickeables
    if (ramo.classList.contains("tipo-lila") ||
        ramo.classList.contains("tipo-celeste") ||
        ramo.classList.contains("tipo-opr")) {
      ramo.classList.remove("bloqueado");
    }

    // Clic para marcar como aprobado
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado") || ramo.classList.contains("aprobado")) return;
      ramo.classList.add("aprobado");
      actualizarBloqueos();
    });

    // Doble clic para desmarcar
    ramo.addEventListener("dblclick", () => {
      if (!ramo.classList.contains("aprobado")) return;
      ramo.classList.remove("aprobado");
      actualizarBloqueos();
    });
  });
});

/** Esta función revisa todos los ramos y actualiza si deben estar bloqueados o desbloqueados */
function actualizarBloqueos() {
  const todos = document.querySelectorAll(".ramo");

  todos.forEach(ramo => {
    const prereqs = (ramo.dataset.prereqs || "").trim();

    // Si es especial (lila, celeste u OPR), nunca se bloquea
    if (ramo.classList.contains("tipo-lila") ||
        ramo.classList.contains("tipo-celeste") ||
        ramo.classList.contains("tipo-opr")) {
      ramo.classList.remove("bloqueado");
      return;
    }

    if (prereqs === "") {
      ramo.classList.remove("bloqueado");
      return;
    }

    const requisitos = prereqs.split(",").map(id => id.trim());
    const todosAprobados = requisitos.every(id => {
      const req = document.getElementById(id);
      return req && req.classList.contains("aprobado");
    });

    ramo.classList.toggle("bloqueado", !todosAprobados);
  });
}
// --- Toggle de aprobación con un solo clic ---
document.querySelectorAll(".ramo").forEach(ramo => {
  ramo.addEventListener("click", () => {
    if (ramo.classList.contains("bloqueado")) return;

    // Alterna estado de aprobado
    ramo.classList.toggle("aprobado");

    // Revisa si otros ramos ahora pueden desbloquearse
    document.querySelectorAll(".ramo").forEach(r => {
      const prereqs = (r.dataset.prereqs || "").trim();

      // Los especiales (lila, celeste, opr) siempre desbloqueados
      if (
        r.classList.contains("tipo-lila") ||
        r.classList.contains("tipo-celeste") ||
        r.classList.contains("tipo-opr")
      ) {
        r.classList.remove("bloqueado");
        return;
      }

      // Si no tiene prerequisitos, está desbloqueado
      if (prereqs === "") {
        r.classList.remove("bloqueado");
        return;
      }

      // Si los tiene, evalúa si se cumplen
      const requisitos = prereqs.split(",").map(id => id.trim());
      const todosAprobados = requisitos.every(pid => {
        const prereqEl = document.getElementById(pid);
        return prereqEl && prereqEl.classList.contains("aprobado");
      });

      if (todosAprobados) {
        r.classList.remove("bloqueado");
      } else {
        r.classList.add("bloqueado");
        r.classList.remove("aprobado"); // se desmarca si queda bloqueado
      }
    });
  });
});
