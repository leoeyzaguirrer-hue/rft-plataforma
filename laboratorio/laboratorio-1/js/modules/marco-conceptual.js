/* ===================================
   LABORATORIO DEL HUMOR - marco-conceptual.js
   Módulo 2: Marco Conceptual - CON FLIP ANIMATION
   =================================== */

class MarcoConceptualModule {
    constructor() {
        this.tarjetas = [];
        this.modalOpen = false;
        this.contenidoTarjetas = [
            {
                titulo: "El humor como conducta",
                contenido: `
                    <h4>Conducta verbal + no verbal</h4>
                    <p>El humor puede entenderse como una <strong>respuesta verbal y no verbal</strong> (sonreír, reír, evaluar como gracioso) que ocurre en función de:</p>
                    <ul>
                        <li>La <strong>historia personal</strong> del individuo</li>
                        <li>El <strong>contexto actual</strong> en el que ocurre</li>
                    </ul>
                    <p><strong>Conclusión:</strong> El humor NO reside en el chiste en sí, sino en CÓMO EL OYENTE RELACIONA los elementos del chiste.</p>
                `
            },
            {
                titulo: "Redes relacionales",
                contenido: `
                    <h4>Coherentes pero incongruentes</h4>
                    <p>Desde la Teoría del Marco Relacional (RFT), los chistes suelen generar <strong>redes relacionales</strong> que son:</p>
                    <ul>
                        <li><strong>Coherentes:</strong> Tienen sentido internamente</li>
                        <li><strong>Incongruentes:</strong> Rompen expectativas</li>
                    </ul>
                    <p>Cuando estas redes mantienen ciertas <strong>funciones sociales</strong>, la risa puede emerger.</p>
                    <p>Cuando esas funciones se <strong>ALTERAN</strong>, la respuesta humorística puede desaparecer.</p>
                `
            },
            {
                titulo: "Funciones derivadas",
                contenido: `
                    <h4>El contexto transforma</h4>
                    <p>El mismo estímulo puede derivar <strong>diferentes funciones</strong> dependiendo del contexto:</p>
                    <ul>
                        <li>En contexto de "es un chiste" → Función discriminativa para sonreír</li>
                        <li>En contexto de "es real" → Función aversiva</li>
                        <li>En contexto de "es injusto" → Función de malestar</li>
                    </ul>
                    <p><strong>El contexto transforma completamente la función del estímulo.</strong></p>
                `
            },
            {
                titulo: "Objetivo del estudio",
                contenido: `
                    <h4>NO definir, sino MOSTRAR</h4>
                    <p>Este estudio <strong>NO busca definir</strong> qué es el humor.</p>
                    <p>El objetivo es <strong>MOSTRAR cómo puede alterarse su derivación</strong> mediante manipulaciones contextuales específicas.</p>
                    <p>Es un enfoque <strong>funcional</strong> y <strong>pragmático</strong>, no definitorio.</p>
                `
            }
        ];
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupTarjetas();
            this.createModal();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 2) {
                this.onModuleShown();
            }
        });
    }
    
    createModal() {
        const modal = Utils.createElement('div', ['tarjeta-modal'], { id: 'tarjeta-modal' });
        
        const modalContent = Utils.createElement('div', ['modal-content'], {});
        
        const closeBtn = Utils.createElement('button', ['modal-close'], {});
        closeBtn.textContent = '✕ Cerrar';
        closeBtn.addEventListener('click', () => this.closeModal());
        
        const modalBody = Utils.createElement('div', ['modal-body'], { id: 'modal-body' });
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalBody);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }
    
    setupTarjetas() {
        this.tarjetas = Array.from(document.querySelectorAll('.tarjeta'));
        
        this.tarjetas.forEach((tarjeta, index) => {
            // Efecto hover con transformación
            tarjeta.addEventListener('mouseenter', () => {
                tarjeta.style.transform = 'translateY(-8px) rotateY(5deg)';
            });
            
            tarjeta.addEventListener('mouseleave', () => {
                tarjeta.style.transform = 'translateY(0) rotateY(0deg)';
            });
            
            // Click para abrir modal
            tarjeta.addEventListener('click', () => {
                this.animarFlipYAbrir(tarjeta, index);
            });
        });
    }
    
    onModuleShown() {
        // Animación de entrada escalonada
        this.tarjetas.forEach((tarjeta, index) => {
            setTimeout(() => {
                tarjeta.classList.add('fade-in-up');
                tarjeta.style.opacity = '1';
            }, index * 200);
        });
    }
    
    async animarFlipYAbrir(tarjeta, index) {
        // Animación de flip antes de abrir
        tarjeta.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        tarjeta.style.transform = 'rotateY(180deg) scale(1.1)';
        
        await Utils.delay(300);
        
        // Abrir modal
        this.openModal(index);
        
        // Restaurar tarjeta
        setTimeout(() => {
            tarjeta.style.transform = 'rotateY(0deg) scale(1)';
        }, 400);
    }
    
    openModal(index) {
        const modal = document.getElementById('tarjeta-modal');
        const modalBody = document.getElementById('modal-body');
        
        const contenido = this.contenidoTarjetas[index];
        
        modalBody.innerHTML = `
            <h3 style="color: var(--color-accent); margin-bottom: 1.5rem; font-size: 2rem;">${contenido.titulo}</h3>
            ${contenido.contenido}
        `;
        
        modal.classList.add('active');
        this.modalOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Animar entrada del modal
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.8) rotateX(-10deg)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            modalContent.style.transform = 'scale(1) rotateX(0deg)';
            modalContent.style.opacity = '1';
        }, 10);
    }
    
    closeModal() {
        const modal = document.getElementById('tarjeta-modal');
        const modalContent = modal.querySelector('.modal-content');
        
        // Animar salida
        modalContent.style.transform = 'scale(0.8) rotateX(10deg)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            this.modalOpen = false;
            document.body.style.overflow = 'auto';
        }, 400);
    }
}

const marcoConceptualModule = new MarcoConceptualModule();
