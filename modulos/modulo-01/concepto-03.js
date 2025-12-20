// ============================================
// CASOS DE INTERVENCIONES - 8 EVALUACIONES
// ============================================

const intervenciones = [
    {
        clienteDice: "Tengo pensamientos obsesivos sobre contaminarme. Creo que si toco una manija de puerta, me voy a enfermar gravemente.",
        terapeutaResponde: "Entiendo. Vamos a examinar la evidencia: ¿cuántas veces has tocado manijas y realmente te has enfermado? Probablemente muy pocas. Estadísticamente, tu creencia no es racional.",
        criterioEsperado: "correspondencia", // 0-40 en el slider
        explicacionCorrespondencia: "Esta intervención usa criterio de CORRESPONDENCIA. El terapeuta busca 'evidencia objetiva' para demostrar que la creencia es falsa. Aunque lógico, esto puede reforzar la fusión cognitiva: el debate sobre 'qué es verdad' raramente reduce el TOC.",
        explicacionPragmatica: "Desde criterio PRAGMÁTICO preguntaríamos: '¿Debatir evidencia ayuda al cliente a vivir según valores?'. Usualmente no. Sería más útil trabajar la relación funcional con los pensamientos: '¿Qué pasa cuando intentas controlar estos pensamientos? ¿Te acerca o aleja de lo que valoras?'."
    },
    {
        clienteDice: "Me siento ansioso todo el tiempo. No puedo dejar de preocuparme por el futuro.",
        terapeutaResponde: "Noto que la preocupación está muy presente. Cuéntame, cuando te preocupas constantemente, ¿qué cosas importantes en tu vida quedan sin hacer? ¿Qué te gustaría estar haciendo si no estuvieras atrapado en preocupación?",
        criterioEsperado: "pragmatico", // 60-100 en el slider
        explicacionPragmatica: "Esta intervención usa criterio PRAGMÁTICO. El terapeuta no debate si las preocupaciones son 'racionales' o 'verdaderas', sino que explora la FUNCIÓN de preocuparse: ¿qué costo tiene en la vida del cliente? ¿Qué valores están siendo bloqueados? Enfoque funcional y orientado a valores.",
        explicacionCorrespondencia: "Un enfoque de CORRESPONDENCIA habría buscado evidencia de que las preocupaciones son 'infundadas' o 'irracionales', debatiendo la probabilidad real de los escenarios temidos. Pero esto raramente ayuda con ansiedad generalizada."
    },
    {
        clienteDice: "Creo que soy un fracaso. No sirvo para nada.",
        terapeutaResponde: "Eso no es cierto. Mira, terminaste la universidad, tienes un trabajo, pagas tus cuentas. Objetivamente, NO eres un fracaso. Tienes evidencia concreta de tus logros.",
        criterioEsperado: "correspondencia",
        explicacionCorrespondencia: "Criterio de CORRESPONDENCIA. El terapeuta intenta 'corregir' el pensamiento demostrando que es objetivamente falso. Problema: el cliente puede contraargumentar cada logro ('sí, pero...'), reforzando el debate interno. No cambia la función del pensamiento.",
        explicacionPragmatica: "Desde PRAGMÁTICO: '¿Cuándo aparece ese pensamiento de fracaso? ¿Qué haces cuando aparece? ¿Te ayuda a moverte hacia lo que valoras o te paraliza?'. No debatimos si es 'verdad', sino qué función cumple y cómo relacionarse diferente con él."
    },
    {
        clienteDice: "Consumo alcohol para calmar mi ansiedad. Sé que está mal, pero no puedo parar.",
        terapeutaResponde: "Vamos a analizar las consecuencias de beber. A corto plazo sientes alivio, pero a largo plazo: problemas de salud, conflictos familiares, gastos. ¿Vale la pena el alivio temporal considerando estos costos?",
        criterioEsperado: "pragmatico",
        explicacionPragmatica: "PRAGMÁTICO. El terapeuta hace un análisis funcional: consecuencias a corto vs largo plazo. No juzga moralmente ('está mal'), sino que explora utilidad: ¿funciona esta estrategia para tu bienestar general? Enfoque en función y valores.",
        explicacionCorrespondencia: "CORRESPONDENCIA buscaría 'convencer' al cliente de que 'está equivocado' sobre la utilidad del alcohol, apelando a verdades médicas. Menos efectivo porque el cliente YA sabe intelectualmente que es problemático."
    },
    {
        clienteDice: "Tengo miedo de hablar en público. Creo que todos me van a juzgar negativamente.",
        terapeutaResponde: "¿Realmente TODOS te van a juzgar? Eso es una distorsión cognitiva llamada 'sobregeneralización'. La mayoría de la gente está preocupada por sí misma, no por juzgarte.",
        criterioEsperado: "correspondencia",
        explicacionCorrespondencia: "CORRESPONDENCIA. Etiqueta el pensamiento como 'distorsión' e intenta corregirlo con lógica. Aunque educativo, puede llevar al cliente a defender su miedo ('pero sí me han juzgado antes') o crear nueva regla ('debo pensar racionalmente').",
        explicacionPragmatica: "PRAGMÁTICO preguntaría: '¿Qué pasaría si llevaras ese miedo contigo y hablaras de todos modos? ¿Qué oportunidades te estás perdiendo al evitar? ¿Qué es importante para ti sobre expresarte?'. Función sobre contenido."
    },
    {
        clienteDice: "Después de la muerte de mi padre, siento que no tiene sentido seguir adelante.",
        terapeutaResponde: "El duelo es muy doloroso. ¿Qué cosas valoraba tu padre en ti? ¿Qué te gustaría honrar de su memoria con tus acciones? Aunque el dolor está aquí, ¿hay algo que siga importándote?",
        criterioEsperado: "pragmatico",
        explicacionPragmatica: "PRAGMÁTICO. No intenta 'corregir' el sentimiento de falta de sentido ni convencer al cliente de que 'sí tiene sentido vivir'. En cambio, conecta con valores (lo que el padre valoraba, lo que el cliente quiere honrar). Funcional y respetuoso del dolor.",
        explicacionCorrespondencia: "CORRESPONDENCIA hubiera intentado 'demostrar' que la vida SÍ tiene sentido objetivo, listando razones para vivir. Esto suena invalidante cuando alguien está en duelo profundo."
    },
    {
        clienteDice: "No puedo perdonarme por lo que hice. Soy una mala persona.",
        terapeutaResponde: "Cometiste un error, pero eso no te define completamente. Todos cometemos errores. Objetivamente, una acción no determina tu valor como persona.",
        criterioEsperado: "correspondencia",
        explicacionCorrespondencia: "CORRESPONDENCIA. Intenta convencer al cliente de una 'verdad objetiva' ('no eres malo'). Problema: la autocrítica no se resuelve con lógica. El cliente puede no 'creerse' el contraargumento.",
        explicacionPragmatica: "PRAGMÁTICO: '¿Qué función cumple castigarte constantemente? ¿Te acerca a reparar el daño o te paraliza? Si tu mejor amigo hubiera hecho lo mismo, ¿cómo le hablarías? ¿Esa forma de tratarte te ayuda a ser la persona que quieres ser?'. Función y valores."
    },
    {
        clienteDice: "Siempre fracaso en las relaciones. Nunca voy a encontrar pareja.",
        terapeutaResponde: "Cuando dices 'siempre' y 'nunca', estás cayendo en pensamiento absolutista. Has tenido relaciones antes, ¿verdad? Entonces no SIEMPRE fracasas. Y predecir el futuro es imposible, así que no puedes saber que NUNCA encontrarás pareja.",
        criterioEsperado: "correspondencia",
        explicacionCorrespondencia: "CORRESPONDENCIA. Señala 'errores lógicos' en el lenguaje del cliente. Aunque técnicamente correcto, esto raramente cambia el sentimiento subyacente. El cliente puede sentirse invalidado ('sí, pero en realidad SÍ siempre fracaso').",
        explicacionPragmatica: "PRAGMÁTICO: '¿Qué pasa cuando ese pensamiento aparece? ¿Cómo afecta la forma en que te relacionas con posibles parejas? ¿Qué querrías que fuera diferente en tu próxima relación? ¿Qué valores quieres vivir en intimidad?'. Función y dirección valorada."
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ensayoActual = 0;
let aciertos = 0;
let evaluaciones = [];

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const clienteDice = document.getElementById('clienteDice');
const terapeutaResponde = document.getElementById('terapeutaResponde');
const evaluacionSlider = document.getElementById('evaluacionSlider');
const sliderValue = document.getElementById('sliderValue');
const valorActual = document.getElementById('valorActual');
const valorTipo = document.getElementById('valorTipo');
const btnEvaluar = document.getElementById('btnEvaluar');
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
    cargarIntervencion();
    configurarSlider();
    btnEvaluar.addEventListener('click', evaluarRespuesta);
    btnSiguiente.addEventListener('click', siguienteIntervencion);
}

function cargarIntervencion() {
    const intervencion = intervenciones[ensayoActual];
    clienteDice.textContent = intervencion.clienteDice;
    terapeutaResponde.textContent = intervencion.terapeutaResponde;
    ensayoActualSpan.textContent = ensayoActual + 1;
    
    // Resetear estado
    evaluacionSlider.value = 50;
    actualizarSliderDisplay(50);
    feedbackSection.style.display = 'none';
    btnEvaluar.disabled = false;
    evaluacionSlider.disabled = false;
}

function configurarSlider() {
    evaluacionSlider.addEventListener('input', (e) => {
        actualizarSliderDisplay(e.target.value);
    });
}

function actualizarSliderDisplay(valor) {
    valorActual.textContent = valor;
    
    let tipo, color;
    if (valor < 40) {
        tipo = 'Correspondencia';
        color = '#F44336';
    } else if (valor > 60) {
        tipo = 'Pragmático';
        color = '#4CAF50';
    } else {
        tipo = 'Neutral';
        color = '#9E9E9E';
    }
    
    valorTipo.textContent = tipo;
    sliderValue.style.color = color;
    
    // Actualizar color del slider
    const porcentaje = valor;
    evaluacionSlider.style.background = `linear-gradient(to right, #F44336 0%, #FFC107 50%, #4CAF50 100%)`;
}

// ============================================
// EVALUACIÓN
// ============================================

function evaluarRespuesta() {
    const intervencion = intervenciones[ensayoActual];
    const valorSlider = parseInt(evaluacionSlider.value);
    
    let esCorrecto = false;
    let explicacion = '';
    
    if (intervencion.criterioEsperado === 'correspondencia') {
        // Esperamos 0-40
        esCorrecto = valorSlider <= 40;
        explicacion = esCorrecto ? intervencion.explicacionCorrespondencia : intervencion.explicacionPragmatica;
    } else {
        // Esperamos 60-100 (pragmático)
        esCorrecto = valorSlider >= 60;
        explicacion = esCorrecto ? intervencion.explicacionPragmatica : intervencion.explicacionCorrespondencia;
    }
    
    if (esCorrecto) {
        aciertos++;
        aciertosCount.textContent = aciertos;
    }
    
    evaluaciones.push({
        caso: ensayoActual + 1,
        correcto: esCorrecto,
        valorSlider: valorSlider
    });
    
    mostrarFeedback(esCorrecto, explicacion);
    
    // Deshabilitar slider y botón
    evaluacionSlider.disabled = true;
    btnEvaluar.disabled = true;
    
    actualizarProgreso();
}

function mostrarFeedback(correcto, explicacion) {
    feedbackCard.className = 'feedback-card ' + (correcto ? 'correcto' : 'incorrecto');
    
    const icono = correcto ? '✓' : '💡';
    const titulo = correcto ? '¡Evaluación correcta!' : 'No exactamente';
    
    feedbackCard.innerHTML = `
        <h3>${icono} ${titulo}</h3>
        <p>${explicacion}</p>
    `;
    
    feedbackSection.style.display = 'block';
    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function actualizarProgreso() {
    const porcentaje = ((ensayoActual + 1) / intervenciones.length) * 100;
    progresoEjercicio.style.width = porcentaje + '%';
}

// ============================================
// NAVEGACIÓN
// ============================================

function siguienteIntervencion() {
    ensayoActual++;
    
    if (ensayoActual < intervenciones.length) {
        cargarIntervencion();
    } else {
        mostrarFinalizacion();
    }
}

function mostrarFinalizacion() {
    // Ocultar secciones de ejercicio
    document.querySelector('.instrucciones-card').style.display = 'none';
    document.querySelector('.ejercicio-progreso').style.display = 'none';
    document.querySelector('.intervencion-card').style.display = 'none';
    document.querySelector('.evaluacion-section').style.display = 'none';
    feedbackSection.style.display = 'none';
    
    // Mostrar finalización
    finalizacionSection.style.display = 'block';
    
    const porcentaje = Math.round((aciertos / intervenciones.length) * 100);
    document.getElementById('statAciertos').textContent = aciertos;
    document.getElementById('statPorcentaje').textContent = porcentaje + '%';
    
    // Mostrar nivel de dominio
    const dominioNivel = document.getElementById('dominioNivel');
    let mensaje = '';
    let emoji = '';
    
    if (porcentaje >= 87) {
        emoji = '🏆';
        mensaje = '<strong>Dominio Excelente</strong><br>Comprendes profundamente el criterio pragmático del CF.';
    } else if (porcentaje >= 62) {
        emoji = '⭐';
        mensaje = '<strong>Buen Dominio</strong><br>Vas por buen camino diferenciando criterios de verdad.';
    } else {
        emoji = '📚';
        mensaje = '<strong>Sigue Practicando</strong><br>Revisa la diferencia entre correspondencia y pragmatismo.';
    }
    
    dominioNivel.innerHTML = `
        <div class="dominio-mensaje">
            <span class="dominio-emoji">${emoji}</span>
            <p>${mensaje}</p>
        </div>
    `;
    
    guardarProgreso();
}

function guardarProgreso() {
    const progreso = {
        modulo: 1,
        concepto: 3,
        completado: true,
        aciertos: aciertos,
        total: intervenciones.length,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('rft_modulo1_concepto3', JSON.stringify(progreso));
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
