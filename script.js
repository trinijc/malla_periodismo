// Datos de ramos, requisitos y color especial
@@ -1 +1,39 @@
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
const ramos = [
  // SEM 1
  { id: "COM120", nombre: "Narración de No Ficción (COM120)", semestre: 1, reqs: [] },
  { id: "COM110", nombre: "Teoría de la Comunicación Social (COM110)", semestre: 1, reqs: [] },
  { id: "IHIO205", nombre: "Historia Mundial Contemporánea (IHIO205)", semestre: 1, reqs: [] },
  { id: "COM113", nombre: "Tecnologías de la Comunicación (COM113)", semestre: 1, reqs: [] },
  { id: "COM100", nombre: "Desafíos de la Comunicación (COM100)", semestre: 1, reqs: [] },
  { id: "VRA4000", nombre: "Integridad Académica en la UC (VRA4000)", semestre: 1, reqs: [] },
  { id: "COM101", nombre: "Test de Actualidad IA (COM101)", semestre: 1, reqs: [], color: "lila" },

  // SEM 2
  { id: "SOL126C", nombre: "Metodología de la Investigación Social (SOL126C)", semestre: 2, reqs: [] },
  { id: "COM115", nombre: "Lenguaje Visual (COM115)", semestre: 2, reqs: [] },
  { id: "COM121", nombre: "Semiología (COM121)", semestre: 2, reqs: [] },
  { id: "COM109", nombre: "Historia de la Comunicación Social (COM109)", semestre: 2, reqs: [] },
  { id: "COM122", nombre: "Narración de Ficción (COM122)", semestre: 2, reqs: [] },
  { id: "COM102", nombre: "Test de Actualidad IB (COM102)", semestre: 2, reqs: [], color: "lila" },
  { id: "VRA2000", nombre: "Test de Inglés (VRA2000)", semestre: 2, reqs: [] },

  // SEM 3
  { id: "COM116", nombre: "Audiencias (COM116)", semestre: 3, reqs: [] },
  { id: "COM201", nombre: "Narración Escrita de No Ficción (COM201)", semestre: 3, reqs: ["COM120"] },
  { id: "COM204", nombre: "Teoría de la Noticia (COM204)", semestre: 3, reqs: [] },
  { id: "Cientifica", nombre: "Curso del Área Científica", semestre: 3, reqs: [], color: "celeste" },
  { id: "FIL2001", nombre: "Filosofía: ¿Para Qué? (FIL2001)", semestre: 3, reqs: [], color: "celeste" },
  { id: "COM103", nombre: "Test de Actualidad IIA (COM103)", semestre: 3, reqs: [], color: "lila" },
  { id: "VRA1323", nombre: "Formación en Docencia para Ayudantes UC (VRA1323)", semestre: 3, reqs: [] },

  // SEM 4
  { id: "EYP230P", nombre: "Estadística (EYP230P)", semestre: 4, reqs: [] },
  { id: "COM217", nombre: "Narración Radial de No Ficción (COM217)", semestre: 4, reqs: ["COM120"] },
  { id: "COM206", nombre: "Taller de Periodismo en Prensa (COM206)", semestre: 4, reqs: ["COM204", "COM201"] },
  { id: "ACO264E", nombre: "Habilidades Comunicativas Orales (ACO264E)", semestre: 4, reqs: [] },
  { id: "TTE", nombre: "Formación Teológica (TTE)", semestre: 4, reqs: [], color: "celeste" },
  { id: "COM104", nombre: "Test de Actualidad IIB (COM104)", semestre: 4, reqs: [], color: "lila" },
  { id: "COM1000", nombre: "Práctica Interna (COM1000 - 20 horas)", semestre: 4, reqs: [] },

  // SEM 5
  { id: "COM205", nombre: "Teoría Democrática (COM205)", semestre: 5, reqs: [] },
  { id: "COM203", nombre: "Narración Audiovisual de No Ficción (COM203)", semestre: 5, reqs: ["COM120"] },
  { id: "COM209", nombre: "Taller de Periodismo Radial (COM209)", semestre: 5, reqs: ["COM204", "COM217"] },
  { id: "Estetica", nombre: "Curso del Área de la Estética (COM628 – EST210A)", semestre: 5, reqs: [], color: "celeste" },
  { id: "OFG_Arte", nombre: "OFG (Arte)", semestre: 5, reqs: [], color: "celeste" },
  { id: "COM106a", nombre: "Test de Actualidad IIIA", semestre: 5, reqs: [], color: "lila" },

  // SEM 6
  { id: "COM117", nombre: "Narración Interactiva (COM117)", semestre: 6, reqs: [] },
  { id: "EAE105A", nombre: "Introducción a la Economía (EAE105A)", semestre: 6, reqs: [] },
  { id: "COM211", nombre: "Taller de Periodismo Televisivo (COM211)", semestre: 6, reqs: ["COM204", "COM203"] },
  { id: "OFG_PM", nombre: "OFG (Pensamiento Matemático)", semestre: 6, reqs: [], color: "celeste" },
  { id: "OFG_CT", nombre: "OFG (Ciencia y Tecnología)", semestre: 6, reqs: [], color: "celeste" },
  { id: "COM106b", nombre: "Test de Actualidad IIIB (COM106)", semestre: 6, reqs: [], color: "lila" },

  // SEM 7
  { id: "COM200", nombre: "Ética de las Comunicación (COM200)", semestre: 7, reqs: ["FIL2001"] },
  { id: "COM214", nombre: "Análisis de la Actualidad Nacional (COM214)", semestre: 7, reqs: [] },
  { id: "COM208", nombre: "Narración Gráfica de No Ficción (COM208)", semestre: 7, reqs: [] },
  { id: "OFG_SB", nombre: "OFG (Salud y Bienestar)", semestre: 7, reqs: [], color: "celeste" },
  { id: "OFG_EI", nombre: "OFG (Ecología Integral)", semestre: 7, reqs: [], color: "celeste" },

  // SEM 8
  { id: "DEL307", nombre: "Derecho de la Comunicación (DEL307)", semestre: 8, reqs: [] },
  { id: "COM215", nombre: "Análisis de la Actualidad Internacional (COM215)", semestre: 8, reqs: [] },
  { id: "OPR1", nombre: "Optativo de Profundización (OPR)", semestre: 8, reqs: [], color: "verde" },
  { id: "OPR2", nombre: "Optativo de Profundización (OPR)", semestre: 8, reqs: [], color: "verde" },
  { id: "OFG_CL", nombre: "OFG (Créditos Libres)", semestre: 8, reqs: [], color: "celeste" },

  // SEM 9
  { id: "COM3501", nombre: "Seminario de Investigación (COM3501)", semestre: 9, reqs: ["SOL126C"] },
  { id: "COM3502", nombre: "Análisis Comparado de Periodismo (COM3502)", semestre: 9, reqs: [] },
  { id: "COM3503", nombre: "Taller de Periodismo Avanzado (COM3503)", semestre: 9, reqs: ["COM206", "COM209", "COM211"] },
  { id: "COM3500", nombre: "Economía Política de las Comunicaciones (3500)", semestre: 9, reqs: [] },
  { id: "OPR3", nombre: "Optativo de Profundización (OPR)", semestre: 9, reqs: [], color: "verde" },
  { id: "COM290", nombre: "Práctica Profesional (COM290 – 480 horas)", semestre: 9, reqs: [] },
];

// Estado de los ramos: bloqueado, desbloqueado, aprobado
const estadoRamos = {};

// Función para verificar si un ramo está desbloqueado: 
// Sin requisitos o todos sus requisitos aprobados
function estaDesbloqueado(ramo) {
  if (ramo.reqs.length === 0) return true;
  return ramo.reqs.every(req => estadoRamos[req] === "aprobado");
}

// Función para obtener color especial CSS clase
function colorEspecial(ramo) {
  if (!ramo.color) return "";
  return ramo.color;
}

// Renderizar malla
function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  // Agrupar por semestre
  const semestres = {};
  ramos.forEach(r => {
    if (!semestres[r.semestre]) semestres[r.semestre] = [];
    semestres[r.semestre].push(r);
  });

  for (const sem in semestres) {
    const divSem = document.createElement("div");
    divSem.classList.add("semestre");

    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${sem}`;
    divSem.appendChild(titulo);

    semestres[sem].forEach(ramo => {
      // Estado
      let estado = "bloqueado";
      if (estadoRamos[ramo.id] === "aprobado") estado = "aprobado";
      else if (estaDesbloqueado(ramo)) estado = "desbloqueado";

      // Guardar estado para actualizar después
      estadoRamos[ramo.id] = estado;

      // Crear tarjeta ramo
      const divRamo = document.createElement("div");
      divRamo.classList.add("ramo");
      divRamo.classList.add(estado);
      // Color especial
      const colorClass = colorEspecial(ramo);
      if (colorClass && estado !== "bloqueado") divRamo.classList.add(colorClass);

      // Nombre
      const nombreRamo = document.createElement("div");
      nombreRamo.textContent = ramo.nombre;
      divRamo.appendChild(nombreRamo);

      // Botón aprobar
      const btn = document.createElement("button");
      btn.textContent = "Aprueba ramo";

      // Solo habilitar botón si desbloqueado y no aprobado
      btn.disabled = !(estado === "desbloqueado");
      btn.addEventListener("click", () => {
        estadoRamos[ramo.id] = "aprobado";
        renderMalla();
      });

      divRamo.appendChild(btn);

      divSem.appendChild(divRamo);
    });

    container.appendChild(divSem);
  }
}

// Inicializar y renderizar la malla
renderMalla();
