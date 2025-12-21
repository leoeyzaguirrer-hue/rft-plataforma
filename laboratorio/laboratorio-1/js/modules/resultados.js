/* ===================================
   LABORATORIO DEL HUMOR - resultados.js
   Módulo 5: Resultados
   =================================== */

class ResultadosModule {
    constructor() {
        this.resultadosData = null;
        this.chartsCreated = false;
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadResultadosData();
            this.setupEventListeners();
        });
        
        document.addEventListener('moduleShown', (e) => {
            if (e.detail.moduleIndex === 5) {
                this.onModuleShown();
            }
        });
    }
    
    async loadResultadosData() {
        this.resultadosData = await Utils.loadJSON('assets/data/resultados.json');
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
        // Reset si es necesario
        this.chartsCreated = false;
    }
    
    async revelarResultados() {
        const btnRevelar = document.getElementById('btn-revelar-resultados');
        const fase1 = document.getElementById('resultados-fase-1');
        const fase2 = document.getElementById('resultados-fase-2');
        const acuerdo = document.getElementById('resultados-acuerdo');
        
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
            await this.crearGraficoFase2();
        }
        
        await Utils.delay(2000);
        
        // Mostrar Acuerdo
        if (acuerdo) {
            acuerdo.classList.remove('hidden');
            acuerdo.classList.add('fade-in-up');
            await this.crearDiagramasVenn();
        }
    }
    
    async crearGraficosFase1() {
        if (!this.resultadosData || this.chartsCreated) return;
        
        const chistes = ['doctor', 'beer', 'job', 'soccer'];
        const fase1Data = this.resultadosData.resultados.fase1;
        
        for (let chiste of chistes) {
            await Utils.delay(400);
            
            const container = document.getElementById(`grafico-${chiste}`);
            if (!container) continue;
            
            const control = fase1Data.control[chiste];
            const experimental = fase1Data.experimental[chiste];
            
            // Crear gráfico de barras simple
            const grafico = this.crearGraficoBarras(
                chiste,
                control,
                experimental
            );
            
            container.appendChild(grafico);
        }
    }
    
    crearGraficoBarras(chiste, control, experimental) {
        const wrapper = Utils.createElement('div', ['grafico-barras'], {});
        wrapper.style.cssText = `
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            border: 2px solid #e2e8f0;
        `;
        
        // Título
        const titulo = Utils.createElement('h4', [], {});
        const chisteNombres = {
            'doctor': '🏥 Chiste del Doctor',
            'beer': '🍺 Chiste de la Cerveza',
            'job': '💼 Chiste de la Entrevista',
            'soccer': '⚽ Chiste del Fútbol'
        };
        titulo.textContent = chisteNombres[chiste];
        titulo.style.marginBottom = '1rem';
        titulo.style.textAlign = 'center';
        wrapper.appendChild(titulo);
        
        // Contenedor de barras
        const barrasContainer = Utils.createElement('div', ['barras-container'], {});
        barrasContainer.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        `;
        
        // Crear grupo control
        const grupoControl = this.crearGrupoBarra('Control', control, '#64748b');
        barrasContainer.appendChild(grupoControl);
        
        // Crear grupo experimental
        const grupoExperimental = this.crearGrupoBarra('Experimental', experimental, '#f59e0b');
        barrasContainer.appendChild(grupoExperimental);
        
        wrapper.appendChild(barrasContainer);
        
        // Nota si es significativo
        if (experimental.significativo) {
            const nota = Utils.createElement('p', [], {});
            nota.textContent = '⚠️ Diferencia estadísticamente significativa';
            nota.style.cssText = `
                margin-top: 1rem;
                padding: 0.5rem;
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                font-weight: 600;
                color: #92400e;
            `;
            wrapper.appendChild(nota);
        }
        
        return wrapper;
    }
    
    crearGrupoBarra(nombre, datos, color) {
        const grupo = Utils.createElement('div', ['grupo-barra'], {});
        
        const label = Utils.createElement('p', [], {});
        label.textContent = nombre;
        label.style.fontWeight = '600';
        label.style.marginBottom = '0.5rem';
        label.style.textAlign = 'center';
        grupo.appendChild(label);
        
        // Barra de sonrisas
        const barraSmile = this.crearBarra('Sonrisas', datos.sonrisas.porcentaje, color);
        grupo.appendChild(barraSmile);
        
        // Barra de "gracioso"
        const barraGracioso = this.crearBarra('"Gracioso"', datos.gracioso.porcentaje, color);
        grupo.appendChild(barraGracioso);
        
        return grupo;
    }
    
    crearBarra(label, porcentaje, color) {
        const container = Utils.createElement('div', [], {});
        container.style.marginBottom = '0.75rem';
        
        const labelEl = Utils.createElement('div', [], {});
        labelEl.style.cssText = `
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            margin-bottom: 0.25rem;
        `;
        labelEl.innerHTML = `<span>${label}</span><span>${porcentaje}%</span>`;
        container.appendChild(labelEl);
        
        const barraFondo = Utils.createElement('div', [], {});
        barraFondo.style.cssText = `
            background: #e2e8f0;
            height: 24px;
            border-radius: 0.5rem;
            overflow: hidden;
        `;
        
        const barraRelleno = Utils.createElement('div', ['bar-grow'], {});
        barraRelleno.style.cssText = `
            background: ${color};
            height: 100%;
            width: ${porcentaje}%;
            transition: width 1s ease-out;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 0.5rem;
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
        `;
        
        barraFondo.appendChild(barraRelleno);
        container.appendChild(barraFondo);
        
        return container;
    }
    
    async crearGraficoFase2() {
        const container = document.getElementById('grafico-lineas');
        if (!container || !this.resultadosData) return;
        
        // Crear SVG simple para gráfico de líneas
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '400');
        svg.setAttribute('viewBox', '0 0 800 400');
        
        // Aquí iría la lógica del gráfico de líneas
        // Por simplicidad, creamos un placeholder
        const texto = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        texto.setAttribute('x', '400');
        texto.setAttribute('y', '200');
        texto.setAttribute('text-anchor', 'middle');
        texto.setAttribute('fill', '#64748b');
        texto.textContent = 'Gráfico de líneas - Fase 2';
        svg.appendChild(texto);
        
        container.appendChild(svg);
    }
    
    async crearDiagramasVenn() {
        const containerFase1 = document.getElementById('venn-fase-1');
        const containerFase2 = document.getElementById('venn-fase-2');
        
        if (containerFase1) {
            const venn1 = this.crearVennDiagram('Fase 1', 86, 70);
            containerFase1.appendChild(venn1);
        }
        
        if (containerFase2) {
            const venn2 = this.crearVennDiagram('Fase 2', 72, 74);
            containerFase2.appendChild(venn2);
        }
    }
    
    crearVennDiagram(titulo, controlAcuerdo, experimentalAcuerdo) {
        const container = Utils.createElement('div', [], {});
        container.style.cssText = `
            background: white;
            padding: 1.5rem;
            border-radius: 1rem;
            border: 2px solid #e2e8f0;
            text-align: center;
        `;
        
        const h4 = Utils.createElement('h4', [], {});
        h4.textContent = titulo;
        h4.style.marginBottom = '1rem';
        container.appendChild(h4);
        
        const stats = Utils.createElement('div', [], {});
        stats.style.cssText = `
            display: flex;
            justify-content: space-around;
            margin-top: 1rem;
        `;
        
        const controlStat = Utils.createElement('div', [], {});
        controlStat.innerHTML = `
            <p style="font-size: 2rem; font-weight: 700; color: #64748b;">${controlAcuerdo}%</p>
            <p style="font-size: 0.875rem; color: #64748b;">Control</p>
        `;
        
        const experimentalStat = Utils.createElement('div', [], {});
        experimentalStat.innerHTML = `
            <p style="font-size: 2rem; font-weight: 700; color: #f59e0b;">${experimentalAcuerdo}%</p>
            <p style="font-size: 0.875rem; color: #f59e0b;">Experimental</p>
        `;
        
        stats.appendChild(controlStat);
        stats.appendChild(experimentalStat);
        container.appendChild(stats);
        
        return container;
    }
}

const resultadosModule = new ResultadosModule();
