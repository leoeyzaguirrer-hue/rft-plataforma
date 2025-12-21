/* ===================================
   LABORATORIO DEL HUMOR - marco-conceptual.js
   Módulo 2: Marco Conceptual
   =================================== */

class MarcoConceptualModule {
    constructor() {
        this.tarjetas = [];
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTarjetas();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 2) {
                this.onModuleShown();
            }
        });
    }
    
    setupTarjetas() {
        this.tarjetas = Array.from(document.querySelectorAll('.tarjeta'));
        
        this.tarjetas.forEach((tarjeta, index) => {
            const front = tarjeta.querySelector('.tarjeta-front');
            const back = tarjeta.querySelector('.tarjeta-back');
            
            front.addEventListener('click', () => {
                this.flipTarjeta(tarjeta, index);
            });
            
            back.addEventListener('click', () => {
                this.flipTarjeta(tarjeta, index);
            });
        });
    }
    
    onModuleShown() {
        this.tarjetas.forEach((tarjeta, index) => {
            setTimeout(() => {
                tarjeta.classList.add('fade-in-up');
            }, index * 150);
        });
        
        this.animarRedRelacional();
    }
    
    flipTarjeta(tarjeta, index) {
        tarjeta.classList.toggle('flipped');
        
        if (index === 1 && tarjeta.classList.contains('flipped')) {
            setTimeout(() => {
                this.animarRedRelacional();
            }, 600);
        }
    }
    
    async animarRedRelacional() {
        const redAnimada = document.getElementById('red-animada');
        if (!redAnimada) return;
        
        const nodos = redAnimada.querySelectorAll('.nodo');
        const textos = redAnimada.querySelectorAll('.nodo-texto');
        const conexiones = redAnimada.querySelector('#conexiones');
        const labelCoherente = redAnimada.querySelector('.label-coherente');
        const labelIncongruente = redAnimada.querySelector('.label-incongruente');
        
        nodos.forEach(n => n.setAttribute('opacity', '0'));
        textos.forEach(t => t.setAttribute('opacity', '0'));
        if (conexiones) conexiones.setAttribute('opacity', '0');
        if (labelCoherente) labelCoherente.classList.add('hidden');
        if (labelIncongruente) labelIncongruente.classList.add('hidden');
        
        for (let i = 0; i < 3; i++) {
            await Utils.delay(400);
            nodos[i].setAttribute('opacity', '1');
            textos[i].setAttribute('opacity', '1');
        }
        
        await Utils.delay(400);
        if (conexiones) conexiones.setAttribute('opacity', '0.3');
        
        if (labelCoherente) {
            labelCoherente.classList.remove('hidden');
            labelCoherente.classList.add('fade-in');
        }
        
        await Utils.delay(800);
        
        nodos[3].setAttribute('opacity', '1');
        textos[3].setAttribute('opacity', '1');
        
        await Utils.delay(400);
        if (labelCoherente) labelCoherente.classList.add('hidden');
        if (labelIncongruente) {
            labelIncongruente.classList.remove('hidden');
            labelIncongruente.classList.add('fade-in');
        }
    }
}

const marcoConceptualModule = new MarcoConceptualModule();
