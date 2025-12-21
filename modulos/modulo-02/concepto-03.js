// ==========================================
// CONCEPTO 3 - TRANSITIVIDAD Y EQUIVALENCIA
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

// ========== ANIMACIÓN 1: DEMOSTRACIÓN TRANSITIVA ==========
let pasoDemo1 = 0;

function demostrarTransitiva() {
    const btn = document.getElementById('btnDemo1');
    const explicacion = document.getElementById('explicacionDemo1');
    
    pasoDemo1++;
    
    if (pasoDemo1 === 1) {
        // Paso 1: Entrenar A→B
        document.getElementById('flechaAB').classList.add('activa-entrenada');
        document.querySelector('#flechaAB .etiqueta-flecha').classList.remove('oculta');
        
        btn.textContent = '▶ Paso 2: Entrenar B→C';
        explicacion.innerHTML = `
            <div class="paso-explicacion">
                ✅ <strong>Relación 1 entrenada:</strong> A → B<br>
                El sujeto aprende que cuando ve A (muestra), debe seleccionar B (comparación).
            </div>
        `;
        explicacion.style.opacity = '1';
        
    } else if (pasoDemo1 === 2) {
        // Paso 2: Entrenar B→C
        document.getElementById('flechaBC').classList.add('activa-entrenada');
        document.querySelector('#flechaBC .etiqueta-flecha').classList.remove('oculta');
        
        btn.textContent = '▶ Paso 3: Probar A→C';
        explicacion.innerHTML = `
            <div class="paso-explicacion">
                ✅ <strong>Relación 2 entrenada:</strong> B → C<br>
                El sujeto aprende que cuando ve B (muestra), debe seleccionar C (comparación).<br>
                <strong>Nota:</strong> B es el elemento común que conecta A con C.
            </div>
        `;
        
    } else if (pasoDemo1 === 3) {
        // Paso 3: Mostrar transitividad A→C
        document.getElementById('flechaAC').classList.add('activa-derivada');
        
        btn.textContent = '🔄 Reiniciar demostración';
        btn.style.background = 'linear-gradient(135deg, #FF6B6B, #FF8E8E)';
        
        explicacion.innerHTML = `
            <div class="paso-explicacion exitosa">
                🎉 <strong>¡TRANSITIVIDAD!</strong><br>
                Sin entrenar A→C directamente, el sujeto ahora puede:<br>
                Ver A como muestra → Seleccionar C como comparación<br><br>
                <strong>¿Por qué?</strong> Porque conectó las dos relaciones entrenadas a través de B (elemento común).<br>
                Esto es <strong>derivación por transitividad</strong>.
            </div>
        `;
        
    } else {
        // Reiniciar
        pasoDemo1 = 0;
        document.getElementById('flechaAB').classList.remove('activa-entrenada');
        document.getElementById('flechaBC').classList.remove('activa-entrenada');
        document.getElementById('flechaAC').classList.remove('activa-derivada');
        document.querySelectorAll('.etiqueta-flecha').forEach(e => e.classList.add('oculta'));
        
        btn.textContent = '▶ Paso 1: Entrenar A→B';
        btn.style.background = 'linear-gradient(135deg, var(--cyan), var(--cyan-claro))';
        explicacion.style.opacity = '0';
        
        setTimeout(() => {
            explicacion.innerHTML = '';
        }, 300);
    }
}

// ========== ANIMACIÓN 2: CHECKLIST DE EQUIVALENCIA ==========
const propiedadesVerificadas = {
    reflexividad: false,
    simetria: false,
    transitividad: false
};

function togglePropiedad(propiedad) {
    const contenido = document.getElementById(`contenido${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)}`);
    const item = document.getElementById(`prop${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)}`);
    
    // Toggle mostrar/ocultar
    if (contenido.style.maxHeight && contenido.style.maxHeight !== '0px') {
        contenido.style.maxHeight = '0px';
        item.classList.remove('expandida');
    } else {
        // Cerrar otras
        document.querySelectorAll('.propiedad-contenido').forEach(c => c.style.maxHeight = '0px');
        document.querySelectorAll('.propiedad-item').forEach(i => i.classList.remove('expandida'));
        
        contenido.style.maxHeight = contenido.scrollHeight + 'px';
        item.classList.add('expandida');
    }
}

function verificarPropiedad(propiedad) {
    propiedadesVerificadas[propiedad] = true;
    
    const status = document.getElementById(`status${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)}`);
    status.textContent = '✅';
    status.style.color = 'var(--verde-neon)';
    
    const item = document.getElementById(`prop${propiedad.charAt(0).toUpperCase() + propiedad.slice(1)}`);
    item.classList.add('verificada');
    
    // Verificar si todas están completas
    if (propiedadesVerificadas.reflexividad && 
        propiedadesVerificadas.simetria && 
        propiedadesVerificadas.transitividad) {
        
        setTimeout(() => {
            document.getElementById('resultadoChecklist').classList.add('visible');
        }, 500);
    }
}

// ========== QUIZ INLINE: EXPERIMENTO SIDMAN ==========
function responderQuizSidman(opcion) {
    const feedback = document.getElementById('feedbackSidman');
    const botones = document.querySelectorAll('.opcion-quiz');
    
    botones.forEach(b => b.style.pointerEvents = 'none');
    
    if (opcion === 2) {
        event.target.classList.add('correcta');
        feedback.innerHTML = `
            <div class="feedback-correcto">
                ✅ <strong>¡Correcto!</strong> Sidman probó si el niño podía relacionar la palabra hablada 
                "CAR" con la imagen del carro, aunque esta relación nunca fue entrenada directamente. 
                <br><br>
                El niño había aprendido: Palabra hablada → Palabra escrita<br>
                Y también sabía (de antes): Palabra escrita → Imagen<br>
                Por <strong>transitividad</strong>: Palabra hablada → Imagen ¡emergió sin entrenamiento!<br>
                <br>
                Esto fue el descubrimiento de las <strong>clases de equivalencia</strong>.
            </div>
        `;
    } else {
        event.target.classList.add('incorrecta');
        botones[1].classList.add('correcta');
        feedback.innerHTML = `
            <div class="feedback-incorrecto">
                ❌ Sidman probó una relación más compleja. La correcta era:<br><br>
                <strong>Palabra hablada "CAR" → Imagen de carro</strong><br><br>
                Esta relación nunca fue entrenada, pero emergió por <strong>transitividad</strong> 
                a través de la palabra escrita como elemento común. Este fue el descubrimiento 
                accidental que llevó a la teoría de equivalencia de estímulos.
            </div>
        `;
    }
    
    feedback.style.display = 'block';
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateY(0)';
    }, 50);
}

// ========== ANIMACIÓN 4: CALCULADORA DE EFICIENCIA ==========
function calcularEficiencia() {
    const n = parseInt(document.getElementById('sliderEstimulos').value);
    document.getElementById('valorEstimulos').textContent = n;
    
    // Fórmula: entrenadas = n-1 (estructura lineal mínima)
    const entrenadas = n - 1;
    
    // Fórmula total: n(n-1) = todas las relaciones posibles
    const total = n * (n - 1);
    
    // Derivadas = total - entrenadas
    const derivadas = total - entrenadas;
    
    // Eficiencia = (derivadas/entrenadas) * 100
    const eficiencia = Math.round((derivadas / entrenadas) * 100);
    
    // Relaciones por entrenada
    const porEntrenada = Math.round((derivadas / entrenadas) * 10) / 10;
    
    // Actualizar UI
    document.getElementById('numEntrenadas').textContent = entrenadas;
    document.getElementById('numDerivadas').textContent = derivadas;
    document.getElementById('numTotal').textContent = total;
    document.getElementById('eficienciaPorcentaje').textContent = eficiencia;
    document.getElementById('relacionesPorEntrenada').textContent = porEntrenada;
    
    // Barra de eficiencia
    const fill = document.getElementById('eficienciaFill');
    const porcentajeVisual = Math.min((eficiencia / 600) * 100, 100); // Max 600% visual
    fill.style.width = porcentajeVisual + '%';
    
    // Mensaje
    const mensaje = document.getElementById('calcMensaje');
    if (n === 3) {
        mensaje.innerHTML = '💡 Con 3 estímulos: entrenas 2, obtienes 6 totales (200% eficiencia)';
    } else if (n === 4) {
        mensaje.innerHTML = '🚀 Con 4 estímulos: entrenas 3, obtienes 12 totales (300% eficiencia)';
    } else if (n === 5) {
        mensaje.innerHTML = '🔥 Con 5 estímulos: entrenas 4, obtienes 20 totales (400% eficiencia)';
    } else if (n === 6) {
        mensaje.innerHTML = '⚡ Con 6 estímulos: entrenas 5, obtienes 30 totales (500% eficiencia)';
    } else if (n === 7) {
        mensaje.innerHTML = '💥 Con 7 estímulos: entrenas 6, obtienes 42 totales (600% eficiencia)';
    } else {
        mensaje.innerHTML = '🌟 Con 8 estímulos: entrenas 7, obtienes 56 totales (700% eficiencia)';
    }
    
    mensaje.style.opacity = '1';
}

// ========== EJERCICIO: CASOS DE CONSTRUCCIÓN DE REDES ==========
const casos = [
    {
        tipo: 'construccion',
        entrenadas: [{de: 'A', a: 'B'}, {de: 'B', a: 'C'}],
        pregunta: 'Tras entrenar A→B y B→C, ¿qué relación emerge por TRANSITIVIDAD?',
        opciones: [
            {texto: 'A → C', correcta: true, tipo: 'transitividad'},
            {texto: 'B → A', correcta: false, tipo: 'simetria'},
            {texto: 'C → B', correcta: false, tipo: 'simetria'},
            {texto: 'A → A', correcta: false, tipo: 'reflexividad'}
        ],
        feedback: '✅ Correcto. A→C emerge por TRANSITIVIDAD: A conecta con C a través del elemento común B. Esta relación nunca fue entrenada directamente.'
    },
    {
        tipo: 'construccion',
        entrenadas: [{de: 'A', a: 'B'}, {de: 'A', a: 'C'}],
        pregunta: 'Entrenaste A→B y A→C. ¿Qué relación emerge por SIMETRÍA desde la primera?',
        opciones: [
            {texto: 'B → A', correcta: true, tipo: 'simetria'},
            {texto: 'B → C', correcta: false, tipo: 'transitividad'},
            {texto: 'C → B', correcta: false, tipo: 'transitividad'},
            {texto: 'A → A', correcta: false, tipo: 'reflexividad'}
        ],
        feedback: '✅ Exacto. B→A emerge por SIMETRÍA de A→B. La relación se invierte automáticamente sin entrenamiento adicional.'
    },
    {
        tipo: 'construccion',
        entrenadas: [{de: 'A', a: 'B'}, {de: 'B', a: 'C'}],
        pregunta: 'Ya tienes A→B y B→C entrenadas, y A→C derivada. ¿Qué relación emerge combinando SIMETRÍA de B→C con TRANSITIVIDAD?',
        opciones: [
            {texto: 'A → C (ya derivada)', correcta: false, tipo: 'transitividad'},
            {texto: 'C → A', correcta: true, tipo: 'equivalencia'},
            {texto: 'B → A', correcta: false, tipo: 'simetria'},
            {texto: 'C → C', correcta: false, tipo: 'reflexividad'}
        ],
        feedback: '✅ Perfecto. C→A emerge por EQUIVALENCIA (combinación): Primero B→C se invierte a C→B (simetría), luego C→B + B→A = C→A (transitividad). ¡Esta es la prueba de equivalencia completa!'
    },
    {
        tipo: 'identificacion',
        red: {entrenadas: [{de: 'X', a: 'Y'}, {de: 'Y', a: 'Z'}], derivada: {de: 'Y', a: 'X'}},
        pregunta: 'Observa la red. La relación Y→X, ¿cómo se derivó?',
        opciones: [
            {texto: 'Por SIMETRÍA de X→Y', correcta: true, tipo: 'simetria'},
            {texto: 'Por TRANSITIVIDAD', correcta: false, tipo: 'transitividad'},
            {texto: 'Por REFLEXIVIDAD', correcta: false, tipo: 'reflexividad'},
            {texto: 'Fue ENTRENADA directamente', correcta: false, tipo: 'entrenada'}
        ],
        feedback: '✅ Correcto. Y→X es la SIMETRÍA de X→Y (entrenada). Se invirtió la dirección automáticamente.'
    },
    {
        tipo: 'identificacion',
        red: {entrenadas: [{de: 'P', a: 'Q'}, {de: 'Q', a: 'R'}], derivada: {de: 'P', a: 'R'}},
        pregunta: 'La relación P→R, ¿cómo emergió?',
        opciones: [
            {texto: 'Por TRANSITIVIDAD (P→Q + Q→R)', correcta: true, tipo: 'transitividad'},
            {texto: 'Por SIMETRÍA', correcta: false, tipo: 'simetria'},
            {texto: 'Por REFLEXIVIDAD', correcta: false, tipo: 'reflexividad'},
            {texto: 'No puede derivarse', correcta: false, tipo: 'ninguna'}
        ],
        feedback: '✅ Exacto. P→R emerge por TRANSITIVIDAD: P conecta con R a través del elemento común Q.'
    },
    {
        tipo: 'identificacion',
        red: {entrenadas: [{de: 'M', a: 'N'}, {de: 'N', a: 'O'}], derivada: {de: 'O', a: 'M'}},
        pregunta: 'La relación O→M es la más compleja. ¿Cómo se derivó?',
        opciones: [
            {texto: 'EQUIVALENCIA (simetría + transitividad combinadas)', correcta: true, tipo: 'equivalencia'},
            {texto: 'Solo por SIMETRÍA', correcta: false, tipo: 'simetria'},
            {texto: 'Solo por TRANSITIVIDAD', correcta: false, tipo: 'transitividad'},
            {texto: 'Por REFLEXIVIDAD', correcta: false, tipo: 'reflexividad'}
        ],
        feedback: '✅ Perfecto. O→M requiere EQUIVALENCIA completa: N→O se invierte a O→N (simetría), luego O→N + N→M (de invertir M→N) = O→M (transitividad). ¡Doblemente derivada!'
    },
    {
        tipo: 'construccion',
        entrenadas: [{de: 'D', a: 'E'}, {de: 'E', a: 'F'}, {de: 'F', a: 'G'}],
        pregunta: 'Cadena larga: D→E→F→G. ¿Qué relación emerge por transitividad entre los extremos?',
        opciones: [
            {texto: 'D → G', correcta: true, tipo: 'transitividad'},
            {texto: 'G → D', correcta: false, tipo: 'equivalencia'},
            {texto: 'E → G', correcta: false, tipo: 'transitividad'},
            {texto: 'D → F', correcta: false, tipo: 'transitividad'}
        ],
        feedback: '✅ Correcto. D→G emerge por TRANSITIVIDAD en cadena: D→E→F→G. Aunque hay múltiples pasos intermedios, D se conecta con G a través de E y F.'
    },
    {
        tipo: 'prediccion',
        entrenadas: [{de: 'A', a: 'B'}, {de: 'A', a: 'C'}],
        pregunta: 'Entrenaste A→B y A→C (one-to-many). ¿Cuántas relaciones TOTALES tendrás después de derivaciones?',
        opciones: [
            {texto: '6 relaciones (2 entrenadas + 4 derivadas)', correcta: true, tipo: 'calculo'},
            {texto: '4 relaciones', correcta: false, tipo: 'calculo'},
            {texto: '3 relaciones', correcta: false, tipo: 'calculo'},
            {texto: '8 relaciones', correcta: false, tipo: 'calculo'}
        ],
        feedback: '✅ Exacto. Entrenadas: A→B, A→C. Simetría: B→A, C→A. Transitividad: B→C, C→B. Total: 6 relaciones. ¡De 2 entrenadas a 6 totales!'
    },
    {
        tipo: 'aplicacion',
        contexto: 'Un niño aprende: Palabra hablada "CASA" → Imagen de casa. Luego: Imagen de casa → Palabra escrita CASA.',
        pregunta: 'Sin más entrenamiento, ¿qué nueva habilidad podría emerger?',
        opciones: [
            {texto: 'Leer "CASA" en voz alta (palabra escrita → hablada)', correcta: true, tipo: 'aplicacion'},
            {texto: 'Dibujar una casa', correcta: false, tipo: 'aplicacion'},
            {texto: 'Construir una casa', correcta: false, tipo: 'aplicacion'},
            {texto: 'Ninguna, necesita entrenamiento directo', correcta: false, tipo: 'aplicacion'}
        ],
        feedback: '✅ ¡Perfecto! Por TRANSITIVIDAD: Palabra hablada→Imagen + Imagen→Palabra escrita = Palabra hablada→Palabra escrita. Invertida por simetría: Palabra escrita→Palabra hablada (¡leer en voz alta!). Esto es equivalencia en acción educativa.'
    },
    {
        tipo: 'aplicacion',
        contexto: 'En terapia, una persona asocia: Situación social → Ansiedad. Luego forma equivalencia entre {Situación social, Pensar en situación, Palabra "fiesta"}.',
        pregunta: '¿Qué predice la equivalencia que pasará?',
        opciones: [
            {texto: 'La palabra "fiesta" provocará ansiedad (transferencia de función)', correcta: true, tipo: 'aplicacion'},
            {texto: 'La persona superará la ansiedad automáticamente', correcta: false, tipo: 'aplicacion'},
            {texto: 'Solo las situaciones reales provocarán ansiedad', correcta: false, tipo: 'aplicacion'},
            {texto: 'La equivalencia no se aplica a emociones', correcta: false, tipo: 'aplicacion'}
        ],
        feedback: '✅ Correcto. La equivalencia predice TRANSFERENCIA DE FUNCIONES: si la situación real provoca ansiedad, todos los miembros equivalentes (pensar, la palabra "fiesta") también la provocarán. Esto explica la generalización de respuestas emocionales y es clave para entender problemas clínicos.'
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
    
    // Mostrar instrucción según tipo
    const instruccion = document.getElementById('casoInstruccion');
    if (caso.tipo === 'construccion' || caso.tipo === 'identificacion' || caso.tipo === 'prediccion') {
        instruccion.innerHTML = `
            <div class="instruccion-box">
                <h4>📋 Relaciones Entrenadas:</h4>
                ${caso.entrenadas.map(r => `<div class="relacion-entrenada">${r.de} → ${r.a}</div>`).join('')}
            </div>
        `;
    } else if (caso.tipo === 'aplicacion') {
        instruccion.innerHTML = `
            <div class="instruccion-box aplicacion">
                <h4>🎯 Contexto Aplicado:</h4>
                <p>${caso.contexto}</p>
            </div>
        `;
    }
    
    // Dibujar red SVG
    dibujarRed(caso);
    
    // Pregunta
    document.getElementById('casoPregunta').innerHTML = `
        <div class="pregunta-texto">${caso.pregunta}</div>
    `;
    
    // Opciones
    const opcionesEl = document.getElementById('casoOpciones');
    opcionesEl.innerHTML = '';
    
    caso.opciones.forEach((opcion, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn-red';
        btn.textContent = opcion.texto;
        btn.onclick = () => verificarRespuesta(opcion.correcta, idx);
        opcionesEl.appendChild(btn);
    });
    
    document.getElementById('casoFeedback').innerHTML = '';
    document.getElementById('casoFeedback').className = 'caso-feedback';
}

// ========== DIBUJAR RED SVG ==========
function dibujarRed(caso) {
    const svg = document.getElementById('svgRed');
    svg.innerHTML = `
        <defs>
            <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#00FF88" />
            </marker>
            <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#00BCD4" />
            </marker>
            <marker id="arrowGold" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#FFD600" />
            </marker>
        </defs>
    `;
    
    if (caso.tipo === 'aplicacion') {
        // No dibujar red para casos de aplicación
        svg.style.display = 'none';
        return;
    }
    
    svg.style.display = 'block';
    
    // Obtener todos los nodos únicos
    const nodos = new Set();
    caso.entrenadas.forEach(r => {
        nodos.add(r.de);
        nodos.add(r.a);
    });
    
    const nodosArray = Array.from(nodos);
    const numNodos = nodosArray.length;
    
    // Posiciones circulares
    const centerX = 300;
    const centerY = 200;
    const radius = 120;
    
    const posiciones = {};
    nodosArray.forEach((nodo, idx) => {
        const angle = (idx / numNodos) * 2 * Math.PI - Math.PI / 2;
        posiciones[nodo] = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });
    
    // Dibujar relaciones entrenadas
    caso.entrenadas.forEach(rel => {
        const desde = posiciones[rel.de];
        const hacia = posiciones[rel.a];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', desde.x);
        line.setAttribute('y1', desde.y);
        line.setAttribute('x2', hacia.x);
        line.setAttribute('y2', hacia.y);
        line.setAttribute('stroke', '#00FF88');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('marker-end', 'url(#arrowGreen)');
        svg.appendChild(line);
    });
    
    // Dibujar relación derivada si existe
    if (caso.red && caso.red.derivada) {
        const desde = posiciones[caso.red.derivada.de];
        const hacia = posiciones[caso.red.derivada.a];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', desde.x);
        line.setAttribute('y1', desde.y);
        line.setAttribute('x2', hacia.x);
        line.setAttribute('y2', hacia.y);
        line.setAttribute('stroke', '#FFD600');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-dasharray', '5,5');
        line.setAttribute('marker-end', 'url(#arrowGold)');
        svg.appendChild(line);
    }
    
    // Dibujar nodos
    nodosArray.forEach(nodo => {
        const pos = posiciones[nodo];
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '30');
        circle.setAttribute('fill', '#00BCD4');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '4');
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 8);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '24');
        text.setAttribute('font-weight', 'bold');
        text.textContent = nodo;
        svg.appendChild(text);
    });
}

// ========== VERIFICAR RESPUESTA ==========
function verificarRespuesta(correcta, idx) {
    const caso = casos[casoActualIndex];
    const feedbackEl = document.getElementById('casoFeedback');
    const botonesOpciones = document.querySelectorAll('.opcion-btn-red');
    
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
                Dominas transitividad y equivalencia. Entiendes cómo se construyen redes, 
                cómo emergen relaciones derivadas, y la eficiencia multiplicadora del aprendizaje 
                por equivalencia. ¡Listo para el puente hacia RFT!
            </p>
        `;
    } else if (porcentajeFinal >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Tienes una comprensión sólida de equivalencia. Recuerda las tres propiedades: 
                reflexividad, simetría, transitividad. Todas deben estar presentes.
            </p>
        `;
    } else if (porcentajeFinal >= 60) {
        mensajeEl.innerHTML = `
            <p class="mensaje-regular">
                <strong>📚 BIEN</strong><br>
                Comprendes los conceptos básicos. Repasa cómo la transitividad conecta relaciones 
                a través de elementos comunes, y cómo la equivalencia combina las tres propiedades.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>🔄 NECESITAS REPASAR</strong><br>
                Revisa los bloques teóricos. Enfócate en: (1) Transitividad = A→B + B→C = A→C, 
                (2) Equivalencia = las tres propiedades juntas. ¡Repite el ejercicio!
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
    calcularEficiencia(); // Inicializar calculadora
});
