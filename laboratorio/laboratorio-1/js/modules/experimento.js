/* ===================================
   LABORATORIO DEL HUMOR - experimento.js
   Módulo 3: El Experimento
   =================================== */

class ExperimentoModule {
    constructor() {
        this.medidasExpanded = {
            facial: false,
            reporte: false
        };
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
        const chistesItems = document.querySelectorAll('.chiste-item[data-info]');
        chistesItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.mostrarInfoChiste(e.currentTarget);
            });
            
            item.addEventListener('mouseleave', () => {
                this.ocultarInfoChiste();
            });
        });
        
        const medidasCards = document.querySelectorAll('.medida-card');
        medidasCards.forEach(card => {
            const header = card.querySelector('.medida-header');
            
            header.addEventListener('click', () => {
                this.toggleMedida(card);
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
        const info = item.dataset.info;
        
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
            font-size: 0.875rem;
            white-space: nowrap;
            margin-bottom: 0.5rem;
            z-index: 100;
            pointer-events: none;
        `;
        
        const infoTexts = {
            'doctor-control': 'Chiste del Doctor - Sin manipulación',
            'beer-control': 'Chiste de la Cerveza - Sin manipulación',
            'job-control': 'Chiste de la Entrevista - Sin manipulación',
            'soccer-control': 'Chiste del Fútbol - Sin manipulación'
        };
        
        tooltip.textContent = infoTexts[info] || 'Chiste';
        
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
    
    toggleMedida(card) {
        const content = card.querySelector('.medida-content');
        const btnExpand = card.querySelector('.btn-expand');
        
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.4s ease-out';
            
            const height = content.scrollHeight;
            content.style.maxHeight = height + 'px';
            
            btnExpand.textContent = 'Ver menos';
            
            setTimeout(() => {
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
            }, 400);
        } else {
            const height = content.scrollHeight;
            content.style.maxHeight = height + 'px';
            content.style.overflow = 'hidden';
            
            setTimeout(() => {
                content.style.maxHeight = '0';
            }, 10);
            
            setTimeout(() => {
                content.classList.add('hidden');
                content.style.maxHeight = '';
                content.style.overflow = '';
            }, 400);
            
            btnExpand.textContent = 'Ver más';
        }
    }
}

const experimentoModule = new ExperimentoModule();
