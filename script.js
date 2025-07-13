body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: white;
  color: #333;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  padding: 1rem;
  background-color: #f4f4f4;
  margin-bottom: 0;
}

h2 {
  text-align: center;
  font-size: 1.1rem;
  background-color: #e0e0e0;
  margin: 0;
  padding: 0.5rem;
}

.malla-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem;
}

.semestre {
  background-color: #fafafa;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.5rem;
  min-width: 250px;
  flex-shrink: 0;
}

.ramo {
  padding: 0.6rem;
  margin: 0.4rem 0;
  border-radius: 8px;
  text-align: center;
  background-color: #ddd;
  color: #444;
  cursor: pointer;
  transition: 0.3s;
  font-weight: 500;
  font-size: 0.95rem;
  user-select: none;
}

/* Ramos aprobados */
.ramo.aprobado {
  background-color: #ffb6c1; /* rosado claro */
  color: #222;
  font-weight: bold;
}

/* Ramos bloqueados */
.ramo.bloqueado {
  background-color: #ccc;
  color: #888;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Tipos especiales de ramos */
.tipo-lila {
  background-color: #e6ccf2 !important;
}

.tipo-celeste {
  background-color: #cceeff !important;
}

.tipo-opr {
  background-color: #ccf2cc !important;
}

/* Scroll horizontal */
.malla-container::-webkit-scrollbar {
  height: 8px;
}

.malla-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}

document.addEventListener("DOMContentLoaded", function () {
  const ramos = document.querySelectorAll(".ramo");

  // Paso 1: Bloquear ramos con prerequisitos
  ramos.forEach(ramo => {
    const prereqs = ramo.dataset.prereqs;
    if (prereqs) {
      ramo.classList.add("bloqueado");
    }
  });

  // Paso 2: Agregar eventos de clic
  ramos.forEach(ramo => {
    ramo.addEventListener("click", function () {
      // Si está bloqueado, no hacer nada
      if (ramo.classList.contains("bloqueado")) return;

      // Alternar clase de aprobado
      ramo.classList.toggle("aprobado");

      // Actualizar desbloqueos
      actualizarDesbloqueos();
    });
  });

  // Paso 3: Desbloquear ramos cuyos requisitos están cumplidos
  function actualizarDesbloqueos() {
    ramos.forEach(ramo => {
      const prereqs = ramo.dataset.prereqs;
      if (prereqs) {
        const ids = prereqs.split(",");
        const todosAprobados = ids.every(id => {
          const prereqRamo = document.getElementById(id.trim());
          return prereqRamo && prereqRamo.classList.contains("aprobado");
        });

        if (todosAprobados) {
          ramo.classList.remove("bloqueado");
        } else {
          ramo.classList.add("bloqueado");
          ramo.classList.remove("aprobado");
        }
      }
    });
  }
});
