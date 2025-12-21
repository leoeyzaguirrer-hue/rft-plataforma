/* ===================================
   LABORATORIO DEL HUMOR - pregunta-cientifica.js
   Módulo 1: La pregunta científica
   =================================== */

class PreguntaCientificaModule {
    constructor() {
        this.currentDemo = 1;
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 1) {
                this.onModuleShown();
            }
        });
    }
    
    setupEventListeners() {
        const btnToggle = document.querySelector('.btn-toggle');
        if (btnToggle) {
            btnToggle.addEventListener('click', (e) => {
                this.toggleContexto(e.currentTarget);
            });
        }
    }
    
    onModuleShown() {
        this.animarTextoProgresivo();
    }
    
    async animarTextoProgresivo() {
        const textos = document.querySelectorAll('.texto-progresivo p');
        
        for (let i = 0; i < textos.length; i++) {
            await Utils.delay(800);
            textos[i].classList.add('aparece');
        }
    }
    
    toggleContexto(button) {
        const demoChiste = document.getElementById('demo-chiste-1');
        const contexto = document.getElementById('contexto-1');
        
        if (contexto.classList.contains('hidden')) {
            demoChiste.style.opacity = '0';
            setTimeout(() => {
                demoChiste.style.display = 'none';
                contexto.classList.remove('hidden');
                Utils.fadeIn(contexto, 400);
            }, 300);
            
            button.querySelector('.toggle-text').textContent = 'Volver a versión normal';
        } else {
            Utils.fadeOut(contexto, 300);
            setTimeout(() => {
                contexto.classList.add('hidden');
                demoChiste.style.display = 'block';
                Utils.fadeIn(demoChiste, 400);
            }, 300);
            
            button.querySelector('.toggle-text').textContent = 'Cambiar contexto';
        }
    }
}

const preguntaCientificaModule = new PreguntaCientificaModule();
