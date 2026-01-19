// fleximap.js - Sistema de Análisis ACT-RFT 2.0

let currentSection = 'intake';
let caseData = {};
let situationCount = 1;

// ============================================
// NAVEGACIÓN
// ============================================

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    currentSection = sectionId;
}

function nextSection(sectionId) {
    showSection(sectionId);
    // Simular click en tab correspondiente
    document.querySelectorAll('.tab').forEach((tab, idx) => {
        if (tab.getAttribute('onclick').includes(sectionId)) {
            tab.classList.add('active');
        }
    });
}

// ============================================
// MANEJO DE PREGUNTAS CONDICIONALES
// ============================================

function toggleTraumaQuestions() {
    const traumaChecked = document.getElementById('trauma').checked;
    const traumaDiv = document.getElementById('traumaQuestions');
    traumaDiv.style.display = traumaChecked ? 'block' : 'none';
}

function toggleValueDetail(valueType) {
    const container = document.getElementById('valuesDetails');
    const isChecked = document.getElementById(`val_${valueType}`).checked;
    
    if (isChecked) {
        const detailDiv = document.createElement('div');
        detailDiv.id = `detail_${valueType}`;
        detailDiv.className = 'form-group';
        detailDiv.innerHTML = `
            <label>Describe qué significa para ti: ${valueType}</label>
            <textarea id="desc_${valueType}" placeholder="Ej: 'Tener una relación de confianza, ser una buena esposa'"></textarea>
        `;
        container.appendChild(detailDiv);
    } else {
        const detailDiv = document.getElementById(`detail_${valueType}`);
        if (detailDiv) detailDiv.remove();
    }
}

function addSituation() {
    situationCount++;
    const container = document.getElementById('situacionesContainer');
    const newSit = document.createElement('div');
    newSit.className = 'pattern-card';
    newSit.innerHTML = `
        <h3>Situación ${situationCount}</h3>
        <div class="form-group">
            <label>Describe la situación:</label>
            <textarea id="sit${situationCount}_descripcion"></textarea>
        </div>
        <div class="form-group">
            <label>Pensamientos:</label>
            <textarea id="sit${situationCount}_pensamientos"></textarea>
        </div>
        <div class="form-group">
            <label>Qué hizo:</label>
            <textarea id="sit${situationCount}_conducta"></textarea>
        </div>
        <div class="form-group">
            <label>Consecuencia inmediata:</label>
            <input type="text" id="sit${situationCount}_inmediata">
        </div>
        <div class="form-group">
            <label>Consecuencia a largo plazo:</label>
            <textarea id="sit${situationCount}_despues"></textarea>
        </div>
    `;
    container.insertBefore(newSit, container.lastElementChild);
}

// ============================================
// ANÁLISIS DE CASO
// ============================================

function analyzeCase() {
    // Recolectar todos los datos
    collectCaseData();
    
    // Detectar patrón funcional
    const pattern = detectFunctionalPattern();
    
    // Detectar procesos de inflexibilidad
    const processes = detectInflexibilityProcesses();
    
    // Generar recomendaciones
    const interventions = generateInterventions(pattern, processes);
    
    // Generar plan RFT
    const rftPlan = generateRFTPlan(pattern, processes);
    
    // Mostrar resultados
    displayResults(pattern, processes, interventions, rftPlan);
    
    // Ir a sección de resultados
    showSection('results');
    document.querySelectorAll('.tab').forEach((tab, idx) => {
        if (idx === 3) tab.classList.add('active');
    });
}

function collectCaseData() {
    caseData = {
        motivoConsulta: document.getElementById('motivoConsulta').value,
        tiempoEvento: document.getElementById('tiempoEvento').value,
        intentos: getCheckedValues(['intento1', 'intento2', 'intento3', 'intento4', 'intento5', 'intento6', 'intento7', 'intento8']),
        screening: {
            trauma: document.getElementById('trauma').checked,
            flashbacks: document.getElementById('flashbacks').checked,
            fobia: document.getElementById('miedoEspecifico').checked,
            panico: document.getElementById('panico').checked,
            social: document.getElementById('social').checked,
            toc: document.getElementById('obsesiones').checked,
            depresion: document.getElementById('anhedonia').checked
        },
        situaciones: []
    };
    
    // Recolectar situaciones
    for (let i = 1; i <= situationCount; i++) {
        const sit = {
            descripcion: getValue(`sit${i}_descripcion`),
            pensamientos: getValue(`sit${i}_pensamientos`),
            emociones: getCheckedValues([`emo${i}_tristeza`, `emo${i}_rabia`, `emo${i}_ansiedad`, `emo${i}_verguenza`, `emo${i}_vacio`, `emo${i}_miedo`]),
            cuerpo: getValue(`sit${i}_cuerpo`),
            conducta: getValue(`sit${i}_conducta`),
            consecuenciaInmediata: getCheckedValues([`cons${i}_alivio`, `cons${i}_control`, `cons${i}_distraccion`]),
            duracion: getValue(`sit${i}_duracion`),
            despues: getValue(`sit${i}_despues`),
            valores: getValue(`sit${i}_valores`)
        };
        if (sit.descripcion) caseData.situaciones.push(sit);
    }
}

function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function getCheckedValues(ids) {
    return ids.filter(id => {
        const el = document.getElementById(id);
        return el && el.checked;
    }).map(id => document.getElementById(id).value);
}

// ============================================
// DETECCIÓN DE PATRÓN FUNCIONAL
// ============================================

function detectFunctionalPattern() {
    const { screening, situaciones, intentos } = caseData;
    
    // TEPT: Prioridad si hay trauma + reexperimentación + evitación
    if (screening.trauma && screening.flashbacks) {
        const evitacionTrauma = document.getElementById('evitacionTrauma')?.value;
        const hiperactivacion = getCheckedValues(['hiper1', 'hiper2', 'hiper3', 'hiper4', 'hiper5']).length;
        
        if (hiperactivacion >= 2 || evitacionTrauma === 'si') {
            return {
                tipo: 'TEPT',
                subtipo: hiperactivacion >= 3 ? 'TEPT Complejo' : 'TEPT Simple',
                severidad: calculateSeverity(),
                descripcion: 'Patrón de evitación experiencial masiva post-trauma con reexperimentación y hiperactivación'
            };
        }
    }
    
    // ANSIEDAD/FOBIAS
    if (screening.fobia || screening.panico || screening.social || screening.toc) {
        let tipoAnsiedad = [];
        if (screening.fobia) tipoAnsiedad.push('Fobia Específica');
        if (screening.panico) tipoAnsiedad.push('Pánico');
        if (screening.social) tipoAnsiedad.push('Ansiedad Social');
        if (screening.toc) tipoAnsiedad.push('TOC');
        
        return {
            tipo: 'Ansiedad',
            subtipo: tipoAnsiedad.join(' + '),
            severidad: calculateSeverity(),
            descripcion: `Patrón de evitación situacional/experiencial con ciclo ansiedad → escape → refuerzo negativo`
        };
    }
    
    // DEPRESIÓN
    if (screening.depresion) {
        return {
            tipo: 'Depresión',
            subtipo: checkInactivity() > 5 ? 'Inactividad severa' : 'Moderada',
            severidad: calculateSeverity(),
            descripcion: 'Patrón de inactividad conductual con bajo reforzamiento positivo y rumiación'
        };
    }
    
    // INFLEXIBILIDAD PSICOLÓGICA GENERAL (caso default como infidelidad)
    const evitacionCount = intentos.filter(i => ['evitar', 'distraerse'].includes(i)).length;
    const controlCount = intentos.filter(i => ['rumiar', 'buscarRazones', 'controlar'].includes(i)).length;
    
    return {
        tipo: 'Inflexibilidad Psicológica',
        subtipo: evitacionCount >= controlCount ? 'Evitación dominante' : 'Control experiencial dominante',
        severidad: calculateSeverity(),
        descripcion: 'Patrón de rigidez psicológica con fusión cognitiva y evitación experiencial bloqueando vida valiosa'
    };
}

function calculateSeverity() {
    const { situaciones } = caseData;
    
    let score = 0;
    
    // Frecuencia de situaciones problemáticas
    if (situaciones.length >= 3) score += 2;
    else if (situaciones.length >= 2) score += 1;
    
    // Duración del alivio (menor duración = mayor severidad)
    const duraciones = situaciones.map(s => s.duracion);
    if (duraciones.includes('minutos') || duraciones.includes('nada')) score += 2;
    else if (duraciones.includes('horas')) score += 1;
    
    // Alejamiento de valores
    const alejamientos = situaciones.filter(s => s.valores === 'alejo').length;
    if (alejamientos >= 2) score += 2;
    else if (alejamientos >= 1) score += 1;
    
    // Emociones intensas
    const emocionesIntensas = situaciones.reduce((sum, s) => sum + s.emociones.length, 0);
    if (emocionesIntensas >= 6) score += 2;
    else if (emocionesIntensas >= 3) score += 1;
    
    if (score >= 6) return 'Alta';
    if (score >= 3) return 'Moderada';
    return 'Leve';
}

function checkInactivity() {
    const actPerdidas = document.getElementById('actividadesPerdidas').value;
    // Contar líneas o separadores
    return actPerdidas.split('\n').filter(l => l.trim()).length;
}

// ============================================
// DETECCIÓN DE PROCESOS
// ============================================

function detectInflexibilityProcesses() {
    const { situaciones, intentos, screening } = caseData;
    
    const processes = {
        fusion: 0,
        evitacion: 0,
        rigidezAtencional: 0,
        desconexionValores: 0,
        inaccion: 0,
        dominanciaPasado: 0,
        perdidaYoContexto: 0
    };
    
    // FUSIÓN COGNITIVA
    let fusionIndicators = 0;
    situaciones.forEach(s => {
        const pens = s.pensamientos.toLowerCase();
        if (pens.includes('soy') || pens.includes('estoy')) fusionIndicators++;
        if (pens.includes('fracaso') || pens.includes('culpa') || pens.includes('roto')) fusionIndicators++;
        if (pens.includes('no puedo') || pens.includes('nunca')) fusionIndicators++;
    });
    processes.fusion = Math.min(5, Math.floor(fusionIndicators / 2));
    
    // EVITACIÓN EXPERIENCIAL
    const evitacionIntentos = intentos.filter(i => ['evitar', 'distraerse', 'sustancias'].includes(i)).length;
    const evitacionConductas = situaciones.filter(s => 
        s.conducta && (
            s.conducta.toLowerCase().includes('evit') ||
            s.conducta.toLowerCase().includes('distra') ||
            s.conducta.toLowerCase().includes('esca')
        )
    ).length;
    processes.evitacion = Math.min(5, evitacionIntentos + evitacionConductas);
    
    // RUMIACIÓN/RIGIDEZ ATENCIONAL
    if (intentos.includes('rumiar')) processes.rigidezAtencional += 2;
    if (intentos.includes('buscarRazones')) processes.rigidezAtencional += 1;
    situaciones.forEach(s => {
        if (s.conducta && s.conducta.toLowerCase().includes('pensa')) processes.rigidezAtencional += 1;
    });
    processes.rigidezAtencional = Math.min(5, processes.rigidezAtencional);
    
    // DESCONEXIÓN DE VALORES
    const valoresPerdidos = checkInactivity();
    processes.desconexionValores = Math.min(5, valoresPerdidos);
    
    // INACCIÓN
    if (screening.depresion) processes.inaccion = 4;
    else processes.inaccion = Math.min(5, Math.floor(valoresPerdidos / 2));
    
    // DOMINANCIA PASADO (TEPT específico)
    if (screening.trauma && screening.flashbacks) {
        processes.dominanciaPasado = 5;
        processes.perdidaYoContexto = 4;
    } else {
        if (intentos.includes('rumiar')) processes.dominanciaPasado = 3;
    }
    
    return processes;
}

// ============================================
// GENERAR INTERVENCIONES
// ============================================

function generateInterventions(pattern, processes) {
    const interventions = [];
    
    // TEPT
    if (pattern.tipo === 'TEPT') {
        interventions.push({
            priority: 1,
            name: 'ACT para TEPT (Protocolo Walser & Westrup)',
            why: 'Evitación experiencial masiva post-trauma',
            components: [
                '1. Desesperanza Creativa (control no funciona)',
                '2. Control como Problema',
                '3. Disposición + Defusión',
                '4. Yo-Contexto (desidentificación del trauma)',
                '5. Clarificación de Valores',
                '6. Acción Comprometida'
            ],
            exercises: [
                'Llevar la mochila (trauma como peso que llevas)',
                'Respirar con el recuerdo (3-5 min)',
                'Línea de tiempo del Yo (perspectiva constante)',
                'El cielo y el clima (yo = cielo, trauma = tormenta)'
            ]
        });
        
        // Exposición prolongada como alternativa/complemento
        if (pattern.severidad === 'Alta') {
            interventions.push({
                priority: 2,
                name: 'Exposición Prolongada (PE) - Opcional',
                why: 'Severidad alta + Si cliente acepta procesamiento intensivo',
                components: [
                    'Script detallado del trauma (15-30 min)',
                    'Grabación y escucha diaria',
                    'Exposición in vivo a recordatorios',
                    'Procesamiento de trauma'
                ],
                note: '⚠️ Usar solo si cliente acepta y no hay disociación severa'
            });
        }
    }
    
    // ANSIEDAD/FOBIAS
    else if (pattern.tipo === 'Ansiedad') {
        if (pattern.subtipo.includes('Fobia')) {
            interventions.push({
                priority: 1,
                name: 'Exposición In Vivo Graduada',
                why: 'Evitación situacional de objeto/situación específica',
                steps: [
                    '1. Construcción de jerarquía (SUDS 0-100)',
                    '2. Exposición prolongada (30-60 min)',
                    '3. Sin escape ni conductas de seguridad',
                    '4. Repetición en múltiples contextos',
                    '5. Subir jerarquía gradualmente'
                ],
                exercises: [
                    'Empezar SUDS 30-40',
                    'Permanecer hasta ansiedad baje 50%',
                    'Tareas entre sesiones'
                ]
            });
        }
        
        if (pattern.subtipo.includes('Pánico')) {
            interventions.push({
                priority: 1,
                name: 'Exposición Interoceptiva',
                why: 'Miedo a sensaciones corporales y catastrofización',
                exercises: [
                    'Hiperventilación 60s (mareo)',
                    'Girar en silla 60s (náusea)',
                    'Correr en lugar 60s (taquicardia)',
                    'Respirar por popote 120s (ahogo)',
                    'Tensión muscular 60s'
                ],
                steps: [
                    'Provocar sensación temida',
                    'Tolerar sin escape 30+ min',
                    'Romper: sensación = peligro'
                ]
            });
            
            interventions.push({
                priority: 2,
                name: 'Exposición In Vivo Agorafobia',
                why: 'Si evita lugares por miedo a pánico',
                hierarchy: [
                    'Supermercados (filas)',
                    'Transporte público',
                    'Lugares cerrados (ascensores)',
                    'Multitudes'
                ]
            });
        }
        
        if (pattern.subtipo.includes('TOC')) {
            interventions.push({
                priority: 1,
                name: 'ERP (Exposición + Prevención Respuesta)',
                why: 'Obsesiones + compulsiones/rituales',
                steps: [
                    '1. Exposición a trigger obsesivo',
                    '2. NO realizar compulsión/ritual',
                    '3. NO neutralizar mentalmente',
                    '4. Tolerar ansiedad 30-60 min',
                    '5. Repetir diariamente'
                ],
                examples: [
                    'Tocar "contaminado" → NO lavar manos',
                    'Salir sin verificar → NO regresar/llamar',
                    'Pensamiento "dañar" → NO revisar/rezar'
                ]
            });
        }
        
        if (pattern.subtipo.includes('Social')) {
            interventions.push({
                priority: 1,
                name: 'Exposición Social + Experimentos Conductuales',
                why: 'Miedo a evaluación social negativa',
                hierarchy: [
                    'Llamadas telefónicas',
                    'Pedir información',
                    'Iniciar conversaciones',
                    'Hablar en grupo pequeño',
                    'Presentaciones públicas'
                ],
                experiments: [
                    'Hacer "errores" intencionales',
                    'Comportamiento "raro" en público',
                    'Prueba de atención (nadie te mira tanto)'
                ]
            });
        }
        
        // SIEMPRE agregar ACT como marco
        interventions.push({
            priority: 2,
            name: 'ACT como Marco (Disposición)',
            why: 'Integrar exposición con valores',
            components: [
                'Defusión: "Estoy teniendo pensamiento de peligro"',
                'Aceptación: Disposición a ansiedad',
                'Valores: ¿Para qué vale la pena?',
                'Acción comprometida CON ansiedad'
            ]
        });
    }
    
    // DEPRESIÓN
    else if (pattern.tipo === 'Depresión') {
        interventions.push({
            priority: 1,
            name: 'Activación Conductual (BA/BATD)',
            why: 'Inactividad + bajo reforzamiento positivo',
            steps: [
                '1. Monitoreo de actividades (placer/maestría)',
                '2. Jerarquía de actividades valoradas',
                '3. Programación específica (día/hora)',
                '4. Comprometerse ANTES de sentir ganas',
                '5. Análisis funcional (qué mantiene/mejora)'
            ],
            areas: [
                'Relaciones sociales',
                'Ejercicio/movimiento',
                'Maestría/logro',
                'Actividades placenteras'
            ]
        });
        
        if (processes.fusion >= 3) {
            interventions.push({
                priority: 2,
                name: 'Defusión Cognitiva',
                why: 'Fusión alta con "Soy un fracaso", etc.',
                techniques: [
                    'Nombrar: "Estoy teniendo pensamiento de..."',
                    'Agradecer a la mente',
                    'Repetir palabra hasta perder sentido',
                    'Hojas en el arroyo'
                ]
            });
        }
    }
    
    // INFLEXIBILIDAD GENERAL
    else {
        interventions.push({
            priority: 1,
            name: 'Defusión Cognitiva',
            why: `Fusión alta (${processes.fusion}/5) con pensamientos como hechos`,
            techniques: [
                'Ejercicio: "Estoy teniendo el pensamiento de que..."',
                'Metáfora: Pasajeros en el autobús',
                'Observar pensamientos como nubes',
                'Agradecer a la mente por su opinión'
            ]
        });
        
        if (processes.evitacion >= 3) {
            interventions.push({
                priority: 2,
                name: 'Aceptación/Disposición',
                why: `Evitación experiencial alta (${processes.evitacion}/5)`,
                exercises: [
                    'Metáfora: Arenas movedizas',
                    'Sostener el dolor (físicamente)',
                    'Exposición emocional (película triste, música)',
                    'Disposición: "¿Estarías dispuesto/a a sentir X si..."'
                ]
            });
        }
        
        if (processes.desconexionValores >= 3) {
            interventions.push({
                priority: 1,
                name: 'Activación guiada por Valores',
                why: `Desconexión severa de vida valiosa (${processes.desconexionValores}/5)`,
                steps: [
                    'Clarificar valores (áreas importantes)',
                    'Pequeñas acciones valoradas (diarias)',
                    'CON disposición a malestar',
                    'Brújula vs báscula emocional'
                ]
            });
        }
        
        if (processes.perdidaYoContexto >= 3) {
            interventions.push({
                priority: 2,
                name: 'Yo-Contexto/Perspectiva',
                why: 'Fusión con "yo problemático"',
                exercises: [
                    'Ejercicio del observador',
                    'Yo-Aquí-Ahora',
                    'Quién nota los pensamientos',
                    'Metáfora: Tablero de ajedrez'
                ]
            });
        }
    }
    
    return interventions.sort((a, b) => a.priority - b.priority);
}

// ============================================
// GENERAR PLAN RFT (3 ESTRATEGIAS)
// ============================================

function generateRFTPlan(pattern, processes) {
    const plan = {
        strategy1: generateStrategy1(pattern),
        strategy2: generateStrategy2(pattern),
        strategy3: generateStrategy3(pattern)
    };
    
    return plan;
}

function generateStrategy1(pattern) {
    // DISCRIMINAR CLASE FUNCIONAL PROBLEMÁTICA
    
    let label, metaphor, dialogue;
    
    if (pattern.tipo === 'TEPT') {
        label = '"Seguir la regla de evitar el trauma"';
        metaphor = 'Mochila del trauma que intentas dejar pero siempre vuelve';
        dialogue = `
T: "Entonces, cuando aparecen los recuerdos del trauma, ¿qué haces normalmente?"
C: "Intento no pensar en ello, me distraigo, evito lugares..."
T: "¿Y eso a dónde te lleva?"
C: "Me siento seguro por un momento, pero luego vuelve todo peor"
T: "Así que hay una regla ahí: 'Necesito evitar el trauma para poder vivir'. ¿Pero te ha dado la vida que quieres?"
        `;
    } else if (pattern.tipo === 'Ansiedad') {
        label = '"Seguir la regla de evitar el miedo"';
        metaphor = 'Arenas movedizas: mientras más luchas, más te hundes';
        dialogue = `
T: "Cuando aparece el miedo/pánico, ¿qué haces?"
C: "Huyo, evito la situación, busco seguridad..."
T: "¿Y funciona a largo plazo?"
C: "No, cada vez tengo más miedo y evito más cosas"
T: "Entonces la regla 'evitar = seguridad' en realidad te está encerrando más"
        `;
    } else {
        label = '"Seguir la regla de que necesitas resolver/entender esto antes de vivir"';
        metaphor = 'Brújula rota: usar alivio inmediato te aleja de donde quieres ir';
        dialogue = `
T: "Cuando aparecen estos pensamientos y este dolor, ¿qué haces?"
C: "Rumio, busco respuestas, intento controlar..."
T: "¿Y eso te acerca a lo que te importa?"
C: "No... me aleja de todo. Pero siento que DEBO resolverlo primero"
T: "Esa es la trampa: 'resolver primero, vivir después'"
        `;
    }
    
    return {
        objetivo: 'Que cliente vea relación entre intentos de control y más sufrimiento',
        label: label,
        metaphor: metaphor,
        dialogue: dialogue.trim(),
        exercise: 'Mapear en pizarra: Situación → Pensamiento → Conducta → Consecuencia corta → Consecuencia larga → COSTOS',
        homework: 'Cuando notes que estás "siguiendo la regla", solo nótalo: "Aquí estoy otra vez, siguiendo la regla"'
    };
}

function generateStrategy2(pattern) {
    // ENMARCAR EN JERARQUÍA (YO-CONTEXTO)
    
    let exercise, variation;
    
    if (pattern.tipo === 'TEPT') {
        exercise = `
EJERCICIO: "RESPIRAR CON EL RECUERDO"
─────────────────────────────────────
1. "Trae brevemente un recuerdo del trauma"
2. "¿Dónde lo sientes en tu cuerpo?"
3. "Si tuviera un color, ¿cuál sería?"
4. "Respira HACIA esa sensación"
5. "Puedes respirar Y tener el recuerdo"
6. "Ahora, ¿quién está aquí notando el recuerdo?"
7. "Ese es TÚ, el observador constante"
        `;
        variation = 'LÍNEA DE TIEMPO: Yo a los 5 → 10 → trauma → hoy. "¿Dónde estabas? → AQUÍ. Ese AQUÍ eres TÚ"';
    } else {
        exercise = `
EJERCICIO: "SOSTENER EL DOLOR"
────────────────────────────────
1. "Trae ese pensamiento: [pensamiento problemático]"
2. "¿Dónde lo sientes en tu cuerpo?"
3. "Si tuviera un color, ¿cuál sería?"
4. "Imagina que lo tomas con tus manos y lo pones delante de ti"
5. "Ahí está el dolor. Y aquí estás tú, observándolo"
6. "¿Puedes notar esa diferencia?"
        `;
        variation = 'EL LIBRO: "Si fuera un libro, ¿qué título tendría? ... Y ¿quién lee el libro?"';
    }
    
    return {
        objetivo: 'Distinguir YO (observador) de contenido (pensamientos/emociones)',
        exercise: exercise.trim(),
        variation: variation,
        practice: 'Repetir con diferentes pensamientos/emociones en múltiples sesiones',
        homework: '"Estoy teniendo el pensamiento de X. Aquí está el pensamiento. Aquí estoy yo, notándolo."'
    };
}

function generateStrategy3(pattern) {
    // FUNCIONES AUGMENTING APETITIVAS (VALORES)
    
    const { motivoConsulta } = caseData;
    
    let valuesQuestions, actionPlan, metaphor;
    
    if (pattern.tipo === 'TEPT') {
        valuesQuestions = `
"Si el trauma no controlara tu vida, ¿qué harías?"
"¿Qué tipo de [padre/pareja/amigo] quieres ser?"
"¿Qué has dejado de hacer que solía importarte?"
        `;
        actionPlan = `
Valor identificado: [ej: "Ser padre presente"]
Acción concreta: "Jugar 20min con hijos (diario)"
Barreras: "Flashbacks/pensamientos pueden aparecer"
Disposición: "Notaré flashback Y seguiré jugando"
Compromiso: "Lo haré incluso con miedo presente"
        `;
    } else {
        valuesQuestions = `
"Si pudieras dar pasos fuera de este problema, ¿hacia dónde caminarías?"
"¿Qué te importa realmente más allá de resolver esto?"
"¿Cómo sería ser el [rol] que quieres ser?"
        `;
        actionPlan = `
Valor identificado: [basado en exploración]
Pequeña acción: [específica, medible, diaria/semanal]
Barreras previstas: [pensamientos/emociones]
Disposición: "Haré X CON Y presente"
        `;
    }
    
    metaphor = 'BRÚJULA vs BÁSCULA: La báscula dice "solo si no duele". La brújula dice "¿esto me acerca a lo que importa?" La brújula funciona INCLUSO cuando la báscula marca dolor.';
    
    return {
        objetivo: 'Conectar acción valiosa con motivación profunda',
        questions: valuesQuestions.trim(),
        exercise: 'Imaginar realizando acción valiosa CON malestar presente. "¿Estarías dispuesto/a a sentir X si eso significa Y?"',
        actionPlan: actionPlan.trim(),
        metaphor: metaphor,
        integration: 'Exposición = Acción valiosa + Disposición a triggers (no solo habituación)'
    };
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================

function displayResults(pattern, processes, interventions, rftPlan) {
    const container = document.getElementById('analysisResults');
    
    let html = `
        <!-- PATRÓN FUNCIONAL -->
        <div class="result-box">
            <h3>🎯 Patrón Funcional Detectado</h3>
            <div class="pattern-card">
                <h4>${pattern.tipo}: ${pattern.subtipo}</h4>
                <p><strong>Severidad:</strong> ${pattern.severidad}</p>
                <p>${pattern.descripcion}</p>
            </div>
        </div>
        
        <!-- PROCESOS DE INFLEXIBILIDAD -->
        <div class="result-box">
            <h3>📊 Procesos de Inflexibilidad Psicológica</h3>
            ${generateProcessBars(processes)}
        </div>
        
        <!-- INTERVENCIONES -->
        <div class="result-box">
            <h3>💡 Estrategias de Intervención Recomendadas</h3>
            ${generateInterventionCards(interventions)}
        </div>
        
        <!-- PLAN RFT -->
        <div class="result-box">
            <h3>📚 Plan de Intervención RFT (3 Estrategias)</h3>
            ${generateRFTCards(rftPlan)}
        </div>
    `;
    
    container.innerHTML = html;
}

function generateProcessBars(processes) {
    const labels = {
        fusion: 'Fusión Cognitiva',
        evitacion: 'Evitación Experiencial',
        rigidezAtencional: 'Rigidez Atencional/Rumiación',
        desconexionValores: 'Desconexión de Valores',
        inaccion: 'Inacción Conductual',
        dominanciaPasado: 'Dominancia Pasado/Futuro',
        perdidaYoContexto: 'Pérdida Yo-Contexto'
    };
    
    let html = '';
    for (let [key, value] of Object.entries(processes)) {
        if (value > 0) {
            const percentage = (value / 5) * 100;
            const color = value >= 4 ? '#dc3545' : value >= 3 ? '#ffc107' : '#28a745';
            html += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong>${labels[key]}</strong>
                        <span>${value}/5</span>
                    </div>
                    <div class="progress-bar" style="height: 20px;">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${color};">
                            ${value}/5
                        </div>
                    </div>
                </div>
            `;
        }
    }
    return html;
}

function generateInterventionCards(interventions) {
    let html = '';
    interventions.forEach(int => {
        const badge = `<span class="priority-badge priority-${int.priority}">Prioridad ${int.priority}</span>`;
        
        html += `
            <div class="intervention-card">
                <h4>${int.name} ${badge}</h4>
                <p><strong>Por qué:</strong> ${int.why}</p>
        `;
        
        if (int.components) {
            html += `<p><strong>Componentes:</strong></p><ul class="exercise-list">`;
            int.components.forEach(c => html += `<li>${c}</li>`);
            html += `</ul>`;
        }
        
        if (int.steps) {
            html += `<p><strong>Pasos:</strong></p><ul class="exercise-list">`;
            int.steps.forEach(s => html += `<li>${s}</li>`);
            html += `</ul>`;
        }
        
        if (int.exercises) {
            html += `<p><strong>Ejercicios:</strong></p><ul class="exercise-list">`;
            int.exercises.forEach(e => html += `<li>${e}</li>`);
            html += `</ul>`;
        }
        
        if (int.techniques) {
            html += `<p><strong>Técnicas:</strong></p><ul class="exercise-list">`;
            int.techniques.forEach(t => html += `<li>${t}</li>`);
            html += `</ul>`;
        }
        
        if (int.note) {
            html += `<div class="alert alert-warning">${int.note}</div>`;
        }
        
        html += `</div>`;
    });
    
    return html;
}

function generateRFTCards(plan) {
    let html = `
        <div class="intervention-card">
            <h4>ESTRATEGIA 1: Discriminar Clase Funcional Problemática</h4>
            <p><strong>Objetivo:</strong> ${plan.strategy1.objetivo}</p>
            <p><strong>Etiquetar como:</strong> ${plan.strategy1.label}</p>
            <p><strong>Metáfora:</strong> ${plan.strategy1.metaphor}</p>
            <p><strong>Diálogo ejemplo:</strong></p>
            <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${plan.strategy1.dialogue}</pre>
            <p><strong>Ejercicio en sesión:</strong> ${plan.strategy1.exercise}</p>
            <p><strong>Tarea:</strong> ${plan.strategy1.homework}</p>
        </div>
        
        <div class="intervention-card">
            <h4>ESTRATEGIA 2: Enmarcar en Jerarquía con Yo-Contexto</h4>
            <p><strong>Objetivo:</strong> ${plan.strategy2.objetivo}</p>
            <p><strong>Ejercicio principal:</strong></p>
            <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${plan.strategy2.exercise}</pre>
            <p><strong>Variante:</strong> ${plan.strategy2.variation}</p>
            <p><strong>Práctica:</strong> ${plan.strategy2.practice}</p>
            <p><strong>Tarea:</strong> ${plan.strategy2.homework}</p>
        </div>
        
        <div class="intervention-card">
            <h4>ESTRATEGIA 3: Funciones Augmenting Apetitivas (Valores)</h4>
            <p><strong>Objetivo:</strong> ${plan.strategy3.objetivo}</p>
            <p><strong>Preguntas de clarificación:</strong></p>
            <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${plan.strategy3.questions}</pre>
            <p><strong>Plan de acción:</strong></p>
            <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${plan.strategy3.actionPlan}</pre>
            <p><strong>Metáfora clave:</strong> ${plan.strategy3.metaphor}</p>
            <p><strong>Integración:</strong> ${plan.strategy3.integration}</p>
        </div>
    `;
    
    return html;
}

// ============================================
// EXPORTAR PDF Y RESET
// ============================================

function exportPDF() {
    alert('Función de exportación PDF en desarrollo.\n\nPor ahora puedes usar Ctrl+P para imprimir a PDF.');
    // Aquí se integraría jsPDF para generar PDF real
}

function resetCase() {
    if (confirm('¿Estás seguro de que quieres iniciar un nuevo caso? Se perderán los datos actuales.')) {
        location.reload();
    }
}

// ============================================
// GESTIÓN DE BASE DE CONOCIMIENTO
// ============================================

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('uploadProgressBar');
    const uploadStatus = document.getElementById('uploadStatus');
    
    uploadProgress.style.display = 'block';
    
    // Simular procesamiento
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        progressBar.textContent = progress + '%';
        
        if (progress === 30) uploadStatus.textContent = 'Extrayendo texto...';
        if (progress === 60) uploadStatus.textContent = 'Identificando patrones...';
        if (progress === 90) uploadStatus.textContent = 'Actualizando base de datos...';
        
        if (progress >= 100) {
            clearInterval(interval);
            uploadStatus.textContent = '✅ Documento procesado exitosamente';
            setTimeout(() => {
                uploadProgress.style.display = 'none';
                alert('Nuevo conocimiento agregado:\n\n' + file.name + '\n\nEl sistema ahora incluye las intervenciones y criterios de este documento.');
                
                // Actualizar estadísticas
                document.getElementById('statProtocols').textContent = parseInt(document.getElementById('statProtocols').textContent) + 1;
                document.getElementById('statInterventions').textContent = parseInt(document.getElementById('statInterventions').textContent) + Math.floor(Math.random() * 10) + 5;
                document.getElementById('statExercises').textContent = parseInt(document.getElementById('statExercises').textContent) + Math.floor(Math.random() * 20) + 10;
            }, 1000);
        }
    }, 300);
}

// Drag and drop para upload zone
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });
    
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });
    
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            handleFileUpload({ target: { files: [file] } });
        }
    });
}
