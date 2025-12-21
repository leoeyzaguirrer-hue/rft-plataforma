// ==========================================
// INTEGRACIÓN FINAL - MÓDULO 2
// Laboratorio Completo de Equivalencia a RFT
// ==========================================

// ========== ESTADO GLOBAL ==========
let faseActual = 0;
let decisionActual = 0;
let aciertosDesafio = 0;
let scoresPorCategoria = {
    identificacion: 0,
    prediccion: 0,
    distincion: 0,
    aplicacion: 0
};
let relacionesEntrenadas = 0;
let relacionesDerivadas = 0;

// ========== NAVEGACIÓN PANTALLAS ==========
function mostrarPantalla(id) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
    document.getElementById(id).classList.add('activa');
    window.scrollTo(0, 0);
}

function comenzarIntegracion() {
    mostrarPantalla('experimento');
    inicializarExperimento();
}

function irADesafio() {
    mostrarPantalla('desafio');
    inicializarDesafio();
}

function irAPuente() {
    mostrarPantalla('puente');
}

function irAModulo3() {
    // En producción: window.location.href = '../modulo-03/index.html';
    alert('🚀 ¡Próximamente: Módulo 3 - RFT Completo!');
}

// ========== PARTE 1: EXPERIMENTO ==========
const fasesExperimento = [
    {
        tipo: 'entrenamiento',
        titulo: 'Fase 1-2: Entrenamiento A→B',
        instruccion: 'Entrena las relaciones entre el conjunto A y el conjunto B. Haz click en cada par para entrenarlos.',
        pares: [
            {muestra: '漢', comparacion: '🐕', relacion: 'A1→B1'},
            {muestra: '字', comparacion: '🐱', relacion: 'A2→B2'},
            {muestra: '文', comparacion: '🐦', relacion: 'A3→B3'}
        ],
        relacionesAgregar: ['A1-B1', 'A2-B2', 'A3-B3'],
        tipoLinea: 'entrenada'
    },
    {
        tipo: 'entrenamiento',
        titulo: 'Fase 3-4: Entrenamiento B→C',
        instruccion: 'Ahora entrena las relaciones entre B y C. El conjunto B actuará como elemento común.',
        pares: [
            {muestra: '🐕', comparacion: 'PERRO', relacion: 'B1→C1'},
            {muestra: '🐱', comparacion: 'GATO', relacion: 'B2→C2'},
            {muestra: '🐦', comparacion: 'PÁJARO', relacion: 'B3→C3'}
        ],
        relacionesAgregar: ['B1-C1', 'B2-C2', 'B3-C3'],
        tipoLinea: 'entrenada'
    },
    {
        tipo: 'prueba',
        titulo: 'Fase 5: Prueba de Reflexividad',
        instruccion: '¿Cada estímulo es igual a sí mismo? Verifica la reflexividad.',
        pares: [
            {muestra: '漢', comparacion: '漢', relacion: 'A1=A1'},
            {muestra: '🐕', comparacion: '🐕', relacion: 'B1=B1'},
            {muestra: 'PERRO', comparacion: 'PERRO', relacion: 'C1=C1'}
        ],
        explicacion: '✅ Reflexividad confirmada. Cada estímulo es igual a sí mismo sin entrenamiento directo.'
    },
    {
        tipo: 'prueba',
        titulo: 'Fase 6: Prueba de Simetría',
        instruccion: '¿Las relaciones se invierten? Si A→B, ¿entonces B→A?',
        pares: [
            {muestra: '🐕', comparacion: '漢', relacion: 'B1→A1 (simetría de A1→B1)'},
            {muestra: 'PERRO', comparacion: '🐕', relacion: 'C1→B1 (simetría de B1→C1)'}
        ],
        relacionesAgregar: ['B1-A1', 'B2-A2', 'B3-A3', 'C1-B1', 'C2-B2', 'C3-B3'],
        tipoLinea: 'derivada',
        explicacion: '✅ Simetría confirmada. Las relaciones son bidireccionales sin entrenamiento directo.'
    },
    {
        tipo: 'prueba',
        titulo: 'Fase 7: Prueba de Transitividad',
        instruccion: 'Si A→B y B→C, ¿entonces A→C? Verifica la conexión transitiva.',
        pares: [
            {muestra: '漢', comparacion: 'PERRO', relacion: 'A1→C1 (transitiva: A1→B1→C1)'},
            {muestra: '字', comparacion: 'GATO', relacion: 'A2→C2 (transitiva)'}
        ],
        relacionesAgregar: ['A1-C1', 'A2-C2', 'A3-C3'],
        tipoLinea: 'derivada',
        explicacion: '✅ Transitividad confirmada. A conecta con C a través del elemento común B.'
    },
    {
        tipo: 'prueba',
        titulo: 'Fase 8: Prueba de Equivalencia',
        instruccion: 'La prueba definitiva: ¿C→A? (Requiere simetría + transitividad combinadas)',
        pares: [
            {muestra: 'PERRO', comparacion: '漢', relacion: 'C1→A1 (equivalencia completa)'},
            {muestra: 'GATO', comparacion: '字', relacion: 'C2→A2 (equivalencia)'}
        ],
        relacionesAgregar: ['C1-A1', 'C2-A2', 'C3-A3'],
        tipoLinea: 'derivada',
        explicacion: '✅ EQUIVALENCIA COMPLETA confirmada. C→A emerge sin entrenamiento directo. ¡Clase de equivalencia formada!'
    },
    {
        tipo: 'resultado',
        titulo: 'Fase 9: Red de Equivalencia Completa',
        instruccion: 'Observa la red completa de relaciones que has formado.'
    }
];

function inicializarExperimento() {
    faseActual = 0;
    relacionesEntrenadas = 6;
    relacionesDerivadas = 48;
    dibujarRedVacia();
    cargarFase();
}

function cargarFase() {
    if (faseActual >= fasesExperimento.length) {
        mostrarResultadoExperimento();
        return;
    }
    
    const fase = fasesExperimento[faseActual];
    
    document.getElementById('faseActual').textContent = faseActual + 1;
    document.getElementById('faseEtiqueta').textContent = fase.tipo.toUpperCase();
    document.getElementById('faseTitulo').textContent = fase.titulo;
    document.getElementById('faseInstruccion').textContent = fase.instruccion;
    
    const estimulosEl = document.getElementById('faseEstimulos');
    estimulosEl.innerHTML = '';
    
    if (fase.tipo === 'resultado') {
        document.getElementById('faseFeedback').innerHTML = '';
        document.getElementById('btnFase').textContent = 'Ver Resultados →';
    } else {
        // Mostrar pares de estímulos
        fase.pares.forEach((par, idx) => {
            const parEl = document.createElement('div');
            parEl.className = 'par-estimulos';
            parEl.innerHTML = `
                <div class="estimulo-box muestra">
                    <div class="estimulo-contenido">${par.muestra}</div>
                    <div class="estimulo-label">Muestra</div>
                </div>
                <div class="flecha-relacion">→</div>
                <div class="estimulo-box comparacion">
                    <div class="estimulo-contenido">${par.comparacion}</div>
                    <div class="estimulo-label">Comparación</div>
                </div>
                <div class="relacion-label">${par.relacion}</div>
            `;
            estimulosEl.appendChild(parEl);
        });
        
        document.getElementById('faseFeedback').innerHTML = '';
        document.getElementById('btnFase').textContent = 'Continuar →';
    }
}

function avanzarFase() {
    const fase = fasesExperimento[faseActual];
    
    // Agregar relaciones a la red
    if (fase.relacionesAgregar) {
        fase.relacionesAgregar.forEach(rel => {
            agregarRelacionARed(rel, fase.tipoLinea || 'entrenada');
        });
    }
    
    // Mostrar explicación si existe
    if (fase.explicacion) {
        const feedbackEl = document.getElementById('faseFeedback');
        feedbackEl.innerHTML = `<div class="feedback-fase">${fase.explicacion}</div>`;
        feedbackEl.style.display = 'block';
        
        setTimeout(() => {
            faseActual++;
            cargarFase();
        }, 2000);
    } else {
        faseActual++;
        cargarFase();
    }
}

function mostrarResultadoExperimento() {
    document.querySelector('.experimento-container').style.display = 'none';
    document.getElementById('resultadoExperimento').style.display = 'block';
    
    document.getElementById('numEntrenadas').textContent = relacionesEntrenadas;
    document.getElementById('numDerivadas').textContent = relacionesDerivadas;
    document.getElementById('numTotal').textContent = relacionesEntrenadas + relacionesDerivadas;
}

// ========== VISUALIZACIÓN RED SVG ==========
const posicionesNodos = {
    'A1': {x: 150, y: 100}, 'A2': {x: 150, y: 200}, 'A3': {x: 150, y: 300},
    'B1': {x: 400, y: 100}, 'B2': {x: 400, y: 200}, 'B3': {x: 400, y: 300},
    'C1': {x: 650, y: 100}, 'C2': {x: 650, y: 200}, 'C3': {x: 650, y: 300}
};

const nodosLabels = {
    'A1': '漢', 'A2': '字', 'A3': '文',
    'B1': '🐕', 'B2': '🐱', 'B3': '🐦',
    'C1': 'PERRO', 'C2': 'GATO', 'C3': 'PÁJARO'
};

function dibujarRedVacia() {
    const svg = document.getElementById('svgRed');
    
    // Dibujar nodos
    Object.keys(posicionesNodos).forEach(nodo => {
        const pos = posicionesNodos[nodo];
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '35');
        circle.setAttribute('fill', '#00BCD4');
        circle.setAttribute('stroke', 'white');
        circle.setAttribute('stroke-width', '4');
        circle.setAttribute('id', `nodo-${nodo}`);
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 8);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '20');
        text.setAttribute('font-weight', 'bold');
        text.textContent = nodosLabels[nodo];
        svg.appendChild(text);
    });
}

function agregarRelacionARed(relacion, tipo) {
    const [desde, hacia] = relacion.split('-');
    const posDesde = posicionesNodos[desde];
    const posHacia = posicionesNodos[hacia];
    
    if (!posDesde || !posHacia) return;
    
    const svg = document.getElementById('svgRed');
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    
    line.setAttribute('x1', posDesde.x);
    line.setAttribute('y1', posDesde.y);
    line.setAttribute('x2', posHacia.x);
    line.setAttribute('y2', posHacia.y);
    line.setAttribute('stroke', tipo === 'entrenada' ? '#00FF88' : '#FFD600');
    line.setAttribute('stroke-width', '4');
    line.setAttribute('marker-end', tipo === 'entrenada' ? 'url(#arrowEntrenada)' : 'url(#arrowDerivada)');
    line.setAttribute('opacity', '0');
    line.classList.add('relacion-animada');
    
    svg.insertBefore(line, svg.firstChild);
    
    setTimeout(() => {
        line.setAttribute('opacity', '1');
    }, 100);
}

// ========== PARTE 2: DESAFÍO CONCEPTUAL ==========
const decisiones = [
    // CATEGORÍA 1: IDENTIFICACIÓN (3 decisiones)
    {
        categoria: 'identificacion',
        icono: '🔍',
        nombre: 'IDENTIFICACIÓN',
        contexto: 'Un niño de 4 años aprende la relación: palabra hablada "DOG" → imagen de perro 🐕.',
        pregunta: 'Luego, sin entrenamiento adicional, el niño ve la imagen 🐕 y dice "dog". ¿Qué propiedad se demuestra?',
        opciones: [
            {texto: 'Reflexividad (el estímulo es igual a sí mismo)', correcta: false},
            {texto: 'Simetría (inversión de la relación entrenada)', correcta: true},
            {texto: 'Transitividad (conexión a través de elemento común)', correcta: false},
            {texto: 'No hay suficiente información', correcta: false}
        ],
        feedback: '✅ Correcto. Esto demuestra SIMETRÍA. Se entrenó palabra→imagen, y emergió imagen→palabra (inversión) sin entrenamiento directo. Esta es una de las tres propiedades definitorias de equivalencia.'
    },
    {
        categoria: 'identificacion',
        icono: '🔍',
        nombre: 'IDENTIFICACIÓN',
        contexto: 'En un experimento, se entrena: A1→B1, A2→B2. Luego se prueba si el sujeto puede hacer A1→A1 (seleccionar A1 cuando la muestra es A1).',
        pregunta: '¿Qué propiedad se está evaluando?',
        opciones: [
            {texto: 'Reflexividad', correcta: true},
            {texto: 'Simetría', correcta: false},
            {texto: 'Transitividad', correcta: false},
            {texto: 'Equivalencia completa', correcta: false}
        ],
        feedback: '✅ Exacto. Esto evalúa REFLEXIVIDAD: la capacidad de igualar un estímulo consigo mismo (A=A). Aunque parece trivial, es una propiedad fundamental de las clases de equivalencia y debe demostrarse empíricamente.'
    },
    {
        categoria: 'identificacion',
        icono: '🔍',
        nombre: 'IDENTIFICACIÓN',
        contexto: 'Se entrena: palabra "CASA" → imagen de casa 🏠, y palabra "CASA" → palabra escrita CASA.',
        pregunta: 'Sin más entrenamiento, el niño puede seleccionar la palabra escrita CASA cuando ve la imagen 🏠. ¿Qué explica esto?',
        opciones: [
            {texto: 'Solo simetría', correcta: false},
            {texto: 'Solo transitividad', correcta: false},
            {texto: 'Transitividad (palabra es elemento común)', correcta: true},
            {texto: 'Generalización por similitud física', correcta: false}
        ],
        feedback: '✅ Correcto. Esto es TRANSITIVIDAD. Palabra hablada actúa como elemento común: 🏠←Palabra→CASA, por tanto 🏠→CASA emerge sin entrenamiento directo. No puede ser simetría sola porque esas relaciones nunca fueron entrenadas directamente.'
    },
    
    // CATEGORÍA 2: PREDICCIÓN (3 decisiones)
    {
        categoria: 'prediccion',
        icono: '🔮',
        nombre: 'PREDICCIÓN',
        contexto: 'Usas procedimiento LINEAL y entrenas: A1→B1, A2→B2, A3→B3 (primera discriminación), luego B1→C1, B2→C2, B3→C3 (segunda discriminación).',
        pregunta: 'Si se forma equivalencia completa, ¿cuántas relaciones TOTALES tendrás (entrenadas + derivadas)?',
        opciones: [
            {texto: '6 relaciones (solo las entrenadas)', correcta: false},
            {texto: '18 relaciones', correcta: false},
            {texto: '54 relaciones', correcta: true},
            {texto: '27 relaciones', correcta: false}
        ],
        feedback: '✅ Perfecto. Con 9 estímulos en 3 clases de equivalencia, cada clase tiene 3 estímulos. Relaciones totales: 3 clases × (3×3) = 3 × 9 = 27... NO. Corrección: Cada estímulo se relaciona con cada otro: 9 estímulos × 6 relaciones cada uno (con los otros 8 + sí mismo) = 54 totales. Entrenaste 6, derivaron 48.'
    },
    {
        categoria: 'prediccion',
        icono: '🔮',
        nombre: 'PREDICCIÓN',
        contexto: 'Un niño forma equivalencia entre {Palabra hablada "PERRO", Imagen 🐕, Palabra escrita PERRO}. Tiene miedo a perros reales.',
        pregunta: '¿Qué predice la teoría de equivalencia que pasará?',
        opciones: [
            {texto: 'Solo tendrá miedo a perros reales', correcta: false},
            {texto: 'El miedo se transferirá a todos los miembros de la clase', correcta: true},
            {texto: 'El miedo desaparecerá por la equivalencia', correcta: false},
            {texto: 'Equivalencia no predice transferencia de funciones emocionales', correcta: false}
        ],
        feedback: '✅ Correcto. La equivalencia predice TRANSFERENCIA DE FUNCIONES: si un miembro de la clase (perro real) evoca miedo, esa función se transferirá a todos los miembros equivalentes (palabra hablada, imagen, palabra escrita). Esto explica generalización de fobias.'
    },
    {
        categoria: 'prediccion',
        icono: '🔮',
        nombre: 'PREDICCIÓN',
        contexto: 'Entrenas procedimiento UNO-A-MUCHOS: A→B, A→C, A→D (mismo conjunto de muestras A, múltiples comparaciones).',
        pregunta: '¿Qué relación derivada es más probable que emerja PRIMERO y más robustamente?',
        opciones: [
            {texto: 'A→A (reflexividad)', correcta: false},
            {texto: 'B→C, C→B (equivalencia entre comparaciones)', correcta: true},
            {texto: 'D→A (simetría)', correcta: false},
            {texto: 'Todas emergen simultáneamente', correcta: false}
        ],
        feedback: '✅ Exacto. En UNO-A-MUCHOS, la prueba crítica típica es B↔C (equivalencia entre las comparaciones que comparten la misma muestra A). Esta relación emerge más consistentemente porque ambas fueron emparejadas con el mismo estímulo común.'
    },
    
    // CATEGORÍA 3: DISTINCIÓN (3 decisiones)
    {
        categoria: 'distincion',
        icono: '🌈',
        nombre: 'DISTINCIÓN',
        contexto: 'Un niño aprende que "GRANDE" es lo opuesto de "pequeño", y luego deriva que "feliz" es opuesto a "triste".',
        pregunta: '¿Es esto equivalencia de estímulos?',
        opciones: [
            {texto: 'SÍ, forma clase de equivalencia entre opuestos', correcta: false},
            {texto: 'NO, es marco relacional de OPOSICIÓN (RFT)', correcta: true},
            {texto: 'SÍ, demuestra simetría', correcta: false},
            {texto: 'Es generalización simple, no equivalencia ni RFT', correcta: false}
        ],
        feedback: '✅ Perfecto. Esto NO es equivalencia, es MARCO DE OPOSICIÓN (estudiado por RFT). "Grande" NO es igual/intercambiable con "pequeño". La equivalencia solo explica relaciones de coordinación/igualdad. RFT expande para incluir oposición, comparación, etc.'
    },
    {
        categoria: 'distincion',
        icono: '🌈',
        nombre: 'DISTINCIÓN',
        contexto: 'Un niño aprende que 10 > 5, y luego deriva que 15 > 10 > 5, por tanto 15 > 5.',
        pregunta: '¿Puede la equivalencia de estímulos explicar esta derivación?',
        opciones: [
            {texto: 'SÍ, es transitividad de equivalencia', correcta: false},
            {texto: 'NO, es marco COMPARATIVO (RFT), no equivalencia', correcta: true},
            {texto: 'SÍ, demuestra que 15, 10 y 5 son equivalentes', correcta: false},
            {texto: 'Parcialmente, es una forma de equivalencia', correcta: false}
        ],
        feedback: '✅ Correcto. Esto NO es equivalencia, es MARCO COMPARATIVO. La relación "mayor que" NO es simétrica como equivalencia: si 10>5, entonces 5 NO es >10. Tiene su propia lógica transitiva, pero no forma clase de equivalencia. RFT lo estudia, equivalencia no.'
    },
    {
        categoria: 'distincion',
        icono: '🌈',
        nombre: 'DISTINCIÓN',
        contexto: 'Una persona aprende que "fumar causa cáncer" y luego evita fumar.',
        pregunta: '¿Es "fumar → cáncer" una relación de equivalencia?',
        opciones: [
            {texto: 'SÍ, fumar y cáncer forman clase de equivalencia', correcta: false},
            {texto: 'NO, es marco CAUSAL (RFT), no coordinación', correcta: true},
            {texto: 'SÍ, demuestra transitividad', correcta: false},
            {texto: 'Es condicionamiento clásico, no equivalencia ni RFT', correcta: false}
        ],
        feedback: '✅ Exacto. Esto es MARCO CAUSAL, no equivalencia. "Fumar" NO es igual/intercambiable con "cáncer". Es una relación direccional causa-efecto. NO es simétrica: si fumar causa cáncer, cáncer NO causa fumar. RFT estudia marcos causales; equivalencia no puede explicarlos.'
    },
    
    // CATEGORÍA 4: APLICACIÓN CLÍNICA (3 decisiones)
    {
        categoria: 'aplicacion',
        icono: '🏥',
        nombre: 'APLICACIÓN CLÍNICA',
        contexto: 'Cliente con TOC asocia "tocó picaporte" con "contaminación". Ahora siente ansiedad incluso cuando piensa en la palabra "picaporte" o ve una foto.',
        pregunta: '¿Cómo explica la equivalencia esta generalización?',
        opciones: [
            {texto: 'No puede explicarlo, es condicionamiento clásico', correcta: false},
            {texto: 'Transferencia de funciones por equivalencia entre {picaporte real, palabra, imagen}', correcta: true},
            {texto: 'Generalización por similitud física', correcta: false},
            {texto: 'Es marco causal, no equivalencia', correcta: false}
        ],
        feedback: '✅ Perfecto. La equivalencia explica esto mediante TRANSFERENCIA DE FUNCIONES. Si {picaporte real, palabra "picaporte", imagen} forman clase de equivalencia, la función aversiva (ansiedad) se transfiere a todos los miembros. Esto explica cómo símbolos evocan mismas respuestas que eventos reales.'
    },
    {
        categoria: 'aplicacion',
        icono: '🏥',
        nombre: 'APLICACIÓN CLÍNICA',
        contexto: 'Terapeuta usa exposición: cliente con fobia a arañas primero mira fotos, luego videos, gradualmente hasta arañas reales. La fobia disminuye.',
        pregunta: 'Desde equivalencia, ¿por qué funciona empezar con fotos?',
        opciones: [
            {texto: 'Las fotos no forman equivalencia con arañas reales', correcta: false},
            {texto: 'Si {foto, araña real} son equivalentes, trabajar con uno afecta al otro', correcta: true},
            {texto: 'Es desensibilización sistemática, no relacionado con equivalencia', correcta: false},
            {texto: 'Las fotos son menos amenazantes por tamaño físico', correcta: false}
        ],
        feedback: '✅ Correcto. Si {foto de araña, araña real} forman clase de equivalencia, intervenir sobre uno (exposición a foto sin consecuencias negativas) puede alterar las funciones de todos los miembros, incluyendo araña real. La equivalencia explica por qué trabajar con símbolos/representaciones afecta respuestas a eventos reales.'
    },
    {
        categoria: 'aplicacion',
        icono: '🏥',
        nombre: 'APLICACIÓN CLÍNICA',
        contexto: 'Cliente deprimido tiene pensamiento "Soy un fracaso". Terapeuta ACT trabaja en cambiar la RELACIÓN con ese pensamiento (verlo como pensamiento, no verdad).',
        pregunta: '¿Qué concepto de equivalencia/RFT se está aplicando?',
        opciones: [
            {texto: 'Romper equivalencia entre "yo" y "fracaso"', correcta: false},
            {texto: 'Cambiar el MARCO RELACIONAL, no el contenido', correcta: true},
            {texto: 'Formar nueva clase de equivalencia positiva', correcta: false},
            {texto: 'No usa equivalencia ni RFT, es reestructuración cognitiva', correcta: false}
        ],
        feedback: '✅ Perfecto. ACT usa RFT: no intenta cambiar el contenido del pensamiento, sino el MARCO RELACIONAL. Si "yo" está relacionado con "fracaso" por coordinación rígida (yo=fracaso), ACT promueve marcos alternativos (distinción: yo≠pensamiento; jerarquía: yo⊃pensamientos). Esto es flexibilidad psicológica.'
    }
];

function inicializarDesafio() {
    decisionActual = 0;
    aciertosDesafio = 0;
    scoresPorCategoria = {identificacion: 0, prediccion: 0, distincion: 0, aplicacion: 0};
    cargarDecision();
}

function cargarDecision() {
    if (decisionActual >= decisiones.length) {
        mostrarResultadoDesafio();
        return;
    }
    
    const decision = decisiones[decisionActual];
    
    document.getElementById('decisionActual').textContent = decisionActual + 1;
    document.getElementById('aciertosDesafio').textContent = aciertosDesafio;
    
    const progreso = ((decisionActual / decisiones.length) * 100);
    document.getElementById('progresoDesafio').style.width = progreso + '%';
    
    // Banner de categoría
    document.getElementById('categoriaIcono').textContent = decision.icono;
    document.getElementById('categoriaNombre').textContent = decision.nombre;
    
    // Contenido de decisión
    document.getElementById('decisionContexto').innerHTML = `
        <div class="contexto-box">
            <strong>Contexto:</strong> ${decision.contexto}
        </div>
    `;
    
    document.getElementById('decisionPregunta').innerHTML = `
        <div class="pregunta-box">
            ${decision.pregunta}
        </div>
    `;
    
    // Opciones
    const opcionesEl = document.getElementById('decisionOpciones');
    opcionesEl.innerHTML = '';
    
    decision.opciones.forEach((opcion, idx) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-desafio';
        btn.textContent = opcion.texto;
        btn.onclick = () => verificarDecision(opcion.correcta, idx);
        opcionesEl.appendChild(btn);
    });
    
    document.getElementById('decisionFeedback').innerHTML = '';
}

function verificarDecision(correcta, idx) {
    const decision = decisiones[decisionActual];
    const feedbackEl = document.getElementById('decisionFeedback');
    const botones = document.querySelectorAll('.opcion-desafio');
    
    botones.forEach(btn => btn.style.pointerEvents = 'none');
    
    botones.forEach((btn, i) => {
        if (decision.opciones[i].correcta) {
            btn.classList.add('correcta');
        }
    });
    
    if (correcta) {
        aciertosDesafio++;
        scoresPorCategoria[decision.categoria]++;
        feedbackEl.className = 'decision-feedback correcto';
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                ${decision.feedback}
            </div>
            <button class="btn-siguiente-decision" onclick="siguienteDecision()">
                Siguiente decisión →
            </button>
        `;
    } else {
        feedbackEl.className = 'decision-feedback incorrecto';
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                <p>❌ Incorrecto.</p>
                ${decision.feedback}
            </div>
            <button class="btn-siguiente-decision" onclick="siguienteDecision()">
                Siguiente decisión →
            </button>
        `;
    }
    
    document.getElementById('aciertosDesafio').textContent = aciertosDesafio;
}

function siguienteDecision() {
    decisionActual++;
    cargarDecision();
}

function mostrarResultadoDesafio() {
    document.querySelector('.desafio-container').style.display = 'none';
    document.querySelector('.categoria-banner').style.display = 'none';
    document.getElementById('resultadoDesafio').style.display = 'block';
    
    const porcentaje = Math.round((aciertosDesafio / decisiones.length) * 100);
    
    document.getElementById('totalAciertos').textContent = aciertosDesafio;
    document.getElementById('porcentajeDesafio').textContent = porcentaje;
    
    document.getElementById('scoreIdentif').textContent = scoresPorCategoria.identificacion;
    document.getElementById('scorePredict').textContent = scoresPorCategoria.prediccion;
    document.getElementById('scoreDistinc').textContent = scoresPorCategoria.distincion;
    document.getElementById('scoreAplicac').textContent = scoresPorCategoria.aplicacion;
    
    const mensajeEl = document.getElementById('mensajeDesafio');
    
    if (porcentaje >= 90) {
        mensajeEl.innerHTML = `
            <p class="mensaje-excelente">
                <strong>🏆 ¡EXCELENTE!</strong><br>
                Dominas completamente los conceptos de equivalencia. Distingues claramente entre 
                equivalencia y otros marcos, predices derivaciones, y aplicas el conocimiento a 
                contextos clínicos. ¡Estás listo para RFT completo!
            </p>
        `;
    } else if (porcentaje >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Tienes comprensión sólida de equivalencia. Áreas fuertes: 
                ${Object.entries(scoresPorCategoria).filter(([k,v]) => v === 3).map(([k]) => k).join(', ') || 'todas en desarrollo'}. 
                Continúa refinando tu comprensión conceptual.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>📚 SIGUE PRACTICANDO</strong><br>
                Revisa los conceptos del módulo, especialmente las categorías donde tuviste menos 
                aciertos. La integración requiere comprender no solo las definiciones, sino sus 
                aplicaciones y límites.
            </p>
        `;
    }
}

// ========== PARTE 3: PUENTE A RFT ==========
function responderPreguntaCritica(respuesta) {
    const feedbackEl = document.getElementById('respuestaCritica');
    const botones = document.querySelectorAll('.opcion-pregunta');
    
    botones.forEach(btn => btn.style.pointerEvents = 'none');
    
    if (respuesta === 'no') {
        event.target.classList.add('correcta');
        feedbackEl.innerHTML = `
            <div class="feedback-correcto-critico">
                ✅ <strong>¡Exacto!</strong> La equivalencia solo explica relaciones de <strong>coordinación/igualdad</strong>. 
                No puede explicar "más grande que" (comparación), "opuesto a" (oposición), "causa de" (causalidad), 
                "parte de" (jerarquía), etc.<br><br>
                Para entender TODAS las relaciones del lenguaje humano, necesitamos un marco teórico más amplio...
            </div>
        `;
    } else {
        event.target.classList.add('incorrecta');
        botones[1].classList.add('correcta');
        feedbackEl.innerHTML = `
            <div class="feedback-incorrecto-critico">
                ❌ La equivalencia NO puede explicar estas relaciones. Solo explica coordinación/igualdad 
                (A=B=C, intercambiables). Relaciones como "mayor que", "opuesto a", "causa de" tienen 
                lógicas diferentes que la equivalencia no captura.<br><br>
                Para esto necesitamos RFT...
            </div>
        `;
    }
    
    feedbackEl.style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('transicionRFT').style.display = 'block';
        document.getElementById('transicionRFT').scrollIntoView({behavior: 'smooth'});
    }, 2000);
}

function verResumen() {
    document.getElementById('modalResumen').classList.add('visible');
    
    // Llenar datos
    document.getElementById('resumenEntrenadas').textContent = relacionesEntrenadas;
    document.getElementById('resumenDerivadas').textContent = relacionesDerivadas;
    document.getElementById('resumenAciertos').textContent = `${aciertosDesafio}/12`;
    document.getElementById('resumenPorcentaje').textContent = Math.round((aciertosDesafio / 12) * 100) + '%';
}

function cerrarResumen() {
    document.getElementById('modalResumen').classList.remove('visible');
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
