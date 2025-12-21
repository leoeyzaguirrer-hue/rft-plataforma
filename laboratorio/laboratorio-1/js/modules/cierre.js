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
        // Placeholder para futuros event listeners
    }
    
    onModuleShown() {
        this.animarMensajeFinal();
    }
    
    async animarMensajeFinal() {
        await Utils.delay(500);
        
        const mensajeFinal = document.querySelector('.mensaje-final');
        if (mensajeFinal) {
            mensajeFinal.classList.add('fade-in-up');
        }
        
        const sintesisTexto = document.querySelector('.sintesis-texto');
        if (sintesisTexto) {
            sintesisTexto.classList.add('fade-in-up');
        }
    }
}

const cierreModule = new CierreModule();
