/* ===================================
   LABORATORIO DEL HUMOR - portada.js
   Módulo 0: Portada - ARREGLADO
   =================================== */

class PortadaModule {
    constructor() {
        this.btnLeerChiste = null;
        this.btnVivirSituacion = null;
        this.btnExplorar = null;
        this.heartbeatAudio = null;
        this.isProtocolActive = false;
        
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
        chisteTexto.classList.add('fade-in-up');
        
        this.btnLeerChiste.textContent = '✓ Leído';
        this.btnLeerChiste.disabled = true;
        this.btnLeerChiste.style.opacity = '0.6';
        
        await Utils.delay(2000);
        this.checkMostrarTransicion();
    }
    
    async iniciarProtocolo() {
        if (this.isProtocolActive) return;
        this.isProtocolActive = true;
        
        const protocoloPreview = document.getElementById('protocolo-preview');
        const protocoloTexto = protocoloPreview.querySelector('.protocolo-texto');
        const heartbeatContainer = protocoloPreview.querySelector('.heartbeat-container');
        const chisteProtocoloContainer = document.getElementById('chiste-protocolo-container');
        
        const ladoProtocolo = document.querySelector('.portada-protocolo');
        ladoProtocolo.classList.add('active');
        
        this.btnVivirSituacion.style.display = 'none';
        
        // Mostrar instrucciones
        protocoloTexto.classList.remove('hidden');
        protocoloTexto.classList.add('fade-in-up');
        
        await Utils.delay(3000);
        
        // Mostrar latido
        heartbeatContainer.classList.remove('hidden');
        heartbeatContainer.classList.add('fade-in');
        
        if (this.heartbeatAudio) {
            Utils.playAudio(this.heartbeatAudio, true);
        }
        
        await Utils.delay(2000);
        
        // Mostrar chiste
        chisteProtocoloContainer.classList.remove('hidden');
        chisteProtocoloContainer.classList.add('fade-in-up');
        
        await Utils.delay(3000);
        
        const btnConfirmar = Utils.createElement('button', ['btn-primary'], {});
        btnConfirmar.textContent = '✓ Experimentado';
        btnConfirmar.style.opacity = '0.6';
        btnConfirmar.disabled = true;
        protocoloPreview.appendChild(btnConfirmar);
        
        setTimeout(() => {
            if (this.heartbeatAudio) {
                Utils.stopAudio(this.heartbeatAudio);
            }
        }, 10000);
        
        await Utils.delay(2000);
        this.checkMostrarTransicion();
    }
    
    checkMostrarTransicion() {
        const chisteNormalVisto = this.btnLeerChiste && this.btnLeerChiste.disabled;
        const protocoloVisto = this.isProtocolActive;
        
        if (chisteNormalVisto && protocoloVisto) {
            this.mostrarTransicion();
        }
    }
    
    async mostrarTransicion() {
        const transicion = document.getElementById('portada-transicion');
        if (!transicion) return;
        
        transicion.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await Utils.delay(500);
        transicion.classList.remove('hidden');
    }
    
    resetPortada() {
        this.isProtocolActive = false;
        
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
        
        if (protocoloTexto) protocoloTexto.classList.add('hidden');
        if (heartbeatContainer) heartbeatContainer.classList.add('hidden');
        if (chisteProtocoloContainer) chisteProtocoloContainer.classList.add('hidden');
        
        const transicion = document.getElementById('portada-transicion');
        if (transicion) transicion.classList.add('hidden');
        
        const ladoProtocolo = document.querySelector('.portada-protocolo');
        if (ladoProtocolo) ladoProtocolo.classList.remove('active');
    }
}

const portadaModule = new PortadaModule();
