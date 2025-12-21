/* ===================================
   LABORATORIO DEL HUMOR - app.js
   Controlador principal de la aplicación
   =================================== */

class LaboratorioApp {
    constructor() {
        this.currentModule = 0;
        this.totalModules = 7;
        this.modules = [];
        this.navDots = [];
        this.progressBar = null;
        
        this.init();
    }
    
    init() {
        // Inicializar elementos DOM
        this.progressBar = document.getElementById('progressBar');
        this.navDots = Array.from(document.querySelectorAll('.nav-dot'));
        this.modules = Array.from(document.querySelectorAll('.module'));
        
        // Event listeners para navegación
        this.setupNavigation();
        
        // Inicializar módulos individuales
        this.initializeModules();
        
        // Mostrar primer módulo
        this.showModule(0);
        
        // Intersection Observer para animaciones
        this.setupIntersectionObserver();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupNavigation() {
        // Navegación por dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.navigateToModule(index);
            });
        });
        
        // Botones "Siguiente módulo"
        const nextButtons = document.querySelectorAll('.btn-next-module');
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextModule = parseInt(btn.dataset.next);
                this.navigateToModule(nextModule);
            });
        });
        
        // Scroll wheel navigation (opcional)
        let isScrolling = false;
        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            if (e.deltaY > 50) {
                // Scroll down
                this.nextModule();
                isScrolling = true;
                setTimeout(() => isScrolling = false, 1000);
            } else if (e.deltaY < -50) {
                // Scroll up
                this.prevModule();
                isScrolling = true;
                setTimeout(() => isScrolling = false, 1000);
            }
        }, { passive: true });
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextModule();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevModule();
            } else if (e.key >= '1' && e.key <= '7') {
                e.preventDefault();
                this.navigateToModule(parseInt(e.key) - 1);
            }
        });
    }
    
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos con clase .observe-fade
        const observeElements = document.querySelectorAll('.observe-fade');
        observeElements.forEach(el => observer.observe(el));
    }
    
    initializeModules() {
        // Los módulos se inicializarán en sus respectivos archivos
        console.log('Inicializando módulos del laboratorio...');
    }
    
    navigateToModule(index) {
        if (index < 0 || index >= this.totalModules) return;
        if (index === this.currentModule) return;
        
        this.hideModule(this.currentModule);
        this.currentModule = index;
        this.showModule(index);
        this.updateNavigation();
        this.updateProgress();
    }
    
    nextModule() {
        if (this.currentModule < this.totalModules - 1) {
            this.navigateToModule(this.currentModule + 1);
        }
    }
    
    prevModule() {
        if (this.currentModule > 0) {
            this.navigateToModule(this.currentModule - 1);
        }
    }
    
    showModule(index) {
        const module = this.modules[index];
        if (!module) return;
        
        module.style.display = 'block';
        void module.offsetWidth;
        module.classList.add('active');
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        const event = new CustomEvent('moduleShown', { 
            detail: { 
                moduleIndex: index,
                moduleName: module.dataset.module 
            } 
        });
        document.dispatchEvent(event);
    }
    
    hideModule(index) {
        const module = this.modules[index];
        if (!module) return;
        
        module.classList.remove('active');
        setTimeout(() => {
            module.style.display = 'none';
        }, 300);
    }
    
    updateNavigation() {
        this.navDots.forEach((dot, index) => {
            if (index === this.currentModule) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    updateProgress() {
        const progress = ((this.currentModule + 1) / this.totalModules) * 100;
        this.progressBar.style.width = `${progress}%`;
    }
}

// Utilidades globales
const Utils = {
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    typeText: async (element, text, speed = 50) => {
        element.textContent = '';
        for (let char of text) {
            element.textContent += char;
            await Utils.delay(speed);
        }
    },
    
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.min(progress / duration, 1);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    fadeOut: (element, duration = 300) => {
        let start = null;
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const opacity = Math.max(1 - (progress / duration), 0);
            
            element.style.opacity = opacity;
            
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    toggleClass: (element, className) => {
        element.classList.toggle(className);
    },
    
    loadJSON: async (url) => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Error cargando JSON:', error);
            return null;
        }
    },
    
    createElement: (tag, classes = [], attributes = {}) => {
        const element = document.createElement(tag);
        
        if (classes.length > 0) {
            element.classList.add(...classes);
        }
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        return element;
    },
    
    playAudio: (audioElement, loop = false) => {
        audioElement.loop = loop;
        audioElement.play().catch(err => {
            console.log('Audio playback failed:', err);
        });
    },
    
    stopAudio: (audioElement) => {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
};

// Inicializar aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.laboratorioApp = new LaboratorioApp();
    console.log('🧪 Laboratorio del Humor inicializado');
});

window.Utils = Utils;
