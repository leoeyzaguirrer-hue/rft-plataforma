/* ==============================================
   EXPERIMENTO CONCURRENT CHAINS - REBUILD
   Pantalla 4: Preferencia por Coherencia
   ============================================== */

class ExperimentoConcurrentChains {
    constructor() {
        this.currentTrial = 0;
        this.totalTrials = 10;
        this.elecciones = [];
        this.faseActual = 'libre';
        this.trials = [];
        
        // Estímulos
        this.emojis = {
            'A1': '🔴', 'A2': '🔵', 'A3': '🟢',
            'B1': '⭐', 'B2': '❤️', 'B3': '🔶',
            'C1': '📐', 'C2': '🔺', 'C3': '⭕'
        };

        this.init();
    }

    init() {
        this.generarSequenciaTrials();
        this.mostrarTrial();
    }

    generarSequenciaTrials() {
        // 4 forzados azul, 1 forzado amarilla, 5 libres
        const secuencia = [
            'forzada-azul', 'forzada-azul', 'forzada-azul', 'forzada-azul',
            'forzada-amarilla',
            'libre', 'libre', 'libre', 'libre', 'libre'
        ];
        
        // Shuffle simple
        this.trials = secuencia.sort(() => Math.random() - 0.5);
    }

    mostrarTrial() {
        if (this.currentTrial >= this.totalTrials) {
            this.finalizarExperimento();
            return;
        }

        // Actualizar progreso
        this.actualizarProgreso();

        // Tipo de trial
        const tipoTrial = this.trials[this.currentTrial];

        // Configurar puertas
        if (tipoTrial === 'forzada-azul') {
            this.configurarForzada('azul');
        } else if (tipoTrial === 'forzada-amarilla') {
            this.configurarForzada('amarilla');
        } else {
            this.configurarLibre();
        }

        // Ocultar mini matching y feedback
        document.getElementById('miniMatching').style.display = 'none';
        const feedback = document.getElementById('feedbackEleccion');
        feedback.classList.remove('show');
        feedback.innerHTML = '';
    }

    configurarForzada(puerta) {
        this.faseActual = 'forzada';
        const puertaAzul = document.getElementById('puertaAzul');
        const puertaAmarilla = document.getElementById('puertaAmarilla');
        const faseIndicator = document.getElementById('faseIndicator');

        if (puerta === 'azul') {
            puertaAzul.classList.remove('forzada');
            puertaAmarilla.classList.add('forzada');
            faseIndicator.innerHTML = `
                <div class="fase-titulo">Fase: Forzada (Azul)</div>
                <div class="fase-descripcion">Debes elegir la puerta azul</div>
            `;
            
            // Auto-elegir
            setTimeout(() => {
                if (this.currentTrial < this.totalTrials) {
                    this.elegirPuerta('azul', true);
                }
            }, 1500);
        } else {
            puertaAzul.classList.add('forzada');
            puertaAmarilla.classList.remove('forzada');
            faseIndicator.innerHTML = `
                <div class="fase-titulo">Fase: Forzada (Amarilla)</div>
                <div class="fase-descripcion">Debes elegir la puerta amarilla</div>
            `;
            
            setTimeout(() => {
                if (this.currentTrial < this.totalTrials) {
                    this.elegirPuerta('amarilla', true);
                }
            }, 1500);
        }
    }

    configurarLibre() {
        this.faseActual = 'libre';
        const puertaAzul = document.getElementById('puertaAzul');
        const puertaAmarilla = document.getElementById('puertaAmarilla');
        const faseIndicator = document.getElementById('faseIndicator');

        puertaAzul.classList.remove('forzada');
        puertaAmarilla.classList.remove('forzada');
        faseIndicator.innerHTML = `
            <div class="fase-titulo">Fase: Elección Libre</div>
            <div class="fase-descripcion">Elige la puerta que prefieras</div>
        `;
    }

    elegirPuerta(puerta, forzada = false) {
        // Validar
        if (this.faseActual === 'forzada') {
            const tipoTrial = this.trials[this.currentTrial];
            if (tipoTrial === 'forzada-azul' && puerta !== 'azul') return;
            if (tipoTrial === 'forzada-amarilla' && puerta !== 'amarilla') return;
        }

        // Registrar
        this.elecciones.push({
            trial: this.currentTrial,
            puerta: puerta,
            forzada: this.faseActual === 'forzada',
            timestamp: Date.now()
        });

        // Mostrar mini matching
        this.mostrarMiniMatching(puerta);
    }

    mostrarMiniMatching(puerta) {
        const container = document.getElementById('miniMatching');
        container.style.display = 'block';

        const esCoherente = puerta === 'azul';
        
        // Seleccionar muestra
        const muestras = ['B1', 'B2', 'B3'];
        const muestraId = muestras[Math.floor(Math.random() * muestras.length)];
        
        // Generar opciones
        let opciones;
        if (esCoherente) {
            opciones = ['C1', 'C2', 'C3'];
        } else {
            // Incoherente: falta la correcta
            const num = muestraId[1];
            opciones = ['C1', 'C2', 'C3'].filter(c => c !== 'C' + num);
            opciones.push('A2'); // Agregar otra
        }

        // Shuffle opciones
        opciones = opciones.sort(() => Math.random() - 0.5);

        // Renderizar
        container.innerHTML = `
            <div class="mini-muestra">
                <div class="mini-muestra-label">Empareja esto:</div>
                <div class="mini-muestra-emoji">${this.emojis[muestraId]}</div>
                <div class="mini-muestra-label">${muestraId}</div>
            </div>
            <div class="mini-opciones" id="miniOpciones">
                ${opciones.map(op => `
                    <div class="mini-opcion" data-opcion="${op}">
                        <div class="mini-opcion-emoji">${this.emojis[op] || '❓'}</div>
                        <div class="mini-opcion-label">${op}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // IMPORTANTE: Agregar eventos después de renderizar
        setTimeout(() => {
            const opciones = document.querySelectorAll('.mini-opcion');
            opciones.forEach(opcion => {
                opcion.addEventListener('click', () => {
                    const op = opcion.getAttribute('data-opcion');
                    this.responderMatching(op, esCoherente);
                });
            });
        }, 100);

        // Scroll
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }

    responderMatching(opcion, esCoherente) {
        const feedback = document.getElementById('feedbackEleccion');
        const puertaElegida = this.elecciones[this.elecciones.length - 1].puerta;
        
        let mensaje = '';
        if (esCoherente) {
            mensaje = `
                Elegiste la <strong style="color: #3B82F6;">Puerta Azul</strong> 🟦 
                y pudiste responder coherentemente.
            `;
        } else {
            mensaje = `
                Elegiste la <strong style="color: #F59E0B;">Puerta Amarilla</strong> 🟨 
                donde la respuesta coherente no estaba disponible.
            `;
        }

        feedback.innerHTML = `
            <div style="color: var(--texto-oscuro);">
                ${mensaje}
            </div>
            <br>
            <button class="btn btn-cyan" id="btnContinuar" style="margin-top: var(--space-4);">
                Continuar →
            </button>
        `;
        feedback.classList.add('show');

        // Agregar evento al botón
        setTimeout(() => {
            document.getElementById('btnContinuar').addEventListener('click', () => {
                this.siguienteTrial();
            });
        }, 100);
    }

    siguienteTrial() {
        this.currentTrial++;
        this.mostrarTrial();
    }

    actualizarProgreso() {
        const porcentaje = (this.currentTrial / this.totalTrials) * 100;
        document.getElementById('progressFill').style.width = porcentaje + '%';
        document.getElementById('progressText').textContent = 
            `Trial ${this.currentTrial + 1} de ${this.totalTrials}`;
    }

    finalizarExperimento() {
        // Ocultar experimento
        document.getElementById('experimentoContainer').style.display = 'none';

        // Analizar resultados
        const eleccionesLibres = this.elecciones.filter(e => !e.forzada);
        const azulLibres = eleccionesLibres.filter(e => e.puerta === 'azul').length;
        const amarillaLibres = eleccionesLibres.filter(e => e.puerta === 'amarilla').length;
        const totalLibres = eleccionesLibres.length;

        const porcentajeAzul = totalLibres > 0 ? (azulLibres / totalLibres) * 100 : 0;
        const porcentajeAmarilla = totalLibres > 0 ? (amarillaLibres / totalLibres) * 100 : 0;

        // Mostrar resultados
        this.mostrarResultados(azulLibres, amarillaLibres, porcentajeAzul, porcentajeAmarilla);
    }

    mostrarResultados(azul, amarilla, porcAzul, porcAmarilla) {
        const container = document.getElementById('resultadosPreferencia');
        container.classList.add('show');

        // Animar barras
        setTimeout(() => {
            document.getElementById('barraAzul').style.width = porcAzul + '%';
            document.getElementById('barraAmarilla').style.width = porcAmarilla + '%';
            
            document.getElementById('conteoAzul').textContent = azul;
            document.getElementById('conteoAmarilla').textContent = amarilla;
            
            document.getElementById('porcentajeAzul').textContent = Math.round(porcAzul) + '%';
            document.getElementById('porcentajeAmarilla').textContent = Math.round(porcAmarilla) + '%';
        }, 500);

        // Interpretación
        let interpretacion = '';
        if (porcAzul > 60) {
            interpretacion = `
                Mostraste una <strong>clara preferencia por la coherencia</strong> (${Math.round(porcAzul)}%). 
                Esto coincide con los participantes del estudio que prefirieron contextos donde 
                podían responder coherentemente.
            `;
        } else if (porcAzul >= 40) {
            interpretacion = `
                Tu preferencia fue <strong>moderada hacia la coherencia</strong> (${Math.round(porcAzul)}%). 
                Esto es similar al 39-45% del estudio real.
            `;
        } else {
            interpretacion = `
                No mostraste una preferencia clara hacia la coherencia (${Math.round(porcAzul)}%). 
                Esto también ocurrió en el estudio real con algunos participantes.
            `;
        }

        document.getElementById('interpretacionResultado').innerHTML = interpretacion;

        // Scroll
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
    }
}

// Variable global
let experimento;

// Función global para elegir puerta (llamada desde HTML)
function elegirPuerta(puerta) {
    if (experimento) {
        experimento.elegirPuerta(puerta);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    experimento = new ExperimentoConcurrentChains();
});
