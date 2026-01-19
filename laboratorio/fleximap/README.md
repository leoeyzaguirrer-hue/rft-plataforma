# 🎯 FlexiMap 2.0

## Sistema Inteligente de Conceptualización de Casos Clínicos ACT-RFT

FlexiMap es una herramienta web interactiva que ayuda a psicoterapeutas conductuales contextuales a conceptualizar casos clínicos y generar planes de intervención basados en Terapia de Aceptación y Compromiso (ACT) y Teoría del Marco Relacional (RFT).

---

## ✨ Características Principales

### 📊 **Análisis Funcional Guiado**
- Preguntas estructuradas para identificar patrones conductuales
- Detección automática de clase funcional problemática
- Identificación de procesos de inflexibilidad psicológica

### 🧠 **Protocolos Incluidos**
- **TEPT** (Trauma Simple y Complejo) - Basado en Walser & Westrup (2007)
- **Ansiedad** (Fobias, Pánico, Social, TOC) - Basado en Springer & Tolin (2020)
- **Depresión** (Activación Conductual)
- **Inflexibilidad Psicológica** (Marco ACT-RFT general)
- **Regulación Emocional** (DBT Skills)

### 🎯 **Tres Estrategias RFT**
Sistema basado en Törneke et al. para generar:
1. Discriminación de clase funcional problemática
2. Enmarque en jerarquía (Yo-contexto)
3. Funciones augmenting apetitivas (valores)

### 📚 **Sistema Actualizable**
- Sube PDFs de libros/manuales clínicos
- Extracción automática de conocimiento
- Base de datos que crece con tu biblioteca

### 📄 **Exportación Profesional**
- Planes de tratamiento completos
- Ejercicios específicos por trastorno
- Metáforas y diálogos clínicos
- Referencias bibliográficas

---

## 🚀 Cómo Usar

### **Opción 1: Uso en Línea (GitHub Pages)**
Visita: [https://TU-USUARIO.github.io/fleximap](https://TU-USUARIO.github.io/fleximap)

La página detectará automáticamente si estás en móvil o desktop.

### **Opción 2: Instalación Local**

1. Clona el repositorio:
```bash
git clone https://github.com/TU-USUARIO/fleximap.git
cd fleximap
```

2. Abre `index.html` en tu navegador
   - **Móvil:** Se recomienda `mobile.html`
   - **Desktop:** Usa `desktop.html`

¡Eso es todo! No requiere instalación de dependencias.

## 📁 Estructura de Archivos

```
fleximap/
├── index.html          ← Página de entrada (auto-detecta dispositivo)
├── mobile.html         ← Versión móvil (recomendada para consulta)
├── mobile.js           ← Lógica móvil
├── desktop.html        ← Versión escritorio (análisis detallado)
├── desktop.js          ← Lógica escritorio
├── README.md           ← Este archivo
└── knowledge/          ← Base de conocimiento (opcional)
    └── fleximap_knowledge_base.md
```

---

## 📖 Guía de Uso

### **1. Intake Inicial**
- Ingresa motivo de consulta en palabras del cliente
- Selecciona tiempo desde evento desencadenante
- Marca intentos de solución previos
- Completa screening rápido de síntomas

### **2. Análisis Funcional**
- Describe 2-3 situaciones concretas recientes
- Para cada situación, documenta:
  - Pensamientos que aparecieron
  - Emociones y sensaciones físicas
  - Qué hizo el cliente
  - Consecuencias inmediatas y a largo plazo

### **3. Exploración de Valores**
- Identifica áreas de vida importantes
- Lista actividades abandonadas
- Documenta conductas actuales

### **4. Análisis Automático**
El sistema genera:
- ✅ Patrón funcional detectado
- ✅ Niveles de procesos de inflexibilidad
- ✅ Intervenciones priorizadas
- ✅ Plan RFT detallado con ejercicios

---

## 🎓 Base de Conocimiento

### **Incluida por Defecto:**

#### **TEPT y Trauma**
- **Fuente:** ACT for PTSD (Walser & Westrup, 2007)
- **Contenido:** 6 componentes ACT-TEPT, ejercicios específicos, diferencia con Exposición Prolongada

#### **Ansiedad y Exposición**
- **Fuente:** The Big Book of Exposures (Springer & Tolin, 2020)
- **Contenido:** 400+ exposiciones, jerarquías, ERP para TOC

#### **Procesos Conductuales**
- **Fuente:** Manual de Terapias Conductuales Contextuales (Ruiz Sánchez)
- **Contenido:** BA, Exposición, Regulación Emocional, PST

#### **Marco RFT**
- **Fuente:** RFT for Clinical Practice (Törneke et al.)
- **Contenido:** 3 estrategias para flexibilidad psicológica

---

## 🔧 Tecnologías

- **HTML5** - Estructura
- **CSS3** - Diseño responsive
- **JavaScript Vanilla** - Lógica de análisis
- **No requiere backend** - 100% cliente

---

## 📊 Casos de Uso

### **Caso 1: Infidelidad**
```
Input: "Mi esposo me fue infiel, no sé cómo seguir"
Output: 
- Patrón: Inflexibilidad psicológica con evitación experiencial
- Intervención: Defusión + Aceptación + Activación por valores
- Plan RFT: 3 estrategias personalizadas
```

### **Caso 2: TEPT por Asalto**
```
Input: "Fui asaltado hace 2 meses, tengo flashbacks"
Output:
- Patrón: TEPT simple con evitación masiva
- Intervención: ACT para TEPT (6 componentes)
- Plan RFT: Disposición + Yo-contexto + Valores
```

### **Caso 3: Fobia Social**
```
Input: "Me da pánico hablar en público"
Output:
- Patrón: Ansiedad social con evitación situacional
- Intervención: Exposición graduada + Experimentos conductuales
- Plan RFT: Disposición a ansiedad + Acción valiosa
```

---

## 🔄 Actualización del Sistema

### **Agregar Nuevo Conocimiento:**

1. Ve a la pestaña "📚 Base Conocimiento"
2. Arrastra tu PDF de libro/manual clínico
3. El sistema extrae automáticamente:
   - Criterios diagnósticos
   - Patrones funcionales
   - Intervenciones
   - Ejercicios y metáforas
4. ¡Listo! Disponible inmediatamente en análisis

---

## 🎯 Roadmap

### **Versión 2.1** (Próximamente)
- [ ] Exportación PDF real (jsPDF)
- [ ] Guardado de casos (localStorage)
- [ ] Comparación de múltiples casos
- [ ] Gráficos de progreso sesión a sesión

### **Versión 2.5** (Futuro)
- [ ] Backend opcional para equipos
- [ ] Plantillas de notas clínicas
- [ ] Integración con calendarios
- [ ] App móvil

---

## 📚 Referencias

### **Libros Base:**

1. Walser, R. D., & Westrup, D. (2007). *Acceptance and commitment therapy for the treatment of post-traumatic stress disorder and trauma-related problems*. New Harbinger.

2. Springer, K. S., & Tolin, D. F. (2020). *The big book of exposures: Innovative, creative & effective CBT-based exposures for treating anxiety-related disorders*. New Harbinger.

3. Ruiz Sánchez, J. J. *Manual de Terapias Conductuales Contextuales: Una exposición crítica descriptiva*.

4. Törneke, N., Luciano, C., Barnes-Holmes, Y., & Bond, F. W. *RFT for Clinical Practice: Tres Estrategias Esenciales*.

---

## 👨‍⚕️ Para Quién es FlexiMap

### **Ideal para:**
✅ Psicoterapeutas conductuales contextuales  
✅ Terapeutas ACT/RFT  
✅ Estudiantes de posgrado en psicología clínica  
✅ Supervisores clínicos  
✅ Investigadores en terapias contextuales  

### **No reemplaza:**
❌ Juicio clínico profesional  
❌ Supervisión clínica  
❌ Formación en ACT/RFT  

---

## 🤝 Contribuir

### **Formas de Contribuir:**

1. **Reportar Bugs:**
   - Abre un Issue describiendo el problema
   - Incluye pasos para reproducirlo

2. **Sugerir Mejoras:**
   - Abre un Issue con etiqueta "enhancement"
   - Describe la funcionalidad deseada

3. **Agregar Conocimiento:**
   - Fork del repositorio
   - Agrega recursos a `/knowledge`
   - Pull request

---

## 📄 Licencia

Este proyecto está bajo Licencia MIT - ver archivo [LICENSE](LICENSE) para detalles.

---

## ⚠️ Disclaimer Clínico

FlexiMap es una herramienta de apoyo a la conceptualización clínica. **No sustituye:**
- Evaluación clínica profesional
- Supervisión clínica adecuada
- Formación en ACT/RFT
- Criterio clínico del terapeuta

Siempre usar en conjunto con:
- Evaluación integral del caso
- Consideración de factores únicos del cliente
- Consulta con supervisor/colegas cuando sea necesario

---

## 📧 Contacto

**Creado con ❤️ para la comunidad de terapeutas conductuales contextuales**

¿Preguntas? ¿Sugerencias? ¿Colaboraciones?
- Abre un Issue en GitHub
- O contacta: [tu-email@ejemplo.com]

---

## 🌟 Agradecimientos

Este proyecto se inspira en el trabajo de:
- Steven Hayes (ACT)
- Robyn Walser (ACT para TEPT)
- David Tolin (Exposición para ansiedad)
- Niklas Törneke (RFT clínico)
- Juan José Ruiz Sánchez (Terapias contextuales en español)

Y en la comunidad global de terapeutas ACT-RFT que comparten conocimiento abiertamente.

---

**⭐ Si te resulta útil, dale una estrella al proyecto**
