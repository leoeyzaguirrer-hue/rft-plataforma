// CONCEPTO 2 - PROPIEDADES FORMALES DE EQUIVALENCIA
// Detective de Propiedades: 12 casos clínicos/experimentales

// ============= NAVEGACIÓN TEORÍA =============
function irATeoria(numero) {
    document.querySelectorAll('.teoria-seccion').forEach(s => s.classList.remove('activa'));
    document.getElementById(`teoria${numero}`).classList.add('activa');
    window.scrollTo(0, 0);
}

function iniciarEjercicio() {
    document.querySelectorAll('.teoria-seccion').forEach(s => s.classList.remove('activa'));
    document.getElementById('ejercicio').classList.add('activa');
    window.scrollTo(0, 0);
    cargarCaso();
}

// ============= CASOS DEL EJERCICIO =============
const casos = [
    {
        escenario: "Un niño con autismo aprende a reconocer su nombre 'JUAN' escrito en diferentes tipografías (Arial, Times New Roman, Comic Sans) y en diferentes tamaños. En todas las presentaciones, responde 'Ese soy yo' sin entrenamiento adicional para cada variante.",
        opciones: [
            {texto: "Reflexividad", correcto: true},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Ninguna propiedad", correcto: false}
        ],
        feedback: "✅ Correcto. El niño reconoce que todas las variaciones tipográficas son el MISMO nombre (Juan=Juan). Esto es REFLEXIVIDAD: reconocer la identidad a través de diferentes formas del mismo estímulo."
    },
    {
        escenario: "En un experimento, se entrena a un participante: Imagen de perro → Palabra 'PERRO'. Luego, sin entrenamiento adicional, se prueba al revés: se muestra la palabra 'PERRO' y el participante selecciona correctamente la imagen del perro.",
        opciones: [
            {texto: "Reflexividad", correcto: false},
            {texto: "Simetría", correcto: true},
            {texto: "Transitividad", correcto: false},
            {texto: "Generalización simple", correcto: false}
        ],
        feedback: "✅ Exacto. La relación se INVIRTIÓ automáticamente sin entrenamiento: si A→B fue entrenado, B→A emergió. Esto es SIMETRÍA, característica única del comportamiento simbólico humano que NO ocurre en condicionamiento pavloviano."
    },
    {
    escenario: "En un programa educativo, un niño aprende dos discriminaciones condicionales: (1) Foto de manzana → Palabra escrita 'MANZANA'. (2) Palabra escrita 'MANZANA' → Dibujo esquemático de manzana. En una prueba posterior, sin entrenamiento adicional, el niño selecciona correctamente el dibujo esquemático cuando se le presenta la foto de manzana.",
    opciones: [
        {texto: "Reflexividad", correcto: false},
        {texto: "Simetría", correcto: false},
        {texto: "Transitividad", correcto: true},
        {texto: "Generalización simple", correcto: false}
    ],
    feedback: "✅ Exacto. Se entrenó Foto→Palabra y Palabra→Dibujo. El niño derivó Foto→Dibujo sin entrenamiento directo. Esto es TRANSITIVIDAD: si A=B y B=C, entonces A=C. La relación emergió mediante el elemento compartido (la palabra)."
},
    {
        escenario: "Un niño aprende que un billete de $100 es equivalente a otro billete de $100, aunque sean billetes físicamente diferentes (diferentes números de serie, diferentes grados de desgaste).",
        opciones: [
            {texto: "Reflexividad", correcto: true},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Equivalencia completa", correcto: false}
        ],
        feedback: "✅ Correcto. Reconoce que diferentes ejemplares físicos son funcionalmente el MISMO estímulo ($100=$100). Aunque sean objetos distintos, pertenecen a la misma clase. Esto requiere REFLEXIVIDAD: identificar la 'mismidad' a pesar de diferencias físicas."
    },
   {
    escenario: "En un experimento con adultos, se entrena: Símbolo abstracto ⚡ → Color azul. Después, sin entrenamiento adicional, se presenta el color azul como muestra y el participante selecciona correctamente el símbolo ⚡ de entre tres opciones de símbolos diferentes.",
    opciones: [
        {texto: "Reflexividad", correcto: false},
        {texto: "Simetría", correcto: true},
        {texto: "Transitividad", correcto: false},
        {texto: "Equivalencia completa", correcto: false}
    ],
    feedback: "✅ Correcto. Se entrenó ⚡→Azul, y emergió Azul→⚡ sin entrenamiento adicional. La relación se INVIRTIÓ automáticamente. Esto es SIMETRÍA: si A=B, entonces B=A. Esta bidireccionalidad es característica de las clases de equivalencia."
},
    {
        escenario: "En un programa de lectura, un niño aprende: (1) Letra 'P' → Sonido /p/. (2) Sonido /p/ (al inicio) → Palabra 'PERRO'. Sin entrenamiento adicional, ahora al ver la letra 'P' al inicio de palabras, puede identificar palabras que empiezan con ese sonido.",
        opciones: [
            {texto: "Reflexividad", correcto: false},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: true},
            {texto: "Discriminación simple", correcto: false}
        ],
        feedback: "✅ Perfecto. Letra→Sonido y Sonido→Palabra, por lo tanto Letra→Palabra. El niño DERIVÓ la relación final sin entrenamiento directo. Esto es TRANSITIVIDAD, la base de la lectura: enseñar componentes básicos y derivar combinaciones complejas."
    },
    {
        escenario: "Un adulto se ve en un espejo, luego en una foto, luego en un video, y en todos los casos reconoce 'Ese soy yo', sabiendo que todas esas representaciones visuales diferentes corresponden a la misma persona.",
        opciones: [
            {texto: "Reflexividad", correcto: true},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Auto-reconocimiento simple", correcto: false}
        ],
        feedback: "✅ Correcto. Reconoce que múltiples representaciones (espejo, foto, video) son la MISMA entidad (YO=YO). Esto es REFLEXIVIDAD aplicada al auto-reconocimiento: identificar identidad personal a través de diferentes modalidades y contextos."
    },
    {
        escenario: "En un experimento de condicionamiento pavloviano, un perro aprende Campana → Comida. Se prueba la relación inversa mostrando comida, pero el perro NO produce el sonido de la campana ni ninguna respuesta relacionada específicamente con la campana.",
        opciones: [
            {texto: "Reflexividad", correcto: false},
            {texto: "Simetría", correcto: true},
            {texto: "Transitividad", correcto: false},
            {texto: "Ninguna propiedad", correcto: false}
        ],
        feedback: "✅ Correcto. Este caso muestra la AUSENCIA de SIMETRÍA en condicionamiento pavloviano simple. Campana→Comida fue entrenada, pero Comida→Campana NO emergió. La simetría es característica exclusiva del comportamiento simbólico verbal humano, NO de condicionamiento básico."
    },
   {
    escenario: "Un estudiante universitario participa en un experimento donde aprende: (1) Kanji japonés 木 → Número romano 'III'. (2) Número romano 'III' → Letra griega Γ. En la fase de prueba, cuando se presenta el kanji 木 como muestra, el estudiante selecciona correctamente la letra Γ, aunque estos dos estímulos nunca fueron relacionados directamente durante el entrenamiento.",
    opciones: [
        {texto: "Reflexividad", correcto: false},
        {texto: "Simetría", correcto: false},
        {texto: "Transitividad", correcto: true},
        {texto: "Discriminación condicional simple", correcto: false}
    ],
    feedback: "✅ Perfecto. Se entrenó 木→III y III→Γ. El estudiante derivó 木→Γ sin entrenamiento directo de esta relación. Esto es TRANSITIVIDAD: conectó ambas discriminaciones condicionales a través del elemento compartido (III), demostrando la formación de una clase de equivalencia."
},
    {
        escenario: "Un investigador presenta diferentes fotografías del MISMO objeto (una silla) tomadas desde diferentes ángulos, distancias e iluminaciones. El participante identifica correctamente que todas las fotos son 'la misma silla'.",
        opciones: [
            {texto: "Reflexividad", correcto: true},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Constancia perceptual", correcto: false}
        ],
        feedback: "✅ Correcto. Reconoce que múltiples presentaciones visuales diferentes son el MISMO objeto (Silla=Silla). Aunque cada foto es físicamente distinta, todas se reconocen como la misma entidad. Esto es REFLEXIVIDAD: identificar mismidad a pesar de variación en la apariencia."
    },
    {
        escenario: "Un niño completa un programa de equivalencia donde aprende: (1) Kanji 犬 → Palabra 'PERRO'. (2) Palabra 'PERRO' → Imagen 🐕. Después del entrenamiento, el niño demuestra: 犬 ↔ 'PERRO' ↔ 🐕 en todas las direcciones, reconociendo que los tres son 'la misma cosa'.",
        opciones: [
            {texto: "Reflexividad", correcto: false},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Equivalencia completa (las tres)", correcto: true}
        ],
        feedback: "✅ ¡Excelente! Este caso demuestra las TRES propiedades: (1) Cada estímulo=sí mismo (REFLEXIVIDAD), (2) Las relaciones funcionan en ambas direcciones (SIMETRÍA), (3) Derivó 犬↔🐕 sin entrenamiento directo (TRANSITIVIDAD). Cuando las tres están presentes, hay EQUIVALENCIA COMPLETA."
    },
    {
        escenario: "En un laboratorio se entrena a un participante: Estímulo A → Presionar botón rojo. El participante aprende perfectamente esta discriminación. No se prueba ninguna relación derivada, solo se verifica que el entrenamiento fue exitoso.",
        opciones: [
            {texto: "Reflexividad", correcto: false},
            {texto: "Simetría", correcto: false},
            {texto: "Transitividad", correcto: false},
            {texto: "Ninguna propiedad (solo entrenamiento)", correcto: true}
        ],
        feedback: "✅ Correcto. Este es un caso TRICK. Solo hubo ENTRENAMIENTO DIRECTO de una discriminación simple. No se probó ni emergió ninguna relación derivada. Para demostrar propiedades de equivalencia, debe haber emergencia de relaciones NO entrenadas. Aquí solo hay aprendizaje directo."
    }
];

// ============= ESTADO DEL EJERCICIO =============
let casoActualIndex = 0;
let aciertosTotal = 0;
let respondido = false;

// ============= CARGAR CASO =============
function cargarCaso() {
    if (casoActualIndex >= casos.length) {
        mostrarResultadoFinal();
        return;
    }
    
    const caso = casos[casoActualIndex];
    respondido = false;
    
    // Actualizar contador header
    document.getElementById('casoActual').textContent = casoActualIndex + 1;
    
    // Actualizar progreso
    document.getElementById('casoNumero').textContent = casoActualIndex + 1;
    document.getElementById('aciertos').textContent = aciertosTotal;
    document.getElementById('porcentaje').textContent = casoActualIndex === 0 ? 0 : Math.round((aciertosTotal / casoActualIndex) * 100);
    
    const progresoFill = document.getElementById('progresoFill');
    progresoFill.style.width = ((casoActualIndex / casos.length) * 100) + '%';
    
    // Mostrar escenario
    document.getElementById('casoEscenario').innerHTML = `<p>${caso.escenario}</p>`;
    
    // Generar opciones
    const opcionesEl = document.getElementById('casoOpciones');
    opcionesEl.innerHTML = '';
    
    caso.opciones.forEach((opcion, index) => {
        const btn = document.createElement('button');
        btn.className = 'opcion-btn';
        btn.textContent = opcion.texto;
        btn.onclick = () => seleccionarOpcion(index);
        opcionesEl.appendChild(btn);
    });
    
    // Limpiar feedback
    document.getElementById('casoFeedback').innerHTML = '';
    document.getElementById('casoFeedback').className = 'caso-feedback';
}

// ============= SELECCIONAR OPCIÓN =============
function seleccionarOpcion(index) {
    if (respondido) return;
    
    respondido = true;
    const caso = casos[casoActualIndex];
    const opcionSeleccionada = caso.opciones[index];
    const feedbackEl = document.getElementById('casoFeedback');
    const botonesOpciones = document.querySelectorAll('.opcion-btn');
    
    // Marcar respuestas
    botonesOpciones.forEach((btn, i) => {
        if (caso.opciones[i].correcto) {
            btn.classList.add('correcta');
        }
        if (i === index && !opcionSeleccionada.correcto) {
            btn.classList.add('incorrecta');
        }
        btn.style.pointerEvents = 'none';
    });
    
    if (opcionSeleccionada.correcto) {
        aciertosTotal++;
        feedbackEl.className = 'caso-feedback correcto';
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                ${caso.feedback}
            </div>
            <button class="btn-siguiente" onclick="siguienteCaso()">
                Siguiente caso →
            </button>
        `;
    } else {
        feedbackEl.className = 'caso-feedback incorrecto';
        const opcionCorrecta = caso.opciones.find(o => o.correcto);
        feedbackEl.innerHTML = `
            <div class="feedback-contenido">
                <p>❌ Incorrecto. La respuesta correcta es: <strong>${opcionCorrecta.texto}</strong></p>
                <p>${caso.feedback}</p>
            </div>
            <button class="btn-siguiente" onclick="siguienteCaso()">
                Siguiente caso →
            </button>
        `;
    }
    
    // Actualizar stats
    document.getElementById('aciertos').textContent = aciertosTotal;
    document.getElementById('porcentaje').textContent = Math.round((aciertosTotal / (casoActualIndex + 1)) * 100);
}

// ============= SIGUIENTE CASO =============
function siguienteCaso() {
    casoActualIndex++;
    cargarCaso();
}

// ============= RESULTADO FINAL =============
function mostrarResultadoFinal() {
    document.getElementById('casoCard').style.display = 'none';
    document.getElementById('resultadoFinal').style.display = 'block';
    
    const porcentajeFinal = Math.round((aciertosTotal / casos.length) * 100);
    
    document.getElementById('finalAciertos').textContent = `${aciertosTotal}/${casos.length}`;
    document.getElementById('finalPorcentaje').textContent = porcentajeFinal;
    
    const mensajeEl = document.getElementById('resultadoMensaje');
    
    if (porcentajeFinal >= 90) {
        mensajeEl.innerHTML = `
            <p class="mensaje-excelente">
                <strong>🏆 ¡EXCELENTE!</strong><br>
                Dominas las propiedades formales de la equivalencia. Comprendes perfectamente 
                cómo funcionan la reflexividad, simetría y transitividad, y puedes identificarlas 
                en contextos clínicos y experimentales.
            </p>
        `;
    } else if (porcentajeFinal >= 75) {
        mensajeEl.innerHTML = `
            <p class="mensaje-bueno">
                <strong>✅ ¡MUY BIEN!</strong><br>
                Tienes una comprensión sólida de las propiedades. Podrías beneficiarte de 
                revisar los casos donde fallaste para consolidar la distinción entre las 
                tres propiedades.
            </p>
        `;
    } else if (porcentajeFinal >= 60) {
        mensajeEl.innerHTML = `
            <p class="mensaje-regular">
                <strong>📚 BIEN</strong><br>
                Comprendes los conceptos básicos, pero necesitas más práctica para distinguir 
                claramente entre reflexividad, simetría y transitividad. Considera repetir el 
                ejercicio o revisar la teoría.
            </p>
        `;
    } else {
        mensajeEl.innerHTML = `
            <p class="mensaje-repasar">
                <strong>🔄 NECESITAS REPASAR</strong><br>
                Te recomendamos volver a leer los bloques teóricos y repetir el ejercicio. 
                Las propiedades formales son fundamentales para entender RFT. ¡No te desanimes, 
                con práctica lo dominarás!
            </p>
        `;
    }
}

// ============= REINICIAR EJERCICIO =============
function reiniciarEjercicio() {
    casoActualIndex = 0;
    aciertosTotal = 0;
    respondido = false;
    
    document.getElementById('casoCard').style.display = 'block';
    document.getElementById('resultadoFinal').style.display = 'none';
    
    cargarCaso();
}

// ============= PARTÍCULAS =============
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    init() {
        this.resizeCanvas();
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? '#00BCD4' : '#00E5FF'
            });
        }
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.documentElement.scrollHeight;
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
            grad.addColorStop(0, p.color);
            grad.addColorStop(1, 'transparent');
            this.ctx.fillStyle = grad;
            this.ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ============= INIT =============
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});
