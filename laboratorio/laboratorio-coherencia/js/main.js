/* ==============================================
   LABORATORIO DE COHERENCIA - UTILIDADES JS
   ============================================== */

// === SISTEMA DE NAVEGACIÓN ===
class NavigationSystem {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = 8;
        this.progress = this.loadProgress();
    }

    // Cargar progreso desde localStorage
    loadProgress() {
        const saved = localStorage.getItem('coherencia_progress');
        return saved ? JSON.parse(saved) : {
            currentScreen: 1,
            completedScreens: [],
            startTime: Date.now()
        };
    }

    // Guardar progreso
    saveProgress() {
        localStorage.setItem('coherencia_progress', JSON.stringify(this.progress));
    }

    // Marcar pantalla como completada
    completeScreen(screenNumber) {
        if (!this.progress.completedScreens.includes(screenNumber)) {
            this.progress.completedScreens.push(screenNumber);
            this.saveProgress();
        }
    }

    // Ir a pantalla específica
    goToScreen(screenNumber) {
        if (screenNumber >= 1 && screenNumber <= this.totalScreens) {
            window.location.href = `pantalla-${screenNumber}.html`;
        }
    }

    // Siguiente pantalla
    nextScreen() {
        this.completeScreen(this.currentScreen);
        if (this.currentScreen < this.totalScreens) {
            this.goToScreen(this.currentScreen + 1);
        }
    }

    // Pantalla anterior
    prevScreen() {
        if (this.currentScreen > 1) {
            this.goToScreen(this.currentScreen - 1);
        }
    }

    // Volver al inicio
    goHome() {
        window.location.href = '../../index.html';
    }

    // Obtener porcentaje de progreso
    getProgressPercentage() {
        return (this.progress.completedScreens.length / this.totalScreens) * 100;
    }

    // Actualizar barra de progreso visual
    updateProgressBar() {
        const progressBar = document.querySelector('.pill-barra-fill');
        if (progressBar) {
            const percentage = (this.currentScreen / this.totalScreens) * 100;
            progressBar.style.width = `${percentage}%`;
        }

        const progressText = document.querySelectorAll('.pill-texto strong');
        if (progressText.length > 0) {
            progressText[progressText.length - 1].textContent = 
                `${this.currentScreen}/${this.totalScreens}`;
        }
    }
}

// === ANIMACIONES ===
class AnimationController {
    // Animar elementos al entrar en viewport
    static observeElements(selector, animationClass, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observerOptions = { ...defaultOptions, ...options };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    if (options.once !== false) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
        });

        return observer;
    }

    // Animar timeline items
    static animateTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${0.7 + (index * 0.1)}s`;
            item.classList.add('animate-slide-in-left');
        });
    }

    // Contador animado
    static animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animar stat cards con contador
    static animateStatCards() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numero = entry.target.querySelector('.stat-numero');
                    if (numero && !numero.dataset.animated) {
                        const valor = parseInt(numero.textContent);
                        numero.dataset.animated = 'true';
                        AnimationController.animateCounter(numero, 0, valor, 1000);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Parallax suave en scroll
    static initParallax() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const tarjeta = document.querySelector('.tarjeta-principal');
                    if (tarjeta) {
                        tarjeta.style.transform = `translateY(${scrolled * 0.05}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// === SISTEMA DE TOOLTIPS ===
class TooltipSystem {
    static init() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                TooltipSystem.show(e.target);
            });

            element.addEventListener('mouseleave', (e) => {
                TooltipSystem.hide(e.target);
            });
        });
    }

    static show(element) {
        const text = element.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--fondo-principal);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 14px;
            pointer-events: none;
            z-index: 10000;
            white-space: nowrap;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + window.scrollY + 'px';

        element._tooltip = tooltip;
    }

    static hide(element) {
        if (element._tooltip) {
            element._tooltip.remove();
            delete element._tooltip;
        }
    }
}

// === SISTEMA DE MODALES ===
class ModalSystem {
    static open(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Animar entrada
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }

    static close(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    static init() {
        // Cerrar modal al hacer click en backdrop
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    ModalSystem.close(modal.id);
                }
            });
        });

        // Cerrar con tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'flex') {
                        ModalSystem.close(modal.id);
                    }
                });
            }
        });
    }
}

// === UTILIDADES GENERALES ===
const Utils = {
    // Smooth scroll a elemento
    scrollTo(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    // Detectar dispositivo móvil
    isMobile() {
        return window.innerWidth <= 768;
    },

    // Generar ID único
    generateId() {
        return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    // Formatear número con separadores
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Shuffle array
    shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },

    // Random entre min y max
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// === SISTEMA DE DATOS (para experimentos) ===
class DataCollector {
    constructor(experimentName) {
        this.experimentName = experimentName;
        this.data = [];
        this.startTime = Date.now();
    }

    // Agregar evento
    addEvent(eventType, eventData) {
        this.data.push({
            timestamp: Date.now(),
            timeFromStart: Date.now() - this.startTime,
            eventType: eventType,
            eventData: eventData
        });
    }

    // Guardar datos localmente
    save() {
        const key = `coherencia_${this.experimentName}_${Date.now()}`;
        localStorage.setItem(key, JSON.stringify({
            experimentName: this.experimentName,
            startTime: this.startTime,
            endTime: Date.now(),
            duration: Date.now() - this.startTime,
            events: this.data
        }));
    }

    // Obtener resumen
    getSummary() {
        return {
            totalEvents: this.data.length,
            duration: Date.now() - this.startTime,
            eventTypes: [...new Set(this.data.map(e => e.eventType))]
        };
    }

    // Exportar como CSV
    exportCSV() {
        const headers = ['timestamp', 'timeFromStart', 'eventType', 'eventData'];
        const rows = this.data.map(d => [
            d.timestamp,
            d.timeFromStart,
            d.eventType,
            JSON.stringify(d.eventData)
        ]);
        
        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.experimentName}_${Date.now()}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// === INICIALIZACIÓN GLOBAL ===
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar sistema de navegación
    const nav = new NavigationSystem();
    nav.updateProgressBar();

    // Configurar botones de navegación
    const btnVolver = document.querySelector('.btn-volver');
    if (btnVolver) {
        btnVolver.addEventListener('click', () => nav.goHome());
    }

    const btnSiguiente = document.querySelector('.btn-siguiente');
    if (btnSiguiente) {
        btnSiguiente.addEventListener('click', () => nav.nextScreen());
    }

    const btnAnterior = document.querySelector('.btn-anterior');
    if (btnAnterior) {
        btnAnterior.addEventListener('click', () => nav.prevScreen());
    }

    // Inicializar animaciones
    AnimationController.animateTimeline();
    AnimationController.animateStatCards();
    AnimationController.initParallax();

    // Inicializar tooltips
    TooltipSystem.init();

    // Inicializar modales
    ModalSystem.init();

    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                Utils.scrollTo(target, 80);
            }
        });
    });

    // Animar elementos al scroll
    AnimationController.observeElements('.animate-on-scroll', 'animate-fade-in-up');

    console.log('🧪 Laboratorio de Coherencia inicializado');
});

// Exportar para uso global
window.NavigationSystem = NavigationSystem;
window.AnimationController = AnimationController;
window.TooltipSystem = TooltipSystem;
window.ModalSystem = ModalSystem;
window.Utils = Utils;
window.DataCollector = DataCollector;
