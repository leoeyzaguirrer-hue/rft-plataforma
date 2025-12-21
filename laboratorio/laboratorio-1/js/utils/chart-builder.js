/* ===================================
   LABORATORIO DEL HUMOR - chart-builder.js
   Constructor de gráficos SVG
   =================================== */

const ChartBuilder = {
    // Crear gráfico de barras
    createBarChart: (data, options = {}) => {
        const {
            width = 600,
            height = 400,
            barColor = '#3b82f6',
            backgroundColor = '#f8fafc',
            showValues = true,
            animate = true
        } = options;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Fondo
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('width', width);
        bg.setAttribute('height', height);
        bg.setAttribute('fill', backgroundColor);
        svg.appendChild(bg);
        
        // Encontrar valor máximo
        const maxValue = Math.max(...data.map(d => d.value));
        
        // Calcular dimensiones de barras
        const barWidth = chartWidth / data.length * 0.8;
        const barSpacing = chartWidth / data.length;
        
        // Crear barras
        data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = margin.left + (index * barSpacing) + (barSpacing - barWidth) / 2;
            const y = margin.top + (chartHeight - barHeight);
            
            // Barra
            const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bar.setAttribute('x', x);
            bar.setAttribute('y', animate ? margin.top + chartHeight : y);
            bar.setAttribute('width', barWidth);
            bar.setAttribute('height', animate ? 0 : barHeight);
            bar.setAttribute('fill', barColor);
            bar.setAttribute('rx', '4');
            
            if (animate) {
                bar.style.transition = 'all 0.8s ease-out';
                setTimeout(() => {
                    bar.setAttribute('y', y);
                    bar.setAttribute('height', barHeight);
                }, 100);
            }
            
            svg.appendChild(bar);
            
            // Etiqueta
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x + barWidth / 2);
            label.setAttribute('y', margin.top + chartHeight + 20);
            label.setAttribute('text-anchor', 'middle');
            label.setAttribute('fill', '#64748b');
            label.setAttribute('font-size', '14');
            label.textContent = item.label;
            svg.appendChild(label);
            
            // Valor
            if (showValues) {
                const value = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                value.setAttribute('x', x + barWidth / 2);
                value.setAttribute('y', y - 5);
                value.setAttribute('text-anchor', 'middle');
                value.setAttribute('fill', '#1e293b');
                value.setAttribute('font-weight', '600');
                value.setAttribute('font-size', '14');
                value.textContent = item.value;
                svg.appendChild(value);
            }
        });
        
        return svg;
    },
    
    // Crear gráfico de líneas
    createLineChart: (data, options = {}) => {
        const {
            width = 600,
            height = 400,
            lineColor = '#3b82f6',
            backgroundColor = '#f8fafc',
            showPoints = true,
            animate = true
        } = options;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        const margin = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Fondo
        const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('width', width);
        bg.setAttribute('height', height);
        bg.setAttribute('fill', backgroundColor);
        svg.appendChild(bg);
        
        // Calcular escalas
        const maxValue = Math.max(...data.map(d => d.value));
        const xStep = chartWidth / (data.length - 1);
        
        // Crear path
        let pathData = '';
        data.forEach((point, index) => {
            const x = margin.left + (index * xStep);
            const y = margin.top + (chartHeight - (point.value / maxValue * chartHeight));
            
            if (index === 0) {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
            
            // Puntos
            if (showPoints) {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', '4');
                circle.setAttribute('fill', lineColor);
                svg.appendChild(circle);
            }
        });
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', lineColor);
        path.setAttribute('stroke-width', '3');
        
        if (animate) {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            path.style.transition = 'stroke-dashoffset 2s ease-out';
            setTimeout(() => {
                path.style.strokeDashoffset = '0';
            }, 100);
        }
        
        svg.appendChild(path);
        
        return svg;
    },
    
    // Crear diagrama de Venn simple
    createVennDiagram: (overlap, options = {}) => {
        const {
            width = 300,
            height = 200,
            color1 = '#3b82f6',
            color2 = '#f59e0b'
        } = options;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        
        const radius = 60;
        const centerY = height / 2;
        const center1X = width / 2 - 30;
        const center2X = width / 2 + 30;
        
        // Círculo 1
        const circle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle1.setAttribute('cx', center1X);
        circle1.setAttribute('cy', centerY);
        circle1.setAttribute('r', radius);
        circle1.setAttribute('fill', color1);
        circle1.setAttribute('opacity', '0.5');
        svg.appendChild(circle1);
        
        // Círculo 2
        const circle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle2.setAttribute('cx', center2X);
        circle2.setAttribute('cy', centerY);
        circle2.setAttribute('r', radius);
        circle2.setAttribute('fill', color2);
        circle2.setAttribute('opacity', '0.5');
        svg.appendChild(circle2);
        
        // Texto de overlap
        const overlapText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        overlapText.setAttribute('x', width / 2);
        overlapText.setAttribute('y', centerY);
        overlapText.setAttribute('text-anchor', 'middle');
        overlapText.setAttribute('dominant-baseline', 'middle');
        overlapText.setAttribute('font-size', '24');
        overlapText.setAttribute('font-weight', 'bold');
        overlapText.setAttribute('fill', '#1e293b');
        overlapText.textContent = `${overlap}%`;
        svg.appendChild(overlapText);
        
        return svg;
    }
};

window.ChartBuilder = ChartBuilder;
