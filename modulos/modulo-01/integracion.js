// ============================================
// CASO CLÍNICO INTERACTIVO - INTEGRACIÓN FINAL
// ============================================

// Estado global del caso
let decisionActual = 0;
let puntosAcumulados = 0;
let decisionesTomadas = [];
let estadoCliente = 'ansiosa'; // ansiosa, neutral, mejorando, comprometida

// ============================================
// DECISIONES DEL CASO (12 TOTAL)
// ============================================

const decisiones = [
    // DECISIÓN 1: Primera impresión - Cosmovisión
    {
        concepto: 'cosmovisiones',
        narrativa: `
            <h3>📍 Inicio de la sesión</h3>
            <p>Valentina entra a tu consulta visiblemente nerviosa. Se sienta en el borde de la silla, evitando contacto visual. Después de las presentaciones iniciales, comienza a hablar:</p>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Doctor, vine porque tengo un problema grave. Tengo ansiedad social... creo que es una enfermedad mental hereditaria. Mi mamá también era ansiosa. Siento que algo en mi cerebro está mal, como roto. ¿Me puede curar?"
            </div>
        `,
        pregunta: "¿Cómo respondes a su conceptualización del problema?",
        opciones: [
            {
                texto: "Entiendo tu preocupación. Vamos a hacer una evaluación diagnóstica completa para clasificar tu trastorno según el DSM-5 y determinar si cumples criterios para Trastorno de Ansiedad Social.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Formismo',
                feedback: "Esta respuesta usa FORMISMO: clasificar en categorías diagnósticas. Aunque útil para organización médica, puede reforzar la idea de 'tener una enfermedad' separada del contexto. Desde CF, los diagnósticos son menos relevantes que el análisis funcional.",
                efectoCliente: 'neutral'
            },
            {
                texto: "No te preocupes, tu cerebro NO está roto. Eso es una distorsión cognitiva. Objetivamente, no tienes una enfermedad cerebral. Vamos a corregir esos pensamientos irracionales.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Mecanicismo + Correspondencia',
                feedback: "Esta respuesta es PROBLEMÁTICA. Usa mecanicismo (busca en el cerebro) + criterio de correspondencia (debate qué es 'objetivamente verdad'). Puede invalidar la experiencia de Valentina y crear lucha interna sobre 'pensar correctamente'.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Noto que hablas de la ansiedad como algo 'roto' que necesita curarse. Cuéntame, ¿en qué situaciones específicas aparece esta ansiedad? ¿Qué haces cuando aparece? ¿Qué consecuencias tiene eso en tu vida?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'Contextualismo Funcional',
                feedback: "¡ÓPTIMA! Esta es una respuesta CF pura. No debatimos si está 'rota' ni clasificamos. Vamos directo al análisis funcional: contextos, conductas, consecuencias. Reconoces su experiencia Y redirig es hacia lo funcional. Esto inicia una relación terapéutica colaborativa.",
                efectoCliente: 'neutral'
            },
            {
                texto: "La ansiedad es parte del desarrollo de tu sistema familiar. Vamos a explorar cómo has crecido en ese ambiente ansioso y cómo ese patrón se ha integrado en tu personalidad.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Organicismo',
                feedback: "Esta respuesta usa ORGANICISMO: desarrollo de sistemas. Aunque capta complejidad, puede volverse abstracto. Desde CF, la familia es contexto de aprendizaje, no 'sistema que se integra en la personalidad'.",
                efectoCliente: 'neutral'
            }
        ]
    },

    // DECISIÓN 2: Reformulación relacional
    {
        concepto: 'ontologia',
        narrativa: `
            <div class="dialogo terapeuta">
                <strong>Tú:</strong> <span id="respuestaAnterior"></span>
            </div>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Bueno... la ansiedad aparece cuando tengo que ir a eventos sociales, especialmente del trabajo. Reuniones, fiestas de la empresa, esas cosas. Cuando me invitan, empiezo a sentir ansiedad días antes. El corazón late fuerte, sudo, pienso que todos me van a juzgar mal."
            </div>
            <p>Continúa explicando que, ante esta ansiedad, usualmente cancela las invitaciones o inventa excusas para no ir.</p>
        `,
        pregunta: "¿Cómo conceptualizarías este patrón?",
        opciones: [
            {
                texto: "Valentina tiene ansiedad interna que le causa evitación de situaciones sociales. Debemos trabajar en reducir su ansiedad para que pueda socializar.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Dualismo',
                feedback: "PROBLEMÁTICA. Esta conceptualización es DUALISTA: 'ansiedad interna' como causa separada que produce conducta externa. En CF, no hay causas internas; hay relaciones funcionales. La evitación no es causada POR la ansiedad, sino que ambas son partes de un patrón relacional.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "En el repertorio de Valentina, ciertos contextos sociales han adquirido funciones aversivas. La evitación (cancelar) funciona como operante reforzado negativamente: reduce malestar temporalmente pero tiene costos relacionales a largo plazo.",
                puntos: 10,
                tipo: 'optima',
                concepto: 'Ontología Relacional',
                feedback: "¡ÓPTIMA! Conceptualización RELACIONAL perfecta. No hay 'ansiedad interna causante', sino: contextos con funciones aversivas → evitación como operante → reforzamiento negativo. Todo en términos de relaciones funcionales, no estructuras internas.",
                efectoCliente: 'mejorando'
            },
            {
                texto: "Valentina tiene un patrón de pensamiento negativo almacenado en su memoria que se activa en contextos sociales y genera respuestas de evitación.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Mecanicismo Cognitivo',
                feedback: "Esta conceptualización usa MECANICISMO cognitivo: 'patrones almacenados en memoria'. Aunque más sofisticado que dualismo simple, sigue ubicando causas 'dentro'. Falta el énfasis en relaciones contextuales actuales.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Valentina exhibe síntomas compatibles con fobia social, caracterizada por miedo irracional y desproporcionado a situaciones sociales.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Formismo + Correspondencia',
                feedback: "FORMISMO (clasificación) + hablar de 'miedo irracional'. Esto no añade comprensión funcional. En CF, el miedo no es 'irracional' - tiene perfecto sentido dada la historia de aprendizaje. Necesitamos análisis funcional, no etiquetas.",
                efectoCliente: 'neutral'
            }
        ]
    },

    // DECISIÓN 3: Identificar variable dependiente
    {
        concepto: 'analisis_funcional',
        narrativa: `
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Exacto... y lo peor es que sé que me estoy perdiendo oportunidades. La semana pasada había una presentación importante en la empresa. Yo tenía cosas que aportar, pero cuando pensé en hablar frente a todos, me dio pánico y me quedé callada. Después me sentí frustrada conmigo misma."
            </div>
            <p>Hace una pausa y agrega:</p>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Y luego me critico mucho. Pienso 'eres una cobarde', 'nunca vas a crecer profesionalmente así'. Me quedo en casa rumiando sobre esto."
            </div>
        `,
        pregunta: "Para un análisis funcional, ¿cuál es la VARIABLE DEPENDIENTE principal que trabajarías?",
        opciones: [
            {
                texto: "La ansiedad y el pánico que Valentina experimenta",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'VD incompleta',
                feedback: "Ansiedad es parte del cuadro, pero es una respuesta emocional (evento privado). En CF, típicamente trabajamos con lo que la persona HACE. La ansiedad es parte del contexto, no la conducta objetivo principal.",
                efectoCliente: 'neutral'
            },
            {
                texto: "La evitación (callarse, no participar, cancelar eventos sociales)",
                puntos: 10,
                tipo: 'optima',
                concepto: 'VD correcta',
                feedback: "¡ÓPTIMA! EVITAR es la variable dependiente clave: callarse, no participar, cancelar. Es la conducta observable que mantiene el problema. Si Valentina pudiera hacer acciones valiosas AÚN con ansiedad presente, el problema se resolvería. Trabajamos la evitación, no la eliminación de ansiedad.",
                efectoCliente: 'mejorando'
            },
            {
                texto: "Los pensamientos autocríticos ('eres cobarde', 'no crecerás')",
                puntos: 5,
                tipo: 'aceptable',
                concepto: 'VD parcial',
                feedback: "Los pensamientos autocríticos son relevantes, pero son más una respuesta emocional post-evitación. En CF, podríamos trabajar la FUSIÓN con esos pensamientos, pero la conducta clave es la evitación que los precede.",
                efectoCliente: 'neutral'
            },
            {
                texto: "La baja autoestima de Valentina",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'No es VD',
                feedback: "PROBLEMÁTICA. 'Baja autoestima' no es una variable dependiente - es una etiqueta abstracta. En CF necesitamos conductas específicas observables. ¿Qué HACE Valentina? Evita. Esa es la VD, no construcciones como 'autoestima'.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 4: Identificar consecuencia mantenedora
    {
        concepto: 'analisis_funcional',
        narrativa: `
            <p>Exploras más la situación de la presentación:</p>
            <div class="dialogo terapeuta">
                <strong>Tú:</strong> "¿Qué pasó justo después de que decidieras quedarte callada en la presentación?"
            </div>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Bueno... sentí alivio inmediato. Ya no tenía que preocuparme por hablar frente a todos. La ansiedad bajó. Pero después, en mi casa, me sentí terrible. Frustrada, decepcionada de mí misma."
            </div>
        `,
        pregunta: "¿Cuál es la consecuencia que MANTIENE la conducta de evitación?",
        opciones: [
            {
                texto: "El sentimiento de frustración y decepción a largo plazo",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Confunde costo con reforzador',
                feedback: "PROBLEMÁTICA. La frustración es un COSTO a largo plazo, no lo que mantiene la conducta. Las conductas se mantienen por reforzamiento inmediato, no por sus consecuencias negativas diferidas.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "El alivio inmediato de ansiedad (reforzamiento negativo)",
                puntos: 10,
                tipo: 'optima',
                concepto: 'Reforzamiento negativo correcto',
                feedback: "¡ÓPTIMA! Perfecto análisis funcional. La evitación se mantiene por REFORZAMIENTO NEGATIVO: reduce ansiedad inmediatamente. Aunque tenga costos a largo plazo (frustración, oportunidades perdidas), el alivio inmediato es un reforzador potente. Este es un patrón clásico en ansiedad.",
                efectoCliente: 'mejorando'
            },
            {
                texto: "La cognición disfuncional de Valentina sobre hablar en público",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Mecanicismo cognitivo',
                feedback: "PROBLEMÁTICA. Esto es mecanicismo cognitivo: buscar 'cogniciones disfuncionales' como causas internas. En CF, las cogniciones son conductas verbales en contexto, no causas. La consecuencia mantenedora es el alivio, no un pensamiento.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "La falta de habilidades sociales de Valentina",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Déficit de habilidades (irrelevante aquí)',
                feedback: "PROBLEMÁTICA. Aunque déficit de habilidades puede ser relevante en algunos casos, aquí Valentina TIENE la habilidad (es ingeniera, se comunica bien en contextos no-ansiógenos). El problema es EVITACIÓN reforzada negativamente, no falta de habilidad.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 5: Criterio pragmático vs correspondencia
    {
        concepto: 'criterio_verdad',
        narrativa: `
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Pero es que yo SÉ que mis pensamientos son irracionales. Sé que probablemente la gente no me está juzgando tanto como creo. He leído sobre distorsiones cognitivas. Pero igual no puedo dejar de pensarlo. ¿Qué pasa? ¿Por qué saber que es irracional no me ayuda?"
            </div>
            <p>Valentina parece frustrada por esta contradicción entre 'saber' y 'sentir'.</p>
        `,
        pregunta: "¿Cómo respondes a su pregunta?",
        opciones: [
            {
                texto: "Tienes razón en que es irracional. Necesitamos trabajar más en la evidencia. ¿Cuántas veces realmente te han juzgado mal? Hagamos un registro para demostrar que tus pensamientos no corresponden con la realidad.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Correspondencia',
                feedback: "PROBLEMÁTICA. Criterio de CORRESPONDENCIA: intentar demostrar que los pensamientos son objetivamente falsos. Valentina YA sabe esto intelectualmente y no le ayuda. Debatir 'verdad vs falsedad' de pensamientos refuerza fusión cognitiva. No es pragmático.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Esa es una excelente observación. Más que preguntarnos si tus pensamientos son verdaderos o falsos, preguntémonos: ¿te ayuda engancharte con esos pensamientos? Cuando aparece 'me van a juzgar' y tú le crees completamente, ¿te acerca o aleja de participar en cosas que valoras?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'Pragmático puro',
                feedback: "¡ÓPTIMA! Criterio PRAGMÁTICO perfecto. No debatimos el contenido (verdad/falsedad), sino la FUNCIÓN: ¿fusionarse con este pensamiento te ayuda a vivir según valores? Este es CF en acción: la 'verdad' del pensamiento es irrelevante; lo que importa es su utilidad funcional.",
                efectoCliente: 'mejorando'
            },
            {
                texto: "Eso es normal. Hay una diferencia entre conocimiento explícito y conocimiento implícito. Tu cerebro racional sabe que es irracional, pero tu cerebro emocional (amígdala) todavía reacciona. Necesitamos reprogramar esa respuesta automática.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Mecanicismo neurobiológico',
                feedback: "ACEPTABLE pero mecanicista. Explicación cerebral (racional vs emocional) puede ser educativa, pero refuerza idea de 'mecanismos internos a arreglar'. Falta el énfasis en contexto y función. No es tan útil pragmáticamente como enfoque CF.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Porque saber algo cognitivamente no es suficiente. Debes SENTIR que es irracional. Vamos a trabajar en ejercicios experienciales para que conectes emocionalmente con esta verdad.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Correspondencia + dualismo',
                feedback: "PROBLEMÁTICA. Esto duplica el problema: ahora Valentina debe 'sentir la verdad correcta'. Refuerza agenda de control emocional ('debo sentir diferente'). En CF, no necesita sentir diferente - puede actuar valientemente CON el miedo presente.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 6: Proponer intervención CF
    {
        concepto: 'analisis_funcional',
        narrativa: `
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Entonces... ¿qué hacemos? Porque realmente quiero cambiar. Hay un evento de networking la próxima semana y me gustaría ir, pero ya siento que voy a cancelar."
            </div>
            <p>Valentina muestra motivación pero también duda sobre su capacidad de cambio.</p>
        `,
        pregunta: "¿Cuál sería la intervención MÁS consistente con CF?",
        opciones: [
            {
                texto: "Primero debemos eliminar tu ansiedad con técnicas de relajación y respiración. Una vez que estés calmada, entonces podrás ir al networking.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Agenda de control',
                feedback: "PROBLEMÁTICA. Esto refuerza la agenda de control: 'debo estar sin ansiedad para actuar'. En CF, la meta NO es eliminar ansiedad, sino que Valentina pueda actuar valientemente AUNQUE la ansiedad esté presente. Esta intervención perpetúa el problema.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Vamos a trabajar en dos frentes: 1) Defusión cognitiva para que puedas notar los pensamientos sin creértelos literalmente, y 2) Acciones pequeñas comprometidas hacia el networking, conectadas con lo que valoras (crecimiento profesional, conexión), aunque la ansiedad esté presente.",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Defusión + Acción Comprometida',
                feedback: "¡ÓPTIMA! Intervención CF perfecta. Modificas CONTEXTO: 1) Contexto verbal (defusión - cambias relación con pensamientos), 2) Contexto de acción (pasos hacia valores). No intentas eliminar ansiedad. No hay 'arreglo' de Valentina - hay cambio de contingencias para permitir acción valiosa.",
                efectoCliente: 'comprometida'
            },
            {
                texto: "Te voy a enseñar a reestructurar tus pensamientos negativos. Cuando pienses 'me van a juzgar', lo reemplazas por un pensamiento más positivo y realista como 'soy competente y tengo cosas valiosas que aportar'.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Reestructuración cognitiva',
                feedback: "ACEPTABLE pero no ideal desde CF. Reestructuración cognitiva (TCC tradicional) puede ayudar, pero asume que el CONTENIDO del pensamiento es el problema. Desde CF, el problema es la FUSIÓN (tomarlos literalmente), no el contenido. Defusión > reestructuración.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Hagamos exposición gradual. Empezamos con situaciones sociales de baja ansiedad y vamos subiendo. No irás al networking hasta que completes todos los pasos anteriores sin ansiedad.",
                puntos: 5,
                tipo: 'aceptable',
                concepto: 'Exposición tradicional',
                feedback: "ACEPTABLE. Exposición es valiosa, pero esta versión es muy gradual y sigue implicando 'sin ansiedad'. Desde CF, podemos ser más flexibles: pequeños pasos pero orientados a VALORES, no a jerarquía de ansiedad. Y la meta nunca es 'sin ansiedad'.",
                efectoCliente: 'neutral'
            }
        ]
    },

    // DECISIÓN 7: Trabajo con reglas verbales
    {
        concepto: 'ontologia',
        narrativa: `
            <p>Exploras más profundamente las reglas verbales que gobiernan la conducta de Valentina:</p>
            <div class="dialogo terapeuta">
                <strong>Tú:</strong> "¿Qué te dices a ti misma sobre lo que DEBE pasar para que puedas ir a eventos sociales?"
            </div>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Pues... creo que me digo 'debo sentirme confiada', 'no puedo ir si estoy ansiosa', 'debo tener algo perfecto que decir'. Si no cumplo esas condiciones, siento que no puedo ir."
            </div>
        `,
        pregunta: "¿Cómo trabajarías con estas reglas verbales?",
        opciones: [
            {
                texto: "Esas reglas son irracionales. Objetivamente, NO necesitas sentirte confiada para actuar. Vamos a reemplazarlas por reglas más racionales y realistas.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Correspondencia + Control',
                feedback: "PROBLEMÁTICA. Debate sobre racionalidad de las reglas (correspondencia) + intento de reemplazar reglas (control verbal). En CF, las reglas no son 'irracionales' - son contextos verbales que ejercen control. No las 'reemplazamos', sino que alteramos su función.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Noto que estas reglas funcionan como BARRERAS: 'si X no ocurre, entonces no puedo actuar'. ¿Qué pasaría si llevamos estas reglas contigo ('debo estar confiada') PERO actúas de todos modos? Como un experimento: ¿puedes ir al networking sintiendo ansiedad Y con esa voz diciéndote que 'no deberías'?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Defusión de reglas',
                feedback: "¡ÓPTIMA! Defusión de reglas perfecta. No debatimos si las reglas son verdad. Las reconocemos como eventos verbales (voces, pensamientos) Y proponemos acción INDEPENDIENTE de ellas. Esto rompe el control discriminativo de las reglas sin intentar eliminarlas. CF puro.",
                efectoCliente: 'comprometida'
            },
            {
                texto: "Esas reglas vienen de tu historia de aprendizaje, probablemente de tus padres o experiencias escolares. Necesitamos explorar de dónde vienen para entenderlas mejor.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Insight histórico',
                feedback: "ACEPTABLE pero no directamente útil. Conocer el origen histórico puede ser interesante, pero desde CF lo que importa es el control ACTUAL de las reglas. Podemos trabajar funcionalmente (alterar su función) sin necesariamente conocer su génesis histórica.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Vamos a crear reglas alternativas más adaptativas. Por ejemplo, 'Puedo actuar aunque esté nerviosa', 'No necesito ser perfecta'. Repetiremos estas nuevas reglas hasta que se automaticen.",
                puntos: 5,
                tipo: 'aceptable',
                concepto: 'Contra-reglas',
                feedback: "ACEPTABLE. Crear contra-reglas puede ayudar, pero es control verbal alternativo, no defusión. Desde CF, preferimos que Valentina note TODAS las reglas (viejas y nuevas) como pensamientos, y actúe según valores independientemente de cuál regla 'gane'. Defusión > contra-reglas.",
                efectoCliente: 'neutral'
            }
        ]
    },

    // DECISIÓN 8: Conexión con valores
    {
        concepto: 'criterio_verdad',
        narrativa: `
            <div class="dialogo terapeuta">
                <strong>Tú:</strong> "Valentina, ¿por qué es importante para ti poder ir a estos eventos? ¿Qué te importa realmente aquí?"
            </div>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Bueno... me importa crecer profesionalmente. Quiero hacer un buen trabajo, contribuir con mi equipo. También... aunque me cueste admitirlo... quiero tener amigos, conexiones reales. Me siento sola a veces."
            </div>
            <p>Sus ojos se humedecen un poco al decir esto último.</p>
        `,
        pregunta: "¿Cómo trabajas con esta conexión de valores?",
        opciones: [
            {
                texto: "Esos son objetivos claros. Vamos a hacer un plan conductual específico con pasos medibles para alcanzar crecimiento profesional y hacer amigos. Necesitas SMART goals (específicos, medibles, alcanzables, relevantes, temporales).",
                puntos: 5,
                tipo: 'aceptable',
                concepto: 'Objetivos vs Valores',
                feedback: "ACEPTABLE pero confunde valores con objetivos. Valores (ej: conexión, contribución) son DIRECCIONES, no metas alcanzables. Los valores nunca se 'completan'. Desde CF, conectamos con valores como motivadores intrínsecos, no como objetivos SMART a lograr.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Hermoso. Conexión y contribución son valores profundos. Ahora, ¿qué tal si usamos esos valores como brújula? Cuando aparezca 'no puedo ir, estoy ansiosa', pregúntate: '¿Evitar me acerca o aleja de conexión y contribución?' No preguntamos si es cómodo - preguntamos si está alineado con lo que te importa.",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Valores como contexto motivacional',
                feedback: "¡ÓPTIMA! Uso de valores perfectamente CF. Los valores funcionan como CONSECUENCIAS VERBALES DERIVADAS que pueden motivar acción incluso ante malestar. No son objetivos a lograr, sino direcciones que dan sentido a la acción comprometida. Pragmatismo puro: ¿esto sirve para lo que valoro?",
                efectoCliente: 'comprometida'
            },
            {
                texto: "Entiendo. Primero necesitas sanar tu soledad y baja autoestima. Una vez que te sientas mejor contigo misma, entonces podrás formar conexiones auténticas. Vamos a trabajar en tu amor propio.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Prerequisito emocional',
                feedback: "PROBLEMÁTICA. Esto crea prerequisitos emocionales ('primero sánate, luego actúa'). En CF, la acción valiosa puede ocurrir AHORA, con malestar presente. De hecho, actuar según valores (conectarse con otros) es PARTE de aliviar soledad, no algo que viene después de 'sanarse'.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Veo que valoras conexión y crecimiento. Estas son necesidades humanas fundamentales. Todos necesitamos pertenencia - está en la jerarquía de necesidades de Maslow. Trabajemos en satisfacer esas necesidades.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Teoría de necesidades',
                feedback: "ACEPTABLE. Hablar de necesidades humanas puede normalizar la experiencia de Valentina, pero desde CF los valores no son 'necesidades a satisfacer' sino direcciones elegidas que dan sentido. La conexión no es algo que 'tienes o no tienes', es algo que HACES.",
                efectoCliente: 'neutral'
            }
        ]
    },

    // DECISIÓN 9: Manejo de barrera emocional
    {
        concepto: 'ontologia',
        narrativa: `
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Todo esto tiene sentido... pero tengo miedo. ¿Y si voy al networking y hago el ridículo? ¿Y si me quedo en blanco y todos piensan que soy rara? No sé si puedo soportarlo."
            </div>
            <p>Valentina se retuerce las manos, mostrando ansiedad anticipatoria intensa.</p>
        `,
        pregunta: "¿Cómo respondes a este miedo?",
        opciones: [
            {
                texto: "No va a pasar. Estadísticamente, es muy improbable que 'todos' te juzguen. La mayoría de la gente está pensando en sí misma. Además, quedarte en blanco es normal y no es 'hacer el ridículo'.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Correspondencia + Invalidación',
                feedback: "PROBLEMÁTICA. Intentar convencer a Valentina de que su miedo es objetivamente infundado (correspondencia). Esto invalida su experiencia Y refuerza la agenda: 'si realmente fuera peligroso, entonces sí debería evitar'. En CF, el miedo puede estar presente y la acción aún ser valiosa.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Ese miedo es completamente válido. Cuéntame, ¿has podido hacer cosas difíciles antes en tu vida, incluso con miedo presente? ¿Qué sería diferente si pudieras llevar el miedo contigo al networking, como llevas tu bolso - está ahí, pero no te impide caminar?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Disposición + Metáfora',
                feedback: "¡ÓPTIMA! Validación + disposición (willingness). No intentamos eliminar el miedo ni convencerla de que es irracional. Reconocemos el miedo Y proponemos acción con el miedo presente. La metáfora ('llevar el miedo como un bolso') es una herramienta de defusión perfecta. CF puro.",
                efectoCliente: 'comprometida'
            },
            {
                texto: "El miedo es solo una emoción - no puede hacerte daño físico. Es solo química en tu cerebro. No tienes que tenerle miedo al miedo.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Psicoeducación reductiva',
                feedback: "ACEPTABLE pero limitada. Psicoeducación sobre emociones puede ser útil, pero decir 'solo química' es reduccionismo que puede invalidar. Y 'no tengas miedo al miedo' crea otra regla de control. Desde CF, el miedo ES importante - es información - pero no es una barrera necesaria.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Ese miedo viene de tu creencia central de ser inadecuada. Necesitamos trabajar en el origen de esa creencia, probablemente en tu niñez, para que puedas desarrollar un sentido de ti misma más sano.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Búsqueda de esquemas profundos',
                feedback: "PROBLEMÁTICA. Búsqueda de 'creencia central' (mecanicismo cognitivo profundo). Esto puede llevar años de exploración sin cambio funcional. Desde CF, podemos trabajar con la función ACTUAL del miedo sin necesariamente explorar orígenes. Cambiamos contexto, no historia.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 10: Preparación para acción comprometida
    {
        concepto: 'analisis_funcional',
        narrativa: `
            <p>Están cerca del final de la sesión. Valentina parece más tranquila pero también expectante.</p>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Ok, creo que entiendo la idea. Pero concretamente, ¿qué hago en el networking? Dame pasos específicos."
            </div>
        `,
        pregunta: "¿Qué 'tarea' o compromiso de acción propones?",
        opciones: [
            {
                texto: "Ve al networking solo si te sientes con al menos 7/10 de confianza. Si tu ansiedad está muy alta, mejor no vayas esta vez. Es importante que tengas experiencias exitosas, no traumáticas.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Prerequisito emocional + evitación',
                feedback: "PROBLEMÁTICA. Esto mantiene la agenda de control ('necesito sentirme bien para actuar'). Además, permite evitación condicional, lo que refuerza el problema. Desde CF, la meta es acción INDEPENDIENTE del estado emocional. Las emociones no son prerequisitos.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "Aquí está el plan de 10 pasos: 1) Practica conversación frente al espejo. 2) Escribe un script de lo que vas a decir. 3) Ensaya con un amigo... [continúa con pasos muy específicos y rígidos].",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Sobre-planificación',
                feedback: "ACEPTABLE pero rígida. Planes detallados pueden dar seguridad, pero también pueden convertirse en 'ritual de seguridad' (necesito estos pasos para estar segura). Desde CF, preferimos flexibilidad psicológica: compromisos orientados a valores, no scripts fijos.",
                efectoCliente: 'neutral'
            },
            {
                texto: "Más que pasos rígidos, pensemos en COMPROMISOS ligados a tus valores. ¿Qué es lo MÁS PEQUEÑO que podrías hacer en el networking que esté alineado con 'conexión'? No 'lo que debes hacer perfectamente', sino lo más pequeño valioso. Puede ser presentarte a una sola persona. O hacer una pregunta genuina a alguien. ¿Qué sería lo más pequeño y valioso para ti?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Acción comprometida orientada a valores',
                feedback: "¡ÓPTIMA! Acción comprometida perfectamente planteada. No imponemos pasos, sino que facilitamos que Valentina elija acciones pequeñas Y valiosas. Énfasis en valores (no en 'hacer bien') y en flexibilidad (lo más pequeño). Esto construye sentido de agencia y conexión con valores. CF en su mejor forma.",
                efectoCliente: 'comprometida'
            },
            {
                texto: "Quiero que vayas, te quedes al menos 2 horas, hables con mínimo 5 personas, y consigas al menos 3 tarjetas de contacto. Esto será tu tarea. Nos vemos la próxima sesión y me cuentas.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Tarea rígida + presión',
                feedback: "PROBLEMÁTICA. Esto es autoritario y rígido. Si Valentina 'falla' (no cumple los números), refuerza autocrítica. Desde CF, las tareas no son órdenes con métricas, sino experimentos de vida orientados a valores. El terapeuta no es jefe, es facilitador de agencia del cliente.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 11: Cierre de sesión
    {
        concepto: 'criterio_verdad',
        narrativa: `
            <p>La sesión está por terminar. Valentina hace una última reflexión:</p>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Entonces... ¿la terapia no va a 'curarme' de la ansiedad? ¿Voy a tener que vivir siempre con esto?"
            </div>
            <p>Hay un tono de decepción pero también curiosidad genuina en su voz.</p>
        `,
        pregunta: "¿Cómo respondes a esta pregunta crucial?",
        opciones: [
            {
                texto: "Correcto, no puedo prometerte que eliminaremos la ansiedad por completo. Pero con la terapia, la reduciremos significativamente hasta niveles manejables. Eventualmente será muy leve.",
                puntos: 3,
                tipo: 'aceptable',
                concepto: 'Reducción de síntomas',
                feedback: "ACEPTABLE pero no ideal desde CF. Promesas de 'reducción significativa' mantienen la agenda de control emocional. Desde CF, la ansiedad puede o no reducirse, pero eso no es la meta. La meta es vivir valientemente independientemente del nivel de ansiedad.",
                efectoCliente: 'neutral'
            },
            {
                texto: "La pregunta más importante no es '¿tendré ansiedad?' sino '¿la ansiedad me controlará?' Imagina una vida en la que la ansiedad aparece a veces, pero tú igualmente haces lo que te importa - conectas, contribuyes, creces. ¿Eso sería diferente de tu vida actual, aunque la ansiedad esté presente?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Cambio de agenda',
                feedback: "¡ÓPTIMA! Reframe perfecto hacia CF. El problema no es 'tener ansiedad', es que la ansiedad CONTROLA tu vida vía evitación. La meta terapéutica es flexibilidad psicológica (acción valiosa con malestar), no eliminación de emociones. Esta respuesta encapsula toda la filosofía de ACT/RFT. Magistral.",
                efectoCliente: 'comprometida'
            },
            {
                texto: "Sí, probablemente siempre tendrás ansiedad. Es parte de tu personalidad y tu genética. Pero podemos ayudarte a aprender a vivir con ella y no dejar que arruine tu vida.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Fatalismo + Esencialismo',
                feedback: "PROBLEMÁTICA. 'Parte de tu personalidad/genética' es esencialismo que puede ser desmoralizador. En CF, la conducta es función del contexto, no rasgos fijos. Además, 'aprender a vivir con' suena resignado, no empoderado. Queremos acción comprometida, no resignación.",
                efectoCliente: 'ansiosa'
            },
            {
                texto: "La ansiedad es un mensaje de tu mente diciéndote que algo necesita atención. Vamos a trabajar en escuchar ese mensaje, entender qué necesita tu yo interior, y darle lo que necesita para sanarse.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Psicología popular + Dualismo',
                feedback: "PROBLEMÁTICA. Esto antropomorfiza la ansiedad ('mensaje de tu mente') y sugiere un 'yo interior' separado que necesita sanación. En CF, la ansiedad es una respuesta emocional con función evolutiva, no un mensaje místico. No trabajamos en 'sanar el yo', sino en cambiar contextos.",
                efectoCliente: 'ansiosa'
            }
        ]
    },

    // DECISIÓN 12: Seguimiento - Una semana después
    {
        concepto: 'integracion',
        narrativa: `
            <h3>📅 Segunda Sesión - Una semana después</h3>
            <p>Valentina llega a la sesión. Su lenguaje corporal y expresión dependerán de cómo hayas manejado el caso hasta ahora.</p>
            <div class="dialogo cliente">
                <strong>Valentina:</strong> "Hola... bueno, fui al networking."
            </div>
            <p>Hace una pausa, y luego continúa según el estado emocional que hayas cultivado en ella...</p>
            <div id="narrativaFinal" class="narrativa-final"></div>
        `,
        pregunta: "Valentina comparte su experiencia. ¿Cómo respondes?",
        opciones: [
            {
                texto: "¡Excelente! Dime, ¿bajó tu ansiedad? ¿Cuánto ansiet senti en una escala de 1-10? Necesitamos medir tu progreso en reducción de síntomas.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Enfoque en síntomas',
                feedback: "PROBLEMÁTICA. Esto vuelve a centrar en ansiedad (síntomas) en lugar de en acción valiosa. En CF, la pregunta no es '¿bajó tu ansiedad?' sino '¿hiciste algo valioso? ¿Te acercaste a conexión y contribución?'. El enfoque en síntomas refuerza la agenda de control.",
                efectoCliente: 'regresion'
            },
            {
                texto: "Wow, fuiste. Cuéntame, ¿qué hiciste que estuvo alineado con conexión o contribución? ¿Qué notaste sobre llevar la ansiedad contigo mientras actuabas? ¿Qué aprendiste?",
                puntos: 10,
                tipo: 'optima',
                concepto: 'CF: Enfoque en valores y aprendizaje',
                feedback: "¡ÓPTIMA! Preguntas perfectamente CF. Enfocas en: 1) Acciones alineadas con valores, 2) Experiencia de actuar CON malestar, 3) Aprendizaje. No preguntas por síntomas. Esto refuerza que la meta es acción valiosa, no ausencia de ansiedad. Consolidas todo el trabajo anterior.",
                efectoCliente: 'crecimiento'
            },
            {
                texto: "Genial. ¿Qué técnicas de las que practicamos usaste? ¿Funcionó la respiración? ¿Te ayudó el script que preparamos?",
                puntos: 5,
                tipo: 'aceptable',
                concepto: 'Enfoque en técnicas',
                feedback: "ACEPTABLE. Preguntas sobre técnicas pueden ser útiles, pero ponen énfasis en herramientas (respiración, scripts) más que en el proceso de vivir según valores. Desde CF, las técnicas son medios, no fines. Preferimos enfocarnos en la experiencia de acción comprometida.",
                efectoCliente: 'estable'
            },
            {
                texto: "Perfecto. Ahora que rompiste el hielo, la próxima vez será más fácil. Eventualmente, estas situaciones dejarán de causarte ansiedad y podrás ir sin problemas.",
                puntos: 0,
                tipo: 'problematica',
                concepto: 'Promesa de eliminación',
                feedback: "PROBLEMÁTICA. Esto promete que 'eventualmente no habrá ansiedad', lo que mantiene la agenda de control. En CF, no prometemos eliminación de malestar - prometemos una vida valiosa incluso con malestar. Esta respuesta vuelve a reforzar el problema fundamental.",
                efectoCliente: 'regresion'
            }
        ]
    }
];

// Continuará en la siguiente parte del archivo...

// ============================================
// LÓGICA DEL CASO INTERACTIVO
// ============================================

// Elementos del DOM
const integracionInicio = document.getElementById('integracionInicio');
const casoInteractivo = document.getElementById('casoInteractivo');
const resultadosFinales = document.getElementById('resultadosFinales');
const btnComenzar = document.getElementById('btnComenzar');

const clienteEstado = document.getElementById('clienteEstado');
const decisionActualSpan = document.getElementById('decisionActual');
const puntosActualesSpan = document.getElementById('puntosActuales');
const progresoSesion = document.getElementById('progresoSesion');
const coherenciaFill = document.getElementById('coherenciaFill');
const coherenciaValor = document.getElementById('coherenciaValor');

const narrativaTexto = document.getElementById('narrativaTexto');
const decisionContexto = document.getElementById('decisionContexto');
const decisionOpciones = document.getElementById('decisionOpciones');
const decisionFeedback = document.getElementById('decisionFeedback');

// ============================================
// INICIALIZACIÓN
// ============================================

function inicializar() {
    btnComenzar.addEventListener('click', comenzarCaso);
}

function comenzarCaso() {
    integracionInicio.style.display = 'none';
    casoInteractivo.style.display = 'grid';
    cargarDecision();
}

// ============================================
// CARGA DE DECISIONES
// ============================================

function cargarDecision() {
    const decision = decisiones[decisionActual];
    
    // Actualizar UI
    decisionActualSpan.textContent = decisionActual + 1;
    actualizarProgreso();
    actualizarEstadoCliente();
    
    // Cargar narrativa
    narrativaTexto.innerHTML = decision.narrativa;
    
    // Si es la última decisión, ajustar narrativa según progreso
    if (decisionActual === 11) {
        mostrarNarrativaFinal();
    }
    
    // Cargar pregunta
    decisionContexto.innerHTML = `
        <div class="contexto-header">
            <span class="concepto-tag">${obtenerNombreConcepto(decision.concepto)}</span>
        </div>
        <h3 class="decision-pregunta">${decision.pregunta}</h3>
    `;
    
    // Cargar opciones
    decisionOpciones.innerHTML = '';
    decision.opciones.forEach((opcion, index) => {
        const opcionBtn = document.createElement('button');
        opcionBtn.className = 'decision-opcion';
        opcionBtn.innerHTML = `
            <div class="opcion-letra-decision">${String.fromCharCode(65 + index)}</div>
            <div class="opcion-texto-decision">${opcion.texto}</div>
        `;
        opcionBtn.addEventListener('click', () => seleccionarOpcion(index));
        decisionOpciones.appendChild(opcionBtn);
    });
    
    decisionFeedback.style.display = 'none';
}

function obtenerNombreConcepto(concepto) {
    const nombres = {
        'cosmovisiones': '🏛️ Cosmovisiones',
        'ontologia': '🔗 Ontología Relacional',
        'criterio_verdad': '⚖️ Criterio Pragmático',
        'analisis_funcional': '🔬 Análisis Funcional',
        'integracion': '🎯 Integración'
    };
    return nombres[concepto] || concepto;
}

// ============================================
// SELECCIÓN Y FEEDBACK
// ============================================

function seleccionarOpcion(indiceOpcion) {
    const decision = decisiones[decisionActual];
    const opcionSeleccionada = decision.opciones[indiceOpcion];
    
    // Registrar decisión
    decisionesTomadas.push({
        decision: decisionActual + 1,
        concepto: decision.concepto,
        opcion: indiceOpcion,
        puntos: opcionSeleccionada.puntos,
        tipo: opcionSeleccionada.tipo
    });
    
    // Sumar puntos
    puntosAcumulados += opcionSeleccionada.puntos;
    puntosActualesSpan.textContent = puntosAcumulados;
    
    // Actualizar estado del cliente según efecto
    if (opcionSeleccionada.efectoCliente) {
        estadoCliente = opcionSeleccionada.efectoCliente;
    }
    
    // Deshabilitar opciones
    const opciones = document.querySelectorAll('.decision-opcion');
    opciones.forEach((opcion, index) => {
        opcion.style.pointerEvents = 'none';
        if (index === indiceOpcion) {
            opcion.classList.add(opcionSeleccionada.tipo);
        }
    });
    
    // Mostrar feedback
    mostrarFeedback(opcionSeleccionada);
}

function mostrarFeedback(opcion) {
    let iconoTipo = '';
    let tituloTipo = '';
    let colorClase = '';
    
    switch(opcion.tipo) {
        case 'optima':
            iconoTipo = '✅';
            tituloTipo = '¡Decisión Óptima!';
            colorClase = 'feedback-optima';
            break;
        case 'aceptable':
            iconoTipo = '⭐';
            tituloTipo = 'Decisión Aceptable';
            colorClase = 'feedback-aceptable';
            break;
        case 'problematica':
            iconoTipo = '❌';
            tituloTipo = 'Decisión Problemática';
            colorClase = 'feedback-problematica';
            break;
    }
    
    decisionFeedback.className = `decision-feedback ${colorClase}`;
    decisionFeedback.innerHTML = `
        <div class="feedback-header">
            <span class="feedback-icono">${iconoTipo}</span>
            <h4>${tituloTipo} (+${opcion.puntos} puntos)</h4>
        </div>
        <div class="feedback-concepto">
            <strong>${opcion.concepto}</strong>
        </div>
        <div class="feedback-explicacion">
            ${opcion.feedback}
        </div>
        <button class="btn-continuar-decision" id="btnContinuarDecision">
            ${decisionActual < 11 ? 'Continuar →' : 'Ver resultados finales →'}
        </button>
    `;
    
    decisionFeedback.style.display = 'block';
    decisionFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    document.getElementById('btnContinuarDecision').addEventListener('click', siguienteDecision);
}

// ============================================
// NAVEGACIÓN
// ============================================

function siguienteDecision() {
    decisionActual++;
    
    if (decisionActual < decisiones.length) {
        cargarDecision();
    } else {
        mostrarResultadosFinales();
    }
}

// ============================================
// ACTUALIZACIÓN DE UI
// ============================================

function actualizarProgreso() {
    const porcentaje = ((decisionActual + 1) / decisiones.length) * 100;
    progresoSesion.style.width = porcentaje + '%';
    
    // Coherencia CF
    const decisionesOptimas = decisionesTomadas.filter(d => d.puntos === 10).length;
    const coherencia = decisionActual > 0 ? Math.round((decisionesOptimas / decisionesTomadas.length) * 100) : 0;
    coherenciaFill.style.width = coherencia + '%';
    coherenciaValor.textContent = coherencia + '%';
}

function actualizarEstadoCliente() {
    const estados = {
        'ansiosa': { emoji: '😟', texto: 'Ansiosa', color: '#F44336' },
        'neutral': { emoji: '😐', texto: 'Neutral', color: '#FFC107' },
        'mejorando': { emoji: '🙂', texto: 'Mejorando', color: '#8BC34A' },
        'comprometida': { emoji: '😊', texto: 'Comprometida', color: '#4CAF50' },
        'regresion': { emoji: '😞', texto: 'Retroceso', color: '#D32F2F' },
        'estable': { emoji: '😌', texto: 'Estable', color: '#9C27B0' },
        'crecimiento': { emoji: '🌟', texto: 'Creciendo', color: '#00BCD4' }
    };
    
    const estado = estados[estadoCliente] || estados['neutral'];
    clienteEstado.innerHTML = `
        <span class="estado-emoji">${estado.emoji}</span>
        <span class="estado-texto">${estado.texto}</span>
    `;
    clienteEstado.style.borderColor = estado.color;
}

function mostrarNarrativaFinal() {
    const narrativaFinal = document.getElementById('narrativaFinal');
    let textoFinal = '';
    
    if (puntosAcumulados >= 100) {
        textoFinal = `
            <div class="dialogo cliente positivo">
                <strong>Valentina:</strong> "¡Y lo hice! Estaba nerviosa, sí, pero... hablé con tres personas. Una conversación fue súper interesante sobre proyectos de IA. Y sabes qué fue lo más loco? En un momento sentí mucha ansiedad, como que quería irme, pero pensé 'ok, la ansiedad está aquí, ¿y qué?' Y me quedé. No desapareció la ansiedad, pero... yo seguí ahí. Fue como... liberador de alguna manera."
            </div>
            <p>Sus ojos brillan. Hay una energía diferente en ella - no ausencia de ansiedad, sino presencia de vitalidad.</p>
        `;
    } else if (puntosAcumulados >= 80) {
        textoFinal = `
            <div class="dialogo cliente neutral">
                <strong>Valentina:</strong> "Fui, pero fue... complicado. Hablé con una persona brevemente. Cuando empezaba a sentirme demasiado ansiosa, salí un momento afuera a respirar. Volví a entrar y me quedé un rato más, aunque no hablé mucho. No sé, se sintió como un paso pequeño, supongo."
            </div>
            <p>Hay progreso, pero también duda. Valentina todavía está buscando 'sentirse mejor' antes de actuar plenamente.</p>
        `;
    } else {
        textoFinal = `
            <div class="dialogo cliente negativo">
                <strong>Valentina:</strong> "Bueno... intenté ir. Llegué hasta la puerta del lugar, pero la ansiedad era insoportable. Sentí que no podía respirar. Decidí que no era el momento adecuado y me fui. Quizás la próxima vez cuando esté más preparada..."
            </div>
            <p>Valentina evitó nuevamente. Las intervenciones no lograron cambiar el patrón fundamental de evitación reforzada negativamente.</p>
        `;
    }
    
    narrativaFinal.innerHTML = textoFinal;
}

// ============================================
// RESULTADOS FINALES
// ============================================

function mostrarResultadosFinales() {
    casoInteractivo.style.display = 'none';
    resultadosFinales.style.display = 'block';
    
    const porcentaje = Math.round((puntosAcumulados / 120) * 100);
    
    // Título según resultado
    let titulo, subtitulo, resultadoCaso;
    
    if (puntosAcumulados >= 100) {
        titulo = '🏆 ¡Excelente Trabajo!';
        subtitulo = 'Demostraste un dominio profundo del Contextualismo Funcional';
        resultadoCaso = `
            <div class="caso-resultado excelente">
                <p><strong>Valentina hizo cambios significativos.</strong> Aunque la ansiedad no desapareció, aprendió a actuar valientemente con ella presente. Comenzó a participar en eventos sociales, conectar con colegas, y tomar riesgos profesionales. Su vida se expandió no porque se 'curó', sino porque cambió su relación con el malestar.</p>
                <p class="caso-impacto">💫 <em>Impacto terapéutico: Alto - Cambio transformacional</em></p>
            </div>
        `;
    } else if (puntosAcumulados >= 80) {
        titulo = '⭐ Buen Trabajo';
        subtitulo = 'Mostraste competencia en los fundamentos de CF';
        resultadoCaso = `
            <div class="caso-resultado bueno">
                <p><strong>Valentina mejoró moderadamente.</strong> Dio algunos pasos valiosos y tiene momentos de actuación según valores. Sin embargo, todavía lucha con la agenda de control emocional - busca 'sentirse mejor' antes de actuar plenamente. El progreso es real pero gradual.</p>
                <p class="caso-impacto">✨ <em>Impacto terapéutico: Moderado - Cambio parcial</em></p>
            </div>
        `;
    } else {
        titulo = '📚 Área de Oportunidad';
        subtitulo = 'Hay conceptos importantes que necesitan más práctica';
        resultadoCaso = `
            <div class="caso-resultado mejorable">
                <p><strong>Valentina se estancó o abandonó la terapia.</strong> Las intervenciones no lograron cambiar el patrón de evitación. Valentina continúa esperando 'sentirse lista' o 'curarse' antes de actuar. El problema fundamental - evitación reforzada negativamente - permanece intacto.</p>
                <p class="caso-impacto">⚠️ <em>Impacto terapéutico: Bajo - Cambio mínimo o regresión</em></p>
            </div>
        `;
    }
    
    document.getElementById('resultadoTitulo').textContent = titulo;
    document.getElementById('resultadoSubtitulo').textContent = subtitulo;
    document.getElementById('puntosTotales').textContent = puntosAcumulados;
    document.getElementById('porcentajeFinal').textContent = porcentaje + '%';
    document.getElementById('casoFinal').innerHTML = resultadoCaso;
    
    // Desglose por conceptos
    generarDesgloseConceptos();
    
    // Áreas de mejora
    generarAreasMejora();
    
    // Guardar progreso
    guardarProgreso();
}

function generarDesgloseConceptos() {
    const conceptos = {
        'cosmovisiones': { nombre: '🏛️ Cosmovisiones', decisiones: [] },
        'ontologia': { nombre: '🔗 Ontología Relacional', decisiones: [] },
        'criterio_verdad': { nombre: '⚖️ Criterio Pragmático', decisiones: [] },
        'analisis_funcional': { nombre: '🔬 Análisis Funcional', decisiones: [] },
        'integracion': { nombre: '🎯 Integración', decisiones: [] }
    };
    
    decisionesTomadas.forEach(d => {
        conceptos[d.concepto].decisiones.push(d);
    });
    
    let html = '<h3>📊 Desglose por Concepto:</h3><div class="conceptos-desglose">';
    
    Object.values(conceptos).forEach(concepto => {
        if (concepto.decisiones.length > 0) {
            const puntosMax = concepto.decisiones.length * 10;
            const puntosObtenidos = concepto.decisiones.reduce((sum, d) => sum + d.puntos, 0);
            const porcentaje = Math.round((puntosObtenidos / puntosMax) * 100);
            
            html += `
                <div class="concepto-desglose">
                    <div class="concepto-nombre">${concepto.nombre}</div>
                    <div class="concepto-barra">
                        <div class="concepto-fill" style="width: ${porcentaje}%"></div>
                    </div>
                    <div class="concepto-porcentaje">${porcentaje}% (${puntosObtenidos}/${puntosMax})</div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    document.getElementById('desgloseConceptos').innerHTML = html;
}

function generarAreasMejora() {
    const conceptosDebiles = [];
    
    const conceptos = {
        'cosmovisiones': { nombre: 'Cosmovisiones', link: 'concepto-01.html' },
        'ontologia': { nombre: 'Ontología Relacional', link: 'concepto-02.html' },
        'criterio_verdad': { nombre: 'Criterio Pragmático', link: 'concepto-03.html' },
        'analisis_funcional': { nombre: 'Análisis Funcional', link: 'concepto-04.html' }
    };
    
    Object.keys(conceptos).forEach(key => {
        const decisiones = decisionesTomadas.filter(d => d.concepto === key);
        if (decisiones.length > 0) {
            const puntosMax = decisiones.length * 10;
            const puntosObtenidos = decisiones.reduce((sum, d) => sum + d.puntos, 0);
            const porcentaje = (puntosObtenidos / puntosMax) * 100;
            
            if (porcentaje < 70) {
                conceptosDebiles.push({
                    nombre: conceptos[key].nombre,
                    link: conceptos[key].link,
                    porcentaje: Math.round(porcentaje)
                });
            }
        }
    });
    
    if (conceptosDebiles.length > 0) {
        let html = '';
        conceptosDebiles.forEach(c => {
            html += `
                <div class="mejora-item">
                    <span class="mejora-icono">💡</span>
                    <div class="mejora-texto">
                        Revisa <strong>${c.nombre}</strong> (${c.porcentaje}%)
                        <a href="${c.link}" class="mejora-link">Repasar concepto →</a>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('areasMejora').style.display = 'block';
        document.getElementById('sugerenciasMejora').innerHTML = html;
    }
}

function guardarProgreso() {
    const progreso = {
        modulo: 1,
        concepto: 'integracion',
        completado: true,
        puntos: puntosAcumulados,
        porcentaje: Math.round((puntosAcumulados / 120) * 100),
        decisiones: decisionesTomadas,
        fecha: new Date().toISOString()
    };
    
    localStorage.setItem('rft_modulo1_integracion', JSON.stringify(progreso));
    
    // Marcar módulo como completado
    localStorage.setItem('rft_modulo1_completado', 'true');
}

// ============================================
// ANIMACIÓN DE PARTÍCULAS
// ============================================

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numParticles = 40;
        
        this.init();
        this.animate();
        this.setupEvents();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 2,
                color: Math.random() > 0.5 ? '#8B5CF6' : '#FFC107'
            });
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.radius * 2
            );
            
            gradient.addColorStop(0, particle.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    setupEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
    }
}

// ============================================
// INICIO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    inicializar();
    new ParticleSystem();
});
