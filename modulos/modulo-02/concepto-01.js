// MÓDULO 2 - LABORATORIO ÉPICO DE EQUIVALENCIA
// VERSIÓN CORREGIDA: Curvas transitivas + Símbolos abstractos + 4 conjuntos

// ============= ESTADO GLOBAL =============
let contadorGlobal = 0;
let relacionesEntrenadas = 0, relacionesSimetria = 0, relacionesTransitividad = 0;
let predicciones = {};

// ============= CONJUNTOS (C con símbolos abstractos) =============
const conjuntos = {
    A: [{id:'A1',texto:'犬'},{id:'A2',texto:'猫'},{id:'A3',texto:'鳥'}],
    B: [{id:'B1',texto:'PERRO'},{id:'B2',texto:'GATO'},{id:'B3',texto:'PÁJARO'}],
    C: [{id:'C1',texto:'◆'},{id:'C2',texto:'◉'},{id:'C3',texto:'▲'}],
    D: [{id:'D1',texto:'🔵'},{id:'D2',texto:'🟥'},{id:'D3',texto:'🔺'}]
};

// ============= RELACIONES =============
let relaciones = [];

function inicializarRelaciones() {
    relaciones = [
        // A→B
        {from:'A1',to:'B1',tipo:'entrenada',activa:false},
        {from:'A2',to:'B2',tipo:'entrenada',activa:false},
        {from:'A3',to:'B3',tipo:'entrenada',activa:false},
        {from:'B1',to:'A1',tipo:'simetria',activa:false},
        {from:'B2',to:'A2',tipo:'simetria',activa:false},
        {from:'B3',to:'A3',tipo:'simetria',activa:false},
        // B→C
        {from:'B1',to:'C1',tipo:'entrenada',activa:false},
        {from:'B2',to:'C2',tipo:'entrenada',activa:false},
        {from:'B3',to:'C3',tipo:'entrenada',activa:false},
        {from:'C1',to:'B1',tipo:'simetria',activa:false},
        {from:'C2',to:'B2',tipo:'simetria',activa:false},
        {from:'C3',to:'B3',tipo:'simetria',activa:false},
        // A→C transitividad
        {from:'A1',to:'C1',tipo:'transitividad',activa:false},
        {from:'A2',to:'C2',tipo:'transitividad',activa:false},
        {from:'A3',to:'C3',tipo:'transitividad',activa:false},
        {from:'C1',to:'A1',tipo:'transitividad',activa:false},
        {from:'C2',to:'A2',tipo:'transitividad',activa:false},
        {from:'C3',to:'A3',tipo:'transitividad',activa:false},
        // C→D
        {from:'C1',to:'D1',tipo:'entrenada',activa:false},
        {from:'C2',to:'D2',tipo:'entrenada',activa:false},
        {from:'C3',to:'D3',tipo:'entrenada',activa:false},
        {from:'D1',to:'C1',tipo:'simetria',activa:false},
        {from:'D2',to:'C2',tipo:'simetria',activa:false},
        {from:'D3',to:'C3',tipo:'simetria',activa:false},
        // A→D, B→D transitividad
        {from:'A1',to:'D1',tipo:'transitividad',activa:false},
        {from:'A2',to:'D2',tipo:'transitividad',activa:false},
        {from:'A3',to:'D3',tipo:'transitividad',activa:false},
        {from:'D1',to:'A1',tipo:'transitividad',activa:false},
        {from:'D2',to:'A2',tipo:'transitividad',activa:false},
        {from:'D3',to:'A3',tipo:'transitividad',activa:false},
        {from:'B1',to:'D1',tipo:'transitividad',activa:false},
        {from:'B2',to:'D2',tipo:'transitividad',activa:false},
        {from:'B3',to:'D3',tipo:'transitividad',activa:false},
        {from:'D1',to:'B1',tipo:'transitividad',activa:false},
        {from:'D2',to:'B2',tipo:'transitividad',activa:false},
        {from:'D3',to:'B3',tipo:'transitividad',activa:false}
    ];
}

// ============= UTILIDADES =============
function obtenerEstimulo(id) {
    const conj = id[0], idx = parseInt(id[1]) - 1;
    return conjuntos[conj][idx];
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function activarRelacion(from, to) {
    const rel = relaciones.find(r => r.from === from && r.to === to);
    if (rel && !rel.activa) {
        rel.activa = true;
        dibujarRed();
        mostrarToast(`✨ Nueva relación: ${from}→${to}`);
        document.getElementById('redNuevo').style.display = 'inline';
        setTimeout(() => document.getElementById('redNuevo').style.display = 'none', 3000);
    }
}

function activarTransitividadesAutomaticas() {
    // Activar A→D, B→D
    ['A','B'].forEach(conj => {
        for(let i=1; i<=3; i++) {
            activarRelacion(`${conj}${i}`, `D${i}`);
            activarRelacion(`D${i}`, `${conj}${i}`);
        }
    });
}

// ============= NAVEGACIÓN =============
function irAFase(id) {
    document.querySelectorAll('.fase-lab').forEach(f => f.classList.remove('activa'));
    const fase = document.getElementById(id);
    if (fase) fase.classList.add('activa');
}

function comenzarExperimento() {
    document.getElementById('redInicial').style.display = 'none';
    document.getElementById('btnRedFlotante').style.display = 'flex';
    irAFase('fase1');
}

// ============= TOAST =============
function mostrarToast(msg) {
    const toast = document.getElementById('toastNotificacion');
    document.getElementById('toastMensaje').textContent = msg;
    toast.style.display = 'block';
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.style.display = 'none', 300);
    }, 2000);
}

// ============= MODAL =============
function abrirModalRed() {
    document.getElementById('modalRed').style.display = 'flex';
    dibujarRedModal();
}

function cerrarModalRed() {
    document.getElementById('modalRed').style.display = 'none';
}

// ============= DIBUJAR RED CON CURVAS TRANSITIVAS =============
function dibujarRed(svgId = 'redSVG') {
    const svg = document.getElementById(svgId);
    if (!svg) return;
    
    const width = svgId === 'redSVG' ? 1400 : 1600;
    const height = svgId === 'redSVG' ? 500 : 650;
    
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = '';
    
    // Posiciones compactas
    const pos = {
        A1:{x:200,y:120}, A2:{x:200,y:250}, A3:{x:200,y:380},
        B1:{x:550,y:120}, B2:{x:550,y:250}, B3:{x:550,y:380},
        C1:{x:900,y:120}, C2:{x:900,y:250}, C3:{x:900,y:380},
        D1:{x:1200,y:120}, D2:{x:1200,y:250}, D3:{x:1200,y:380}
    };
    
    // PRIMERO: Líneas transitivas (CURVAS - atrás)
    relaciones.forEach(rel => {
        if (rel.activa && rel.tipo === 'transitividad') {
            const from = pos[rel.from], to = pos[rel.to];
            
            // Calcular punto medio para curva
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            
            // Offset para curva (hacia abajo)
            const offsetY = 80;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const d = `M ${from.x} ${from.y} Q ${midX} ${midY + offsetY} ${to.x} ${to.y}`;
            path.setAttribute('d', d);
            path.setAttribute('stroke', '#FFD600');
            path.setAttribute('stroke-width', '3');
            path.setAttribute('stroke-dasharray', '8,4');
            path.setAttribute('fill', 'none');
            path.setAttribute('opacity', '0.8');
            
            svg.appendChild(path);
        }
    });
    
    // SEGUNDO: Líneas directas (SÓLIDAS - adelante)
    relaciones.forEach(rel => {
        if (rel.activa && rel.tipo !== 'transitividad') {
            const from = pos[rel.from], to = pos[rel.to];
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', from.x);
            line.setAttribute('y1', from.y);
            line.setAttribute('x2', to.x);
            line.setAttribute('y2', to.y);
            line.setAttribute('stroke-width', '4');
            
            if (rel.tipo === 'simetria') {
                line.setAttribute('stroke', '#00BCD4');
            } else {
                line.setAttribute('stroke', '#00FF88');
            }
            
            svg.appendChild(line);
        }
    });
    
    // TERCERO: Nodos (encima de todo)
    Object.keys(pos).forEach(nodeId => {
        const p = pos[nodeId];
        const conj = nodeId[0];
        const idx = parseInt(nodeId[1]) - 1;
        
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('cursor', 'pointer');
        g.onclick = () => resaltarClase(nodeId);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', p.x);
        circle.setAttribute('cy', p.y);
        circle.setAttribute('r', '38');
        circle.setAttribute('fill', '#0A1929');
        
        const colores = {A:'#9C27B0', B:'#00BCD4', C:'#4CAF50', D:'#FF9800'};
        circle.setAttribute('stroke', colores[conj]);
        circle.setAttribute('stroke-width', '4');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', p.x);
        text.setAttribute('y', p.y + 12);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#FFF');
        text.setAttribute('font-size', '30');
        text.setAttribute('font-weight', 'bold');
        text.textContent = conjuntos[conj][idx].texto;
        
        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    });
    
    actualizarStats();
}

function dibujarRedModal() {
    dibujarRed('redSVGModal');
    const e = relaciones.filter(r => r.activa && r.tipo === 'entrenada').length;
    const s = relaciones.filter(r => r.activa && r.tipo === 'simetria').length;
    const t = relaciones.filter(r => r.activa && r.tipo === 'transitividad').length;
    
    document.getElementById('modalStatEntrenadas').textContent = e;
    document.getElementById('modalStatSimetrias').textContent = s;
    document.getElementById('modalStatTransitividades').textContent = t;
    document.getElementById('modalStatTotal').textContent = e + s + t;
}

function actualizarStats() {
    relacionesEntrenadas = relaciones.filter(r => r.activa && r.tipo === 'entrenada').length;
    relacionesSimetria = relaciones.filter(r => r.activa && r.tipo === 'simetria').length;
    relacionesTransitividad = relaciones.filter(r => r.activa && r.tipo === 'transitividad').length;
    
    const total = relacionesEntrenadas + relacionesSimetria + relacionesTransitividad;
    
    ['stat','modalStat'].forEach(prefix => {
        const e = document.getElementById(prefix+'Entrenadas');
        if (e) e.textContent = relacionesEntrenadas;
        const s = document.getElementById(prefix+'Simetrias');
        if (s) s.textContent = relacionesSimetria;
        const t = document.getElementById(prefix+'Transitividades');
        if (t) t.textContent = relacionesTransitividad;
        const tot = document.getElementById(prefix+'Total');
        if (tot) tot.textContent = total;
    });
    
    const badge = document.getElementById('redBadge');
    if (badge) badge.textContent = total;
}

function resaltarClase(nodeId) {
    mostrarToast(`Clase: ${nodeId}`);
}

// ============= ENSAYOS =============
const ensayosConfig = {
    AB: {ensayos:[
        {muestra:'A1',correcto:'B1',opciones:['B1','B2','B3']},
        {muestra:'A2',correcto:'B2',opciones:['B1','B2','B3']},
        {muestra:'A3',correcto:'B3',opciones:['B1','B2','B3']},
        {muestra:'A1',correcto:'B1',opciones:['B1','B2','B3']},
        {muestra:'A2',correcto:'B2',opciones:['B1','B2','B3']},
        {muestra:'A3',correcto:'B3',opciones:['B1','B2','B3']}
    ]},
    BA: {ensayos:[
        {muestra:'B1',correcto:'A1',opciones:['A1','A2','A3']},
        {muestra:'B2',correcto:'A2',opciones:['A1','A2','A3']},
        {muestra:'B3',correcto:'A3',opciones:['A1','A2','A3']},
        {muestra:'B1',correcto:'A1',opciones:['A1','A2','A3']},
        {muestra:'B2',correcto:'A2',opciones:['A1','A2','A3']},
        {muestra:'B3',correcto:'A3',opciones:['A1','A2','A3']}
    ]},
    BC: {ensayos:[
        {muestra:'B1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'B2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'B3',correcto:'C3',opciones:['C1','C2','C3']},
        {muestra:'B1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'B2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'B3',correcto:'C3',opciones:['C1','C2','C3']}
    ]},
    CB: {ensayos:[
        {muestra:'C1',correcto:'B1',opciones:['B1','B2','B3']},
        {muestra:'C2',correcto:'B2',opciones:['B1','B2','B3']},
        {muestra:'C3',correcto:'B3',opciones:['B1','B2','B3']},
        {muestra:'C1',correcto:'B1',opciones:['B1','B2','B3']},
        {muestra:'C2',correcto:'B2',opciones:['B1','B2','B3']},
        {muestra:'C3',correcto:'B3',opciones:['B1','B2','B3']}
    ]},
    AC: {ensayos:[
        {muestra:'A1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'A2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'A3',correcto:'C3',opciones:['C1','C2','C3']},
        {muestra:'A1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'A2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'A3',correcto:'C3',opciones:['C1','C2','C3']}
    ]},
    CD: {ensayos:[
        {muestra:'C1',correcto:'D1',opciones:['D1','D2','D3']},
        {muestra:'C2',correcto:'D2',opciones:['D1','D2','D3']},
        {muestra:'C3',correcto:'D3',opciones:['D1','D2','D3']},
        {muestra:'C1',correcto:'D1',opciones:['D1','D2','D3']},
        {muestra:'C2',correcto:'D2',opciones:['D1','D2','D3']},
        {muestra:'C3',correcto:'D3',opciones:['D1','D2','D3']}
    ]},
    DC: {ensayos:[
        {muestra:'D1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'D2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'D3',correcto:'C3',opciones:['C1','C2','C3']},
        {muestra:'D1',correcto:'C1',opciones:['C1','C2','C3']},
        {muestra:'D2',correcto:'C2',opciones:['C1','C2','C3']},
        {muestra:'D3',correcto:'C3',opciones:['C1','C2','C3']}
    ]}
};

let faseActual = '';
let ensayoActual = 0;
let aciertos = 0;

function iniciarFaseEntrenamiento(fase) {
    faseActual = fase;
    ensayoActual = 0;
    aciertos = 0;
    
    const faseIds = {AB:'1B', BA:'2B', BC:'3B', CB:'4', AC:'5B', CD:'6B', DC:'7'};
    irAFase(`fase${faseIds[fase]}`);
    cargarEnsayo();
}

function cargarEnsayo() {
    const config = ensayosConfig[faseActual];
    const ensayo = config.ensayos[ensayoActual];
    
    const muestraData = obtenerEstimulo(ensayo.muestra);
    const muestraEl = document.getElementById(`muestra${faseActual}`);
    if (muestraEl) muestraEl.textContent = muestraData.texto;
    
    const gridEl = document.getElementById(`comparaciones${faseActual}`);
    if (gridEl) {
        gridEl.innerHTML = '';
        shuffle([...ensayo.opciones]).forEach(opId => {
            const opData = obtenerEstimulo(opId);
            const btn = document.createElement('button');
            btn.className = 'comparacion-btn';
            btn.textContent = opData.texto;
            btn.onclick = () => verificar(opId, ensayo.correcto, ensayo.muestra);
            gridEl.appendChild(btn);
        });
    }
    
    const actualizarEl = document.getElementById(`ensayoActual${faseActual}`);
    if (actualizarEl) actualizarEl.textContent = ensayoActual + 1;
    
    const feedbackEl = document.getElementById(`feedback${faseActual}`);
    if (feedbackEl) {
        feedbackEl.textContent = '';
        feedbackEl.className = 'feedback-ensayo';
    }
}

function verificar(sel, correcto, muestra) {
    contadorGlobal++;
    document.getElementById('contadorGlobal').textContent = contadorGlobal;
    
    const feedbackEl = document.getElementById(`feedback${faseActual}`);
    
    if (sel === correcto) {
        aciertos++;
        const aciertosEl = document.getElementById(`aciertos${faseActual}`);
        if (aciertosEl) aciertosEl.textContent = aciertos;
        
        if (feedbackEl) {
            feedbackEl.textContent = '✅ Correcto';
            feedbackEl.className = 'feedback-ensayo correcto';
        }
        
        activarRelacion(muestra, correcto);
        ensayoActual++;
        
        if (ensayoActual < ensayosConfig[faseActual].ensayos.length) {
            setTimeout(cargarEnsayo, 1000);
        } else {
            setTimeout(() => completarFase(), 1500);
        }
    } else {
        if (feedbackEl) {
            feedbackEl.textContent = '❌ Intenta de nuevo';
            feedbackEl.className = 'feedback-ensayo incorrecto';
        }
    }
}

function completarFase() {
    const siguienteFase = {
        AB: {msg:'🎉 A→B completado', siguiente:'fase2'},
        BA: {msg:'🎉 Simetría B→A', siguiente:'fase3'},
        BC: {msg:'🎉 B→C completado', siguiente: () => iniciarFaseEntrenamiento('CB')},
        CB: {msg:'🎉 Simetría C→B', siguiente:'fase5'},
        AC: {msg:'🎉 Transitividad A→C', siguiente:'fase6'},
        CD: {msg:'🎉 C→D completado', siguiente: () => iniciarFaseEntrenamiento('DC')},
        DC: {msg:'💥 Expansión completa', siguiente: () => {
            activarTransitividadesAutomaticas();
            setTimeout(() => {
                irAFase('faseFinal');
                mostrarResultados();
            }, 2000);
        }}
    };
    
    const accion = siguienteFase[faseActual];
    mostrarToast(accion.msg);
    
    if (typeof accion.siguiente === 'function') {
        accion.siguiente();
    } else {
        setTimeout(() => irAFase(accion.siguiente), 1500);
    }
}

function registrarPrediccion(fase, resp) {
    predicciones[fase] = resp;
    if (fase === 'BA') iniciarFaseEntrenamiento('BA');
    if (fase === 'AC') iniciarFaseEntrenamiento('AC');
}

function mostrarResultados() {
    document.getElementById('resultadoEnsayos').textContent = contadorGlobal;
    document.getElementById('resultadoEntrenadas').textContent = relacionesEntrenadas;
    document.getElementById('resultadoDerivadas').textContent = relacionesSimetria + relacionesTransitividad;
    document.getElementById('resultadoTotal').textContent = relacionesEntrenadas + relacionesSimetria + relacionesTransitividad;
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
    inicializarRelaciones();
    dibujarRed();
    new ParticleSystem();
});
