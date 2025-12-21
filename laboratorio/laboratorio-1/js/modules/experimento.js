/* ===================================
   LABORATORIO DEL HUMOR - experimento.js
   Módulo 3: El Experimento
   =================================== */

class ExperimentoModule {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 3) {
                this.onModuleShown();
            }
        });
    }
    
    setupEventListeners() {
        const chistesItems = document.querySelectorAll('.chiste-item');
        chistesItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.mostrarInfoChiste(e.currentTarget);
            });
            
            item.addEventListener('mouseleave', () => {
                this.ocultarInfoChiste();
            });
        });
    }
    
    onModuleShown() {
        this.animarTimeline();
    }
    
    async animarTimeline() {
        const condiciones = document.querySelectorAll('.condicion-box');
        
        condiciones.forEach((condicion, index) => {
            setTimeout(() => {
                condicion.classList.add('fade-in-up');
            }, index * 300);
        });
    }
    
    mostrarInfoChiste(item) {
        const hasProtocol = item.classList.contains('with-protocol');
        const badge = item.querySelector('.protocol-badge');
        
        let tooltipText = 'Chiste sin manipulación';
        
        if (hasProtocol && badge) {
            const protocolType = badge.textContent;
            tooltipText = `Chiste con protocolo: ${protocolType}`;
        }
        
        const tooltip = Utils.createElement('div', ['chiste-tooltip'], {});
        tooltip.style.cssText = `
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.75rem;
            white-space: nowrap;
            margin-bottom: 0.5rem;
            z-index: 100;
            pointer-events: none;
        `;
        
        tooltip.textContent = tooltipText;
        
        item.style.position = 'relative';
        item.appendChild(tooltip);
        tooltip.classList.add('fade-in');
    }
    
    ocultarInfoChiste() {
        const tooltips = document.querySelectorAll('.chiste-tooltip');
        tooltips.forEach(tooltip => {
            Utils.fadeOut(tooltip, 200);
            setTimeout(() => tooltip.remove(), 200);
        });
    }
}

const experimentoModule = new ExperimentoModule();
