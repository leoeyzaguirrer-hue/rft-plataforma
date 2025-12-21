/* ===================================
   LABORATORIO DEL HUMOR - protocolos.js
   Módulo 4: Los tres protocolos - ARREGLADO CON CONTRASTE
   =================================== */

class ProtocolosModule {
    constructor() {
        this.currentLab = 'reality';
        this.protocolosData = {
            reality: {
                duracion: 15,
                instrucciones: [
                    "Por favor imagina que estás en un hospital...",
                    "que lo que vas a escuchar es real,",
                    "como si estuviera ocurriendo en este momento...",
                    "",
                    "Respira profundo..."
                ]
            },
            identification: {
                duracion: 12,
                instrucciones: [
                    "Imagina que eres Juan...",
                    "Has estado ayudando a tu amigo durante meses...",
                    "Estás muy preocupado por él...",
                    "",
                    "Ahora escucha lo que dice..."
                ]
            },
            discomfort: {
                duracion: 12,
                instrucciones: [
                    "Imagina que este candidato necesita urgentemente el trabajo...",
                    "Tiene una familia que mantener...",
                    "Esta es su última oportunidad...",
                    "",
                    "Ahora escucha la entrevista..."
                ]
            }
        };
        
        this.chistes = {
            reality: 'Médico: "Relájate David, es solo una pequeña cirugía. No entres en pánico."\n\nPaciente: "Mi nombre no es David."\n\nMédico: "Lo sé. Yo soy David."',
            identification: 'Mira Juan, no iba a beber una cerveza pero vino mi gato y dijo MAHOU y yo le dije al gato... ¡vamos a tomarnos una!',
            discomfort: 'Entrevistador: "¿Nivel de inglés?"\n\nCandidato: "Alto."\n\nEntrevistador: "Traduce juguete."\n\nCandidato: "Toy."\n\nEntrevistador: "Úsalo en una oración."\n\nCandidato: "Toy triste."\n\nEntrevistador: "¡Contratado!"'
        };
        
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 4) {
                this.onModuleShown();
            }
        });
    }
    
    setupEventListeners() {
        // Navegación entre laboratorios
        const labButtons = document.querySelectorAll('.lab-btn');
        labButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const labName = btn.dataset.lab;
                this.switchLab(labName);
            });
        });
        
        // Botones iniciar protocolo
        const btnRealityStart = document.getElementById('btn-reality-start');
        const btnIdentificationStart = document.getElementById('btn-identification-start');
        const btnDiscomfortStart = document.getElementById('btn-discomfort-start');
        
        if (btnRealityStart) {
            btnRealityStart.addEventListener('click', () => {
                this.iniciarProtocolo('reality');
            });
        }
        
        if (btnIdentificationStart) {
            btnIdentificationStart.addEventListener('click', () => {
                this.iniciarProtocolo('identification');
            });
        }
        
        if (btnDiscomfortStart) {
            btnDiscomfortStart.addEventListener('click', () => {
                this.iniciarProtocolo('discomfort');
            });
        }
        
        // Botones de explicación
        const btnsExplicacion = document.querySelectorAll('.btn-explicacion');
        btnsExplicacion.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleExplicacion(e.currentTarget);
            });
        });
    }
    
    onModuleShown() {
        this.switchLab('reality');
    }
    
    switchLab(labName) {
        // Actualizar botones
        const labButtons = document.querySelectorAll('.lab-btn');
        labButtons.forEach(btn => {
            if (btn.dataset.lab === labName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Actualizar laboratorios
        const labs = document.querySelectorAll('.laboratorio');
        labs.forEach(lab => {
            if (lab.id === `lab-${labName}`) {
                lab.classList.add('active');
                lab.classList.add('fade-in');
            } else {
                lab.classList.remove('active');
            }
        });
        
        this.currentLab = labName;
    }
    
    async iniciarProtocolo(tipo) {
        const protocolo = this.protocolosData[tipo];
        const player = document.getElementById(`${tipo}-player`);
        const btnStart = document.getElementById(`btn-${tipo}-start`);
        
        if (!player || !protocolo) return;
        
        // Ocultar botón
        btnStart.style.display = 'none';
        
        // Mostrar player
        player.classList.remove('hidden');
        player.innerHTML = '';
        
        // Crear contenedor de instrucciones
        const instruccionesContainer = Utils.createElement('div', ['protocolo-instrucciones'], {});
        player.appendChild(instruccionesContainer);
        
        // Tiempo por instrucción
        const tiempoPorInstruccion = (protocolo.duracion * 1000) / protocolo.instrucciones.length;
        
        // Mostrar instrucciones una por una
        for (let i = 0; i < protocolo.instrucciones.length; i++) {
            const instruccion = protocolo.instrucciones[i];
            
            if (instruccion === '') {
                await Utils.delay(500);
                continue;
            }
            
            const p = Utils.createElement('p', ['instruccion-texto'], {});
            p.textContent = instruccion;
            p.style.opacity = '0';
            instruccionesContainer.appendChild(p);
            
            Utils.fadeIn(p, 500);
            await Utils.delay(tiempoPorInstruccion);
        }
        
        // Mostrar chiste con CONTRASTE
        await this.mostrarChiste(tipo, player);
        
        // Botón para reflexionar
        await Utils.delay(2000);
        const btnReflexion = Utils.createElement('button', ['btn-primary'], {});
        btnReflexion.textContent = '¿Qué sentiste?';
        btnReflexion.style.marginTop = '2rem';
        player.appendChild(btnReflexion);
        
        btnReflexion.addEventListener('click', () => {
            this.mostrarReflexion(tipo, player);
        });
    }
    
    async mostrarChiste(tipo, player) {
        const chisteBox = Utils.createElement('div', ['chiste-protocolo-box'], {});
        
        const chisteTexto = Utils.createElement('p', [], {});
        chisteTexto.innerHTML = this.chistes[tipo].replace(/\n/g, '<br>');
        chisteTexto.style.whiteSpace = 'pre-line';
        chisteTexto.style.fontSize = '1.125rem';
        chisteTexto.style.lineHeight = '1.8';
        
        chisteBox.appendChild(chisteTexto);
        player.appendChild(chisteBox);
        
        chisteBox.style.opacity = '0';
        Utils.fadeIn(chisteBox, 600);
    }
    
    mostrarReflexion(tipo, player) {
        const reflexionBox = Utils.createElement('div', ['reflexion-box'], {});
        
        const pregunta = Utils.createElement('p', [], {});
        pregunta.textContent = '¿Notaste alguna diferencia en cómo te hizo sentir el chiste después del protocolo?';
        pregunta.style.fontWeight = '600';
        pregunta.style.marginBottom = '1rem';
        
        const nota = Utils.createElement('p', [], {});
        nota.textContent = 'Este es exactamente el tipo de cambio que el estudio documentó en los participantes.';
        nota.style.fontSize = '0.875rem';
        nota.style.fontStyle = 'italic';
        
        reflexionBox.appendChild(pregunta);
        reflexionBox.appendChild(nota);
        player.appendChild(reflexionBox);
        
        reflexionBox.style.opacity = '0';
        Utils.fadeIn(reflexionBox, 600);
    }
    
    toggleExplicacion(button) {
        const lab = button.closest('.laboratorio');
        const explicacionContent = lab.querySelector('.explicacion-content');
        
        if (explicacionContent.classList.contains('hidden')) {
            explicacionContent.classList.remove('hidden');
            Utils.fadeIn(explicacionContent, 400);
            button.textContent = 'Ocultar explicación';
        } else {
            Utils.fadeOut(explicacionContent, 300);
            setTimeout(() => {
                explicacionContent.classList.add('hidden');
            }, 300);
            button.textContent = '¿Qué hace este protocolo?';
        }
    }
}

const protocolosModule = new ProtocolosModule();
