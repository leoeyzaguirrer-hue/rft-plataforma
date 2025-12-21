/* ===================================
   LABORATORIO DEL HUMOR - portada.js
   Módulo 0: Portada - ARREGLADO COMPLETO
   =================================== */

class PortadaModule {
    constructor() {
        this.btnLeerChiste = null;
        this.btnVivirSituacion = null;
        this.btnExplorar = null;
        this.heartbeatAudio = null;
        this.isProtocolActive = false;
        this.chisteNormalVisto = false;
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupElements();
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 0) {
                this.onModuleShown();
            }
        });
    }
    
    setupElements() {
        this.btnLeerChiste = document.getElementById('btn-leer-chiste');
        this.btnVivirSituacion = document.getElementById('btn-vivir-situacion');
        this.btnExplorar = document.getElementById('btn-explorar');
        this.heartbeatAudio = document.getElementById('heartbeat-audio');
    }
    
    setupEventListeners() {
        if (this.btnLeerChiste) {
            this.btnLeerChiste.addEventListener('click', () => {
                this.mostrarChisteNormal();
            });
        }
        
        if (this.btnVivirSituacion) {
            this.btnVivirSituacion.addEventListener('click', () => {
                console.log('Click en Vivir situación'); // Debug
                this.iniciarProtocolo();
            });
        }
        
        if (this.btnExplorar) {
            this.btnExplorar.addEventListener('click', () => {
                window.laboratorioApp.navigateToModule(1);
            });
        }
    }
    
    onModuleShown() {
        this.resetPortada();
    }
    
    async mostrarChisteNormal() {
        const chisteTexto = document.getElementById('chiste-normal');
        if (chisteTexto) {
            chisteTexto.classList.add('fade-in-up');
        }
        
        this.btnLeerChiste.textContent = '✓ Leído';
        this.btnLeerChiste.disabled = true;
        this.btnLeerChiste.style.opacity = '0.6';
        this.chisteNormalVisto = true;
        
        await Utils.delay(2000);
        this.checkMostrarTransicion();
    }
    
    async iniciarProtocolo() {
        console.log('Iniciando protocolo...'); // Debug
        
        if (this.isProtocolActive) {
            console.log('Protocolo ya activo'); // Debug
            return;
        }
        
        this.isProtocolActive = true;
        
        const protocoloPreview = document.getElementById('protocolo-preview');
        const protocoloTexto = document.querySelector('.protocolo-texto');
        const heartbeatContainer = document.querySelector('.heartbeat-container');
        const chisteProtocoloContainer = document.getElementById('chiste-protocolo-container');
        
        console.log('Elementos encontrados:', {
            protocoloPreview: !!protocoloPreview,
            protocoloTexto: !!protocoloTexto,
            heartbeatContainer: !!heartbeatContainer,
            chisteProtocoloContainer: !!chisteProtocoloContainer
        }); // Debug
        
        const ladoProtocolo = document.querySelector('.portada-protocolo');
        if (ladoProtocolo) {
            ladoProtocolo.classList.add('active');
        }
        
        // Ocultar botón
        this.btnVivirSituacion.style.display = 'none';
        
        // Mostrar instrucciones
        if (protocoloTexto) {
            protocoloTexto.classList.remove('hidden');
            protocoloTexto.classList.add('fade-in-up');
            console.log('Mostrando instrucciones'); // Debug
        }
        
        await Utils.delay(3000);
        
        // Mostrar latido
        if (heartbeatContainer) {
            heartbeatContainer.classList.remove('hidden');
            heartbeatContainer.classList.add('fade-in');
            console.log('Mostrando latido'); // Debug
        }
        
        if (this.heartbeatAudio) {
            Utils.playAudio(this.heartbeatAudio, true);
        }
        
        await Utils.delay(2000);
        
        // Mostrar chiste
        if (chisteProtocoloContainer) {
            chisteProtocoloContainer.classList.remove('hidden');
            chisteProtocoloContainer.classList.add('fade-in-up');
            console.log('Mostrando chiste'); // Debug
        }
        
        await Utils.delay(3000);
        
        // Botón de confirmación
        if (protocoloPreview) {
            const btnConfirmar = Utils.createElement('button', ['btn-primary'], {});
            btnConfirmar.textContent = '✓ Experimentado';
            btnConfirmar.style.opacity = '0.6';
            btnConfirmar.disabled = true;
            btnConfirmar.style.marginTop = '1rem';
            protocoloPreview.appendChild(btnConfirmar);
        }
        
        // Detener latido después de un tiempo
        setTimeout(() => {
            if (this.heartbeatAudio) {
                Utils.stopAudio(this.heartbeatAudio);
            }
        }, 10000);
        
        await Utils.delay(2000);
        this.checkMostrarTransicion();
    }
    
    checkMostrarTransicion() {
        console.log('Check transición:', {
            chisteNormal: this.chisteNormalVisto,
            protocolo: this.isProtocolActive
        }); // Debug
        
        // Mostrar transición si CUALQUIERA de las dos acciones está completa
        if (this.chisteNormalVisto || this.isProtocolActive) {
            this.mostrarTransicion();
        }
    }
    
    async mostrarTransicion() {
        const transicion = document.getElementById('portada-transicion');
        if (!transicion) return;
        
        console.log('Mostrando transición'); // Debug
        
        transicion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await Utils.delay(500);
        transicion.classList.remove('hidden');
        transicion.classList.add('fade-in-up');
    }
    
    resetPortada() {
        this.isProtocolActive = false;
        this.chisteNormalVisto = false;
        
        if (this.btnLeerChiste) {
            this.btnLeerChiste.textContent = 'Leer chiste';
            this.btnLeerChiste.disabled = false;
            this.btnLeerChiste.style.opacity = '1';
        }
        
        if (this.btnVivirSituacion) {
            this.btnVivirSituacion.style.display = 'inline-flex';
        }
        
        if (this.heartbeatAudio) {
            Utils.stopAudio(this.heartbeatAudio);
        }
        
        const protocoloTexto = document.querySelector('.protocolo-texto');
        const heartbeatContainer = document.querySelector('.heartbeat-container');
        const chisteProtocoloContainer = document.getElementById('chiste-protocolo-container');
        
        if (protocoloTexto) {
            protocoloTexto.classList.add('hidden');
            protocoloTexto.classList.remove('fade-in-up');
        }
        if (heartbeatContainer) {
            heartbeatContainer.classList.add('hidden');
            heartbeatContainer.classList.remove('fade-in');
        }
        if (chisteProtocoloContainer) {
            chisteProtocoloContainer.classList.add('hidden');
            chisteProtocoloContainer.classList.remove('fade-in-up');
        }
        
        const transicion = document.getElementById('portada-transicion');
        if (transicion) {
            transicion.classList.add('hidden');
            transicion.classList.remove('fade-in-up');
        }
        
        const ladoProtocolo = document.querySelector('.portada-protocolo');
        if (ladoProtocolo) {
            ladoProtocolo.classList.remove('active');
        }
        
        // Limpiar botones añadidos dinámicamente
        const botonesExtra = document.querySelectorAll('#protocolo-preview .btn-primary');
        botonesExtra.forEach(btn => {
            if (btn.textContent.includes('Experimentado')) {
                btn.remove();
            }
        });
    }
}

const portadaModule = new PortadaModule();
