// fleximap-mobile.js - Versión Mobile Optimizada

let currentScreen = 1;
let caseData = {
    motivoConsulta: '',
    tiempoEvento: '',
    intentos: [],
    screening: [],
    situaciones: [],
    valores: [],
    actividadesPerdidas: '',
    conductaActual: ''
};

let situationCount = 0;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeChips();
    initializeRadioCards();
    initializeQuickSelect();
    addMobileSituation(); // Agregar primera situación automáticamente
});

// ============================================
// INICIALIZAR CONTROLES TÁCTILES
// ============================================

function initializeChips() {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
}

function initializeRadioCards() {
    document.querySelectorAll('.radio-cards').forEach(container => {
        const cards = container.querySelectorAll('.radio-card');
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Deseleccionar todas
                cards.forEach(c => c.classList.remove('selected'));
                // Seleccionar esta
                this.classList.add('selected');
            });
        });
    });
}

function initializeQuickSelect() {
    document.querySelectorAll('.quick-select-item').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            // Si se selecciona trauma, mostrar alerta
            if (this.dataset.value === 'trauma' && this.classList.contains('selected')) {
                document.getElementById('traumaAlert').style.display = 'block';
            } else if (this.dataset.value === 'trauma') {
                document.getElementById('traumaAlert').style.display = 'none';
            }
        });
    });
}

// ============================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================

function nextScreen() {
    if (currentScreen === 1) {
        // Validar datos mínimos
        const motivo = document.getElementById('motivoConsulta').value;
        if (!motivo.trim()) {
            alert('Por favor ingresa el motivo de consulta');
            return;
        }
        
        collectScreen1Data();
    } else if (currentScreen === 2) {
        collectScreen2Data();
    } else if (currentScreen === 3) {
        collectScreen3Data();
        // Analizar y mostrar resultados
        analyzeCase();
        return;
    }
    
    currentScreen++;
    updateScreen();
}

function prevScreen() {
    if (currentScreen > 1) {
        currentScreen--;
        updateScreen();
    }
}

function updateScreen() {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Mostrar pantalla actual
    document.getElementById(`screen${currentScreen}`).classList.add('active');
    
    // Actualizar pasos
    document.querySelectorAll('.step').forEach((s, idx) => {
        s.classList.remove('active', 'completed');
        if (idx + 1 === currentScreen) {
            s.classList.add('active');
        } else if (idx + 1 < currentScreen) {
            s.classList.add('completed');
        }
    });
    
    // Actualizar barra de progreso
    const progress = (currentScreen / 4) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Actualizar botones
    const btnBack = document.getElementById('btnBack');
    const btnNext = document.getElementById('btnNext');
    
    if (currentScreen === 1) {
        btnBack.style.display = 'none';
        btnNext.textContent = 'Siguiente →';
    } else if (currentScreen === 4) {
        btnBack.style.display = 'none';
        btnNext.style.display = 'none';
        document.getElementById('fabMenu').style.display = 'flex';
    } else if (currentScreen === 3) {
        btnBack.style.display = 'block';
        btnNext.textContent = '🔍 Analizar';
    } else {
        btnBack.style.display = 'block';
        btnNext.textContent = 'Siguiente →';
    }
    
    // Scroll al inicio
    window.scrollTo(0, 0);
}

// ============================================
// RECOLECCIÓN DE DATOS
// ============================================

function collectScreen1Data() {
    caseData.motivoConsulta = document.getElementById('motivoConsulta').value;
    
    // Tiempo de evento
    const selectedTime = document.querySelector('#tiempoEvento .radio-card.selected');
    caseData.tiempoEvento = selectedTime ? selectedTime.dataset.value : '';
    
    // Intentos
    caseData.intentos = Array.from(document.querySelectorAll('#intentosChips .chip.selected'))
        .map(chip => chip.dataset.value);
    
    // Screening
    caseData.screening = Array.from(document.querySelectorAll('#screeningGrid .quick-select-item.selected'))
        .map(item => item.dataset.value);
}

function collectScreen2Data() {
    // Las situaciones ya están en caseData.situaciones
    // Se actualizan en tiempo real cuando se completan
}

function collectScreen3Data() {
    caseData.valores = Array.from(document.querySelectorAll('#valoresChips .chip.selected'))
        .map(chip => chip.dataset.value);
    
    caseData.actividadesPerdidas = document.getElementById('actividadesPerdidas').value;
    caseData.conductaActual = document.getElementById('conductaActual').value;
}

// ============================================
// AGREGAR SITUACIÓN (MOBILE)
// ============================================

function addMobileSituation() {
    situationCount++;
    const container = document.getElementById('situationsContainer');
    
    const sitCard = document.createElement('div');
    sitCard.className = 'collapsible open';
    sitCard.id = `situation${situationCount}`;
    
    sitCard.innerHTML = `
        <div class="collapsible-header" onclick="toggleCollapsible(this)">
            <span>📝 Situación ${situationCount}</span>
            <span class="collapsible-icon">▼</span>
        </div>
        <div class="collapsible-content">
            <div class="form-group">
                <label>¿Qué pasó? (situación concreta)</label>
                <textarea id="sit${situationCount}_desc" rows="2" placeholder="Ej: Ayer en la noche en la cama..."></textarea>
            </div>
            
            <div class="form-group">
                <label>¿Qué pensamientos aparecieron?</label>
                <textarea id="sit${situationCount}_pens" rows="2" placeholder="Ej: Soy un fracaso, no puedo..."></textarea>
            </div>
            
            <div class="form-group">
                <label>¿Qué emociones sintió?</label>
                <div class="chip-container">
                    <div class="chip" data-sit="${situationCount}" data-emo="tristeza">😢 Tristeza</div>
                    <div class="chip" data-sit="${situationCount}" data-emo="rabia">😠 Rabia</div>
                    <div class="chip" data-sit="${situationCount}" data-emo="ansiedad">😰 Ansiedad</div>
                    <div class="chip" data-sit="${situationCount}" data-emo="verguenza">😳 Vergüenza</div>
                    <div class="chip" data-sit="${situationCount}" data-emo="vacio">😶 Vacío</div>
                    <div class="chip" data-sit="${situationCount}" data-emo="miedo">😨 Miedo</div>
                </div>
            </div>
            
            <div class="form-group">
                <label>¿Qué hizo cuando aparecieron?</label>
                <textarea id="sit${situationCount}_conducta" rows="2" placeholder="Ej: Revisar teléfono, limpiar..."></textarea>
            </div>
            
            <div class="form-group">
                <label>¿Le sirvió a corto plazo?</label>
                <div class="emoji-scale">
                    <div class="emoji-option" data-sit="${situationCount}" data-value="nada">
                        <span class="emoji">😫</span>
                        <span class="label">Nada</span>
                    </div>
                    <div class="emoji-option" data-sit="${situationCount}" data-value="poco">
                        <span class="emoji">😕</span>
                        <span class="label">Poco</span>
                    </div>
                    <div class="emoji-option" data-sit="${situationCount}" data-value="algo">
                        <span class="emoji">😐</span>
                        <span class="label">Algo</span>
                    </div>
                    <div class="emoji-option" data-sit="${situationCount}" data-value="si">
                        <span class="emoji">😌</span>
                        <span class="label">Sí</span>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>¿Y a largo plazo?</label>
                <textarea id="sit${situationCount}_despues" rows="2" placeholder="Ej: Volvió peor, discutimos..."></textarea>
            </div>
            
            <div class="form-group">
                <label>¿Lo acercó o alejó de lo que le importa?</label>
                <div class="radio-cards">
                    <div class="radio-card" data-sit="${situationCount}" data-valores="alejo">
                        <h4>↩️ Me alejó</h4>
                    </div>
                    <div class="radio-card" data-sit="${situationCount}" data-valores="neutral">
                        <h4>↔️ Neutral</h4>
                    </div>
                    <div class="radio-card" data-sit="${situationCount}" data-valores="acerco">
                        <h4>↪️ Me acercó</h4>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(sitCard);
    
    // Re-inicializar controles
    initializeChips();
    
    // Emoji scale listeners
    sitCard.querySelectorAll('.emoji-option').forEach(option => {
        option.addEventListener('click', function() {
            const sit = this.dataset.sit;
            this.parentElement.querySelectorAll('.emoji-option').forEach(o => {
                if (o.dataset.sit === sit) o.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Radio cards listeners
    sitCard.querySelectorAll('.radio-card').forEach(card => {
        card.addEventListener('click', function() {
            const sit = this.dataset.sit;
            this.parentElement.querySelectorAll('.radio-card').forEach(c => {
                if (c.dataset.sit === sit) c.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
    
    // Scroll a la nueva situación
    setTimeout(() => {
        sitCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function toggleCollapsible(header) {
    const collapsible = header.parentElement;
    collapsible.classList.toggle('open');
}

// ============================================
// ANÁLISIS DEL CASO
// ============================================

function analyzeCase() {
    // Mostrar loading
    document.getElementById('loadingResults').style.display = 'block';
    document.getElementById('resultsContent').style.display = 'none';
    
    // Simular procesamiento
    setTimeout(() => {
        performAnalysis();
        document.getElementById('loadingResults').style.display = 'none';
        document.getElementById('resultsContent').style.display = 'block';
    }, 2000);
}

function performAnalysis() {
    // Recolectar situaciones
    collectSituations();
    
    // Detectar patrón
    const pattern = detectPattern();
    
    // Detectar procesos
    const processes = detectProcesses();
    
    // Generar intervenciones
    const interventions = generateMobileInterventions(pattern, processes);
    
    // Generar plan RFT resumido
    const rftPlan = generateMobileRFTPlan(pattern);
    
    // Mostrar resultados
    displayMobileResults(pattern, processes, interventions, rftPlan);
}

function collectSituations() {
    caseData.situaciones = [];
    
    for (let i = 1; i <= situationCount; i++) {
        const desc = document.getElementById(`sit${i}_desc`)?.value;
        if (!desc) continue;
        
        const emociones = Array.from(document.querySelectorAll(`.chip[data-sit="${i}"].selected`))
            .map(c => c.dataset.emo);
        
        const alivio = document.querySelector(`.emoji-option[data-sit="${i}"].selected`)?.dataset.value || '';
        
        const valores = document.querySelector(`.radio-card[data-sit="${i}"].selected`)?.dataset.valores || '';
        
        caseData.situaciones.push({
            descripcion: desc,
            pensamientos: document.getElementById(`sit${i}_pens`)?.value || '',
            emociones: emociones,
            conducta: document.getElementById(`sit${i}_conducta`)?.value || '',
            alivio: alivio,
            despues: document.getElementById(`sit${i}_despues`)?.value || '',
            valores: valores
        });
    }
}

function detectPattern() {
    const { screening, situaciones } = caseData;
    
    // TEPT
    if (screening.includes('trauma') && screening.includes('flashbacks')) {
        return {
            tipo: 'TEPT',
            subtipo: 'Post-Traumático',
            severidad: calculateSeverity(),
            icon: '⚠️',
            descripcion: 'Evitación experiencial masiva post-trauma'
        };
    }
    
    // ANSIEDAD
    if (screening.includes('fobia') || screening.includes('panico') || 
        screening.includes('social') || screening.includes('toc')) {
        let tipos = [];
        if (screening.includes('fobia')) tipos.push('Fobia');
        if (screening.includes('panico')) tipos.push('Pánico');
        if (screening.includes('social')) tipos.push('Social');
        if (screening.includes('toc')) tipos.push('TOC');
        
        return {
            tipo: 'Ansiedad',
            subtipo: tipos.join(' + '),
            severidad: calculateSeverity(),
            icon: '😰',
            descripcion: 'Evitación situacional con ciclo ansiedad-escape'
        };
    }
    
    // DEPRESIÓN
    if (screening.includes('depresion')) {
        return {
            tipo: 'Depresión',
            subtipo: 'Inactividad',
            severidad: calculateSeverity(),
            icon: '😔',
            descripcion: 'Bajo reforzamiento positivo y rumiación'
        };
    }
    
    // DEFAULT: Inflexibilidad general
    return {
        tipo: 'Inflexibilidad Psicológica',
        subtipo: 'Evitación Experiencial',
        severidad: calculateSeverity(),
        icon: '🔒',
        descripcion: 'Rigidez psicológica bloqueando vida valiosa'
    };
}

function calculateSeverity() {
    const { situaciones } = caseData;
    
    let score = 0;
    
    if (situaciones.length >= 2) score += 2;
    
    const alejamientos = situaciones.filter(s => s.valores === 'alejo').length;
    if (alejamientos >= 2) score += 2;
    else if (alejamientos >= 1) score += 1;
    
    const emocionesTotal = situaciones.reduce((sum, s) => sum + (s.emociones?.length || 0), 0);
    if (emocionesTotal >= 5) score += 2;
    else if (emocionesTotal >= 3) score += 1;
    
    if (score >= 4) return 'Alta';
    if (score >= 2) return 'Moderada';
    return 'Leve';
}

function detectProcesses() {
    const { situaciones, intentos } = caseData;
    
    const processes = {
        fusion: 0,
        evitacion: 0,
        desconexion: 0
    };
    
    // Fusión
    let fusionCount = 0;
    situaciones.forEach(s => {
        const pens = (s.pensamientos || '').toLowerCase();
        if (pens.includes('soy') || pens.includes('estoy')) fusionCount++;
        if (pens.includes('no puedo') || pens.includes('nunca')) fusionCount++;
    });
    processes.fusion = Math.min(5, fusionCount);
    
    // Evitación
    const evitCount = intentos.filter(i => ['evitar', 'distraerse'].includes(i)).length;
    processes.evitacion = Math.min(5, evitCount + 1);
    
    // Desconexión valores
    const actPerdidas = (caseData.actividadesPerdidas || '').split('\n').filter(l => l.trim()).length;
    processes.desconexion = Math.min(5, actPerdidas);
    
    return processes;
}

function generateMobileInterventions(pattern, processes) {
    const interventions = [];
    
    if (pattern.tipo === 'TEPT') {
        interventions.push({
            priority: 1,
            name: 'ACT para TEPT',
            icon: '⚠️',
            components: [
                'Desesperanza Creativa',
                'Disposición al recuerdo',
                'Yo-Contexto (desidentificación)',
                'Valores + Acción'
            ]
        });
    } else if (pattern.tipo === 'Ansiedad') {
        if (pattern.subtipo.includes('Fobia') || pattern.subtipo.includes('Pánico')) {
            interventions.push({
                priority: 1,
                name: 'Exposición',
                icon: '🎯',
                components: [
                    'Jerarquía de miedos',
                    'Exposición prolongada',
                    'Sin escape',
                    'Repetición'
                ]
            });
        }
        
        if (pattern.subtipo.includes('TOC')) {
            interventions.push({
                priority: 1,
                name: 'ERP (Exposición + Prevención)',
                icon: '🔄',
                components: [
                    'Exposición al trigger',
                    'NO hacer ritual',
                    'Tolerar ansiedad',
                    'Práctica diaria'
                ]
            });
        }
        
        interventions.push({
            priority: 2,
            name: 'Disposición ACT',
            icon: '🌊',
            components: [
                'Aceptar ansiedad',
                'Defusión de pensamientos',
                'Acción valiosa CON miedo'
            ]
        });
    } else if (pattern.tipo === 'Depresión') {
        interventions.push({
            priority: 1,
            name: 'Activación Conductual',
            icon: '⚡',
            components: [
                'Programar actividades',
                'Empezar ANTES de sentir ganas',
                'Actividades placenteras',
                'Maestría/logro'
            ]
        });
    } else {
        if (processes.fusion >= 3) {
            interventions.push({
                priority: 1,
                name: 'Defusión',
                icon: '☁️',
                components: [
                    'Notar pensamientos',
                    '"Estoy teniendo pensamiento de..."',
                    'Pensamientos ≠ hechos'
                ]
            });
        }
        
        if (processes.evitacion >= 3) {
            interventions.push({
                priority: 1,
                name: 'Aceptación',
                icon: '🤲',
                components: [
                    'Disposición a malestar',
                    'Sostener el dolor',
                    'Arenas movedizas'
                ]
            });
        }
        
        if (processes.desconexion >= 3) {
            interventions.push({
                priority: 1,
                name: 'Valores + Acción',
                icon: '🧭',
                components: [
                    'Qué es importante',
                    'Pequeños pasos',
                    'CON malestar presente'
                ]
            });
        }
    }
    
    return interventions;
}

function generateMobileRFTPlan(pattern) {
    let label, exercise, valuesPrompt;
    
    if (pattern.tipo === 'TEPT') {
        label = 'Evitar el trauma';
        exercise = 'Respirar CON el recuerdo (3-5 min)';
        valuesPrompt = '¿Qué tipo de padre/pareja quieres ser?';
    } else if (pattern.tipo === 'Ansiedad') {
        label = 'Evitar el miedo';
        exercise = 'Sostener la ansiedad sin escapar';
        valuesPrompt = '¿Qué vale la pena aunque dé miedo?';
    } else {
        label = 'Resolver antes de vivir';
        exercise = 'Sostener el dolor físicamente';
        valuesPrompt = '¿Si pudieras vivir libremente, qué harías?';
    }
    
    return {
        paso1: {
            titulo: '1️⃣ Ver la Trampa',
            label: label,
            pregunta: '¿Te ha funcionado intentar controlar/evitar esto?'
        },
        paso2: {
            titulo: '2️⃣ Tomar Distancia',
            ejercicio: exercise,
            objetivo: 'YO (observador) ≠ Dolor (contenido)'
        },
        paso3: {
            titulo: '3️⃣ Caminar hacia Valores',
            pregunta: valuesPrompt,
            accion: 'Paso concreto CON disposición'
        }
    };
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================

function displayMobileResults(pattern, processes, interventions, rftPlan) {
    const container = document.getElementById('resultsContent');
    
    let html = `
        <!-- HEADER RESULTADO -->
        <div class="result-header">
            <div style="font-size: 3em; margin-bottom: 10px;">${pattern.icon}</div>
            <h2>${pattern.tipo}</h2>
            <div class="result-badge">${pattern.subtipo}</div>
            <div class="severity-badge severity-${pattern.severidad.toLowerCase()}" style="margin-top: 10px;">
                Severidad: ${pattern.severidad}
            </div>
        </div>
        
        <!-- PATRÓN -->
        <div class="card">
            <h2>🎯 Patrón Funcional</h2>
            <p>${pattern.descripcion}</p>
        </div>
        
        <!-- PROCESOS -->
        <div class="card">
            <h2>📊 Procesos de Inflexibilidad</h2>
            ${generateMobileProcessBars(processes)}
        </div>
        
        <!-- INTERVENCIONES -->
        <div class="card">
            <h2>💡 Intervenciones</h2>
            ${generateMobileInterventionCards(interventions)}
        </div>
        
        <!-- PLAN RFT -->
        <div class="card">
            <h2>📚 Plan RFT (3 Pasos)</h2>
            ${generateMobileRFTCards(rftPlan)}
        </div>
        
        <!-- PRÓXIMOS PASOS -->
        <div class="card" style="background: #f0f4ff; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin-bottom: 10px;">✅ Próximos Pasos</h3>
            <ol style="margin-left: 20px; line-height: 1.8;">
                <li>Compartir conceptualización con cliente</li>
                <li>Empezar con intervención prioridad 1</li>
                <li>Usar ejercicios RFT en sesión</li>
                <li>Asignar tareas para casa</li>
                <li>Re-evaluar en 3-4 sesiones</li>
            </ol>
        </div>
    `;
    
    container.innerHTML = html;
}

function generateMobileProcessBars(processes) {
    const labels = {
        fusion: 'Fusión Cognitiva',
        evitacion: 'Evitación Experiencial',
        desconexion: 'Desconexión Valores'
    };
    
    let html = '';
    for (let [key, value] of Object.entries(processes)) {
        if (value > 0) {
            const percentage = (value / 5) * 100;
            html += `
                <div class="process-bar">
                    <div class="process-bar-header">
                        <span><strong>${labels[key]}</strong></span>
                        <span>${value}/5</span>
                    </div>
                    <div class="process-bar-fill">
                        <div class="process-bar-inner" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }
    }
    return html;
}

function generateMobileInterventionCards(interventions) {
    let html = '';
    interventions.forEach(int => {
        html += `
            <div class="intervention-card">
                <span class="priority-badge priority-${int.priority}">Prioridad ${int.priority}</span>
                <h4>${int.icon} ${int.name}</h4>
                <ul>
                    ${int.components.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    return html;
}

function generateMobileRFTCards(plan) {
    return `
        <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <strong>${plan.paso1.titulo}</strong><br>
            <small style="color: #666;">Discriminar: "${plan.paso1.label}"</small><br>
            <em style="color: #667eea;">${plan.paso1.pregunta}</em>
        </div>
        
        <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <strong>${plan.paso2.titulo}</strong><br>
            <small style="color: #666;">Ejercicio: ${plan.paso2.ejercicio}</small><br>
            <em style="color: #667eea;">${plan.paso2.objetivo}</em>
        </div>
        
        <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 8px;">
            <strong>${plan.paso3.titulo}</strong><br>
            <small style="color: #666;">${plan.paso3.pregunta}</small><br>
            <em style="color: #667eea;">${plan.paso3.accion}</em>
        </div>
    `;
}

// ============================================
// EXPORTAR / COMPARTIR
// ============================================

function showExportMenu() {
    const options = [
        '📄 Exportar PDF',
        '📧 Enviar por Email',
        '💾 Guardar en Dispositivo',
        '🔄 Nuevo Caso'
    ];
    
    const choice = prompt(`Opciones:\n\n${options.map((o, i) => `${i+1}. ${o}`).join('\n')}\n\nElige opción (1-4):`);
    
    if (choice === '1') {
        alert('Exportación PDF en desarrollo.\nPor ahora usa screenshot de pantalla.');
    } else if (choice === '2') {
        alert('Función email en desarrollo.');
    } else if (choice === '3') {
        saveToLocalStorage();
    } else if (choice === '4') {
        if (confirm('¿Iniciar nuevo caso? Se perderán datos actuales.')) {
            location.reload();
        }
    }
}

function saveToLocalStorage() {
    try {
        const caseId = 'fleximap_' + Date.now();
        localStorage.setItem(caseId, JSON.stringify(caseData));
        alert('✅ Caso guardado localmente en tu dispositivo');
    } catch (e) {
        alert('Error al guardar. Verifica permisos de almacenamiento.');
    }
}

// ============================================
// SWIPE GESTURES (Opcional)
// ============================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (currentScreen === 4) return; // No swipe en resultados
    
    if (touchEndX < touchStartX - 50) {
        // Swipe left = siguiente
        nextScreen();
    }
    
    if (touchEndX > touchStartX + 50) {
        // Swipe right = anterior
        prevScreen();
    }
}

// ============================================
// VALORES DINÁMICOS
// ============================================

document.querySelectorAll('#valoresChips .chip').forEach(chip => {
    chip.addEventListener('click', function() {
        const valor = this.dataset.value;
        const detailsContainer = document.getElementById('valoresDetails');
        
        if (this.classList.contains('selected')) {
            // Agregar detalle
            const detailCard = document.createElement('div');
            detailCard.className = 'card';
            detailCard.id = `detail_${valor}`;
            detailCard.innerHTML = `
                <label>¿Qué significa "${valor}" para el cliente?</label>
                <textarea id="desc_${valor}" rows="2" placeholder="Describe brevemente..."></textarea>
            `;
            detailsContainer.appendChild(detailCard);
        } else {
            // Remover detalle
            const detailCard = document.getElementById(`detail_${valor}`);
            if (detailCard) detailCard.remove();
        }
    });
});
