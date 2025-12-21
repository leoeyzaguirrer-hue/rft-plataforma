/* ===================================
   LABORATORIO DEL HUMOR - animations.js
   Utilidades para animaciones
   =================================== */

const AnimationUtils = {
    // Animar scroll hacia un elemento
    scrollToElement: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },
    
    // Animar número contando
    animateNumber: (element, start, end, duration = 1000) => {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    },
    
    // Crear efecto de typing
    typeWriter: async (element, text, speed = 50) => {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await Utils.delay(speed);
        }
    },
    
    // Shake animation
    shake: (element, intensity = 5, duration = 500) => {
        const original = element.style.transform;
        let start = null;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            
            if (progress < duration) {
                const offset = Math.sin(progress / 50) * intensity;
                element.style.transform = `translateX(${offset}px)`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = original;
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    // Pulse animation
    pulse: (element, scale = 1.1, duration = 300) => {
        const original = element.style.transform;
        
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = original;
        }, duration);
    },
    
    // Stagger animation para múltiples elementos
    staggerAnimation: (elements, animationClass, delay = 100) => {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    },
    
    // Progress bar animation
    animateProgressBar: (bar, targetPercent, duration = 1000) => {
        let start = null;
        const startWidth = parseFloat(bar.style.width) || 0;
        const diff = targetPercent - startWidth;
        
        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            
            const currentPercent = startWidth + (diff * progress);
            bar.style.width = `${currentPercent}%`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
};

window.AnimationUtils = AnimationUtils;
