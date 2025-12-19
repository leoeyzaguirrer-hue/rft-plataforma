// ============================================
// RED RELACIONAL ANIMADA (CANVAS)
// ============================================

class NetworkAnimation {
    constructor() {
        this.canvas = document.getElementById('networkCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: null, y: null };
        this.numNodes = 40;
        
        this.colors = {
            azulOscuro: '#0A3D5C',
            azulPrincipal: '#1976B2',
            amarillo: '#FFC107',
            blanco: '#FFFFFF'
        };

        this.init();
        this.animate();
        this.setupEventListeners();
    }

    init() {
        this.resizeCanvas();
        this.createNodes();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }

    createNodes() {
        this.nodes = [];
        for (let i = 0; i < this.numNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                isHighlight: Math.random() > 0.85 // 15% serán amarillos
            });
        }
    }

    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            
            // Gradiente para los nodos
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius
            );
            
            if (node.isHighlight) {
                gradient.addColorStop(0, this.colors.amarillo);
                gradient.addColorStop(1, 'rgba(255, 193, 7, 0.1)');
            } else {
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
            }
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Glow effect para nodos destacados
            if (node.isHighlight) {
                this.ctx.shadowBlur = 20;
                this.ctx.shadowColor = this.colors.amarillo;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        });
    }

    drawConnections() {
        const maxDistance = 150;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                    this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                    
                    // Si alguno de los nodos es highlight, la línea será amarilla
                    if (this.nodes[i].isHighlight || this.nodes[j].isHighlight) {
                        this.ctx.strokeStyle = `rgba(255, 193, 7, ${opacity * 0.8})`;
                        this.ctx.lineWidth = 1.5;
                    } else {
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        this.ctx.lineWidth = 1;
                    }
                    
                    this.ctx.stroke();
                }
            }
        }
    }

    drawMouseConnections() {
        if (this.mouse.x === null || this.mouse.y === null) return;

        const maxDistance = 200;

        this.nodes.forEach(node => {
            const dx = node.x - this.mouse.x;
            const dy = node.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.5;

                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.strokeStyle = `rgba(255, 193, 7, ${opacity})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
        });
    }

    updateNodes() {
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            // Rebote en los bordes
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Mantener dentro del canvas
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawConnections();
        this.drawMouseConnections();
        this.drawNodes();
        this.updateNodes();

        requestAnimationFrame(() => this.animate());
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY + window.scrollY;
        });

        window.addEventListener('scroll', () => {
            this.resizeCanvas();
        });

        // Limpiar mouse cuando sale de la ventana
        document.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
}

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

function scrollToModules() {
    const modulesSection = document.getElementById('modules');
    modulesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Animación de entrada para las cards
function observeModuleCards() {
    const cards = document.querySelectorAll('.module-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Click en módulos (placeholder para futura navegación)
function setupModuleClicks() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', function() {
            const moduleNum = this.getAttribute('data-module');
            console.log(`Módulo ${moduleNum} seleccionado`);
            // Aquí irá la navegación a cada módulo
            alert(`Módulo ${moduleNum} - Próximamente disponible`);
        });
    });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar red de conexiones
    new NetworkAnimation();
    
    // Observar cards para animación
    observeModuleCards();
    
    // Setup clicks en módulos
    setupModuleClicks();
});
