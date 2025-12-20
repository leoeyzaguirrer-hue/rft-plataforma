// ============================================
// CASOS DE ANÁLISIS FUNCIONAL - 10 EJERCICIOS
// ============================================

const casos = [
    {
        tipo: "identificar_vd",
        caso: "María evita ir a fiestas. Cuando recibe invitaciones, siente ansiedad intensa y cancela. Como resultado, se queda en casa sintiéndose sola pero aliviada temporalmente.",
        pregunta: "¿Cuál es la VARIABLE DEPENDIENTE (la conducta que queremos predecir/cambiar)?",
        opciones: [
            { texto: "La ansiedad interna de María", correcta: false, explicacion: "La ansiedad es una respuesta privada, pero no es la conducta objetivo. En CF, trabajamos con lo que María HACE, no con eliminar sensaciones." },
            { texto: "Evitar ir a fiestas (cancelar invitaciones)", correcta: true, explicacion: "¡Correcto! EVITAR es la variable dependiente: la conducta observable que queremos predecir y potencialmente cambiar. Es lo que María hace en respuesta al contexto." },
            { texto: "Las invitaciones a fiestas", correcta: false, explicacion: "Las invitaciones son antecedentes (parte del contexto), no la conducta. Son variables independientes que ocasionan la respuesta." },
            { texto: "Sentirse sola", correcta: false, explicacion: "Sentirse sola es una consecuencia a largo plazo, no la conducta objetivo. Es parte del contexto de consecuencias." }
        ]
    },
    {
        tipo: "identificar_vi",
        caso: "Carlos rumia constantemente sobre errores del pasado. Esto ocurre especialmente cuando está solo en casa por la noche. Rumiar hace que se sienta peor, pero también evita pensar en sus problemas actuales.",
        pregunta: "¿Cuál es una VARIABLE INDEPENDIENTE clave (contexto que podríamos modificar)?",
        opciones: [
            { texto: "Rumiar sobre errores", correcta: false, explicacion: "Rumiar es la variable dependiente (la conducta), no una variable independiente. Es lo que queremos predecir/cambiar." },
            { texto: "Estar solo en casa por la noche (antecedente)", correcta: true, explicacion: "¡Exacto! Este es un antecedente contextual que aumenta la probabilidad de rumiación. Podríamos modificarlo (actividades nocturnas, compañía) para influir en la conducta." },
            { texto: "Los errores del pasado en sí mismos", correcta: false, explicacion: "Los errores pasados no son modificables (ya ocurrieron). Las variables independientes deben ser manipulables en el presente." },
            { texto: "El cerebro de Carlos", correcta: false, explicacion: "Esto es mecanicismo: buscar causas internas. En CF, trabajamos con contextos observables y manipulables, no estructuras cerebrales." }
        ]
    },
    {
        tipo: "identificar_consecuencia",
        caso: "Ana realiza rituales de limpieza durante horas cada día. Inmediatamente después de limpiar, su ansiedad disminuye. Sin embargo, a largo plazo, pierde tiempo con su familia y se siente exhausta.",
        pregunta: "¿Cuál es la consecuencia que MANTIENE la conducta de rituales?",
        opciones: [
            { texto: "Sentirse exhausta (consecuencia a largo plazo)", correcta: false, explicacion: "El agotamiento es una consecuencia negativa a largo plazo, pero no mantiene la conducta. Las conductas se mantienen por consecuencias inmediatas." },
            { texto: "Reducción inmediata de ansiedad (reforzamiento negativo)", correcta: true, explicacion: "¡Correcto! La disminución inmediata de ansiedad es un reforzador negativo potente que mantiene los rituales, aunque tenga costos a largo plazo." },
            { texto: "Perder tiempo con la familia", correcta: false, explicacion: "Esto es un costo, no un reforzador. Las conductas no se mantienen por sus consecuencias negativas a largo plazo." },
            { texto: "El TOC interno de Ana", correcta: false, explicacion: "Mecanicismo. No hay un 'TOC interno' que mantenga conductas. Las conductas se mantienen por sus contingencias (relaciones con el contexto)." }
        ]
    },
    {
        tipo: "intervencion_cf",
        caso: "Roberto consume alcohol cada vez que se siente ansioso. Beber reduce su ansiedad temporalmente, lo que refuerza el consumo. A largo plazo, tiene problemas de salud y laborales.",
        pregunta: "Desde CF, ¿cuál sería la MEJOR intervención?",
        opciones: [
            { texto: "Eliminar la ansiedad interna de Roberto", correcta: false, explicacion: "Esto asume que la ansiedad es una 'causa interna' que debe eliminarse. En CF, la ansiedad es parte del contexto, no algo a eliminar." },
            { texto: "Modificar el contexto: entrenar conductas alternativas valoradas cuando aparece ansiedad", correcta: true, explicacion: "¡Perfecto! Modificamos el contexto: nuevas conductas (alternativas al alcohol) conectadas con valores, cambiando la relación funcional con la ansiedad." },
            { texto: "Convencer a Roberto de que beber está mal", correcta: false, explicacion: "Esto es moralizar, no análisis funcional. Roberto probablemente ya 'sabe' que es problemático. Necesitamos cambiar contingencias, no dar sermones." },
            { texto: "Prohibirle el acceso al alcohol", correcta: false, explicacion: "Control externo raramente funciona a largo plazo. Necesitamos que Roberto desarrolle un repertorio alternativo valioso, no solo eliminar una opción." }
        ]
    },
    {
        tipo: "identificar_vd",
        caso: "Laura tiene pensamientos intrusivos sobre hacer daño a otros. Cuando aparecen, los reprime intensamente, lo que aumenta su frecuencia. Eventualmente desarrolla rituales mentales para 'neutralizar' los pensamientos.",
        pregunta: "¿Cuál es la variable dependiente MÁS RELEVANTE para intervenir?",
        opciones: [
            { texto: "Los pensamientos intrusivos en sí", correcta: false, explicacion: "Los pensamientos intrusivos son antecedentes, no la conducta objetivo. En CF, no eliminamos pensamientos, sino que cambiamos la relación con ellos." },
            { texto: "Reprimir/neutralizar pensamientos (rituales mentales)", correcta: true, explicacion: "¡Correcto! La conducta de control/evitación (reprimir, neutralizar) es lo que mantiene el problema. Eso es lo que trabajaríamos funcionalmente." },
            { texto: "El trastorno obsesivo de Laura", correcta: false, explicacion: "Formismo/mecanicismo. No hay un 'trastorno' como entidad separada. Hay patrones conductuales mantenidos por contingencias." },
            { texto: "El miedo a hacer daño", correcta: false, explicacion: "El miedo es parte de las respuestas emocionales (consecuencias de pensar), no la conducta objetivo principal." }
        ]
    },
    {
        tipo: "identificar_vi",
        caso: "Jorge evita hablar con su jefe sobre problemas laborales. Antes de reuniones, anticipa críticas y siente ansiedad. Evitar conversaciones difíciles le da alivio inmediato pero acumula problemas laborales.",
        pregunta: "¿Qué variable independiente podríamos modificar terapéuticamente?",
        opciones: [
            { texto: "La personalidad del jefe", correcta: false, explicacion: "No podemos modificar a otras personas (fuera de nuestro control). Las variables independientes en terapia deben ser manipulables por el cliente." },
            { texto: "Las reglas verbales de Jorge sobre 'deber evitar críticas'", correcta: true, explicacion: "¡Excelente! Las reglas verbales (ej: 'las críticas son intolerables') son contextos verbales modificables que influyen en la conducta de evitación." },
            { texto: "Los problemas laborales acumulados", correcta: false, explicacion: "Los problemas acumulados son consecuencias de la evitación, no variables independientes manipulables prospectivamente." },
            { texto: "La ansiedad anticipatoria de Jorge", correcta: false, explicacion: "La ansiedad es una respuesta (variable dependiente secundaria), no un contexto manipulable. Trabajamos con lo que ocasiona y mantiene esta respuesta." }
        ]
    },
    {
        tipo: "intervencion_cf",
        caso: "Sofía se autocrítica constantemente ('soy un fracaso'). Esta autocrítica aumenta cuando intenta nuevas actividades. Como resultado, evita desafíos y se queda en su zona de confort, perdiendo oportunidades.",
        pregunta: "¿Cuál intervención es más consistente con CF?",
        opciones: [
            { texto: "Debatir si es 'verdad' que es un fracaso", correcta: false, explicacion: "Criterio de correspondencia. Debatir el contenido del pensamiento refuerza fusión cognitiva. No cambia la función de la autocrítica." },
            { texto: "Cambiar la función de la autocrítica: notar el pensamiento Y actuar según valores", correcta: true, explicacion: "¡Perfecto! Defusión + acción comprometida. No eliminamos autocrítica, sino cambiamos su función: de barrera a mero evento privado observable." },
            { texto: "Eliminar los pensamientos negativos de Sofía", correcta: false, explicacion: "Imposible y contraproducente. Intentar eliminar pensamientos suele aumentarlos (rebote). CF trabaja con la relación, no la eliminación." },
            { texto: "Enseñarle afirmaciones positivas para reemplazar las negativas", correcta: false, explicacion: "Esto asume que el CONTENIDO es el problema. En CF, el problema es la FUSIÓN con el contenido, no el contenido mismo." }
        ]
    },
    {
        tipo: "identificar_consecuencia",
        caso: "Miguel miente frecuentemente para evitar conflictos. Cuando dice la verdad y hay desacuerdo, se siente muy ansioso. Mentir hace que evite esa ansiedad temporalmente, aunque daña sus relaciones a largo plazo.",
        pregunta: "¿Qué consecuencia mantiene la conducta de mentir?",
        opciones: [
            { texto: "Daño en las relaciones (largo plazo)", correcta: false, explicacion: "El daño relacional es un costo a largo plazo, no lo que mantiene la conducta. Las conductas se mantienen por consecuencias inmediatas." },
            { texto: "Evitación de ansiedad asociada con conflictos (reforzamiento negativo)", correcta: true, explicacion: "¡Correcto! Evitar la ansiedad inmediata es un reforzador negativo potente, aunque mentir tenga costos relacionales futuros." },
            { texto: "Los conflictos en sí mismos", correcta: false, explicacion: "Los conflictos son antecedentes (ocasionan la respuesta), no consecuencias que mantengan la conducta de mentir." },
            { texto: "Un defecto de carácter de Miguel", correcta: false, explicacion: "Moralización, no análisis funcional. En CF, no hablamos de 'defectos', sino de repertorios conductuales mantenidos por contingencias." }
        ]
    },
    {
        tipo: "intervencion_cf",
        caso: "Elena experimenta pánico en supermercados. Evita ir de compras y pide a familiares que lo hagan. Esta evitación reduce su pánico inmediatamente pero aumenta su dependencia y limita su autonomía.",
        pregunta: "Desde predecir e influir, ¿cuál es la mejor intervención?",
        opciones: [
            { texto: "Enseñarle técnicas de relajación para eliminar el pánico", correcta: false, explicacion: "Esto refuerza la agenda de control: 'debo eliminar pánico antes de actuar'. En CF, el pánico puede estar presente durante acción valiosa." },
            { texto: "Exposición gradual al supermercado + defusión de reglas sobre pánico", correcta: true, explicacion: "¡Perfecto! Modificamos contexto antecedente (exposición) + verbal (reglas sobre necesitar ausencia de pánico). Cambiamos contingencias, no eliminamos pánico." },
            { texto: "Evitar supermercados permanentemente", correcta: false, explicacion: "Esto mantiene el problema. En CF buscamos expandir repertorio conductual valioso, no restringirlo más." },
            { texto: "Encontrar la causa interna del pánico", correcta: false, explicacion: "Mecanicismo. Buscar 'causas internas' no ayuda a predecir/influir. Trabajamos con relaciones funcionales observables." }
        ]
    },
    {
        tipo: "identificar_vd",
        caso: "David rumiasobre su futuro constantemente. Piensa en catástrofes posibles durante horas. Esto le impide dormir y concentrarse en el trabajo. Rumiar le da sensación ilusoria de control.",
        pregunta: "¿Cuál es la variable dependiente principal?",
        opciones: [
            { texto: "Los pensamientos catastróficos", correcta: false, explicacion: "Los pensamientos son eventos privados, pero RUMIAR (engancharse repetitivamente) es la conducta. En CF diferenciamos tener pensamientos de responder a ellos." },
            { texto: "Rumiar (engancharse repetitivamente con pensamientos de futuro)", correcta: true, explicacion: "¡Correcto! Rumiar es la operante: David HACE algo con sus pensamientos (engancharse, analizar, buscar soluciones mentales). Eso es la variable dependiente." },
            { texto: "El trastorno de ansiedad de David", correcta: false, explicacion: "Formismo. Etiquetar no es analizar funcionalmente. Necesitamos identificar la conducta específica (rumiar) y sus contingencias." },
            { texto: "No poder dormir", correcta: false, explicacion: "Insomnio es una consecuencia de rumiar, no la conducta objetivo principal. Trabajamos con rumiar, y el sueño mejorará indirectamente." }
        ]
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ensayoActual = 0;
let aciertos = 0;

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const casoTexto = document.getElementById('casoTexto');
const preguntaAF = document.getElementById('preguntaAF');
const opcionesAF = document.getElementById('opcionesAF');
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
    btnSiguiente.addEventListener('click', siguienteCaso);
}

function cargarCaso() {
    const caso = casos[ensayoActual];
    casoTexto.textContent = caso.caso;
    preguntaAF.innerHTML = `<p class="pregunta-texto-af">${caso.pregunta}</p>`;
    ensayoActualSpan.textContent = ensayoActual + 1;
    
    // Resetear estado
    feedbackSection.style.display = 'none';
    opcionesAF.innerHTML = '';
    
    // Crear opciones
    opcionesAF.className = 'opciones-respuesta';
    caso.opciones.forEach((opcion, index) => {
        const opcionBtn = document.createElement('button');
        opcionBtn.className = 'opcion-respuesta';
        opcionBtn.innerHTML = `
            <div class="opcion-letra">${String.fromCharCode(65 + index)}</div>
            <div class="opcion-texto">${opcion.texto}</div>
        `;
        opcionBtn.addEventListener('click', () => verificarRespuesta(index));
        opcionesAF.appendChild(opcionBtn);
    });
}

// ============================================
// VERIFICACIÓN Y FEEDBACK
// ============================================

function verificarRespuesta(indiceSeleccionado) {
    const caso = casos[ensayoActual];
    const opcionSeleccionada = caso.opciones[indiceSeleccionado];
    
    // Marcar la opción seleccionada
    const opciones = document.querySelectorAll('.opcion-respuesta');
    opciones.forEach((opcion, index) => {
        opcion.classList.remove('seleccionada', 'correcta', 'incorrecta');
        opcion.style.pointerEvents = 'none';
        
        if (caso.opciones[index].correcta) {
            opcion.classList.add('correcta');
        }
    });
    
    opciones[indiceSeleccionado].classList.add('seleccionada');
    
    if (opcionSeleccionada.correcta) {
        aciertos++;
        aciertosCount.textContent = aciertos;
        mostrarFeedback(true, opcionSeleccionada.explicacion);
    } else {
        opciones[indiceSeleccionado].classList.add('incorrecta');
        mostrarFeedback(false, opcionSeleccionada.explicacion);
    }
    
    actualizarProgreso();
}

function mostrarFeedback(correcto, explicacion) {
    feedbackCard.className = 'feedback-card ' + (correcto ? 'correcto' : 'incorrecto');
    
    const icono = correcto ? '✓' : '💡';
    const titulo = correcto ? '¡Correcto!' : 'No exactamente';
    
    feedbackCard.innerHTML = `
        <h3>${icono} ${titulo}</h3>
        <p>${explicacion}</p>
    `;
    
    feedbackSection.style.display = 'block';
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
    document.querySelector('.instrucciones-card').style.display = 'none';
    document.querySelector('.ejercicio-progreso').style.display = 'none';
    document.querySelector('.caso-af-card').style.display = 'none';
    preguntaAF.style.display = 'none';
    opcionesAF.style.display = 'none';
    feedbackSection.style.display = 'none';
    
    finalizacionSection.style.display = 'block';
    
    const porcentaje = Math.round((aciertos / casos.length) * 100);
    document.getElementById('statAciertos').textContent = aciertos;
    document.getElementById('statPorcentaje').textContent = porcentaje + '%';
    
    const dominioNivel = document.getElementById('dominioNivel');
    let mensaje = '';
    let emoji = '';
    
    if (porcentaje >= 90) {
        emoji = '🏆';
        mensaje = '<strong>Dominio Excelente</strong><br>Comprendes profundamente el análisis funcional.';
    } else if (porcentaje >= 70) {
        emoji = '⭐';
        mensaje = '<strong>Buen Dominio</strong><br>Vas por buen camino en pensamiento funcional.';
    } else {
        emoji = '📚';
        mensaje = '<strong>Sigue Practicando</strong><br>Revisa la diferencia entre variables dependientes e independientes.';
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
        concepto: 4,
        completado: true,
        aciertos: aciertos,
        total: casos.length,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('rft_modulo1_concepto4', JSON.stringify(progreso));
    actualizarProgresoModulo();
}

function actualizarProgresoModulo() {
    const conceptosCompletados = [];
    for (let i = 1; i <= 5; i++) {
        const progreso = localStorage.getItem(`rft_modulo1_concepto${i}`);
        if (progreso) {
            conceptosCompletados.push(i);
        }
    }
    
    const porcentajeModulo = (conceptosCompletados.length / 5) * 100;
    document.querySelector('.progreso-fill').style.width = porcentajeModulo + '%';
    document.querySelector('.progreso-numeros').textContent = 
        `${conceptosCompletados.length}/5 completados`;
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
