/* ==============================================
   EXPERIMENTO MATCHING-TO-SAMPLE INTERACTIVO
   ============================================== */

class ExperimentoMatchingToSample {
    constructor() {
        this.currentTrial = 0;
        this.totalTrials = 5;
        this.respuestas = [];
        this.tiemposRespuesta = [];
        this.trialStartTime = null;
        
        // Estímulos de comida con sus propiedades
        this.estimulos = [
            { emoji: '🥦', nombre: 'Brócoli', forma: 'lineas', significado: 'saludable' },
            { emoji: '🍕', nombre: 'Pizza', forma: 'triangulos', significado: 'no-saludable' },
            { emoji: '🍎', nombre: 'Manzana', forma: 'circulos', significado: 'saludable' },
            { emoji: '🍩', nombre: 'Donut', forma: 'circulos', significado: 'no-saludable' },
            { emoji: '🥕', nombre: 'Zanahoria', forma: 'lineas', significado: 'saludable' }
        ];

        // Opciones de respuesta
        this.opcionesForma = [
            { id: 'lineas', emoji: '📏', label: 'Líneas', tipo: 'forma' },
            { id: 'circulos', emoji: '⭕', label: 'Círculos', tipo: 'forma' },
            { id: 'triangulos', emoji: '🔺', label: 'Triángulos', tipo: 'forma' }
        ];

        this.opcionesSignificado = [
            { id: 'saludable', emoji: '💚', label: 'Saludable', tipo: 'significado' },
            { id: 'no-saludable', emoji: '🍔', label: 'No Saludable', tipo: 'significado' },
            { id: 'asqueroso', emoji: '🤢', label: 'Asqueroso', tipo: 'significado' }
        ];

        // Decidir aleatoriamente qué tipo de opciones mostrar
        this.tipoOpciones = Math.random() > 0.5 ? 'forma' : 'significado';
        this.opciones = this.tipoOpciones === 'forma' ? this.opcionesForma : this.opcionesSignificado;

        this.init();
    }

    init() {
        this.mostrarTrial();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const btnContinuar = document.getElementById('btnContinuar');
        if (btnContinuar) {
            btnContinuar.addEventListener('click', () => this.siguienteTrial());
        }
    }

    mostrarTrial() {
        // Actualizar contador
        document.getElementById('trialCounter').textContent = 
            `Prueba ${this.currentTrial + 1} de ${this.totalTrials}`;

        // Obtener estímulo actual
        const estimulo = this.estimulos[this.currentTrial];

        // Mostrar estímulo
        document.getElementById('estimuloMuestra').textContent = estimulo.emoji;
        document.getElementById('estimuloNombre').textContent = estimulo.nombre;

        // Generar opciones
        this.generarOpciones();

        // Ocultar feedback y botón continuar
        document.getElementById('feedbackContainer').classList.remove('show');
        document.getElementById('btnContinuar').classList.remove('show');

        // Iniciar temporizador
        this.trialStartTime = Date.now();
    }

    generarOpciones() {
        const container = document.getElementById('opcionesContainer');
        container.innerHTML = '';

        // Shuffle opciones para evitar sesgo de posición
        const opcionesShuffled = Utils.shuffle([...this.opciones]);

        opcionesShuffled.forEach(opcion => {
            const card = document.createElement('div');
            card.className = 'opcion-card';
            card.dataset.opcionId = opcion.id;
            card.dataset.opcionTipo = opcion.tipo;

            card.innerHTML = `
                <span class="opcion-emoji">${opcion.emoji}</span>
                <div class="opcion-label">${opcion.label}</div>
            `;

            card.addEventListener('click', () => this.seleccionarOpcion(card, opcion));
            container.appendChild(card);
        });
    }

    seleccionarOpcion(cardElement, opcion) {
        // Remover selección previa
        document.querySelectorAll('.opcion-card').forEach(card => {
            card.classList.remove('seleccionada');
        });

        // Seleccionar nueva opción
        cardElement.classList.add('seleccionada');

        // Registrar respuesta
        const tiempoRespuesta = Date.now() - this.trialStartTime;
        const estimuloActual = this.estimulos[this.currentTrial];

        this.respuestas.push({
            trial: this.currentTrial,
            estimulo: estimuloActual,
            respuesta: opcion,
            tiempoRespuesta: tiempoRespuesta
        });

        this.tiemposRespuesta.push(tiempoRespuesta);

        // Mostrar feedback neutral
        this.mostrarFeedback(estimuloActual, opcion);
    }

    mostrarFeedback(estimulo, respuesta) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackTexto = document.getElementById('feedbackTexto');

        // Determinar si fue coherente con las propiedades del estímulo
        let esCoherente = false;
        if (this.tipoOpciones === 'forma') {
            esCoherente = respuesta.id === estimulo.forma;
        } else {
            esCoherente = respuesta.id === estimulo.significado;
        }

        feedbackTexto.innerHTML = `
            Elegiste <strong>${respuesta.label}</strong>. 
            ${esCoherente ? '✓' : ''} 
            <br><br>
            <em>Recuerda: no hay respuestas correctas o incorrectas. 
            Solo queremos ver tu patrón natural de respuesta.</em>
        `;

        feedbackContainer.classList.add('show');
        document.getElementById('btnContinuar').classList.add('show');
    }

    siguienteTrial() {
        this.currentTrial++;

        if (this.currentTrial < this.totalTrials) {
            this.mostrarTrial();
        } else {
            this.finalizarExperimento();
        }
    }

    finalizarExperimento() {
        // Ocultar contenedor de experimento
        document.querySelector('.experimento-container').style.display = 'none';

        // Analizar resultados
        const analisis = this.analizarRespuestas();

        // Mostrar resultados
        this.mostrarResultados(analisis);
    }

    analizarRespuestas() {
        // Detectar patrón predominante
        const patronForma = this.respuestas.filter(r => {
            const estimulo = r.estimulo;
            return r.respuesta.id === estimulo.forma;
        }).length;

        const patronSignificado = this.respuestas.filter(r => {
            const estimulo = r.estimulo;
            return r.respuesta.id === estimulo.significado;
        }).length;

        // Determinar tipo de patrón
        let tipoPatron = 'Mixto';
        let consistencia = 0;

        if (patronForma > patronSignificado) {
            tipoPatron = 'Forma';
            consistencia = (patronForma / this.totalTrials) * 100;
        } else if (patronSignificado > patronForma) {
            tipoPatron = 'Significado';
            consistencia = (patronSignificado / this.totalTrials) * 100;
        } else {
            consistencia = 40; // Patrón mixto
        }

        // Comparar con el estudio real
        // En el estudio: 73% mostraron coherencia
        const comparacionEstudio = Math.min(consistencia / 73 * 100, 100);

        return {
            tipoPatron,
            consistencia: Math.round(consistencia),
            comparacionEstudio: Math.round(comparacionEstudio),
            patronForma,
            patronSignificado,
            tiempoPromedio: Math.round(
                this.tiemposRespuesta.reduce((a, b) => a + b, 0) / this.tiemposRespuesta.length / 1000
            )
        };
    }

    mostrarResultados(analisis) {
        const container = document.getElementById('resultadosContainer');
        container.classList.add('show');

        // Animar números
        setTimeout(() => {
            AnimationController.animateCounter(
                document.getElementById('resultadoConsistencia'),
                0,
                analisis.consistencia,
                1000
            );

            AnimationController.animateCounter(
                document.getElementById('resultadoComparacion'),
                0,
                analisis.comparacionEstudio,
                1500
            );
        }, 300);

        document.getElementById('resultadoPatron').textContent = analisis.tipoPatron;

        // Interpretación personalizada
        let interpretacion = '';

        if (analisis.consistencia >= 80) {
            interpretacion = `¡Impresionante! Mostraste un patrón muy coherente (${analisis.consistencia}% consistente usando ${analisis.tipoPatron.toLowerCase()}). 
            Esto es exactamente lo que encontraron los investigadores: los humanos buscamos coherencia automáticamente, 
            incluso sin instrucciones ni reforzamiento. Estás en el mismo rango que el 73% de participantes del estudio.`;
        } else if (analisis.consistencia >= 60) {
            interpretacion = `Tu patrón fue moderadamente coherente (${analisis.consistencia}% consistente). 
            Esto también es normal. Algunos participantes del estudio mostraron patrones menos marcados en las primeras pruebas, 
            pero se volvieron más consistentes con más exposición. Tu mente está explorando qué criterio usar.`;
        } else {
            interpretacion = `Tu patrón fue más exploratorio (${analisis.consistencia}% consistente). 
            Esto es completamente válido. El 27% de participantes también mostró patrones menos definidos. 
            Algunos estaban probando diferentes estrategias o encontraron la tarea ambigua. 
            La coherencia no es todo-o-nada, es un espectro.`;
        }

        document.getElementById('interpretacionResultado').textContent = interpretacion;

        // Scroll suave a resultados
        setTimeout(() => {
            Utils.scrollTo('#resultadosContainer', 100);
        }, 500);
    }
}

// Inicializar experimento cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ExperimentoMatchingToSample();
    });
} else {
    new ExperimentoMatchingToSample();
}
