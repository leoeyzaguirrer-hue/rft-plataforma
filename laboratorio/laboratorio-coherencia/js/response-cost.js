/* ==============================================
   EXPERIMENTO RESPONSE COST
   Estudio 2: El Costo de la Coherencia
   ============================================== */

class ExperimentoResponseCost {
    constructor() {
        this.currentTrial = 0;
        this.totalTrials = 12;
        this.currentBlock = 0;
        this.delays = [0, 1, 2, 3, 5, 6]; // Segundos de delay por bloque
        this.trialsPerBlock = 2; // 2 trials por bloque
        this.elecciones = [];
        
        this.init();
    }

    init() {
        this.mostrarTrial();
    }

    getCurrentDelay() {
        return this.delays[this.currentBlock];
    }

    mostrarTrial() {
        if (this.currentTrial >= this.totalTrials) {
            this.finalizarExperimento();
            return;
        }

        // Actualizar bloque si es necesario
        this.currentBlock = Math.floor(this.currentTrial / this.trialsPerBlock);
        const delay = this.getCurrentDelay();

        // Actualizar indicadores visuales
        this.actualizarProgreso();
        this.actualizarCostoIndicator(delay);

        // Habilitar puertas
        document.getElementById('puertaAzulCosto').classList.remove('forzada');
        document.getElementById('puertaAmarillaCosto').classList.remove('forzada');

        // Ocultar feedback
        document.getElementById('feedbackCosto').classList.remove('show');
    }

    actualizarProgreso() {
        const porcentaje = (this.currentTrial / this.totalTrials) * 100;
        document.getElementById('progressFillCosto').style.width = porcentaje + '%';
        document.getElementById('progressTextCosto').textContent = 
            `Trial ${this.currentTrial + 1} de ${this.totalTrials}`;
    }

    actualizarCostoIndicator(delay) {
        const valorEl = document.getElementById('costoValor');
        const descripcionEl = document.getElementById('costoDescripcion');
        const badgeEl = document.getElementById('delayBadge');

        valorEl.textContent = `+${delay}s`;
        badgeEl.textContent = `+${delay}s`;

        if (delay === 0) {
            descripcionEl.textContent = 'Sin delay todavía';
            descripcionEl.style.color = 'var(--success)';
        } else if (delay <= 3) {
            descripcionEl.textContent = 'Delay moderado';
            descripcionEl.style.color = 'var(--warning)';
        } else {
            descripcionEl.textContent = '¡Delay alto! ¿Seguirás eligiendo azul?';
            descripcionEl.style.color = 'var(--error)';
        }
    }

    async elegirPuerta(puerta) {
        const delay = this.getCurrentDelay();

        // Registrar elección
        this.elecciones.push({
            trial: this.currentTrial,
            block: this.currentBlock,
            delay: delay,
            puerta: puerta,
            timestamp: Date.now()
        });

        // Si eligió azul, mostrar timer
        if (puerta === 'azul' && delay > 0) {
            await this.mostrarTimer(delay);
        }

        // Mostrar feedback
        this.mostrarFeedback(puerta, delay);
    }

    async mostrarTimer(segundos) {
        return new Promise(resolve => {
            const overlay = document.getElementById('timerOverlay');
            const numero = document.getElementById('timerNumero');
            
            overlay.classList.add('show');
            
            let remaining = segundos;
            numero.textContent = remaining;

            const interval = setInterval(() => {
                remaining--;
                if (remaining > 0) {
                    numero.textContent = remaining;
                } else {
                    clearInterval(interval);
                    overlay.classList.remove('show');
                    resolve();
                }
            }, 1000);
        });
    }

    mostrarFeedback(puerta, delay) {
        const feedback = document.getElementById('feedbackCosto');
        
        let mensaje = '';
        if (puerta === 'azul') {
            if (delay === 0) {
                mensaje = `
                    Elegiste la <strong style="color: #3B82F6;">Puerta Azul</strong> 🟦 
                    (coherente, sin delay)
                `;
            } else {
                mensaje = `
                    Elegiste la <strong style="color: #3B82F6;">Puerta Azul</strong> 🟦 
                    (coherente) y esperaste <strong>${delay} segundo${delay > 1 ? 's' : ''}</strong>.
                `;
            }
        } else {
            mensaje = `
                Elegiste la <strong style="color: #F59E0B;">Puerta Amarilla</strong> 🟨 
                (incoherente, pero inmediata).
            `;
        }

        feedback.innerHTML = `
            ${mensaje}
            <br><br>
            <button class="btn btn-cyan" onclick="experimentoCosto.siguienteTrial()" style="margin-top: var(--space-4);">
                Continuar →
            </button>
        `;
        feedback.classList.add('show');
    }

    siguienteTrial() {
        this.currentTrial++;
        this.mostrarTrial();
    }

    finalizarExperimento() {
        // Ocultar experimento
        document.getElementById('experimentoCosto').style.display = 'none';

        // Analizar resultados por bloque
        const resultadosPorBloque = this.delays.map((delay, blockIndex) => {
            const eleccionesBloque = this.elecciones.filter(e => e.block === blockIndex);
            const azul = eleccionesBloque.filter(e => e.puerta === 'azul').length;
            const amarilla = eleccionesBloque.filter(e => e.puerta === 'amarilla').length;
            const total = eleccionesBloque.length;
            
            return {
                delay,
                azul,
                amarilla,
                porcentajeAzul: total > 0 ? (azul / total) * 100 : 0
            };
        });

        // Calcular totales
        const totalAzul = this.elecciones.filter(e => e.puerta === 'azul').length;
        const totalAmarilla = this.elecciones.filter(e => e.puerta === 'amarilla').length;
        const porcAzul = (totalAzul / this.totalTrials) * 100;
        const porcAmarilla = (totalAmarilla / this.totalTrials) * 100;

        // Mostrar resultados
        this.mostrarResultados(totalAzul, totalAmarilla, porcAzul, porcAmarilla, resultadosPorBloque);
    }

    mostrarResultados(azul, amarilla, porcAzul, porcAmarilla, porBloque) {
        const container = document.getElementById('resultadosCosto');
        container.classList.add('show');

        // Animar barras totales
        setTimeout(() => {
            document.getElementById('barraAzulCosto').style.width = porcAzul + '%';
            document.getElementById('barraAmarillaCosto').style.width = porcAmarilla + '%';
            
            document.getElementById('conteoAzulCosto').textContent = azul;
            document.getElementById('conteoAmarillaCosto').textContent = amarilla;
            
            document.getElementById('porcentajeAzulCosto').textContent = Math.round(porcAzul) + '%';
            document.getElementById('porcentajeAmarillaCosto').textContent = Math.round(porcAmarilla) + '%';
        }, 500);

        // Generar interpretación
        let interpretacion = this.generarInterpretacion(porBloque);
        document.getElementById('interpretacionCosto').innerHTML = interpretacion;

        // Scroll a resultados
        setTimeout(() => {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);
    }

    generarInterpretacion(porBloque) {
        // Analizar tendencia
        const bloqueInicial = porBloque[0].porcentajeAzul; // 0s
        const bloqueFinal = porBloque[5].porcentajeAzul; // 6s
        const cambio = bloqueInicial - bloqueFinal;

        let interpretacion = '<strong>Análisis de tu patrón:</strong><br><br>';

        // Preferencia en delay 0
        if (bloqueInicial >= 50) {
            interpretacion += `En el bloque sin delay, preferiste coherencia (${Math.round(bloqueInicial)}%). `;
        } else {
            interpretacion += `En el bloque sin delay, no mostraste preferencia clara por coherencia (${Math.round(bloqueInicial)}%). `;
        }

        // Cambio con delays altos
        if (cambio > 40) {
            interpretacion += `<br><br>Tu preferencia <strong style="color: var(--acento-coral);">colapsó dramáticamente</strong> con delays altos (${Math.round(bloqueFinal)}% a +6s). 
            Esto replica el hallazgo del estudio: cuando el costo es muy alto, la coherencia deja de valer la pena.`;
        } else if (cambio > 20) {
            interpretacion += `<br><br>Tu preferencia <strong style="color: var(--warning);">disminuyó moderadamente</strong> con delays altos (${Math.round(bloqueFinal)}% a +6s). 
            Esto muestra que el costo importa, aunque no tanto como en el estudio original.`;
        } else if (cambio < -10) {
            interpretacion += `<br><br>Interesantemente, <strong>aumentaste tu preferencia por coherencia</strong> con delays altos (${Math.round(bloqueFinal)}% a +6s). 
            Esto es poco común, pero algunos participantes también lo hicieron. Quizás el delay te hizo valorar más la coherencia.`;
        } else {
            interpretacion += `<br><br>Tu preferencia <strong>se mantuvo estable</strong> incluso con delays altos (${Math.round(bloqueFinal)}% a +6s). 
            Para ti, el delay no fue suficientemente aversivo para cambiar tu preferencia.`;
        }

        // Comparación con estudio
        interpretacion += `<br><br><strong>En el estudio real:</strong> La preferencia por coherencia cayó de 54% (+0s) a 21% (+6s), 
        con el cambio más dramático ocurriendo entre +3s y +6s.`;

        return interpretacion;
    }
}

// Instancia global
let experimentoCosto;

// Función global para elegir puerta (llamada desde HTML)
function elegirPuertaCosto(puerta) {
    if (experimentoCosto) {
        experimentoCosto.elegirPuerta(puerta);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        experimentoCosto = new ExperimentoResponseCost();
    });
} else {
    experimentoCosto = new ExperimentoResponseCost();
}
