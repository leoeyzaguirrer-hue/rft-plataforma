/* ===================================
   LABORATORIO DEL HUMOR - cierre.js
   Módulo 6: Cierre e integración
   =================================== */

class CierreModule {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 6) {
                this.onModuleShown();
            }
        });
    }
    
    setupEventListeners() {
        // Event listeners para botones finales si los hay
    }
    
    onModuleShown() {
        this.animarRedTransformacion();
        this.animarMensajeFinal();
    }
    
    async animarRedTransformacion() {
        const redFinal = document.getElementById('red-final');
        if (!redFinal) return;
        
        // Crear visualización SVG de red transformándose
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '300');
        svg.setAttribute('viewBox', '0 0 600 300');
        
        // Nodo "Chiste"
        const chisteCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        chisteCircle.setAttribute('cx', '100');
        chisteCircle.setAttribute('cy', '150');
        chisteCircle.setAttribute('r', '40');
        chisteCircle.setAttribute('fill', '#3b82f6');
        chisteCircle.setAttribute('opacity', '0');
        svg.appendChild(chisteCircle);
        
        const chisteText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        chisteText.setAttribute('x', '100');
        chisteText.setAttribute('y', '155');
        chisteText.setAttribute('text-anchor', 'middle');
        chisteText.setAttribute('fill', 'white');
        chisteText.setAttribute('font-weight', '600');
        chisteText.setAttribute('opacity', '0');
        chisteText.textContent = 'Chiste';
        svg.appendChild(chisteText);
        
        // Nodo "Contexto"
        const contextoCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        contextoCircle.setAttribute('cx', '300');
        contextoCircle.setAttribute('cy', '100');
        contextoCircle.setAttribute('r', '40');
        contextoCircle.setAttribute('fill', '#f59e0b');
        contextoCircle.setAttribute('opacity', '0');
        svg.appendChild(contextoCircle);
        
        const contextoText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        contextoText.setAttribute('x', '300');
        contextoText.setAttribute('y', '105');
        contextoText.setAttribute('text-anchor', 'middle');
        contextoText.setAttribute('fill', 'white');
        contextoText.setAttribute('font-weight', '600');
        contextoText.setAttribute('opacity', '0');
        contextoText.textContent = 'Contexto';
        svg.appendChild(contextoText);
        
        // Nodo "Respuesta"
        const respuestaCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        respuestaCircle.setAttribute('cx', '500');
        respuestaCircle.setAttribute('cy', '150');
        respuestaCircle.setAttribute('r', '40');
        respuestaCircle.setAttribute('fill', '#10b981');
        respuestaCircle.setAttribute('opacity', '0');
        svg.appendChild(respuestaCircle);
        
        const respuestaText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        respuestaText.setAttribute('x', '500');
        respuestaText.setAttribute('y', '155');
        respuestaText.setAttribute('text-anchor', 'middle');
        respuestaText.setAttribute('fill', 'white');
        respuestaText.setAttribute('font-weight', '600');
        respuestaText.setAttribute('opacity', '0');
        respuestaText.textContent = 'Respuesta';
        svg.appendChild(respuestaText);
        
        // Líneas de conexión
        const linea1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linea1.setAttribute('x1', '140');
        linea1.setAttribute('y1', '130');
        linea1.setAttribute('x2', '260');
        linea1.setAttribute('y2', '110');
        linea1.setAttribute('stroke', '#64748b');
        linea1.setAttribute('stroke-width', '3');
        linea1.setAttribute('opacity', '0');
        svg.appendChild(linea1);
        
        const linea2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        linea2.setAttribute('x1', '340');
        linea2.setAttribute('y1', '120');
        linea2.setAttribute('x2', '460');
        linea2.setAttribute('y2', '140');
        linea2.setAttribute('stroke', '#64748b');
        linea2.setAttribute('stroke-width', '3');
        linea2.setAttribute('opacity', '0');
        svg.appendChild(linea2);
        
        redFinal.appendChild(svg);
        
        // Animar aparición
        await Utils.delay(500);
        chisteCircle.setAttribute('opacity', '1');
        chisteText.setAttribute('opacity', '1');
        
        await Utils.delay(400);
        linea1.setAttribute('opacity', '0.5');
        
        await Utils.delay(400);
        contextoCircle.setAttribute('opacity', '1');
        contextoText.setAttribute('opacity', '1');
        
        await Utils.delay(400);
        linea2.setAttribute('opacity', '0.5');
        
        await Utils.delay(400);
        respuestaCircle.setAttribute('opacity', '1');
        respuestaText.setAttribute('opacity', '1');
    }
    
    async animarMensajeFinal() {
        await Utils.delay(2000);
        
        const mensajeFinal = document.querySelector('.mensaje-final');
        if (mensajeFinal) {
            mensajeFinal.classList.add('fade-in-up');
        }
    }
}

const cierreModule = new CierreModule();
