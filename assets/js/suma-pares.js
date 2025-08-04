// Función para calcular la suma de números pares en un rango
function sumaPares(n, inicio = 1) {
    if (n <= 10 || n >= 1000) {
        throw new Error('El número debe ser mayor que 10 y menor que 1000');
    }
    
    if (inicio < 1 || inicio >= n) {
        throw new Error('El inicio del rango debe ser mayor que 0 y menor que n');
    }
    
    let suma = 0;
    let pares = [];
    let impares = [];
    
    for (let i = inicio; i <= n; i++) {
        if (i % 2 === 0) {
            suma += i;
            pares.push(i);
        } else {
            impares.push(i);
        }
    }
    
    return {
        suma: suma,
        pares: pares,
        impares: impares,
        rango: { inicio, fin: n },
        cantidadPares: pares.length,
        cantidadImpares: impares.length,
        promedioPares: pares.length > 0 ? (suma / pares.length).toFixed(2) : 0
    };
}

function calcularSumaPares() {
    const numero = document.getElementById('numero').value;
    const rangoInicio = document.getElementById('rangoInicio').value;
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    const paresDiv = document.getElementById('numeros-pares');
    const estadisticasDiv = document.getElementById('estadisticas');
    
    // Validar entrada
    if (!numero || numero === '') {
        mostrarError('Por favor, ingresa un número válido');
        return;
    }
    
    const n = parseInt(numero);
    const inicio = rangoInicio ? parseInt(rangoInicio) : 1;
    
    if (n <= 10 || n >= 1000) {
        mostrarError('El número debe ser mayor que 10 y menor que 1000');
        return;
    }
    
    if (inicio >= n) {
        mostrarError('El inicio del rango debe ser menor que n');
        return;
    }
    
    try {
        const resultado = sumaPares(n, inicio);
        
        // Mostrar resultado principal
        contenidoDiv.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h4 style="font-size: 2em; color: #28a745;">
                    Suma total: ${resultado.suma}
                </h4>
                <p style="font-size: 1.1em;">
                    Suma de números pares del ${resultado.rango.inicio} al ${resultado.rango.fin}
                </p>
                <p><strong>Fórmula:</strong> ${resultado.pares.join(' + ')} = ${resultado.suma}</p>
            </div>
        `;
        
        // Mostrar números pares y estadísticas
        if (resultado.pares.length > 0) {
            paresDiv.innerHTML = `
                <h4>Números pares encontrados (${resultado.cantidadPares}):</h4>
                <div class="array-visual" id="pares-container"></div>
                <h4 style="margin-top: 20px;">Números impares en el rango (${resultado.cantidadImpares}):</h4>
                <div class="array-visual" id="impares-container"></div>
            `;
            
            // Mostrar pares con animación
            const paresContainer = document.getElementById('pares-container');
            resultado.pares.forEach((num, index) => {
                const span = document.createElement('span');
                span.className = 'array-item';
                span.textContent = num;
                span.style.background = '#28a745';
                span.style.animationDelay = `${index * 0.05}s`;
                paresContainer.appendChild(span);
            });
            
            // Mostrar impares (solo primeros 20 para evitar saturación)
            const imparesContainer = document.getElementById('impares-container');
            const imparesToShow = resultado.impares.slice(0, 20);
            const hayMasImpares = resultado.impares.length > 20;
            
            imparesToShow.forEach((num, index) => {
                const span = document.createElement('span');
                span.className = 'array-item';
                span.textContent = num;
                span.style.background = '#6c757d';
                span.style.animationDelay = `${index * 0.05}s`;
                imparesContainer.appendChild(span);
            });
            
            if (hayMasImpares) {
                const masSpan = document.createElement('span');
                masSpan.className = 'array-item';
                masSpan.textContent = `... +${resultado.impares.length - 20} más`;
                masSpan.style.background = '#6c757d';
                masSpan.style.fontSize = '0.9em';
                imparesContainer.appendChild(masSpan);
            }
        } else {
            paresDiv.innerHTML = `
                <div class="alert alert-info">
                    No se encontraron números pares en el rango del ${inicio} al ${n}.
                </div>
            `;
        }
        
        // Mostrar estadísticas
        estadisticasDiv.innerHTML = `
            <h4>Estadísticas:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #28a745;">${resultado.cantidadPares}</strong><br>
                    <small>Números pares</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #6c757d;">${resultado.cantidadImpares}</strong><br>
                    <small>Números impares</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #667eea;">${resultado.promedioPares}</strong><br>
                    <small>Promedio de pares</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #17a2b8;">${n - inicio + 1}</strong><br>
                    <small>Total de números</small>
                </div>
            </div>
            
            <div style="margin-top: 20px;">
                <h5>Análisis adicional:</h5>
                <ul style="margin-left: 20px;">
                    <li>Rango analizado: ${inicio} - ${n} (${n - inicio + 1} números)</li>
                    <li>Porcentaje de pares: ${((resultado.cantidadPares / (n - inicio + 1)) * 100).toFixed(1)}%</li>
                    <li>Porcentaje de impares: ${((resultado.cantidadImpares / (n - inicio + 1)) * 100).toFixed(1)}%</li>
                    <li>Menor número par: ${resultado.pares.length > 0 ? resultado.pares[0] : 'N/A'}</li>
                    <li>Mayor número par: ${resultado.pares.length > 0 ? resultado.pares[resultado.pares.length - 1] : 'N/A'}</li>
                </ul>
            </div>
        `;
        
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
    
    document.getElementById('numeros-pares').innerHTML = '';
    document.getElementById('estadisticas').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    document.getElementById('numero').value = '';
    document.getElementById('rangoInicio').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir cálculo con Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcularSumaPares();
    }
});

document.getElementById('rangoInicio').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcularSumaPares();
    }
});

// Agregar animación para los elementos
const style = document.createElement('style');
style.textContent = `
    .array-item {
        animation: aparecer 0.3s ease forwards;
        opacity: 0;
        transform: translateY(10px);
    }
    
    @keyframes aparecer {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
