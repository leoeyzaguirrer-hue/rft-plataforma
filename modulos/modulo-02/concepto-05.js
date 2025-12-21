// ==========================================
// CONCEPTO 5 - DE EQUIVALENCIA A RFT
// El Salto Conceptual - Puente hacia RFT
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

// ========== ANIMACIÓN 1: TABLA COMPARATIVA EXPANDIBLE ==========
function expandirFila(numero) {
    const detalle = document.getElementById(`detalle${numero}`);
    const todasFilas = document.querySelectorAll('.fila-expandida');
    
    // Cerrar todas las demás
    todasFilas.forEach((fila, idx) => {
        if (idx + 1 !== numero) {
            fila.classList.remove('expandida');
        }
    });
    
    // Toggle la seleccionada
    detalle.classList.toggle('expandida');
}

// ========== ANIMACIÓN 2: MAPA DE MARCOS RELACIONALES ==========
const marcosInfo = {
    coordinacion: {
        icono: '✅',
        titulo: 'Marco de COORDINACIÓN',
        descripcion: 'Este es el marco que estudiamos como "equivalencia". Los estímulos son mutuamente sustituibles e intercambiables. Propiedades: Reflexividad, Simetría, Transitividad. Ejemplos: "Perro" = 🐕 = "Dog".'
    },
    oposicion: {
        icono: '↔️',
        titulo: 'Marco de OPOSICIÓN',
        descripcion: 'Los estímulos están relacionados como contrarios o antónimos. Si A es opuesto a B, entonces B es opuesto a A. Pero la transitividad funciona diferente: si A opuesto B, y B opuesto C, entonces A y C son similares (NO opuestos). Ejemplos: Grande↔️Pequeño, Caliente↔️Frío.'
    },
    comparacion: {
        icono: '📊',
        titulo: 'Marco COMPARATIVO',
        descripcion: 'Relaciones de magnitud, cantidad o intensidad. Si A > B y B > C, entonces A > C. La "simetría" es inversión direccional: si A > B entonces B < A. Ejemplos: 10 > 5, Mejor que, Más rápido que.'
    },
    distincion: {
        icono: '≠',
        titulo: 'Marco de DISTINCIÓN',
        descripcion: 'Los estímulos son diferentes o no relacionados. Más débil que oposición (que implica contraste activo). Simplemente señala que X ≠ Y. Útil para categorización: "Un perro NO es un gato".'
    },
    jerarquia: {
        icono: '🌳',
        titulo: 'Marco JERÁRQUICO',
        descripcion: 'Relaciones parte-todo, miembro-categoría, inclusión taxonómica. "Dedo" es parte de "Mano", "Mano" es parte de "Brazo". La transitividad preserva la jerarquía: Dedo ⊂ Mano ⊂ Brazo → Dedo ⊂ Brazo. NO es simétrico: Mano NO es parte de Dedo.'
    },
    temporal: {
        icono: '⏰',
        titulo: 'Marco TEMPORAL',
        descripcion: 'Relaciones de secuencia en tiempo. Antes/Después, Primero/Último. "Ayer" es antes de "Hoy", "Hoy" es antes de "Mañana". Transitividad temporal: si A antes B, y B antes C, entonces A antes C.'
    },
    espacial: {
        icono: '📍',
        titulo: 'Marco ESPACIAL',
        descripcion: 'Relaciones de posición en espacio. Arriba/Abajo, Dentro/Fuera, Cerca/Lejos. "El libro está sobre la mesa", "La mesa está debajo del libro". Inversión direccional similar a comparación.'
    },
    causal: {
        icono: '⚡',
        titulo: 'Marco CAUSAL',
        descripcion: 'Relaciones de causa-efecto. "X causa Y", "X produce Y", "X lleva a Y". NO es simétrico: Si fuego causa calor, calor NO causa fuego. Transitividad: Si A causa B, y B causa C, entonces A causa C (cadenas causales).'
    }
};

function mostrarMarco(tipo) {
    const info = marcosInfo[tipo];
    
    // Actualizar todas las cards
    document.querySelectorAll('.marco-card').forEach(card => {
        card.classList.remove('destacada');
    });
    
    // Destacar la seleccionada
    event.currentTarget.classList.add('destacada');
    
    // Actualizar detalle
    document.getElementById('detalleIcono').textContent = info.icono;
    document.getElementById('detalleTitulo').textContent = info.titulo;
    document.getElementById('detalleDescripcion').textContent = info.descripcion;
    
    // Hacer visible el detalle
    document.getElementById('marcoDetalle').classList.add('visible');
}

// ========== ANIMACIÓN 3: QUIZ OPERANTES ==========
const respuestasCorrectas = {
    1: 'operante',
    2: 'respondiente',
    3: 'operante'
};

const feedbacksClasificar = {
    1: {
        operante: '✅ ¡Correcto! El niño APRENDIÓ el marco de coordinación (equivalencia). No es innato ni reflejo. Derivar "MANZANA"→manzana sin entrenamiento directo muestra conducta operante generalizada: aplicar el marco relacional aprendido a nuevos estímulos.',
        respondiente: '❌ No es respondiente. Los reflejos no involucran derivación de relaciones nuevas. Esto es conducta OPERANTE: el niño aprendió a responder relacionalmente.',
        innato: '❌ No es innato. Si fuera genético, todos los bebés lo harían desde el nacimiento. Esto se APRENDE gradualmente con exposición al lenguaje.'
    },
    2: {
        respondiente: '✅ ¡Correcto! Este es un REFLEJO pupilar incondicionado. Es respondiente (pavloviano), no operante. No se aprende, es automático y universal.',
        operante: '❌ No es operante. No se aprende por consecuencias. La contracción pupilar es un reflejo automático del sistema nervioso.',
        innato: '✅ También correcto llamarlo INNATO. Es genéticamente determinado, todos los humanos lo tienen. En terminología conductual decimos RESPONDIENTE (condicionamiento clásico).'
    },
    3: {
        operante: '✅ ¡Perfecto! Esto es OPERANTE GENERALIZADA. El niño aprendió el marco de OPOSICIÓN con múltiples ejemplares (grande-pequeño, caliente-frío...) hasta que puede DERIVAR nuevas oposiciones sin entrenamiento directo. Esta es la esencia de RFT: marcos relacionales como operantes aprendidas.',
        respondiente: '❌ No es respondiente. Derivar relaciones de oposición no es un reflejo. Es conducta OPERANTE aprendida que se generaliza.',
        innato: '❌ No es innato. Los niños pequeños no tienen marcos de oposición; los desarrollan gradualmente. Se aprende por múltiples ejemplares y reforzamiento diferencial.'
    }
};

function clasificar(ejemplo, tipo) {
    const correcto = respuestasCorrectas[ejemplo];
    const feedback = document.getElementById(`feedback${ejemplo}`);
    const botones = document.querySelectorAll(`#ejemplo${ejemplo} .opciones-clasificar button`);
    
    // Deshabilitar botones
    botones.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Mostrar feedback
    feedback.innerHTML = feedbacksClasificar[ejemplo][tipo];
    feedback.style.display = 'block';
    feedback.style.opacity = '1';
    
    if (tipo === correcto || (ejemplo === 2 && tipo === 'innato')) {
        feedback.classList.add('correcto');
        event.target.classList.add('seleccion-correcta');
    } else {
        feedback.classList.add('incorrecto');
        event.target.classList.add('seleccion-incorrecta');
        // Marcar la correcta
        botones.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(correcto)) {
                btn.classList.add('seleccion-correcta');
            }
        });
    }
}

// ========== ANIMACIÓN 4: CRELS/CFUNC DEMO ==========
const relacionesDemo = {
    coordinacion: {
        marco: 'COORDINACIÓN',
        explicacion: 'EJERCICIO = SALUD. Son intercambiables, equivalentes. Si uno es bueno, el otro también.',
        cfunc: 'Si "salud" tiene función positiva (te hace sentir bien), "ejercicio" adquiere la misma función positiva por coordinación. Por eso valoramos el ejercicio.'
    },
    oposicion: {
        marco: 'OPOSICIÓN',
        explicacion: 'EJERCICIO es opuesto a SALUD. ¡Esto sería una relación disfuncional! Implicaría que hacer ejercicio daña la salud.',
        cfunc: 'Si "salud" es positiva y "ejercicio" está en oposición, ejercicio se vuelve negativo. Esto podría llevar a evitar el ejercicio (marco relacional disfuncional).'
    },
    causa: {
        marco: 'CAUSAL',
        explicacion: 'EJERCICIO causa SALUD. Esta es una relación direccional: hacer ejercicio produce salud.',
        cfunc: 'Si valoras la "salud" (consecuencia), el "ejercicio" (causa) se vuelve valioso instrumentalmente. No porque ejercitarse sea placentero en sí, sino porque produce salud.'
    },
    previene: {
        marco: 'CAUSAL NEGATIVO',
        explicacion: 'EJERCICIO previene SALUD. ¡Otra relación disfuncional! Implicaría que ejercitarse impide estar saludable.',
        cfunc: 'Si quieres evitar problemas de salud, pero crees que ejercicio previene salud, evitarás el ejercicio (lógica correcta basada en marco incorrecto).'
    }
};

function cambiarRelacion() {
    const crel = document.getElementById('crelSelect').value;
    const resultado = document.getElementById('resultadoRelacion');
    const cfuncDemo = document.getElementById('cfuncDemo');
    
    if (!crel) {
        resultado.innerHTML = `
            <div class="resultado-icono">👆</div>
            <div class="resultado-texto">
                Selecciona un Crel para ver cómo cambia la relación
            </div>
        `;
        cfuncDemo.style.display = 'none';
        return;
    }
    
    const info = relacionesDemo[crel];
    
    resultado.innerHTML = `
        <div class="resultado-icono">🔗</div>
        <div class="resultado-texto">
            <strong>Marco: ${info.marco}</strong><br>
            ${info.explicacion}
        </div>
    `;
    resultado.classList.add('activo');
    
    // Mostrar Cfunc
    cfuncDemo.style.display = 'block';
    document.getElementById('cfuncContenido').innerHTML = `
        <p>${info.cfunc}</p>
        <div class="cfunc-nota">
            💡 El <strong>Crel</strong> ("${document.getElementById('crelSelect').selectedOptions[0].text}") 
            determinó QUÉ relación. El <strong>Cfunc</strong> (contexto de valoración) determina 
            CÓMO se transfieren las funciones (positivo/negativo, aproximación/evitación).
        </div>
    `;
}

// ========== EJERCICIO: CASOS DE IDENTIFICACIÓN ==========
const casos = [
    {
        relacion: '"Perro" = 🐕 = "Dog"',
        descripcion: 'Las tres formas (palabra española, imagen, palabra inglés) son intercambiables y mutuamente sustituibles.',
        opciones: [
            {texto: '✅ COORDINACIÓN (Equivalencia)', correcta: true},
            {texto: '❌ Oposición', correcta: false},
            {texto: '❌ Comparación', correcta: false},
            {texto: '❌ Jerarquía', correcta: false}
        ],
        feedback: '✅ Correcto. Esto ES EQUIVALENCIA (marco de coordinación). Los tres estímulos forman una clase de equivalencia con reflexividad, simetría y transitividad. Son mutuamente sustituibles. Este es el marco que estudiamos todo el módulo.'
    },
    {
        relacion: '"Grande" es opuesto a "Pequeño"',
        descripcion: 'Son antónimos, contrarios en significado.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '✅ OPOSICIÓN', correcta: true},
            {texto: '❌ Comparación', correcta: false},
            {texto: '❌ Distinción', correcta: false}
        ],
        feedback: '✅ Correcto. Esto NO es equivalencia, es MARCO DE OPOSICIÓN. NO son intercambiables (grande ≠ pequeño). Tienen una relación de contraste/antónimo. RFT estudia estos marcos, equivalencia no puede explicarlos.'
    },
    {
        relacion: '"10 es más grande que 5"',
        descripcion: 'Relación de magnitud numérica.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '❌ Oposición', correcta: false},
            {texto: '✅ COMPARACIÓN', correcta: true},
            {texto: '❌ Causal', correcta: false}
        ],
        feedback: '✅ Exacto. Esto NO es equivalencia, es MARCO COMPARATIVO. La relación NO es simétrica en el sentido de equivalencia: si 10 > 5, entonces 5 NO es > 10 (es 5 < 10). RFT estudia marcos comparativos; equivalencia no los abarca.'
    },
    {
        relacion: '"Fumar causa cáncer"',
        descripcion: 'Relación de causa-efecto entre conductas y consecuencias.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '❌ Temporal', correcta: false},
            {texto: '✅ CAUSAL', correcta: true},
            {texto: '❌ Jerarquía', correcta: false}
        ],
        feedback: '✅ Perfecto. Esto NO es equivalencia, es MARCO CAUSAL. Fumar NO es igual a cáncer (no son intercambiables). La relación es direccional: X produce Y. RFT estudia marcos causales; equivalencia no puede explicar causalidad.'
    },
    {
        relacion: '"Manzana" = "Apple" = 🍎',
        descripcion: 'Palabra español, palabra inglés e imagen del mismo objeto.',
        opciones: [
            {texto: '✅ COORDINACIÓN (Equivalencia)', correcta: true},
            {texto: '❌ Jerarquía', correcta: false},
            {texto: '❌ Temporal', correcta: false},
            {texto: '❌ Espacial', correcta: false}
        ],
        feedback: '✅ Correcto. Esto ES EQUIVALENCIA pura. Las tres formas son mutuamente sustituibles, tienen reflexividad, simetría, transitividad. Forman una clase de equivalencia clásica, el marco de COORDINACIÓN que estudiamos.'
    },
    {
        relacion: '"Perro" es parte de "Animal"',
        descripcion: 'Relación taxonómica, de categorización.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '✅ JERARQUÍA', correcta: true},
            {texto: '❌ Comparación', correcta: false},
            {texto: '❌ Distinción', correcta: false}
        ],
        feedback: '✅ Exacto. Esto NO es equivalencia, es MARCO JERÁRQUICO. Perro NO es igual a Animal (no son intercambiables). Es una relación parte-todo, miembro-categoría. NO es simétrica: Animal no es parte de Perro. RFT estudia jerarquías, equivalencia no.'
    },
    {
        relacion: '"Ayer" es antes de "Hoy"',
        descripcion: 'Secuencia en el tiempo.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '❌ Causal', correcta: false},
            {texto: '✅ TEMPORAL', correcta: true},
            {texto: '❌ Espacial', correcta: false}
        ],
        feedback: '✅ Perfecto. Esto NO es equivalencia, es MARCO TEMPORAL. Ayer NO es igual a Hoy. La relación es de secuencia: antes/después. NO es simétrica: si Ayer antes Hoy, Hoy NO es antes Ayer (es después). RFT estudia marcos temporales.'
    },
    {
        relacion: '"Triángulo" ≠ "Círculo"',
        descripcion: 'Son figuras geométricas diferentes.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '❌ Oposición', correcta: false},
            {texto: '✅ DISTINCIÓN', correcta: true},
            {texto: '❌ Comparación', correcta: false}
        ],
        feedback: '✅ Correcto. Esto NO es equivalencia, es MARCO DE DISTINCIÓN. Señala que son diferentes, no relacionados. NO son opuestos activos (como grande-pequeño), simplemente son distintos. RFT estudia distinción como marco separado de equivalencia.'
    },
    {
        relacion: '"H₂O" = "Agua" = 💧',
        descripcion: 'Fórmula química, palabra y símbolo del mismo compuesto.',
        opciones: [
            {texto: '✅ COORDINACIÓN (Equivalencia)', correcta: true},
            {texto: '❌ Jerarquía', correcta: false},
            {texto: '❌ Causal', correcta: false},
            {texto: '❌ Distinción', correcta: false}
        ],
        feedback: '✅ Exacto. Esto ES EQUIVALENCIA. H₂O, "Agua" y 💧 son formas diferentes de referirse a lo mismo. Son intercambiables, forman clase de equivalencia. Marco de COORDINACIÓN en RFT.'
    },
    {
        relacion: '"Feliz" es mejor que "Triste"',
        descripcion: 'Evaluación, preferencia entre estados emocionales.',
        opciones: [
            {texto: '❌ Coordinación (Equivalencia)', correcta: false},
            {texto: '❌ Oposición', correcta: false},
            {texto: '✅ COMPARACIÓN (evaluativa)', correcta: true},
            {texto: '❌ Causal', correcta: false}
        ],
        feedback: '✅ Perfecto. Esto NO es equivalencia, es MARCO COMPARATIVO-EVALUATIVO. "Mejor que" establece una relación de valor/preferencia. NO son intercambiables. Podrían ser opuestos (feliz↔️triste) Y estar en relación comparativa. RFT permite múltiples marcos simultáneos.'
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
    
    // Mostrar relación
    document.getElementById('relacionPresentada').innerHTML = `
        <div class="relacion-box">
            <div class="relacion-texto">${caso.relacion}</div>
            <div class="relacion-descripcion">${caso.descripcion}</div>
        </div>
    `;
    
    // Opciones
    const opcionesEl = document.getElementById('casoOpciones');
    opcionesEl.innerHTML = '';
    
    caso.opciones.forEach((opcion, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn-marco';
        btn.textContent = opcion.texto;
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
    const botonesOpciones = document.querySelectorAll('.opcion-btn-marco');
    
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
                <p>❌ Incorrecto.</p>
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
                Entiendes perfectamente la distinción entre equivalencia (coordinación) y otros marcos 
                relacionales. Estás listo para adentrarte en RFT completo y explorar cómo todos estos 
                marcos se combinan para crear el lenguaje y cognición humana.
            </p>
        `;
    } else if (porcentajeFinal >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Comprendes bien el concepto. Recuerda: equivalencia = coordinación (intercambiabilidad). 
                Oposición, comparación, jerarquía, causal... son OTROS marcos que RFT estudia.
            </p>
        `;
    } else if (porcentajeFinal >= 60) {
        mensajeEl.innerHTML = `
            <p class="mensaje-regular">
                <strong>📚 BIEN</strong><br>
                Tienes los conceptos básicos. Clave: equivalencia solo explica relaciones de igualdad/coordinación. 
                TODO lo demás (opuesto, mayor, parte de, causa...) son otros marcos relacionales.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>🔄 NECESITAS REPASAR</strong><br>
                Revisa los bloques teóricos. Concepto fundamental: Equivalencia fue el comienzo, 
                RFT estudia TODOS los marcos relacionales. ¡Repite el ejercicio!
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
});
