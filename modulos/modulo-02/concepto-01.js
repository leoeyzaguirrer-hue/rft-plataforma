// ============================================
// MÓDULO 2 - LABORATORIO DE EQUIVALENCIA
// VERSIÓN CORREGIDA
// ============================================

// ============================================
// ESTADO GLOBAL
// ============================================

let contadorGlobal = 0;
let faseActual = 0;
let relacionesEntrenadas = 0;
let relacionesSimetria = 0;
let relacionesTransitividad = 0;

// Predicciones del alumno
let predicciones = {};

// ============================================
// DEFINICIÓN DE ESTÍMULOS POR CONJUNTO
// ============================================

const conjuntos = {
    A: [
        { id: 'A1', texto: '犬', nombre: 'Kanji perro' },
        { id: 'A2', texto: '猫', nombre: 'Kanji gato' },
        { id: 'A3', texto: '鳥', nombre: 'Kanji pájaro' }
    ],
    B: [
        { id: 'B1', texto: 'PERRO', nombre: 'Palabra perro' },
        { id: 'B2', texto: 'GATO', nombre: 'Palabra gato' },
        { id: 'B3', texto: 'PÁJARO', nombre: 'Palabra pájaro' }
    ],
    C: [
        { id: 'C1', texto: '🐕', nombre: 'Emoji perro' },
        { id: 'C2', texto: '🐈', nombre: 'Emoji gato' },
        { id: 'C3', texto: '🐦', nombre: 'Emoji pájaro' }
    ],
    D: [
        { id: 'D1', texto: '🔵', nombre: 'Círculo azul' },
        { id: 'D2', texto: '🟥', nombre: 'Cuadrado rojo' },
        { id: 'D3', texto: '🔺', nombre: 'Triángulo rojo' }
    ],
    E: [
        { id: 'E1', texto: '①', nombre: 'Número uno' },
        { id: 'E2', texto: '②', nombre: 'Número dos' },
        { id: 'E3', texto: '③', nombre: 'Número tres' }
    ]
};

// ============================================
// DEFINICIÓN DE RELACIONES
// ============================================

let relaciones = [];

function inicializarRelaciones() {
    relaciones = [
        // FASE 1: A→B (entrenadas)
        { from: 'A1', to: 'B1', tipo: 'entrenada', activa: false, fase: 1 },
        { from: 'A2', to: 'B2', tipo: 'entrenada', activa: false, fase: 1 },
        { from: 'A3', to: 'B3', tipo: 'entrenada', activa: false, fase: 1 },
        
        // FASE 2: B→A (simetría derivada)
        { from: 'B1', to: 'A1', tipo: 'simetria', activa: false, fase: 2 },
        { from: 'B2', to: 'A2', tipo: 'simetria', activa: false, fase: 2 },
        { from: 'B3', to: 'A3', tipo: 'simetria', activa: false, fase: 2 },
        
        // FASE 3: B→C (entrenadas)
        { from: 'B1', to: 'C1', tipo: 'entrenada', activa: false, fase: 3 },
        { from: 'B2', to: 'C2', tipo: 'entrenada', activa: false, fase: 3 },
        { from: 'B3', to: 'C3', tipo: 'entrenada', activa: false, fase: 3 },
        { from: 'C1', to: 'B1', tipo: 'simetria', activa: false, fase: 3 },
        { from: 'C2', to: 'B2', tipo: 'simetria', activa: false, fase: 3 },
        { from: 'C3', to: 'B3', tipo: 'simetria', activa: false, fase: 3 },
        
        // FASE 4: A→C y C→A (transitividad)
        { from: 'A1', to: 'C1', tipo: 'transitividad', activa: false, fase: 4 },
        { from: 'A2', to: 'C2', tipo: 'transitividad', activa: false, fase: 4 },
        { from: 'A3', to: 'C3', tipo: 'transitividad', activa: false, fase: 4 },
        { from: 'C1', to: 'A1', tipo: 'transitividad', activa: false, fase: 4 },
        { from: 'C2', to: 'A2', tipo: 'transitividad', activa: false, fase: 4 },
        { from: 'C3', to: 'A3', tipo: 'transitividad', activa: false, fase: 4 },
        
        // FASE 5: C→D (entrenadas + simetrías)
        { from: 'C1', to: 'D1', tipo: 'entrenada', activa: false, fase: 5 },
        { from: 'C2', to: 'D2', tipo: 'entrenada', activa: false, fase: 5 },
        { from: 'C3', to: 'D3', tipo: 'entrenada', activa: false, fase: 5 },
        { from: 'D1', to: 'C1', tipo: 'simetria', activa: false, fase: 5 },
        { from: 'D2', to: 'C2', tipo: 'simetria', activa: false, fase: 5 },
        { from: 'D3', to: 'C3', tipo: 'simetria', activa: false, fase: 5 },
        
        // FASE 6: Transitividades con D
        { from: 'A1', to: 'D1', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'A2', to: 'D2', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'A3', to: 'D3', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D1', to: 'A1', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D2', to: 'A2', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D3', to: 'A3', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'B1', to: 'D1', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'B2', to: 'D2', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'B3', to: 'D3', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D1', to: 'B1', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D2', to: 'B2', tipo: 'transitividad', activa: false, fase: 6 },
        { from: 'D3', to: 'B3', tipo: 'transitividad', activa: false, fase: 6 },
        
        // FASE 7: D→E + transitividades
        { from: 'D1', to: 'E1', tipo: 'entrenada', activa: false, fase: 7 },
        { from: 'D2', to: 'E2', tipo: 'entrenada', activa: false, fase: 7 },
        { from: 'D3', to: 'E3', tipo: 'entrenada', activa: false, fase: 7 },
        { from: 'E1', to: 'D1', tipo: 'simetria', activa: false, fase: 7 },
        { from: 'E2', to: 'D2', tipo: 'simetria', activa: false, fase: 7 },
        { from: 'E3', to: 'D3', tipo: 'simetria', activa: false, fase: 7 },
        
        // Transitividades E
        { from: 'A1', to: 'E1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'A2', to: 'E2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'A3', to: 'E3', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'B1', to: 'E1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'B2', to: 'E2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'B3', to: 'E3', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'C1', to: 'E1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'C2', to: 'E2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'C3', to: 'E3', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E1', to: 'A1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E2', to: 'A2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E3', to: 'A3', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E1', to: 'B1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E2', to: 'B2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E3', to: 'B3', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E1', to: 'C1', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E2', to: 'C2', tipo: 'transitividad', activa: false, fase: 7 },
        { from: 'E3', to: 'C3', tipo: 'transitividad', activa: false, fase: 7 }
    ];
}

// ============================================
// VISUALIZACIÓN DE RED SVG
// ============================================

function dibujarRed() {
    const svg = document.getElementById('redSVG');
    if (!svg) return;
    
    const width = svg.clientWidth || 1000;
    const height = 400;
    
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = '';
    
    // Posiciones de los nodos
    const posiciones = {
        A1: { x: 100, y: 100 }, A2: { x: 100, y: 200 }, A3: { x: 100, y: 300 },
        B1: { x: 300, y: 100 }, B2: { x: 300, y: 200 }, B3: { x: 300, y: 300 },
        C1: { x: 500, y: 100 }, C2: { x: 500, y: 200 }, C3: { x: 500, y: 300 },
        D1: { x: 700, y: 100 }, D2: { x: 700, y: 200 }, D3: { x: 700, y: 300 },
        E1: { x: 900, y: 100 }, E2: { x: 900, y: 200 }, E3: { x: 900, y: 300 }
    };
    
    // Dibujar conexiones
    relaciones.forEach(rel => {
        if (rel.activa) {
            const from = posiciones[rel.from];
            const to = posiciones[rel.to];
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            line.setAttribute('stroke-width', '3');
            line.setAttribute('opacity', '0.7');
            
            if (rel.tipo === 'entrenada') {
                line.setAttribute('stroke', '#00FF88');
            } else if (rel.tipo === 'simetria') {
                line.setAttribute('stroke', '#00BCD4');
            } else if (rel.tipo === 'transitividad') {
                line.setAttribute('stroke', '#FFD600');
            }
            
            svg.appendChild(line);
        }
    });
    
    // Dibujar nodos
    Object.keys(posiciones).forEach(nodeId => {
        const pos = posiciones[nodeId];
        const conjunto = nodeId[0];
        const index = parseInt(nodeId[1]) - 1;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos.x);
        circle.setAttribute('cy', pos.y);
        circle.setAttribute('r', '35');
        circle.setAttribute('fill', '#0A1929');
        circle.setAttribute('stroke', '#00BCD4');
        circle.setAttribute('stroke-width', '3');
        
        svg.appendChild(circle);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos.x);
        text.setAttribute('y', pos.y + 10);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#FFFFFF');
        text.setAttribute('font-size', '24');
        text.setAttribute('font-weight', 'bold');
        text.textContent = conjuntos[conjunto][index].texto;
        
        svg.appendChild(text);
    });
    
    actualizarStats();
}

function actualizarStats() {
    relacionesEntrenadas = relaciones.filter(r => r.activa && r.tipo === 'entrenada').length;
    relacionesSimetria = relaciones.filter(r => r.activa && r.tipo === 'simetria').length;
    relacionesTransitividad = relaciones.filter(r => r.activa && r.tipo === 'transitividad').length;
    
    const statEntrenadas = document.getElementById('statEntrenadas');
    const statSimetrias = document.getElementById('statSimetrias');
    const statTransitividades = document.getElementById('statTransitividades');
    const statTotal = document.getElementById('statTotal');
    
    if (statEntrenadas) statEntrenadas.textContent = relacionesEntrenadas;
    if (statSimetrias) statSimetrias.textContent = relacionesSimetria;
    if (statTransitividades) statTransitividades.textContent = relacionesTransitividad;
    if (statTotal) statTotal.textContent = relacionesEntrenadas + relacionesSimetria + relacionesTransitividad;
}

function activarRelacion(from, to) {
    const rel = relaciones.find(r => r.from === from && r.to === to);
    if (rel) {
        rel.activa = true;
        dibujarRed();
    }
}

// ============================================
// NAVEGACIÓN ENTRE FASES - CORREGIDA
// ============================================

function irAFase(numero) {
    console.log('Ir a fase:', numero);
    document.querySelectorAll('.fase-lab').forEach(f => f.classList.remove('activa'));
    
    const faseId = typeof numero === 'number' ? `fase${numero}` : numero;
    const faseElement = document.getElementById(faseId);
    
    if (faseElement) {
        faseElement.classList.add('activa');
        faseActual = numero;
        console.log('Fase activada:', faseId);
    } else {
        console.error('No se encontró la fase:', faseId);
    }
}

// ============================================
// PREDICCIONES
// ============================================

function registrarPrediccion(fase, respuesta) {
    predicciones[`fase${fase}`] = respuesta;
    console.log(`Predicción Fase ${fase}:`, respuesta);
    
    const prediccionEl = document.getElementById(`prediccionFase${fase}`);
    const ensayosEl = document.getElementById(`ensayosFase${fase}`);
    
    if (prediccionEl) prediccionEl.style.display = 'none';
    if (ensayosEl) ensayosEl.style.display = 'block';
    
    if (fase === 2) iniciarEnsayosFase2();
    if (fase === 4) iniciarEnsayosFase4();
    if (fase === 6) iniciarEnsayosFase6();
}

// ============================================
// ENTRENAMIENTO
// ============================================

function iniciarEntrenamiento(fase) {
    console.log('Iniciar entrenamiento fase:', fase);
    
    if (fase === 1) {
        irAFase(2);
    } else if (fase === 3) {
        irAFase(4);
    } else if (fase === 5) {
        activarRelacion('C1', 'D1');
        activarRelacion('C2', 'D2');
        activarRelacion('C3', 'D3');
        activarRelacion('D1', 'C1');
        activarRelacion('D2', 'C2');
        activarRelacion('D3', 'C3');
        
        setTimeout(() => irAFase(6), 1500);
    } else if (fase === 7) {
        activarRelacion('D1', 'E1');
        activarRelacion('D2', 'E2');
        activarRelacion('D3', 'E3');
        activarRelacion('E1', 'D1');
        activarRelacion('E2', 'D2');
        activarRelacion('E3', 'D3');
        
        setTimeout(() => {
            ['A', 'B', 'C'].forEach(conj => {
                for (let i = 1; i <= 3; i++) {
                    activarRelacion(`${conj}${i}`, `E${i}`);
                    activarRelacion(`E${i}`, `${conj}${i}`);
                }
            });
            
            setTimeout(() => irAFase('faseFinal'), 2000);
        }, 1500);
    }
}

// ============================================
// FASE 2: SIMETRÍA B→A
// ============================================

const ensayosFase2 = [
    { muestra: 'B1', correcto: 'A1', opciones: ['A1', 'A2', 'A3'] },
    { muestra: 'B2', correcto: 'A2', opciones: ['A3', 'A1', 'A2'] },
    { muestra: 'B3', correcto: 'A3', opciones: ['A2', 'A3', 'A1'] }
];

let ensayoFase2 = 0;

function iniciarEnsayosFase2() {
    activarRelacion('A1', 'B1');
    activarRelacion('A2', 'B2');
    activarRelacion('A3', 'B3');
    
    ensayoFase2 = 0;
    cargarEnsayoFase2();
}

function cargarEnsayoFase2() {
    const ensayo = ensayosFase2[ensayoFase2];
    const muestraData = obtenerEstimulo(ensayo.muestra);
    
    const muestraEl = document.getElementById('muestraFase2');
    if (muestraEl) muestraEl.textContent = muestraData.texto;
    
    const grid = document.getElementById('comparacionesFase2');
    if (grid) {
        grid.innerHTML = '';
        
        ensayo.opciones.forEach(opId => {
            const opData = obtenerEstimulo(opId);
            const btn = document.createElement('button');
            btn.className = 'comparacion-btn';
            btn.textContent = opData.texto;
            btn.onclick = () => verificarFase2(opId, ensayo.correcto);
            grid.appendChild(btn);
        });
    }
    
    const feedbackEl = document.getElementById('feedbackFase2');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-ensayo';
    }
}

function verificarFase2(seleccion, correcto) {
    contadorGlobal++;
    const contadorEl = document.getElementById('contadorGlobal');
    if (contadorEl) contadorEl.textContent = contadorGlobal;
    
    const feedback = document.getElementById('feedbackFase2');
    
    if (seleccion === correcto) {
        if (feedback) {
            feedback.textContent = '✅ Correcto - Simetría emergente';
            feedback.className = 'feedback-ensayo correcto';
        }
        
        const ensayo = ensayosFase2[ensayoFase2];
        activarRelacion(ensayo.muestra, ensayo.correcto);
        
        ensayoFase2++;
        
        if (ensayoFase2 < ensayosFase2.length) {
            setTimeout(cargarEnsayoFase2, 1200);
        } else {
            if (feedback) feedback.textContent = '🎉 ¡Excelente! Esto es SIMETRÍA';
            setTimeout(() => irAFase(3), 2000);
        }
    } else {
        if (feedback) {
            feedback.textContent = '❌ Intenta de nuevo';
            feedback.className = 'feedback-ensayo incorrecto';
        }
    }
}

// ============================================
// FASE 4: TRANSITIVIDAD A→C
// ============================================

const ensayosFase4 = [
    { muestra: 'A1', correcto: 'C1', opciones: ['C1', 'C2', 'C3'] },
    { muestra: 'A2', correcto: 'C2', opciones: ['C2', 'C3', 'C1'] },
    { muestra: 'C3', correcto: 'A3', opciones: ['A1', 'A3', 'A2'] }
];

let ensayoFase4 = 0;

function iniciarEnsayosFase4() {
    activarRelacion('B1', 'C1');
    activarRelacion('B2', 'C2');
    activarRelacion('B3', 'C3');
    activarRelacion('C1', 'B1');
    activarRelacion('C2', 'B2');
    activarRelacion('C3', 'B3');
    
    ensayoFase4 = 0;
    cargarEnsayoFase4();
}

function cargarEnsayoFase4() {
    const ensayo = ensayosFase4[ensayoFase4];
    const muestraData = obtenerEstimulo(ensayo.muestra);
    
    const muestraEl = document.getElementById('muestraFase4');
    if (muestraEl) muestraEl.textContent = muestraData.texto;
    
    const grid = document.getElementById('comparacionesFase4');
    if (grid) {
        grid.innerHTML = '';
        
        ensayo.opciones.forEach(opId => {
            const opData = obtenerEstimulo(opId);
            const btn = document.createElement('button');
            btn.className = 'comparacion-btn';
            btn.textContent = opData.texto;
            btn.onclick = () => verificarFase4(opId, ensayo.correcto);
            grid.appendChild(btn);
        });
    }
    
    const feedbackEl = document.getElementById('feedbackFase4');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-ensayo';
    }
}

function verificarFase4(seleccion, correcto) {
    contadorGlobal++;
    const contadorEl = document.getElementById('contadorGlobal');
    if (contadorEl) contadorEl.textContent = contadorGlobal;
    
    const feedback = document.getElementById('feedbackFase4');
    
    if (seleccion === correcto) {
        if (feedback) {
            feedback.textContent = '✅ ¡Correcto! - Transitividad derivada';
            feedback.className = 'feedback-ensayo correcto';
        }
        
        const ensayo = ensayosFase4[ensayoFase4];
        activarRelacion(ensayo.muestra, ensayo.correcto);
        
        ensayoFase4++;
        
        if (ensayoFase4 < ensayosFase4.length) {
            setTimeout(cargarEnsayoFase4, 1200);
        } else {
            if (feedback) feedback.textContent = '🎉 ¡TRANSITIVIDAD DEMOSTRADA!';
            
            setTimeout(() => {
                activarRelacion('A3', 'C3');
                activarRelacion('C1', 'A1');
                activarRelacion('C2', 'A2');
                
                setTimeout(() => irAFase(5), 2000);
            }, 1000);
        }
    } else {
        if (feedback) {
            feedback.textContent = '❌ Intenta de nuevo';
            feedback.className = 'feedback-ensayo incorrecto';
        }
    }
}

// ============================================
// FASE 6: DERIVACIONES CON D
// ============================================

const ensayosFase6 = [
    { muestra: 'A1', correcto: 'D1', opciones: ['D1', 'D2', 'D3'] },
    { muestra: 'D2', correcto: 'B2', opciones: ['B1', 'B2', 'B3'] }
];

let ensayoFase6 = 0;

function iniciarEnsayosFase6() {
    ensayoFase6 = 0;
    cargarEnsayoFase6();
}

function cargarEnsayoFase6() {
    const ensayo = ensayosFase6[ensayoFase6];
    const muestraData = obtenerEstimulo(ensayo.muestra);
    
    const muestraEl = document.getElementById('muestraFase6');
    if (muestraEl) muestraEl.textContent = muestraData.texto;
    
    const grid = document.getElementById('comparacionesFase6');
    if (grid) {
        grid.innerHTML = '';
        
        ensayo.opciones.forEach(opId => {
            const opData = obtenerEstimulo(opId);
            const btn = document.createElement('button');
            btn.className = 'comparacion-btn';
            btn.textContent = opData.texto;
            btn.onclick = () => verificarFase6(opId, ensayo.correcto);
            grid.appendChild(btn);
        });
    }
    
    const feedbackEl = document.getElementById('feedbackFase6');
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-ensayo';
    }
}

function verificarFase6(seleccion, correcto) {
    contadorGlobal++;
    const contadorEl = document.getElementById('contadorGlobal');
    if (contadorEl) contadorEl.textContent = contadorGlobal;
    
    const feedback = document.getElementById('feedbackFase6');
    
    if (seleccion === correcto) {
        if (feedback) {
            feedback.textContent = '✅ Derivación exitosa con 4 conjuntos';
            feedback.className = 'feedback-ensayo correcto';
        }
        
        const ensayo = ensayosFase6[ensayoFase6];
        activarRelacion(ensayo.muestra, ensayo.correcto);
        
        ensayoFase6++;
        
        if (ensayoFase6 < ensayosFase6.length) {
            setTimeout(cargarEnsayoFase6, 1200);
        } else {
            if (feedback) feedback.textContent = '🎉 Red de 4 conjuntos completada';
            
            setTimeout(() => {
                ['A1', 'A2', 'A3', 'B1', 'B3'].forEach(id => {
                    const num = id[1];
                    activarRelacion(id, `D${num}`);
                    activarRelacion(`D${num}`, id);
                });
                
                setTimeout(() => irAFase(7), 2000);
            }, 1000);
        }
    } else {
        if (feedback) {
            feedback.textContent = '❌ Intenta de nuevo';
            feedback.className = 'feedback-ensayo incorrecto';
        }
    }
}

// ============================================
// RESULTADOS FINALES
// ============================================

function mostrarResultadosFinales() {
    const resultadoEnsayos = document.getElementById('resultadoEnsayos');
    const resultadoEntrenadas = document.getElementById('resultadoEntrenadas');
    const resultadoDerivadas = document.getElementById('resultadoDerivadas');
    const resultadoTotal = document.getElementById('resultadoTotal');
    
    if (resultadoEnsayos) resultadoEnsayos.textContent = contadorGlobal;
    if (resultadoEntrenadas) resultadoEntrenadas.textContent = relacionesEntrenadas;
    if (resultadoDerivadas) resultadoDerivadas.textContent = relacionesSimetria + relacionesTransitividad;
    if (resultadoTotal) resultadoTotal.textContent = relacionesEntrenadas + relacionesSimetria + relacionesTransitividad;
}

function verRedCompleta() {
    const redViz = document.querySelector('.red-visualizacion');
    if (redViz) {
        redViz.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            alert('💡 Observa cómo todos los estímulos están conectados en una clase de equivalencia');
        }, 500);
    }
}

// ============================================
// UTILIDADES
// ============================================

function obtenerEstimulo(id) {
    const conjunto = id[0];
    const index = parseInt(id[1]) - 1;
    return conjuntos[conjunto][index];
}

// ============================================
// ANIMACIÓN DE PARTÍCULAS
// ============================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 50;
        
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
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00BCD4' : '#00E5FF'
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 3
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
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando laboratorio de equivalencia...');
    inicializarRelaciones();
    dibujarRed();
    new ParticleSystem();
    console.log('Laboratorio inicializado correctamente');
});
