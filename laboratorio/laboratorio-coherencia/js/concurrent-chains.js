/* ==============================================
   EXPERIMENTO CONCURRENT CHAINS
   Estudio 2: Preferencia por Coherencia
   ============================================== */

class ExperimentoConcurrentChains {
    constructor() {
        this.currentTrial = 0;
        this.totalTrials = 10;
        this.elecciones = [];
        this.faseActual = 'libre'; // 'forzada' o 'libre'
        this.trials = [];
        this.responseCost = 0; // Para Pantalla 5
        
        // Estímulos aprendidos (simulados)
        this.clasesAprendidas = {
            'A1': ['B1', 'C1'],
            'A2': ['B2', 'C2'],
            'A3': ['B3', 'C3'],
            'B1': ['A1', 'C1'],
            'B2': ['A2', 'C2'],
            'B3': ['A3', 'C3']
        };

        this.init();
    }

    init() {
        this.generarSequenciaTrials();
        this.mostrarTrial();
    }

    generarSequenciaTrials() {
        // Generar secuencia de 10 trials
        // 40% forzados azul, 10% forzados amarilla, 50% libres
        const secuencia = [
            'forzada-azul', 'forzada-azul', 'forzada-azul', 'forzada-azul',
            'forzada-amarilla',
            'libre', 'libre', 'libre', 'libre', 'libre'
        ];

        // Shuffle
        this.trials = Utils.shuffle(secuencia);
    }

    mostrarTrial() {
        if (this.currentTrial >= this.totalTrials) {
            this.finalizarExperimento();
            return;
        }

        // Actualizar progreso
        this.actualizarProgreso();

        // Obtener tipo de trial actual
        const tipoTrial = this.trials[this.currentTrial];

        // Configurar puertas según el tipo
        if (tipoTrial === 'forzada-azul') {
            this.configurarForzada('azul');
        } else if (tipoTrial === 'forzada-amarilla') {
            this.configurarForzada('amarilla');
        } else {
            this.configurarLibre();
        }

        // Ocultar mini matching
        document.getElementById('miniMatching').style.display = 'none';
        document.getElementById('feedbackEleccion').classList.remove('show');
    }

    configurarForzada(puerta) {
        this.faseActual = 'forzada';
        const puertaAzul = document.getElementById('puertaAzul');
        const puertaAmarilla = document.getElementById('puertaAmarilla');
        const faseIndicator = document.getElementById('faseIndicator');

        // Deshabilitar la puerta no seleccionada
        if (puerta === 'azul') {
            puertaAzul.classList.remove('forzada');
            puertaAmarilla.classList.add('forzada');
            faseIndicator.querySelector('.fase-titulo').textContent = 'Fase: Forzada (Azul)';
            faseIndicator.querySelector('.fase-descripcion').textContent = 'Debes elegir la puerta azul';
            
            // Auto-elegir después de 1 segundo
            setTimeout(() => {
                if (this.currentTrial < this.totalTrials) {
                    this.elegirPuerta('azul', true);
                }
            }, 1500);
        } else {
            puertaAzul.classList.add('forzada');
            puertaAmarilla.classList.remove('forzada');
            faseIndicator.querySelector('.fase-titulo').textContent = 'Fase: Forzada (Amarilla)';
            faseIndicator.querySelector('.fase-descripcion').textContent = 'Debes elegir la puerta amarilla';
            
            // Auto-elegir después de 1 segundo
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

        // Habilitar ambas puertas
        puertaAzul.classList.remove('forzada');
        puertaAmarilla.classList.remove('forzada');
        faseIndicator.querySelector('.fase-titulo').textContent = 'Fase: Elección Libre';
        faseIndicator.querySelector('.fase-descripcion').textContent = 'Elige la puerta que prefieras';
    }

    elegirPuerta(puerta, forzada = false) {
        // Validar si es forzada
        if (this.faseActual === 'forzada') {
            const tipoTrial = this.trials[this.currentTrial];
            if (tipoTrial === 'forzada-azul' && puerta !== 'azul') return;
            if (tipoTrial === 'forzada-amarilla' && puerta !== 'amarilla') return;
        }

        // Registrar elección
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

        // Generar trial de matching
        const esCoherente = puerta === 'azul';
        
        // Seleccionar muestra aleatoria
        const muestras = ['B1', 'B2', 'B3'];
        const muestraId = muestras[Math.floor(Math.random() * muestras.length)];
        
        // Generar opciones
        let opciones;
        if (esCoherente) {
            // Opciones coherentes: incluye la respuesta correcta
            opciones = ['C1', 'C2', 'C3'];
        } else {
            // Opciones incoherentes: falta la respuesta correcta
            // Si la muestra es B1, las opciones serían A2, C2, C3 (falta C1)
            const numeroMuestra = muestraId[1];
            opciones = ['A', 'C', 'C'].map((letra, i) => {
                const num = (parseInt(numeroMuestra) + i) % 3 + 1;
                return letra + (letra === 'C' && num === parseInt(numeroMuestra) ? ((num % 3) + 1) : num);
            });
        }

        // Renderizar
        // Renderizar
container.innerHTML = `
    <div class="mini-muestra">
        <div class="mini-muestra-label">Empareja esto:</div>
        <div class="mini-muestra-emoji">${this.getEmoji(muestraId)}</div>
        <div class="mini-muestra-label">${muestraId}</div>
    </div>
    <div class="mini-opciones">
        ${opciones.map((op, index) => `
            <div class="mini-opcion" data-opcion="${op}" data-index="${index}">
                <div class="mini-opcion-emoji">${this.getEmoji(op)}</div>
                <div class="mini-opcion-label">${op}</div>
            </div>
        `).join('')}
    </div>
`;

// Agregar event listeners después de renderizar
document.querySelectorAll('.mini-opcion').forEach(opcion => {
    opcion.addEventListener('click', () => {
        const op = opcion.dataset.opcion;
        this.responderMatching(op, esCoherente);
    });
});

        // Scroll suave
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }

    getEmoji(id) {
        // Mapeo simple de IDs a emojis
        const emojis = {
            'A1': '🔴', 'A2': '🔵', 'A3': '🟢',
            'B1': '⭐', 'B2': '❤️', 'B3': '🔶',
            'C1': '📐', 'C2': '🔺', 'C3': '⭕'
        };
        return emojis[id] || '❓';
    }

    responderMatching(opcion, esCoherente) {
        // Mostrar feedback
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
            ${mensaje}
            <br><br>
            <button class="btn btn-cyan" onclick="experimento.siguienteTrial()" style="margin-top: var(--space-4);">
                Continuar →
            </button>
        `;
        feedback.classList.add('show');
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
                podían responder coherentemente. Tu mente busca activamente situaciones donde 
                "tiene sentido" lo que estás haciendo.
            `;
        } else if (porcAzul >= 40) {
            interpretacion = `
                Tu preferencia fue <strong>moderada hacia la coherencia</strong> (${Math.round(porcAzul)}%). 
                Esto es similar al 39-45% de participantes del estudio real que mostraron preferencia 
                por coherencia en los primeros bloques. Algunas veces preferiste tener sentido, 
                otras veces no te importó tanto.
            `;
        } else {
            interpretacion = `
                No mostraste una preferencia clara hacia la coherencia (${Math.round(porcAzul)}%). 
                Esto también ocurrió en el estudio real. Algunas personas no muestran preferencia 
                fuerte, especialmente si las diferencias entre las opciones no eran completamente 
                claras para ellas.
            `;
        }

        document.getElementById('interpretacionResultado').innerHTML = interpretacion;

        // Scroll a resultados
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
    }
}

// Instancia global
let experimento;

// Función global para elegir puerta (llamada desde HTML)
function elegirPuerta(puerta) {
    if (experimento) {
        experimento.elegirPuerta(puerta);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        experimento = new ExperimentoConcurrentChains();
    });
} else {
    experimento = new ExperimentoConcurrentChains();
}
