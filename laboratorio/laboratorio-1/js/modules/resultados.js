/* ===================================
   LABORATORIO DEL HUMOR - resultados.js
   Módulo 5: Resultados - CON GRÁFICOS VISUALES
   =================================== */

class ResultadosModule {
    constructor() {
        this.resultadosData = {
            fase1: {
                doctor: {
                    control: { sonrisas: 82, gracioso: 91 },
                    experimental: { sonrisas: 25, gracioso: 33, significativo: true }
                },
                beer: {
                    control: { sonrisas: 91, gracioso: 100 },
                    experimental: { sonrisas: 58, gracioso: 67, significativo: true }
                },
                job: {
                    control: { sonrisas: 73, gracioso: 82 },
                    experimental: { sonrisas: 17, gracioso: 25, significativo: true }
                },
                soccer: {
                    control: { sonrisas: 64, gracioso: 73 },
                    experimental: { sonrisas: 67, gracioso: 75, significativo: false }
                }
            }
        };
        
        this.chartsCreated = false;
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 5) {
                this.onModuleShown();
            }
        });
    }
    
    setupEventListeners() {
        const btnRevelar = document.getElementById('btn-revelar-resultados');
        if (btnRevelar) {
            btnRevelar.addEventListener('click', () => {
                this.revelarResultados();
            });
        }
    }
    
    onModuleShown() {
        this.chartsCreated = false;
    }
    
    async revelarResultados() {
        const btnRevelar = document.getElementById('btn-revelar-resultados');
        const fase1 = document.getElementById('resultados-fase-1');
        const fase2 = document.getElementById('resultados-fase-2');
        
        // Ocultar botón
        if (btnRevelar) {
            Utils.fadeOut(btnRevelar.parentElement, 400);
        }
        
        await Utils.delay(500);
        
        // Mostrar Fase 1
        if (fase1) {
            fase1.classList.remove('hidden');
            fase1.classList.add('fade-in-up');
            await this.crearGraficosFase1();
        }
        
        await Utils.delay(2000);
        
        // Mostrar Fase 2
        if (fase2) {
            fase2.classList.remove('hidden');
            fase2.classList.add('fade-in-up');
        }
    }
    
    async crearGraficosFase1() {
        if (this.chartsCreated) return;
        
        const container = document.getElementById('graficos-fase-1');
        if (!container) return;
        
        const chistes = ['doctor', 'beer', 'job', 'soccer'];
        const nombres = {
            'doctor': '🏥 Chiste del Doctor',
            'beer': '🍺 Chiste de la Cerveza',
            'job': '💼 Chiste de la Entrevista',
            'soccer': '⚽ Chiste del Fútbol'
        };
        
        for (let chiste of chistes) {
            await Utils.delay(400);
            
            const data = this.resultadosData.fase1[chiste];
            const grafico = this.crearGraficoBarras(nombres[chiste], data);
            container.appendChild(grafico);
        }
        
        this.chartsCreated = true;
    }
    
    crearGraficoBarras(titulo, data) {
        const card = Utils.createElement('div', ['grafico-card'], {});
        
        const h4 = Utils.createElement('h4', [], {});
        h4.textContent = titulo;
        card.appendChild(h4);
        
        const barrasContainer = Utils.createElement('div', ['barras-comparacion'], {});
        
        // Barra Sonrisas - Control
        const sonrisasControlGroup = this.crearBarra(
            'Sonrisas - Control',
            data.control.sonrisas,
            'barra-control'
        );
        barrasContainer.appendChild(sonrisasControlGroup);
        
        // Barra Sonrisas - Experimental
        const sonrisasExpGroup = this.crearBarra(
            'Sonrisas - Experimental',
            data.experimental.sonrisas,
            'barra-experimental'
        );
        barrasContainer.appendChild(sonrisasExpGroup);
        
        // Barra "Gracioso" - Control
        const graciosoControlGroup = this.crearBarra(
            '"Gracioso" - Control',
            data.control.gracioso,
            'barra-control'
        );
        barrasContainer.appendChild(graciosoControlGroup);
        
        // Barra "Gracioso" - Experimental
        const graciosoExpGroup = this.crearBarra(
            '"Gracioso" - Experimental',
            data.experimental.gracioso,
            'barra-experimental'
        );
        barrasContainer.appendChild(graciosoExpGroup);
        
        card.appendChild(barrasContainer);
        
        // Badge significativo
        if (data.experimental.significativo) {
            const badge = Utils.createElement('div', ['significativo-badge'], {});
            badge.textContent = '⚠️ Diferencia significativa';
            card.appendChild(badge);
        }
        
        return card;
    }
    
    crearBarra(label, porcentaje, colorClass) {
        const grupo = Utils.createElement('div', ['barra-grupo'], {});
        
        const labelDiv = Utils.createElement('div', ['barra-label'], {});
        labelDiv.innerHTML = `<span>${label}</span><span>${porcentaje}%</span>`;
        grupo.appendChild(labelDiv);
        
        const barraFondo = Utils.createElement('div', ['barra-fondo'], {});
        
        const barraFill = Utils.createElement('div', ['barra-fill', colorClass], {});
        barraFill.style.width = '0%';
        barraFill.textContent = `${porcentaje}%`;
        
        barraFondo.appendChild(barraFill);
        grupo.appendChild(barraFondo);
        
        // Animar después de un momento
        setTimeout(() => {
            barraFill.style.width = `${porcentaje}%`;
        }, 100);
        
        return grupo;
    }
}

const resultadosModule = new ResultadosModule();
