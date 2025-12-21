// ============================================
// CONCEPTO 2 - SIMETRÍA: LA PRIMERA DERIVACIÓN
// Versión ANIMADA con micro-interacciones
// ============================================

// ============= NAVEGACIÓN TEORÍA =============
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

// ============= ANIMACIÓN 1: SIMETRÍA VISUAL =============
let simetriaActivada = false;

function animarSimetria() {
    const invertida = document.getElementById('simetriaInvertida');
    const mensaje = document.getElementById('mensajeSimetria');
    const btn = document.getElementById('btnSimetria');
    
    if (!simetriaActivada) {
        // Mostrar simetría invertida
        invertida.style.opacity = '1';
        invertida.style.transform = 'scale(1)';
        mensaje.style.opacity = '1';
        mensaje.style.transform = 'translateY(0)';
        
        // Cambiar botón
        btn.textContent = '🔄 Ocultar';
        btn.style.background = 'linear-gradient(135deg, #FF6B6B, #FF8E8E)';
        
        simetriaActivada = true;
    } else {
        // Ocultar
        invertida.style.opacity = '0';
        invertida.style.transform = 'scale(0.95)';
        mensaje.style.opacity = '0';
        mensaje.style.transform = 'translateY(10px)';
        
        btn.textContent = '🔄 ¡Ver Emergencia de Simetría!';
        btn.style.background = 'linear-gradient(135deg, var(--cyan), var(--cyan-claro))';
        
        simetriaActivada = false;
    }
}

// ============= ANIMACIÓN 2: COMPARACIÓN PAVLOV VS EQUIVALENCIA =============
function probarPavlov() {
    const resultado = document.getElementById('resultadoPavlov');
    resultado.style.display = 'block';
    setTimeout(() => {
        resultado.style.opacity = '1';
        resultado.style.transform = 'translateY(0)';
    }, 50);
}

function probarEquivalencia() {
    const resultado = document.getElementById('resultadoEquiv');
    resultado.style.display = 'block';
    setTimeout(() => {
        resultado.style.opacity = '1';
        resultado.style.transform = 'translateY(0)';
    }, 50);
}

// ============= QUIZ INLINE 3 =============
const quizzesRespondidos = {
    1: false
};

function responderQuiz(quizNum, correcto) {
    if (quizzesRespondidos[quizNum]) return;
    
    const feedback = document.getElementById(`feedbackQuiz${quizNum}`);
    const opciones = document.querySelectorAll(`#opcion${quizNum}-1, #opcion${quizNum}-2`);
    
    // Deshabilitar opciones
    opciones.forEach(op => op.style.pointerEvents = 'none');
    
    // Marcar correcta
    if (correcto) {
        event.target.classList.add('correcta');
        feedback.innerHTML = `
            <div class="feedback-correcto">
                ✅ <strong>¡Exacto!</strong> También emerge 🍎 → "manzana". Esta bidireccionalidad 
                automática es la SIMETRÍA, característica del lenguaje simbólico humano.
            </div>
        `;
    } else {
        event.target.classList.add('incorrecta');
        // Marcar la correcta
        opciones.forEach(op => {
            if (op.textContent.includes('También emerge')) {
                op.classList.add('correcta');
            }
        });
        feedback.innerHTML = `
            <div class="feedback-incorrecto">
                ❌ <strong>No exactamente.</strong> En humanos verbales, también emerge la relación 
                inversa 🍎 → "manzana" sin entrenamiento. Esto es SIMETRÍA: relaciones bidireccionales.
            </div>
        `;
    }
    
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 50);
    
    quizzesRespondidos[quizNum] = true;
}

// ============= ANIMACIÓN 4: MINI-RED CRECIENTE =============
let miniRelaciones = 0;
const maxMiniRelaciones = 3;

const relacionesMini = [
    {entrenada: {de: 'A', a: 'B'}, simetrica: {de: 'B', a: 'A'}},
    {entrenada: {de: 'C', a: 'D'}, simetrica: {de: 'D', a: 'C'}},
    {entrenada: {de: 'E', a: 'F'}, simetrica: {de: 'F', a: 'E'}}
];

function agregarRelacionMini() {
    if (miniRelaciones >= maxMiniRelaciones) {
        document.getElementById('mensajeMini').innerHTML = '✨ ¡Máximo alcanzado! Entrenaste 3, obtuviste 6 relaciones.';
        document.getElementById('mensajeMini').style.opacity = '1';
        document.getElementById('btnAgregar').disabled = true;
        return;
    }
    
    const rel = relacionesMini[miniRelaciones];
    const svg = document.getElementById('miniRed');
    
    // Posiciones
    const positions = [
        {x: 100, y: 90},
        {x: 250, y: 90},
        {x: 400, y: 90}
    ];
    
    const pos = positions[miniRelaciones];
    
    // Crear nodos
    const nodoA = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    nodoA.setAttribute('cx', pos.x);
    nodoA.setAttribute('cy', pos.y - 40);
    nodoA.setAttribute('r', '25');
    nodoA.setAttribute('fill', '#00BCD4');
    nodoA.setAttribute('stroke', 'white');
    nodoA.setAttribute('stroke-width', '3');
    nodoA.classList.add('nodo-mini-animado');
    
    const textoA = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textoA.setAttribute('x', pos.x);
    textoA.setAttribute('y', pos.y - 35);
    textoA.setAttribute('text-anchor', 'middle');
    textoA.setAttribute('fill', 'white');
    textoA.setAttribute('font-weight', 'bold');
    textoA.setAttribute('font-size', '18');
    textoA.textContent = rel.entrenada.de;
    
    const nodoB = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    nodoB.setAttribute('cx', pos.x);
    nodoB.setAttribute('cy', pos.y + 40);
    nodoB.setAttribute('r', '25');
    nodoB.setAttribute('fill', '#00BCD4');
    nodoB.setAttribute('stroke', 'white');
    nodoB.setAttribute('stroke-width', '3');
    nodoB.classList.add('nodo-mini-animado');
    
    const textoB = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textoB.setAttribute('x', pos.x);
    textoB.setAttribute('y', pos.y + 45);
    textoB.setAttribute('text-anchor', 'middle');
    textoB.setAttribute('fill', 'white');
    textoB.setAttribute('font-weight', 'bold');
    textoB.setAttribute('font-size', '18');
    textoB.textContent = rel.entrenada.a;
    
    // Línea entrenada
    const lineaEntrenada = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineaEntrenada.setAttribute('x1', pos.x + 10);
    lineaEntrenada.setAttribute('y1', pos.y - 15);
    lineaEntrenada.setAttribute('x2', pos.x + 10);
    lineaEntrenada.setAttribute('y2', pos.y + 15);
    lineaEntrenada.setAttribute('stroke', '#00FF88');
    lineaEntrenada.setAttribute('stroke-width', '4');
    lineaEntrenada.setAttribute('marker-end', 'url(#arrowGreen)');
    lineaEntrenada.classList.add('linea-mini-animada');
    
    // Texto "entrenada"
    const labelEntrenada = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    labelEntrenada.setAttribute('x', pos.x + 35);
    labelEntrenada.setAttribute('y', pos.y);
    labelEntrenada.setAttribute('fill', '#00FF88');
    labelEntrenada.setAttribute('font-size', '11');
    labelEntrenada.setAttribute('font-weight', 'bold');
    labelEntrenada.textContent = 'entrenada';
    
    svg.appendChild(lineaEntrenada);
    svg.appendChild(nodoA);
    svg.appendChild(textoA);
    svg.appendChild(nodoB);
    svg.appendChild(textoB);
    svg.appendChild(labelEntrenada);
    
    // Línea simétrica (después de 500ms)
    setTimeout(() => {
        const lineaSimetrica = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        lineaSimetrica.setAttribute('x1', pos.x - 10);
        lineaSimetrica.setAttribute('y1', pos.y + 15);
        lineaSimetrica.setAttribute('x2', pos.x - 10);
        lineaSimetrica.setAttribute('y2', pos.y - 15);
        lineaSimetrica.setAttribute('stroke', '#FFD600');
        lineaSimetrica.setAttribute('stroke-width', '4');
        lineaSimetrica.setAttribute('marker-end', 'url(#arrowYellow)');
        lineaSimetrica.setAttribute('stroke-dasharray', '5,3');
        lineaSimetrica.classList.add('linea-mini-animada');
        
        const labelSimetrica = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelSimetrica.setAttribute('x', pos.x - 60);
        labelSimetrica.setAttribute('y', pos.y);
        labelSimetrica.setAttribute('fill', '#FFD600');
        labelSimetrica.setAttribute('font-size', '11');
        labelSimetrica.setAttribute('font-weight', 'bold');
        labelSimetrica.textContent = 'simetría';
        
        svg.appendChild(lineaSimetrica);
        svg.appendChild(labelSimetrica);
        
        miniRelaciones++;
        actualizarContadoresMini();
        
        if (miniRelaciones === maxMiniRelaciones) {
            document.getElementById('mensajeMini').innerHTML = '🎉 ¡Entrenaste 3 relaciones, obtuviste 6 en total! Esto es eficiencia.';
            document.getElementById('mensajeMini').style.opacity = '1';
            document.getElementById('btnAgregar').disabled = true;
        }
    }, 500);
}

function actualizarContadoresMini() {
    document.getElementById('miniEntrenadas').textContent = miniRelaciones;
    document.getElementById('miniDerivadas').textContent = miniRelaciones;
    document.getElementById('miniTotal').textContent = miniRelaciones * 2;
}

function resetMini() {
    miniRelaciones = 0;
    const svg = document.getElementById('miniRed');
    svg.innerHTML = `
        <defs>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#00FF88" />
            </marker>
            <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#FFD600" />
            </marker>
        </defs>
    `;
    actualizarContadoresMini();
    document.getElementById('mensajeMini').style.opacity = '0';
    document.getElementById('btnAgregar').disabled = false;
}

// ============= CASOS DEL EJERCICIO =============
const casos = [
    {
        entrenamiento: "Se entrena a un niño: Palabra hablada 'GATO' (muestra) → Seleccionar imagen de gato (comparación). El niño aprende perfectamente esta relación.",
        prueba: "Se presenta la imagen del gato como muestra. ¿El niño seleccionará la palabra escrita 'GATO' o producirá la palabra hablada 'GATO'?",
        emergera: true,
        feedback: "✅ Correcto. SÍ emergerá la simetría. Tras entrenar Palabra→Imagen en un contexto de discriminación condicional con estímulos arbitrarios y en un organismo verbal (humano), típicamente emerge Imagen→Palabra. Esta bidireccionalidad es característica de las clases de equivalencia y del lenguaje simbólico."
    },
    {
        entrenamiento: "Un perro aprende mediante condicionamiento pavloviano: Campana (EC) → Comida (EI). Después de múltiples emparejamientos, la campana produce salivación.",
        prueba: "Se presenta la comida. ¿El perro producirá el sonido de la campana o alguna respuesta relacionada específicamente con ella?",
        emergera: false,
        feedback: "✅ Correcto. NO emergerá simetría. En condicionamiento pavloviano simple, la relación es unidireccional: Campana→Comida, pero NO Comida→Campana. La simetría NO ocurre en condicionamiento clásico básico. El perro salivará ante la comida (respuesta incondicionada), pero no producirá la campana."
    },
    {
        entrenamiento: "Se entrena a un adulto en laboratorio: Símbolo abstracto ⚡ (muestra) → Seleccionar color azul (comparación) de entre 3 colores. Alcanza 100% de aciertos en 20 ensayos.",
        prueba: "Se presenta el color azul como muestra con tres símbolos de comparación incluyendo ⚡. ¿Seleccionará el símbolo ⚡?",
        emergera: true,
        feedback: "✅ Correcto. SÍ emergerá simetría. En adultos humanos verbales, tras entrenar relaciones arbitrarias mediante discriminación condicional (⚡→Azul), típicamente emerge la relación simétrica (Azul→⚡) sin entrenamiento adicional. Esta es una demostración experimental estándar de simetría."
    },
    {
        entrenamiento: "Una paloma aprende en una caja de Skinner: Luz roja (Ed) → Picar tecla = Comida. Luz verde (Delta) → Picar tecla = No comida. Discrimina perfectamente ambas condiciones.",
        prueba: "Se da comida. ¿La paloma picará la tecla que antes producía la luz roja?",
        emergera: false,
        feedback: "✅ Correcto. NO emergerá simetría. Esto es discriminación simple, no discriminación condicional. Además, en condicionamiento operante básico con no-humanos, no se observa típicamente la emergencia de relaciones simétricas. La paloma come, pero no necesariamente produce la respuesta asociada con la luz roja."
    },
    {
        entrenamiento: "Un niño con autismo aprende mediante matching-to-sample: Foto de manzana (muestra) → Seleccionar palabra escrita 'MANZANA' (comparación). Entrenamiento con corrección de errores hasta criterio (90% aciertos).",
        prueba: "Se presenta 'MANZANA' escrita como muestra. ¿Seleccionará la foto de manzana?",
        emergera: true,
        feedback: "✅ Correcto. SÍ emergerá simetría (aunque puede requerir verificación). En niños con desarrollo típico del lenguaje, la simetría emerge consistentemente. En algunos niños con autismo puede emerger, mientras otros pueden requerir entrenamiento explícito. Los estudios muestran variabilidad individual, pero cuando hay repertorio verbal, la simetría es probable."
    },
    {
        entrenamiento: "Se entrena a una rata: Tono 1000Hz (EC) → Shock eléctrico leve (EI). Después de varios emparejamientos, la rata muestra respuesta de congelamiento ante el tono.",
        prueba: "Se presenta el shock. ¿La rata producirá el tono o mostrará respuestas específicamente asociadas al tono?",
        emergera: false,
        feedback: "✅ Correcto. NO emergerá simetría. El condicionamiento pavloviano aversivo sigue siendo unidireccional: Tono→Shock produce miedo al tono, pero Shock NO produce el tono. La rata mostrará respuestas de dolor/escape ante el shock (respuestas incondicionadas), no respuestas condicionadas al tono."
    },
    {
        entrenamiento: "Un estudiante universitario aprende en un experimento: Kanji japonés 犬 (muestra) → Seleccionar número romano III (comparación) de entre V opciones. 15 ensayos hasta 100% de precisión.",
        prueba: "Se presenta III como muestra con 5 kanjis de comparación. ¿Seleccionará 犬?",
        emergera: true,
        feedback: "✅ Correcto. SÍ emergerá simetría. Adultos universitarios en tareas de discriminación condicional con estímulos arbitrarios muestran simetría de manera muy consistente. La relación 犬→III entrenada produce III→犬 sin entrenamiento adicional. Esta es una de las poblaciones donde la simetría es más robusta y predecible."
    },
    {
        entrenamiento: "Se entrena discriminación condicional a una paloma usando el procedimiento estándar: Luz roja (muestra) → Picar tecla izquierda (comparación) = Comida. Luz verde (muestra) → Picar tecla derecha = Comida. Discrimina perfectamente.",
        prueba: "Mediante un procedimiento especial, se enciende la tecla izquierda como 'muestra'. ¿La paloma producirá respuestas hacia donde estaba la luz roja?",
        emergera: false,
        feedback: "✅ Correcto. NO emergerá simetría espontáneamente. Décadas de investigación muestran que las palomas típicamente NO muestran simetría derivada en procedimientos estándares de discriminación condicional. Solo bajo condiciones muy específicas (como cuando la propia conducta es parte de la relación) se ha logrado demostrar simetría en palomas."
    },
    {
        entrenamiento: "Un niño preescolar aprende: Objeto real (pelota) → Seleccionar dibujo de pelota. Objeto (carro) → Dibujo de carro. Tres objetos entrenados hasta 90% de aciertos con reforzamiento social.",
        prueba: "Se muestra el dibujo de la pelota. ¿El niño seleccionará o señalará el objeto real (pelota)?",
        emergera: true,
        feedback: "✅ Correcto. SÍ emergerá simetría. En niños preescolares con lenguaje típico, las relaciones entre objetos y sus representaciones (dibujos, fotos) muestran simetría consistentemente. La relación Objeto→Dibujo entrenada produce Dibujo→Objeto. Esto es parte del desarrollo normal de la función simbólica."
    },
    {
        entrenamiento: "Se entrena a un mono rhesus mediante discriminación condicional: Forma triangular (muestra) → Seleccionar color rojo (comparación). Forma circular (muestra) → Color azul. Criterio: 85% de aciertos en 100 ensayos.",
        prueba: "Se presenta color rojo como muestra. ¿El mono seleccionará la forma triangular?",
        emergera: false,
        feedback: "✅ Correcto. NO emergerá simetría (o será muy débil). La investigación con primates no-humanos ha mostrado resultados equívocos, débiles o negativos en pruebas de simetría. Aunque los monos pueden aprender discriminaciones condicionales complejas, la derivación espontánea de relaciones simétricas es inconsistente o ausente sin procedimientos de entrenamiento muy específicos."
    }
];

// ============= ESTADO DEL EJERCICIO =============
let casoActualIndex = 0;
let aciertosTotal = 0;

// ============= CARGAR CASO =============
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
    
    document.getElementById('casoEscenario').innerHTML = `
        <div class="entrenamiento-box">
            <h4>📚 Entrenamiento:</h4>
            <p>${caso.entrenamiento}</p>
        </div>
        <div class="prueba-box">
            <h4>🧪 Prueba de Simetría:</h4>
            <p>${caso.prueba}</p>
        </div>
    `;
    
    const opcionesEl = document.getElementById('casoOpciones');
    opcionesEl.innerHTML = '';
    
    const opciones = [
        {texto: "SÍ emergerá simetría", valor: true},
        {texto: "NO emergerá simetría", valor: false}
    ];
    
    opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn-amplia';
        btn.textContent = opcion.texto;
        btn.onclick = () => verificarRespuesta(opcion.valor);
        opcionesEl.appendChild(btn);
    });
    
    document.getElementById('casoFeedback').innerHTML = '';
    document.getElementById('casoFeedback').className = 'caso-feedback';
}

// ============= VERIFICAR RESPUESTA =============
function verificarRespuesta(respuesta) {
    const caso = casos[casoActualIndex];
    const feedbackEl = document.getElementById('casoFeedback');
    const botonesOpciones = document.querySelectorAll('.opcion-btn-amplia');
    
    botonesOpciones.forEach(btn => btn.style.pointerEvents = 'none');
    
    botonesOpciones.forEach(btn => {
        if ((btn.textContent.includes('SÍ') && caso.emergera) || 
            (btn.textContent.includes('NO') && !caso.emergera)) {
            btn.classList.add('correcta');
        }
    });
    
    if (respuesta === caso.emergera) {
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

// ============= RESULTADO FINAL =============
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
                Dominas el concepto de simetría. Entiendes perfectamente cuándo emerge 
                (relaciones arbitrarias en organismos verbales) y cuándo NO (condicionamiento 
                básico o especies sin repertorio verbal). ¡Listo para transitividad!
            </p>
        `;
    } else if (porcentajeFinal >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Tienes una comprensión sólida de la simetría. Recuerda: emerge en humanos 
                verbales con relaciones arbitrarias mediante discriminación condicional, 
                pero NO en condicionamiento pavloviano simple.
            </p>
        `;
    } else if (porcentajeFinal >= 60) {
        mensajeEl.innerHTML = `
            <p class="mensaje-regular">
                <strong>📚 BIEN</strong><br>
                Comprendes los conceptos básicos. Clave para recordar: simetría = 
                bidireccionalidad automática. SÍ en humanos verbales, NO en pavloviano. 
                Considera revisar la teoría.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>🔄 NECESITAS REPASAR</strong><br>
                Te recomendamos releer los bloques teóricos. Concepto clave: la simetría 
                emerge en discriminaciones condicionales con humanos verbales, pero NO en 
                condicionamiento básico. ¡Repite el ejercicio!
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

// ============= PARTÍCULAS =============
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

// ============= INIT =============
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    
    // Inicializar SVG de mini-red
    const svg = document.getElementById('miniRed');
    if (svg) {
        svg.innerHTML = `
            <defs>
                <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#00FF88" />
                </marker>
                <marker id="arrowYellow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#FFD600" />
                </marker>
            </defs>
        `;
    }
});
