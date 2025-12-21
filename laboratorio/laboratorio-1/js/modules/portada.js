/* ===================================
   PORTADA - ARREGLADO DEFINITIVAMENTE
   =================================== */

class PortadaModule {
    constructor() {
        this.isProtocolActive = false;
        this.chisteNormalVisto = false;
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
        
        // Listener para cuando se muestra el módulo
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 0) {
                this.resetPortada();
            }
        });
    }
    
    setup() {
        // Botón leer chiste
        const btnLeer = document.getElementById('btn-leer-chiste');
        if (btnLeer) {
            btnLeer.addEventListener('click', () => this.leerChiste());
        }
        
        // Botón vivir situación - MÚLTIPLES INTENTOS DE ENCONTRARLO
        let btnVivir = document.getElementById('btn-vivir-situacion');
        
        if (!btnVivir) {
            // Buscar por clase o texto
            const botones = document.querySelectorAll('.btn-primary');
            botones.forEach(btn => {
                if (btn.textContent.includes('Vivir')) {
                    btnVivir = btn;
                }
            });
        }
        
        if (btnVivir) {
            console.log('✅ Botón "Vivir situación" encontrado');
            btnVivir.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔥 CLICK EN VIVIR SITUACIÓN');
                this.vivirSituacion();
            });
        } else {
            console.error('❌ NO se encontró botón "Vivir situación"');
        }
        
        // Botón explorar
        const btnExplorar = document.getElementById('btn-explorar');
        if (btnExplorar) {
            btnExplorar.addEventListener('click', () => {
                if (window.laboratorioApp) {
                    window.laboratorioApp.navigateToModule(1);
                }
            });
        }
    }
    
    async leerChiste() {
        const btnLeer = document.getElementById('btn-leer-chiste');
        if (btnLeer) {
            btnLeer.textContent = '✓ Leído';
            btnLeer.disabled = true;
            btnLeer.style.opacity = '0.6';
            this.chisteNormalVisto = true;
        }
        
        await this.delay(2000);
        this.mostrarTransicion();
    }
    
    async vivirSituacion() {
        console.log('📍 Iniciando protocolo...');
        
        if (this.isProtocolActive) {
            console.log('⚠️ Protocolo ya activo');
            return;
        }
        
        this.isProtocolActive = true;
        
        // Buscar elementos
        const protocoloTexto = document.querySelector('.protocolo-texto');
        const heartbeat = document.querySelector('.heartbeat-container');
        const chisteContainer = document.getElementById('chiste-protocolo-container');
        const btnVivir = document.getElementById('btn-vivir-situacion') || 
                         Array.from(document.querySelectorAll('.btn-primary'))
                             .find(b => b.textContent.includes('Vivir'));
        
        console.log('Elementos encontrados:', {
            texto: !!protocoloTexto,
            latido: !!heartbeat,
            chiste: !!chisteContainer,
            boton: !!btnVivir
        });
        
        // Ocultar botón
        if (btnVivir) {
            btnVivir.style.display = 'none';
        }
        
        // 1. Mostrar instrucciones
        if (protocoloTexto) {
            protocoloTexto.classList.remove('hidden');
            protocoloTexto.classList.add('fade-in-up');
            console.log('✅ Mostrando instrucciones');
        }
        
        await this.delay(3000);
        
        // 2. Mostrar latido
        if (heartbeat) {
            heartbeat.classList.remove('hidden');
            heartbeat.classList.add('fade-in');
            console.log('✅ Mostrando latido');
            
            // Intentar reproducir audio
            const audio = document.getElementById('heartbeat-audio');
            if (audio) {
                audio.play().catch(e => console.log('Audio bloqueado:', e));
            }
        }
        
        await this.delay(2000);
        
        // 3. Mostrar chiste
        if (chisteContainer) {
            chisteContainer.classList.remove('hidden');
            chisteContainer.classList.add('fade-in-up');
            console.log('✅ Mostrando chiste');
        }
        
        await this.delay(3000);
        
        // 4. Botón de confirmación
        const preview = document.getElementById('protocolo-preview');
        if (preview) {
            const btnConfirm = document.createElement('button');
            btnConfirm.className = 'btn-primary';
            btnConfirm.textContent = '✓ Experimentado';
            btnConfirm.disabled = true;
            btnConfirm.style.opacity = '0.6';
            btnConfirm.style.marginTop = '1rem';
            preview.appendChild(btnConfirm);
        }
        
        // Mostrar transición
        await this.delay(2000);
        this.mostrarTransicion();
    }
    
    async mostrarTransicion() {
        const transicion = document.getElementById('portada-transicion');
        if (transicion) {
            transicion.classList.remove('hidden');
            transicion.classList.add('fade-in-up');
            console.log('✅ Transición mostrada');
        }
    }
    
    resetPortada() {
        this.isProtocolActive = false;
        this.chisteNormalVisto = false;
        
        // Reset elementos
        const elementos = {
            texto: document.querySelector('.protocolo-texto'),
            latido: document.querySelector('.heartbeat-container'),
            chiste: document.getElementById('chiste-protocolo-container'),
            transicion: document.getElementById('portada-transicion')
        };
        
        Object.values(elementos).forEach(el => {
            if (el) el.classList.add('hidden');
        });
        
        // Reset botones
        const btnLeer = document.getElementById('btn-leer-chiste');
        if (btnLeer) {
            btnLeer.textContent = 'Leer chiste';
            btnLeer.disabled = false;
            btnLeer.style.opacity = '1';
        }
        
        const btnVivir = document.getElementById('btn-vivir-situacion');
        if (btnVivir) {
            btnVivir.style.display = 'inline-flex';
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Crear instancia INMEDIATAMENTE
const portadaModule = new PortadaModule();
console.log('🧪 Módulo Portada cargado');
