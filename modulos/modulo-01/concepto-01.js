// ============================================
// CASOS CLÍNICOS PARA LOS 8 ENSAYOS
// ============================================

const casos = [
    {
        texto: "El terapeuta dice: 'Tu depresión se debe a un desequilibrio químico en tu cerebro que causa tristeza. Necesitamos arreglar ese mecanismo con medicación.'",
        respuesta: "mecanicismo",
        explicacion: "Este es un claro ejemplo de <strong>Mecanicismo</strong>. El terapeuta busca una causa interna (desequilibrio químico) que 'produce' la tristeza, como si fuera una máquina rota que necesita reparación. Ignora el contexto y la función de la conducta."
    },
    {
        texto: "El terapeuta dice: 'Según el DSM-5, clasificamos tu problema como Trastorno de Ansiedad Generalizada porque cumples 6 de los 9 criterios diagnósticos.'",
        respuesta: "formismo",
        explicacion: "Este es <strong>Formismo</strong> en acción. El terapeuta clasifica al cliente en una categoría predefinida basándose en similitud con criterios. Es útil para organizar, pero puede perder la individualidad del contexto único de cada persona."
    },
    {
        texto: "El terapeuta dice: 'Tu familia es un sistema donde cada miembro influye en los demás. Necesitamos ver cómo se ha desarrollado este patrón familiar a lo largo del tiempo.'",
        respuesta: "organicismo",
        explicacion: "Este es <strong>Organicismo</strong>. El terapeuta ve al cliente como parte de un sistema vivo que evoluciona. Enfatiza el desarrollo y la interconexión, pero puede volverse abstracto y difícil de operacionalizar en intervenciones concretas."
    },
    {
        texto: "El terapeuta pregunta: 'Cuéntame, ¿en qué situaciones específicas evitas y qué consecuencias tiene eso para ti? ¿Para qué te sirve evitar en esos contextos?'",
        respuesta: "contextualismo",
        explicacion: "¡Correcto! Esto es <strong>Contextualismo Funcional</strong>. El terapeuta no busca causas internas ni categorías, sino que analiza la función de la conducta (evitar) en contextos específicos. Pregunta '¿para qué?' en lugar de '¿por qué?'."
    },
    {
        texto: "El terapeuta dice: 'Tienes creencias irracionales sobre el fracaso almacenadas en tu memoria. Estas creencias están mal programadas y causan tu ansiedad.'",
        respuesta: "mecanicismo",
        explicacion: "Nuevamente <strong>Mecanicismo</strong>. Aunque usa lenguaje cognitivo, el enfoque sigue siendo mecanicista: busca estructuras internas ('creencias almacenadas') que causan la conducta, como un software mal programado."
    },
    {
        texto: "El terapeuta dice: 'Vamos a hacer un análisis funcional: identificar los antecedentes y consecuencias que mantienen tu consumo de alcohol en diferentes contextos.'",
        respuesta: "contextualismo",
        explicacion: "Perfecto, esto es <strong>Contextualismo Funcional</strong>. El análisis funcional es la herramienta clave del CF: busca relaciones entre conducta y contexto (antecedentes y consecuentes), no causas internas. Se enfoca en predecir e influir."
    },
    {
        texto: "El terapeuta dice: 'Tu perfil corresponde al tipo de personalidad evitativa. Las personas de este tipo comparten características similares según la literatura.'",
        respuesta: "formismo",
        explicacion: "Este es <strong>Formismo</strong>. El terapeuta clasifica al cliente según un 'tipo' de personalidad basado en similitud con otros casos. La metáfora es la categorización, no el contexto funcional individual."
    },
    {
        texto: "El terapeuta dice: 'La terapia es un proceso de crecimiento personal. Vamos a trabajar para que alcances tu máximo potencial como ser humano integrado.'",
        respuesta: "organicismo",
        explicacion: "Este es <strong>Organicismo</strong>. Habla de 'crecimiento', 'potencial' y 'proceso de desarrollo' – metáforas orgánicas. Es inspirador pero puede ser vago sobre qué hacer concretamente en sesión."
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ensayoActual = 0;
let aciertos = 0;
let respuestaSeleccionada = null;

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const casoTexto = document.getElementById('casoTexto');
const dropZone = document.getElementById('dropZone');
const dropPlaceholder = document.getElementById('dropPlaceholder');
const dropAnswer = document.getElementById('dropAnswer');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackCard = document.getElementById('feedbackCard');
const btnSiguiente = document.getElementById('btnSiguiente');
const finalizacionSection = document.getElementById('finalizacionSection');
const ensayoActualSpan = document.getElementById('ensayoActual');
const aciertosCount = document.getElementById('aciertosCount');
const progresoEjercicio = document.getElementById('progresoEjercicio');

// ============================================
// INICIALIZACIÓN
// ============================================

function inicializar() {
    cargarCaso();
    configurarDragAndDrop();
    btnSiguiente.addEventListener('click', siguienteCaso);
}

function cargarCaso() {
    const caso = casos[ensayoActual];
    casoTexto.textContent = caso.texto;
    ensayoActualSpan.textContent = ensayoActual + 1;
    
    // Resetear estado
    respuestaSeleccionada = null;
    dropAnswer.style.display = 'none';
    dropPlaceholder.style.display = 'flex';
    feedbackSection.style.display = 'none';
    
    // Restaurar opciones
    document.querySelectorAll('.opcion-drag').forEach(opcion => {
        opcion.style.display = 'flex';
        opcion.setAttribute('draggable', 'true');
    });
}

// ============================================
// DRAG AND DROP
// ============================================

function configurarDragAndDrop() {
    const opciones = document.querySelectorAll('.opcion-drag');
    
    opciones.forEach(opcion => {
        opcion.addEventListener('dragstart', handleDragStart);
        opcion.addEventListener('dragend', handleDragEnd);
    });
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('tipo', this.dataset.tipo);
    this.classList.add('dragging');
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    dropZone.classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    dropZone.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    e.preventDefault();
    
    dropZone.classList.remove('drag-over');
    
    const tipo = e.dataTransfer.getData('tipo');
    const html = e.dataTransfer.getData('text/html');
    
    respuestaSeleccionada = tipo;
    
    // Mostrar respuesta en la zona de drop
    dropPlaceholder.style.display = 'none';
    dropAnswer.style.display = 'block';
    dropAnswer.innerHTML = html;
    
    // Ocultar la opción arrastrada
    document.querySelector(`.opcion-drag[data-tipo="${tipo}"]`).style.display = 'none';
    
    // Verificar respuesta automáticamente
    setTimeout(() => verificarRespuesta(), 500);
    
    return false;
}

// ============================================
// VERIFICACIÓN Y FEEDBACK
// ============================================

function verificarRespuesta() {
    const caso = casos[ensayoActual];
    const esCorrecto = respuestaSeleccionada === caso.respuesta;
    
    if (esCorrecto) {
        aciertos++;
        aciertosCount.textContent = aciertos;
        mostrarFeedback(true, caso.explicacion);
    } else {
        mostrarFeedback(false, caso.explicacion);
    }
    
    // Actualizar progreso
    actualizarProgreso();
}

function mostrarFeedback(correcto, explicacion) {
    feedbackCard.className = 'feedback-card ' + (correcto ? 'correcto' : 'incorrecto');
    
    const icono = correcto ? '✓' : '✗';
    const titulo = correcto ? '¡Correcto!' : 'No del todo';
    
    feedbackCard.innerHTML = `
        <h3>${icono} ${titulo}</h3>
        <p>${explicacion}</p>
    `;
    
    feedbackSection.style.display = 'block';
    
    // Scroll suave al feedback
    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function actualizarProgreso() {
    const porcentaje = ((ensayoActual + 1) / casos.length) * 100;
    progresoEjercicio.style.width = porcentaje + '%';
}

// ============================================
// NAVEGACIÓN
// ============================================

function siguienteCaso() {
    ensayoActual++;
    
    if (ensayoActual < casos.length) {
        cargarCaso();
    } else {
        mostrarFinalizacion();
    }
}

function mostrarFinalizacion() {
    // Ocultar secciones de ejercicio
    document.querySelector('.ayuda-section').style.display = 'none';
    document.querySelector('.ejercicio-progreso').style.display = 'none';
    document.querySelector('.caso-card').style.display = 'none';
    document.querySelector('.pregunta-section').style.display = 'none';
    document.querySelector('.drop-zone').style.display = 'none';
    document.querySelector('.opciones-arrastrar').style.display = 'none';
    feedbackSection.style.display = 'none';
    
    // Mostrar finalización
    finalizacionSection.style.display = 'block';
    
    const porcentaje = Math.round((aciertos / casos.length) * 100);
    document.getElementById('statAciertos').textContent = aciertos;
    document.getElementById('statPorcentaje').textContent = porcentaje + '%';
    
    // Guardar progreso en localStorage
    guardarProgreso();
}

function guardarProgreso() {
    const progreso = {
        modulo: 1,
        concepto: 1,
        completado: true,
        aciertos: aciertos,
        total: casos.length,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('rft_modulo1_concepto1', JSON.stringify(progreso));
    
    // Actualizar progreso general del módulo
    actualizarProgresoModulo();
}

function actualizarProgresoModulo() {
    const conceptosCompletados = [];
    for (let i = 1; i <= 4; i++) {
        const progreso = localStorage.getItem(`rft_modulo1_concepto${i}`);
        if (progreso) {
            conceptosCompletados.push(i);
        }
    }
    
    const porcentajeModulo = (conceptosCompletados.length / 4) * 100;
    document.querySelector('.progreso-fill').style.width = porcentajeModulo + '%';
    document.querySelector('.progreso-numeros').textContent = 
        `${conceptosCompletados.length}/4 completados`;
}

// ============================================
// ANIMACIÓN DE PARTÍCULAS
// ============================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 40;
        
        this.init();
        this.animate();
        this.setupEvents();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                color: Math.random() > 0.5 ? '#8B5CF6' : '#FFC107'
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
    }
}

// ============================================
// INICIO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
    new ParticleSystem();
    actualizarProgresoModulo();
});
