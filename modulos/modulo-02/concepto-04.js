// ==========================================
// CONCEPTO 4 - PROCEDIMIENTOS DE ENTRENAMIENTO
// Versión con micro-interacciones pedagógicas
// ==========================================

// ========== NAVEGACIÓN TEORÍA ==========
function irATeoria(numero) {
    document.querySelectorAll('.teoria-seccion').forEach(s => s.classList.remove('activa'));
    document.getElementById(`teoria${numero}`).classList.add('activa');
    window.scrollTo(0, 0);
}

function iniciarEjercicio() {
    document.querySelectorAll('.teoria-seccion').forEach(s => s.classList.remove('activa'));
    document.getElementById('ejercicio').classList.add('activa');
    window.scrollTo(0, 0);
    cargarCaso();
}

// ========== ANIMACIÓN 1: TABS DE PROCEDIMIENTOS ==========
function mostrarProcedimiento(tipo) {
    // Desactivar todos los tabs y contenidos
    document.querySelectorAll('.tab-proc').forEach(t => t.classList.remove('activa'));
    document.querySelectorAll('.contenido-proc').forEach(c => c.classList.remove('activo'));
    
    // Activar el seleccionado
    event.target.classList.add('activa');
    document.getElementById(`proc-${tipo}`).classList.add('activo');
}

// ========== ANIMACIÓN 2: CALCULADORA AVANZADA ==========
function calcularEficienciaAvanzada() {
    const numConjuntos = parseInt(document.getElementById('sliderConjuntos').value);
    const estimulosPorConj = parseInt(document.getElementById('sliderEstimulos').value);
    
    // Actualizar valores mostrados
    document.getElementById('valorConjuntos').textContent = numConjuntos;
    document.getElementById('valorEstimulosPorConj').textContent = estimulosPorConj;
    
    // LINEAL: entrenar (numConjuntos - 1) * estimulosPorConj relaciones
    const linealEntrena = (numConjuntos - 1) * estimulosPorConj;
    
    // UNO-A-MUCHOS y MUCHOS-A-UNO: igual que lineal
    const unoMuchosEntrena = (numConjuntos - 1) * estimulosPorConj;
    const muchosUnoEntrena = (numConjuntos - 1) * estimulosPorConj;
    
    // Total de relaciones en clase completa: 
    // n estímulos en clase = numConjuntos * estimulosPorConj
    // Relaciones totales = n * (n-1) [todas las parejas dirigidas]
    const totalEstimulos = numConjuntos * estimulosPorConj;
    const relacionesTotales = totalEstimulos * (totalEstimulos - 1);
    
    // Actualizar UI
    document.getElementById('linealEntrena').textContent = linealEntrena;
    document.getElementById('linealTotal').textContent = relacionesTotales;
    document.getElementById('linealEfic').textContent = 
        Math.round((relacionesTotales / linealEntrena) * 100) + '%';
    
    document.getElementById('unoMuchosEntrena').textContent = unoMuchosEntrena;
    document.getElementById('unoMuchosTotal').textContent = relacionesTotales;
    document.getElementById('unoMuchosEfic').textContent = 
        Math.round((relacionesTotales / unoMuchosEntrena) * 100) + '%';
    
    document.getElementById('muchosUnoEntrena').textContent = muchosUnoEntrena;
    document.getElementById('muchosUnoTotal').textContent = relacionesTotales;
    document.getElementById('muchosUnoEfic').textContent = 
        Math.round((relacionesTotales / muchosUnoEntrena) * 100) + '%';
    
    // Mensaje
    const mensaje = document.getElementById('mensajeCalcAvanzada');
    mensaje.innerHTML = `💡 Con ${numConjuntos} conjuntos de ${estimulosPorConj} estímulos: 
        entrenas ${linealEntrena}, obtienes ${relacionesTotales} totales 
        (${Math.round((relacionesTotales / linealEntrena) * 100)}% eficiencia)`;
    mensaje.style.opacity = '1';
}

// ========== ANIMACIÓN 3: DRAG & DROP ==========
let escenariosDraggeados = 0;
let respuestasCorrectas = {};

function inicializarDragDrop() {
    const escenarios = document.querySelectorAll('.escenario-item');
    const zonas = document.querySelectorAll('.zona-drop');
    
    escenarios.forEach(escenario => {
        escenario.addEventListener('dragstart', handleDragStart);
        escenario.addEventListener('dragend', handleDragEnd);
    });
    
    zonas.forEach(zona => {
        zona.addEventListener('dragover', handleDragOver);
        zona.addEventListener('drop', handleDrop);
        zona.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.id);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    e.target.closest('.zona-drop').classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    e.target.closest('.zona-drop').classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    const escenarioId = e.dataTransfer.getData('text/html');
    const escenario = document.getElementById(escenarioId);
    const zona = e.target.closest('.zona-drop');
    const contenedor = zona.querySelector('.zona-contenido');
    
    // Mover escenario a zona
    contenedor.appendChild(escenario);
    escenario.style.margin = '0.5rem 0';
    
    zona.classList.remove('drag-over');
    
    // Guardar respuesta
    respuestasCorrectas[escenarioId] = {
        seleccionado: zona.dataset.nombre,
        correcto: escenario.dataset.correcto
    };
    
    escenariosDraggeados++;
    
    // Mostrar botón verificar si todos están colocados
    if (escenariosDraggeados === 3) {
        document.querySelector('.btn-verificar-drag').style.display = 'block';
    }
    
    return false;
}

function verificarDragDrop() {
    const feedback = document.getElementById('feedbackDrag');
    let aciertos = 0;
    
    // Verificar cada escenario
    Object.keys(respuestasCorrectas).forEach(escenarioId => {
        const resp = respuestasCorrectas[escenarioId];
        const escenario = document.getElementById(escenarioId);
        
        if (resp.seleccionado === resp.correcto) {
            escenario.classList.add('correcto-drag');
            aciertos++;
        } else {
            escenario.classList.add('incorrecto-drag');
        }
    });
    
    // Feedback
    if (aciertos === 3) {
        feedback.innerHTML = `
            <div class="feedback-drag-exito">
                ✅ <strong>¡Perfecto!</strong> Los 3 escenarios están correctamente asignados.<br><br>
                <strong>Resumen:</strong><br>
                • <strong>Vaughan:</strong> Para sujetos con dificultad en matching, empezar con discriminación simple.<br>
                • <strong>Compuestos:</strong> Para enseñar categorías con múltiples atributos simultáneos.<br>
                • <strong>Pavloviano:</strong> Para investigación sobre mecanismos sin operante.
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="feedback-drag-parcial">
                ⚠️ <strong>${aciertos}/3 correctos.</strong> Revisa los marcados en rojo.<br><br>
                <strong>Pistas:</strong><br>
                • Si el sujeto tiene problemas con matching → Empezar más simple (Vaughan)<br>
                • Si necesitas enseñar atributos múltiples → Compuestos<br>
                • Si es investigación teórica sobre mecanismos → Pavloviano
            </div>
        `;
    }
    
    feedback.style.display = 'block';
    feedback.style.opacity = '1';
    
    // Deshabilitar drag
    document.querySelectorAll('.escenario-item').forEach(e => {
        e.setAttribute('draggable', 'false');
        e.style.cursor = 'default';
    });
}

// ========== EJERCICIO: CASOS DE DISEÑO ==========
const casos = [
    {
        objetivo: "Enseñar relaciones entre 4 conjuntos (A, B, C, D) de 3 estímulos cada uno a un estudiante universitario sin experiencia previa.",
        contexto: "El estudiante es competente verbalmente y puede seguir instrucciones complejas. Tiempo disponible: 4 sesiones de 30 minutos.",
        opciones: [
            {texto: "📏 LINEAL: A→B, B→C, C→D (secuencial)", correcta: true},
            {texto: "🌟 UNO-A-MUCHOS: A→B, A→C, A→D (ramificado)", correcta: false},
            {texto: "🎯 MUCHOS-A-UNO: B→D, C→D, A→D (convergente)", correcta: false},
            {texto: "🔀 MIXTO: combinar varios procedimientos", correcta: false}
        ],
        feedback: "✅ Correcto. LINEAL es más robusto y confiable para sujetos sin experiencia. Aunque todos los procedimientos pueden funcionar, Lineal tiene mayor evidencia de éxito consistente y es más fácil de implementar secuencialmente. Genera clases estables y predecibles."
    },
    {
        objetivo: "Enseñar vocabulario bilingüe: 30 palabras español-inglés a niños de 8-10 años.",
        contexto: "Ya conocen las palabras en español. Necesitan aprender inglés y luego relacionar ambos idiomas.",
        opciones: [
            {texto: "📏 LINEAL: Español→Imagen, Imagen→Inglés", correcta: false},
            {texto: "🌟 UNO-A-MUCHOS: Español→Imagen, Español→Inglés", correcta: true},
            {texto: "🎯 MUCHOS-A-UNO: Imagen→Español, Inglés→Español", correcta: false},
            {texto: "📚 CONDICIONAMIENTO CLÁSICO", correcta: false}
        ],
        feedback: "✅ Exacto. UNO-A-MUCHOS es ideal cuando un estímulo ya conocido (palabra español) debe controlar múltiples respuestas nuevas (imagen + palabra inglés). Eficiente para vocabulario porque la palabra nativa actúa como ancla que organiza las nuevas relaciones. Facilita categorización."
    },
    {
        objetivo: "Niño con autismo, 5 años, primera experiencia con entrenamiento en equivalencia. 3 conjuntos de 2 estímulos.",
        contexto: "Tiene habilidades básicas de matching físico (objeto con objeto), pero nunca ha hecho matching-to-sample arbitrario.",
        opciones: [
            {texto: "📏 LINEAL: A→B, B→C (el más simple)", correcta: true},
            {texto: "🌟 UNO-A-MUCHOS: puede ser confuso al inicio", correcta: false},
            {texto: "🎯 MUCHOS-A-UNO: muy complejo para inicio", correcta: false},
            {texto: "⚡ VAUGHAN: empezar con discriminación simple", correcta: false}
        ],
        feedback: "✅ Correcto. Para primera experiencia, LINEAL es más apropiado por su estructura simple y secuencial. Aunque Vaughan también es válido para iniciar con discriminación simple, Lineal tiene más evidencia específica en autismo y permite progresión clara. Minimiza confusión y maximiza éxito inicial."
    },
    {
        objetivo: "Adulto con afasia expresiva tras ACV. Dificultad severa con tareas de matching-to-sample por problemas atencionales.",
        contexto: "Puede hacer discriminaciones simples (elegir objeto cuando se nombra), pero falla en matching complejo.",
        opciones: [
            {texto: "📏 LINEAL: probablemente muy difícil", correcta: false},
            {texto: "🌟 UNO-A-MUCHOS: demasiado complejo", correcta: false},
            {texto: "⚡ VAUGHAN: discriminación simple con inversiones", correcta: true},
            {texto: "🎨 ESTÍMULOS COMPUESTOS", correcta: false}
        ],
        feedback: "✅ Perfecto. VAUGHAN es apropiado cuando el matching-to-sample estándar es muy difícil. Empezar con discriminación simple (sin muestra condicional) reduce carga cognitiva. Las inversiones repetidas gradualmente forman clases funcionales. Una vez establecidas, se pueden introducir tareas de matching más complejas."
    },
    {
        objetivo: "Enseñar categorización de figuras por DOS atributos simultáneos: color Y forma (ej: cuadrado-rojo vs círculo-azul).",
        contexto: "Estudiantes de primaria, 7-8 años. Ya entienden colores y formas por separado.",
        opciones: [
            {texto: "📏 LINEAL: no captura múltiples atributos", correcta: false},
            {texto: "🌟 UNO-A-MUCHOS: tampoco ideal", correcta: false},
            {texto: "🎨 ESTÍMULOS COMPUESTOS: A1B1+, A2B2-", correcta: true},
            {texto: "🔔 CONDICIONAMIENTO CLÁSICO", correcta: false}
        ],
        feedback: "✅ Exacto. ESTÍMULOS COMPUESTOS es el procedimiento diseñado específicamente para enseñar relaciones entre múltiples dimensiones simultáneas. Entrenar A1B1+ (ej: cuadrado-rojo) vs A2B2- (círculo-azul) permite que los estudiantes formen clases de 'todos los 1' vs 'todos los 2', generalizando el concepto de pertenencia conjunta."
    },
    {
        objetivo: "Investigación básica: ¿Puede formarse equivalencia usando SOLO condicionamiento pavloviano, sin contingencias operantes?",
        contexto: "Laboratorio universitario con adultos. Pregunta teórica sobre mecanismos subyacentes de equivalencia.",
        opciones: [
            {texto: "📏 LINEAL: es operante, no sirve", correcta: false},
            {texto: "🌟 UNO-A-MUCHOS: también operante", correcta: false},
            {texto: "🔔 CONDICIONAMIENTO CLÁSICO: A→B→C secuencial", correcta: true},
            {texto: "🎯 MUCHOS-A-UNO", correcta: false}
        ],
        feedback: "✅ Correcto. Para esta pregunta teórica, el PROCEDIMIENTO DE CONDICIONAMIENTO CLÁSICO es el apropiado. Se presenta A que predice B, B que predice C (pavloviano), luego se prueba si emerge C→A en matching. Estudios demuestran que SÍ es posible en adultos humanos con intervalos específicos. Esto amplía nuestra comprensión de los mecanismos de equivalencia."
    },
    {
        objetivo: "Programa de lectoescritura: enseñar que letras escritas corresponden a sonidos y a imágenes (50 palabras).",
        contexto: "Niños preescolares, 4-5 años. Ya identifican imágenes y producen algunos sonidos.",
        opciones: [
            {texto: "📏 LINEAL: Sonido→Letra→Imagen", correcta: true},
            {texto: "🌟 UNO-A-MUCHOS: Sonido→Letra, Sonido→Imagen", correcta: false},
            {texto: "🎯 MUCHOS-A-UNO: Letra→Sonido, Imagen→Sonido", correcta: false},
            {texto: "🎨 ESTÍMULOS COMPUESTOS", correcta: false}
        ],
        feedback: "✅ Correcto. LINEAL es más apropiado para lectoescritura inicial porque respeta la secuencia natural: primero asociar sonido (ya conocido) con letra (nuevo), luego letra con imagen (consolidación). Esto construye la cadena fonema→grafema→significado de manera progresiva y estable, que es la base de la lectura alfabética."
    },
    {
        objetivo: "Entrenar 5 conjuntos de estímulos con MÁXIMA eficiencia (mínimo número de ensayos totales).",
        contexto: "Adultos universitarios en experimento. Tiempo muy limitado: solo 15 minutos.",
        opciones: [
            {texto: "📏 LINEAL: 4 discriminaciones × múltiples ensayos", correcta: false},
            {texto: "🌟 UNO-A-MUCHOS: permite entrenamiento simultáneo", correcta: true},
            {texto: "🎯 MUCHOS-A-UNO: similar a uno-a-muchos", correcta: false},
            {texto: "🔀 MIXTO: más complejo de implementar", correcta: false}
        ],
        feedback: "✅ Exacto. UNO-A-MUCHOS permite entrenar múltiples discriminaciones (A→B, A→C, A→D, A→E) más rápidamente porque comparten el conjunto de muestras A. En tiempo limitado, esto es más eficiente que Lineal que requiere secuencia estricta. Con adultos competentes, la formación de clases es prácticamente garantizada."
    },
    {
        objetivo: "Paciente con Alzheimer inicial. Necesita mantener relaciones familiares: fotos de personas con sus nombres y roles.",
        contexto: "10 familiares. Deterioro cognitivo leve pero progresivo. Prioridad: robustez y retención a largo plazo.",
        opciones: [
            {texto: "📏 LINEAL: Foto→Nombre→Rol (más robusto)", correcta: true},
            {texto: "🌟 UNO-A-MUCHOS: puede generar confusión", correcta: false},
            {texto: "⚡ VAUGHAN: demasiado abstracto", correcta: false},
            {texto: "🎨 ESTÍMULOS COMPUESTOS", correcta: false}
        ],
        feedback: "✅ Correcto. Con deterioro cognitivo, LINEAL es preferible por su estructura simple, secuencial y robusta. Minimiza interferencia y confusión. La progresión Foto→Nombre→Rol construye asociaciones paso a paso, facilitando retención. En Alzheimer, la simplicidad y consistencia del procedimiento son más importantes que la velocidad de entrenamiento."
    },
    {
        objetivo: "Investigación: ¿Las palomas pueden formar clases de equivalencia?",
        contexto: "Laboratorio animal. Históricamente, resultados negativos en simetría con matching estándar.",
        opciones: [
            {texto: "📏 LINEAL estándar: ya probado, falla en simetría", correcta: false},
            {texto: "⚡ VAUGHAN: permite usar conducta del sujeto como elemento", correcta: true},
            {texto: "🔔 CONDICIONAMIENTO CLÁSICO: difícil con palomas", correcta: false},
            {texto: "🎨 ESTÍMULOS COMPUESTOS", correcta: false}
        ],
        feedback: "✅ Perfecto. Investigaciones recientes (García & Benjumea, 2006) lograron simetría en palomas usando PROCEDIMIENTO VAUGHAN donde la propia conducta del sujeto es uno de los elementos de la relación. Esto sugiere que capacidades específicas (como conducta como estímulo) son necesarias para equivalencia. El procedimiento Vaughan permite explorar estos pre-requisitos."
    }
];

// ========== ESTADO EJERCICIO ==========
let casoActualIndex = 0;
let aciertosTotal = 0;

// ========== CARGAR CASO ==========
function cargarCaso() {
    if (casoActualIndex >= casos.length) {
        mostrarResultadoFinal();
        return;
    }
    
    const caso = casos[casoActualIndex];
    
    document.getElementById('casoActual').textContent = casoActualIndex + 1;
    document.getElementById('casoNumero').textContent = casoActualIndex + 1;
    document.getElementById('aciertos').textContent = aciertosTotal;
    document.getElementById('porcentaje').textContent = casoActualIndex === 0 ? 0 : Math.round((aciertosTotal / casoActualIndex) * 100);
    
    const progresoFill = document.getElementById('progresoFill');
    progresoFill.style.width = ((casoActualIndex / casos.length) * 100) + '%';
    
    // Mostrar objetivo
    document.getElementById('casoObjetivo').innerHTML = `
        <h4>🎯 Objetivo Educativo:</h4>
        <p>${caso.objetivo}</p>
    `;
    
    // Mostrar contexto
    document.getElementById('casoContexto').innerHTML = `
        <h4>📋 Contexto:</h4>
        <p>${caso.contexto}</p>
    `;
    
    // Opciones
    const opcionesEl = document.getElementById('casoOpciones');
    opcionesEl.innerHTML = '';
    
    caso.opciones.forEach((opcion, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn-proc';
        btn.innerHTML = opcion.texto;
        btn.onclick = () => verificarRespuesta(opcion.correcta, idx);
        opcionesEl.appendChild(btn);
    });
    
    document.getElementById('casoFeedback').innerHTML = '';
    document.getElementById('casoFeedback').className = 'caso-feedback';
}

// ========== VERIFICAR RESPUESTA ==========
function verificarRespuesta(correcta, idx) {
    const caso = casos[casoActualIndex];
    const feedbackEl = document.getElementById('casoFeedback');
    const botonesOpciones = document.querySelectorAll('.opcion-btn-proc');
    
    botonesOpciones.forEach(btn => btn.style.pointerEvents = 'none');
    
    botonesOpciones.forEach((btn, i) => {
        if (caso.opciones[i].correcta) {
            btn.classList.add('correcta');
        }
    });
    
    if (correcta) {
        aciertosTotal++;
        feedbackEl.className = 'caso-feedback correcto';
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                ${caso.feedback}
            </div>
            <button class="btn-siguiente" onclick="siguienteCaso()">
                Siguiente caso →
            </button>
        `;
    } else {
        feedbackEl.className = 'caso-feedback incorrecto';
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                <p>❌ No es la opción más apropiada para este contexto.</p>
                ${caso.feedback}
            </div>
            <button class="btn-siguiente" onclick="siguienteCaso()">
                Siguiente caso →
            </button>
        `;
    }
    
    document.getElementById('aciertos').textContent = aciertosTotal;
    document.getElementById('porcentaje').textContent = Math.round((aciertosTotal / (casoActualIndex + 1)) * 100);
}

function siguienteCaso() {
    casoActualIndex++;
    cargarCaso();
}

// ========== RESULTADO FINAL ==========
function mostrarResultadoFinal() {
    document.getElementById('casoCard').style.display = 'none';
    document.getElementById('resultadoFinal').style.display = 'block';
    
    const porcentajeFinal = Math.round((aciertosTotal / casos.length) * 100);
    
    document.getElementById('finalAciertos').textContent = `${aciertosTotal}/${casos.length}`;
    document.getElementById('finalPorcentaje').textContent = porcentajeFinal;
    
    const mensajeEl = document.getElementById('resultadoMensaje');
    
    if (porcentajeFinal >= 90) {
        mensajeEl.innerHTML = `
            <p class="mensaje-excelente">
                <strong>🏆 ¡EXCELENTE!</strong><br>
                Dominas la selección de procedimientos de entrenamiento. Entiendes cuándo usar 
                cada procedimiento según el contexto, las características del estudiante, y los 
                objetivos específicos. ¡Listo para la integración final del módulo!
            </p>
        `;
    } else if (porcentajeFinal >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Tienes comprensión sólida de los procedimientos. Recuerda: Lineal para robustez, 
                Uno-a-Muchos para eficiencia con categorización, procedimientos especiales para 
                casos específicos.
            </p>
        `;
    } else if (porcentajeFinal >= 60) {
        mensajeEl.innerHTML = `
            <p class="mensaje-regular">
                <strong>📚 BIEN</strong><br>
                Comprendes los conceptos básicos. Repasa: cada procedimiento tiene indicaciones 
                específicas. No hay un "mejor" universal, sino procedimientos más o menos apropiados 
                según contexto.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>🔄 NECESITAS REPASAR</strong><br>
                Revisa los bloques teóricos. Enfócate en las ventajas/desventajas de cada procedimiento 
                y en qué contextos son más apropiados. ¡Repite el ejercicio!
            </p>
        `;
    }
}

function reiniciarEjercicio() {
    casoActualIndex = 0;
    aciertosTotal = 0;
    document.getElementById('casoCard').style.display = 'block';
    document.getElementById('resultadoFinal').style.display = 'none';
    cargarCaso();
}

// ========== PARTÍCULAS ==========
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    init() {
        this.resizeCanvas();
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00BCD4' : '#00E5FF'
            });
        }
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    calcularEficienciaAvanzada(); // Inicializar calculadora
    inicializarDragDrop(); // Inicializar drag & drop
});
