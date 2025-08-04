// Función para calcular la sumatoria de 1 hasta n
function sumatoria(n) {
    if (n <= 0 || n >= 100) {
        throw new Error('El número debe ser mayor que 0 y menor que 100');
    }
    
    let suma = 0;
    let secuencia = [];
    
    for (let i = 1; i <= n; i++) {
        suma += i;
        secuencia.push(i);
    }
    
    return {
        suma: suma,
        secuencia: secuencia,
        formula: `${n} × (${n} + 1) ÷ 2 = ${(n * (n + 1)) / 2}`
    };
}

function calcularSumatoria() {
    const numero = document.getElementById('numero').value;
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    const secuenciaDiv = document.getElementById('secuencia-numeros');
    
    // Validar entrada
    if (!numero || numero === '') {
        mostrarError('Por favor, ingresa un número válido');
        return;
    }
    
    const n = parseInt(numero);
    
    if (n <= 0 || n >= 100) {
        mostrarError('El número debe ser mayor que 0 y menor que 100');
        return;
    }
    
    try {
        const resultado = sumatoria(n);
        
        contenidoDiv.innerHTML = `
            <h4>Sumatoria de 1 hasta ${n}:</h4>
            <p><strong>Resultado:</strong> ${resultado.suma}</p>
            <p><strong>Fórmula:</strong> ${resultado.formula}</p>
            <p><strong>Verificación:</strong> ${resultado.secuencia.join(' + ')} = ${resultado.suma}</p>
        `;
        
        // Mostrar secuencia visual
        secuenciaDiv.innerHTML = '<h4>Secuencia de números:</h4>';
        const secuenciaContainer = document.createElement('div');
        secuenciaContainer.className = 'sequence-numbers';
        
        resultado.secuencia.forEach((num, index) => {
            const span = document.createElement('span');
            span.className = 'sequence-number';
            span.textContent = num;
            span.style.animationDelay = `${index * 0.1}s`;
            secuenciaContainer.appendChild(span);
        });
        
        secuenciaDiv.appendChild(secuenciaContainer);
        resultadoDiv.classList.add('show');
        
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    
    contenidoDiv.innerHTML = `
        <div class="alert alert-error">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
    
    document.getElementById('secuencia-numeros').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    document.getElementById('numero').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir cálculo con Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcularSumatoria();
    }
});

// Agregar animación CSS para los números
const style = document.createElement('style');
style.textContent = `
    .sequence-number {
        animation: numberFadeIn 0.5s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes numberFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
