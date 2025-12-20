// ============================================
// CASOS DE REFORMULACIÓN - 10 ENSAYOS
// ============================================

const casos = [
    {
        dualista: "La ansiedad interna de Pedro causa que evite situaciones sociales.",
        opciones: [
            {
                texto: "Pedro debe eliminar su ansiedad interna para poder ir a fiestas",
                correcta: false,
                explicacion: "Esta opción sigue siendo dualista. Mantiene la ansiedad como una 'cosa interna' que debe eliminarse."
            },
            {
                texto: "Pedro relaciona contextos sociales con malestar corporal, y la evitación funciona como escape de ese malestar en su historia de aprendizaje",
                correcta: true,
                explicacion: "¡Perfecto! Esta es relacional porque: (1) No ubica la ansiedad 'dentro', (2) Describe relaciones entre contextos, respuestas corporales y conducta, (3) Enfatiza la función (escape) en el contexto histórico."
            },
            {
                texto: "Pedro tiene un mecanismo ansioso que está roto",
                correcta: false,
                explicacion: "Esto es mecanicismo puro. Habla de un 'mecanismo interno roto', reforzando el dualismo mente-cuerpo."
            },
            {
                texto: "La ansiedad de Pedro está programada en su mente",
                correcta: false,
                explicacion: "Sigue siendo dualista. Coloca la ansiedad 'en la mente' como si fuera un programa separado del contexto."
            }
        ]
    },
    {
        dualista: "La depresión interna de Laura la hace aislarse de sus amigos.",
        opciones: [
            {
                texto: "Laura tiene depresión dentro de ella que causa aislamiento",
                correcta: false,
                explicacion: "Mantiene la división dualista: depresión 'interna' que causa conducta 'externa'."
            },
            {
                texto: "En el patrón relacional de Laura, ciertos contextos sociales se han asociado con bajo reforzamiento, y el aislamiento ha sido reforzado negativamente al reducir demandas sociales",
                correcta: true,
                explicacion: "¡Excelente! Describe relaciones funcionales: contextos asociados con bajo reforzamiento, aislamiento reforzado negativamente. No hay 'depresión interna', sino patrones relacionales."
            },
            {
                texto: "Laura debe arreglar sus pensamientos depresivos internos",
                correcta: false,
                explicacion: "Dualista y mecanicista. Asume pensamientos 'internos' que deben 'arreglarse'."
            },
            {
                texto: "Laura tiene un químico desequilibrado que produce tristeza",
                correcta: false,
                explicacion: "Mecanicismo biológico. Busca causa interna (química) que produce conducta."
            }
        ]
    },
    {
        dualista: "Los pensamientos negativos de Carlos causan su bajo rendimiento laboral.",
        opciones: [
            {
                texto: "Carlos debe reemplazar sus pensamientos negativos por positivos",
                correcta: false,
                explicacion: "Dualista. Trata pensamientos como entidades internas separadas que pueden 'reemplazarse'."
            },
            {
                texto: "En la historia de Carlos, ciertos estímulos laborales han adquirido funciones aversivas verbalmente, y su conducta de autocrítica (pensar negativamente) se relaciona con evitación de tareas desafiantes",
                correcta: true,
                explicacion: "¡Correcto! Reformulación relacional: (1) Estímulos con funciones verbales, (2) Pensar como conducta en relación con contexto, (3) Función de evitación. No hay 'causas internas'."
            },
            {
                texto: "Los pensamientos de Carlos están almacenados mal en su memoria",
                correcta: false,
                explicacion: "Mecanicismo cognitivo. Pensamientos como 'datos almacenados' internamente."
            },
            {
                texto: "Carlos tiene creencias irracionales dentro de su mente",
                correcta: false,
                explicacion: "Dualista. Creencias 'dentro de la mente' como estructuras internas."
            }
        ]
    },
    {
        dualista: "La ira interna de Sofía la hace gritar a su pareja.",
        opciones: [
            {
                texto: "Sofía debe controlar su ira interna",
                correcta: false,
                explicacion: "Dualista. La ira como 'cosa interna' que debe controlarse."
            },
            {
                texto: "Sofía tiene un problema de manejo de emociones internas",
                correcta: false,
                explicacion: "Dualista. 'Emociones internas' como entidades separadas del contexto."
            },
            {
                texto: "En el repertorio de Sofía, ciertos comportamientos de su pareja funcionan como antecedentes aversivos, y gritar ha sido reforzado históricamente por cambio en la conducta de la pareja (reforzamiento negativo)",
                correcta: true,
                explicacion: "¡Perfecto! Descripción relacional: (1) Antecedentes con función aversiva, (2) Gritar como operante, (3) Reforzamiento negativo. No menciona 'ira interna', sino patrones funcionales."
            },
            {
                texto: "La ira está programada en el sistema límbico de Sofía",
                correcta: false,
                explicacion: "Mecanicismo neurobiológico. Reduce la conducta a estructuras cerebrales internas."
            }
        ]
    },
    {
        dualista: "La adicción interna de Miguel lo hace consumir alcohol compulsivamente.",
        opciones: [
            {
                texto: "Miguel tiene una enfermedad interna llamada adicción",
                correcta: false,
                explicacion: "Modelo médico dualista. 'Adicción' como entidad interna que causa conducta."
            },
            {
                texto: "En la historia de Miguel, el alcohol ha funcionado como reforzador negativo potente ante estados corporales aversivos, y reglas verbales sobre 'necesitar alcohol' han aumentado la probabilidad de consumo en diversos contextos",
                correcta: true,
                explicacion: "¡Excelente! Análisis relacional: (1) Alcohol como reforzador negativo, (2) Estados corporales en relación con consumo, (3) Reglas verbales como contexto. Todo funcional, nada 'interno'."
            },
            {
                texto: "Miguel debe eliminar sus impulsos internos de beber",
                correcta: false,
                explicacion: "Dualista. 'Impulsos internos' como causas que deben eliminarse."
            },
            {
                texto: "El cerebro de Miguel está dañado por la adicción",
                correcta: false,
                explicacion: "Mecanicismo. Causa interna (daño cerebral) que produce conducta."
            }
        ]
    },
    {
        dualista: "El trauma interno de Ana le causa flashbacks constantes.",
        opciones: [
            {
                texto: "Ana tiene un trauma almacenado en su memoria que debe procesarse",
                correcta: false,
                explicacion: "Dualista y mecanicista. 'Trauma almacenado' como entidad interna."
            },
            {
                texto: "Ciertos estímulos ambientales se han relacionado con funciones aversivas intensas en la historia de Ana, y sus respuestas corporales/verbales (flashbacks) son operantes de evitación mantenidos por reforzamiento negativo",
                correcta: true,
                explicacion: "¡Correcto! Reformulación relacional: (1) Estímulos con funciones derivadas, (2) Flashbacks como operantes (no 'cosas internas'), (3) Mantenidos por función de evitación."
            },
            {
                texto: "Ana debe sanar su dolor emocional interno",
                correcta: false,
                explicacion: "Dualista. 'Dolor interno' que necesita 'sanarse'."
            },
            {
                texto: "El trauma está grabado en el sistema nervioso de Ana",
                correcta: false,
                explicacion: "Mecanicismo neurobiológico. Reduce a estructura interna."
            }
        ]
    },
    {
        dualista: "Los pensamientos obsesivos internos de Roberto lo obligan a realizar rituales.",
        opciones: [
            {
                texto: "Roberto tiene pensamientos defectuosos que causan compulsiones",
                correcta: false,
                explicacion: "Dualista y mecanicista. Pensamientos 'defectuosos internos' que causan conducta."
            },
            {
                texto: "En el repertorio de Roberto, pensar obsesivamente es una conducta reforzada negativamente (reduce ansiedad temporalmente), y los rituales funcionan como escape de funciones aversivas establecidas verbalmente para ciertos estímulos",
                correcta: true,
                explicacion: "¡Excelente! Análisis relacional: (1) Pensar como conducta (no entidad interna), (2) Reforzamiento negativo de rituales, (3) Funciones verbales aversivas. Todo contextual."
            },
            {
                texto: "Roberto debe eliminar sus obsesiones mentales internas",
                correcta: false,
                explicacion: "Dualista. 'Obsesiones mentales' como cosas internas a eliminar."
            },
            {
                texto: "Roberto tiene un circuito cerebral OCD que está hiperactivo",
                correcta: false,
                explicacion: "Mecanicismo neurobiológico. Causa interna (circuito) que produce síntomas."
            }
        ]
    },
    {
        dualista: "La baja autoestima interna de Daniela causa que rechace cumplidos.",
        opciones: [
            {
                texto: "Daniela debe mejorar su autoestima interna",
                correcta: false,
                explicacion: "Dualista. 'Autoestima' como entidad interna que puede 'mejorarse'."
            },
            {
                texto: "Daniela tiene una autoimagen negativa guardada en su mente",
                correcta: false,
                explicacion: "Dualista. 'Autoimagen' como representación interna almacenada."
            },
            {
                texto: "En la historia relacional de Daniela, cumplidos han sido seguidos de demandas aumentadas, estableciendo funciones aversivas para halagos, y rechazarlos ha funcionado como evitación de esas demandas",
                correcta: true,
                explicacion: "¡Perfecto! Análisis relacional: (1) Historia de aprendizaje específica, (2) Funciones derivadas para cumplidos, (3) Rechazar como operante de evitación. No hay 'autoestima interna'."
            },
            {
                texto: "Daniela tiene un concepto de sí misma distorsionado internamente",
                correcta: false,
                explicacion: "Dualista. 'Concepto distorsionado' como estructura mental interna."
            }
        ]
    },
    {
        dualista: "El miedo interno de Javier a volar lo paraliza en aeropuertos.",
        opciones: [
            {
                texto: "Javier debe superar su miedo interno",
                correcta: false,
                explicacion: "Dualista. 'Miedo interno' como entidad a 'superar'."
            },
            {
                texto: "Los aeropuertos y aviones han adquirido funciones aversivas en la historia de Javier, sus respuestas corporales intensas (miedo) son discriminadas verbalmente, y la parálisis funciona como congelamiento ante amenaza percibida",
                correcta: true,
                explicacion: "¡Correcto! Reformulación relacional: (1) Funciones aversivas adquiridas, (2) Respuestas corporales discriminadas verbalmente, (3) Parálisis con función de congelamiento. Todo relacional."
            },
            {
                texto: "Javier tiene un miedo irracional almacenado en su amígdala",
                correcta: false,
                explicacion: "Mecanicismo neurobiológico. Miedo como 'cosa almacenada' en estructura cerebral."
            },
            {
                texto: "El miedo de Javier está dentro de su mente inconsciente",
                correcta: false,
                explicacion: "Dualista psicodinámico. Miedo como entidad en 'mente inconsciente'."
            }
        ]
    },
    {
        dualista: "La culpa interna de Elena la hace sabotear sus relaciones.",
        opciones: [
            {
                texto: "Elena debe perdonarse a sí misma internamente",
                correcta: false,
                explicacion: "Dualista. 'Perdón interno' como proceso mental separado del contexto."
            },
            {
                texto: "En el repertorio verbal de Elena, ciertas relaciones se han asociado con reglas de 'no merezco ser feliz', y sabotear funciona como evitación experiencial de intimidad que contradiga esa regla",
                correcta: true,
                explicacion: "¡Excelente! Análisis relacional: (1) Reglas verbales derivadas, (2) Sabotear como operante, (3) Función de evitación experiencial. No hay 'culpa interna', sino relaciones verbales y funciones."
            },
            {
                texto: "Elena tiene un sentimiento de culpa almacenado en su memoria",
                correcta: false,
                explicacion: "Dualista y mecanicista. 'Sentimiento almacenado' como entidad interna."
            },
            {
                texto: "La culpa está en el sistema de valores internos de Elena",
                correcta: false,
                explicacion: "Dualista. 'Sistema de valores interno' como estructura mental."
            }
        ]
    }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let ensayoActual = 0;
let aciertos = 0;
let intentosPorCaso = [];

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const casoDualistaTexto = document.getElementById('casoDualistaTexto');
const opcionesRespuesta = document.getElementById('opcionesRespuesta');
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
    casoDualistaTexto.textContent = caso.dualista;
    ensayoActualSpan.textContent = ensayoActual + 1;
    
    // Resetear estado
    feedbackSection.style.display = 'none';
    opcionesRespuesta.innerHTML = '';
    intentosPorCaso[ensayoActual] = 0;
    
    // Crear opciones
    caso.opciones.forEach((opcion, index) => {
        const opcionBtn = document.createElement('button');
        opcionBtn.className = 'opcion-respuesta';
        opcionBtn.innerHTML = `
            <div class="opcion-letra">${String.fromCharCode(65 + index)}</div>
            <div class="opcion-texto">${opcion.texto}</div>
        `;
        opcionBtn.addEventListener('click', () => verificarRespuesta(index));
        opcionesRespuesta.appendChild(opcionBtn);
    });
}

// ============================================
// VERIFICACIÓN Y FEEDBACK
// ============================================

function verificarRespuesta(indiceSeleccionado) {
    const caso = casos[ensayoActual];
    const opcionSeleccionada = caso.opciones[indiceSeleccionado];
    
    intentosPorCaso[ensayoActual]++;
    
    // Marcar la opción seleccionada
    const opciones = document.querySelectorAll('.opcion-respuesta');
    opciones.forEach((opcion, index) => {
        opcion.classList.remove('seleccionada', 'correcta', 'incorrecta');
        opcion.style.pointerEvents = 'none'; // Deshabilitar clics
        
        if (caso.opciones[index].correcta) {
            opcion.classList.add('correcta');
        }
    });
    
    opciones[indiceSeleccionado].classList.add('seleccionada');
    
    if (opcionSeleccionada.correcta) {
        // Solo cuenta como acierto si es el primer intento
        if (intentosPorCaso[ensayoActual] === 1) {
            aciertos++;
            aciertosCount.textContent = aciertos;
        }
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
    const titulo = correcto ? '¡Correcto!' : 'Intenta nuevamente';
    
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
    document.querySelector('.instrucciones-card').style.display = 'none';
    document.querySelector('.ejercicio-progreso').style.display = 'none';
    document.querySelector('.caso-dualista-card').style.display = 'none';
    document.querySelector('.pregunta-section').style.display = 'none';
    opcionesRespuesta.style.display = 'none';
    feedbackSection.style.display = 'none';
    
    // Mostrar finalización
    finalizacionSection.style.display = 'block';
    
    const porcentaje = Math.round((aciertos / casos.length) * 100);
    document.getElementById('statAciertos').textContent = aciertos;
    document.getElementById('statPorcentaje').textContent = porcentaje + '%';
    
    // Mostrar nivel de dominio
    const dominioNivel = document.getElementById('dominioNivel');
    let mensaje = '';
    let emoji = '';
    
    if (porcentaje >= 90) {
        emoji = '🏆';
        mensaje = '<strong>Dominio Excelente</strong><br>Has comprendido profundamente la ontología relacional.';
    } else if (porcentaje >= 70) {
        emoji = '⭐';
        mensaje = '<strong>Buen Dominio</strong><br>Vas por buen camino entendiendo el pensamiento relacional.';
    } else {
        emoji = '📚';
        mensaje = '<strong>Sigue Practicando</strong><br>Revisa la teoría y vuelve a intentarlo para mejorar.';
    }
    
    dominioNivel.innerHTML = `
        <div class="dominio-mensaje">
            <span class="dominio-emoji">${emoji}</span>
            <p>${mensaje}</p>
        </div>
    `;
    
    // Guardar progreso
    guardarProgreso();
}

function guardarProgreso() {
    const progreso = {
        modulo: 1,
        concepto: 2,
        completado: true,
        aciertos: aciertos,
        total: casos.length,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('rft_modulo1_concepto2', JSON.stringify(progreso));
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
// ANIMACIÓN DE PARTÍCULAS (REUTILIZADA)
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
