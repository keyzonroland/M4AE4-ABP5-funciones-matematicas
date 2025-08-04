// Funciones de ordenamiento

// Ordenamiento Burbuja
function ordenamientoBurbuja(arr) {
    let pasos = [];
    let arreglo = [...arr];
    let n = arreglo.length;
    let intercambios = 0;
    let comparaciones = 0;
    
    for (let i = 0; i < n - 1; i++) {
        let huboCambio = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            comparaciones++;
            
            if (arreglo[j] > arreglo[j + 1]) {
                // Intercambiar
                [arreglo[j], arreglo[j + 1]] = [arreglo[j + 1], arreglo[j]];
                intercambios++;
                huboCambio = true;
                
                pasos.push({
                    paso: pasos.length + 1,
                    accion: `Intercambiar ${arreglo[j + 1]} y ${arreglo[j]}`,
                    arreglo: [...arreglo],
                    indices: [j, j + 1]
                });
            }
        }
        
        if (!huboCambio) break; // Si no hubo cambios, está ordenado
    }
    
    return {
        arregloOrdenado: arreglo,
        pasos: pasos,
        estadisticas: {
            comparaciones,
            intercambios,
            algoritmo: 'Ordenamiento Burbuja'
        }
    };
}

// Ordenamiento por Selección
function ordenamientoSeleccion(arr) {
    let pasos = [];
    let arreglo = [...arr];
    let n = arreglo.length;
    let intercambios = 0;
    let comparaciones = 0;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        for (let j = i + 1; j < n; j++) {
            comparaciones++;
            if (arreglo[j] < arreglo[minIndex]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [arreglo[i], arreglo[minIndex]] = [arreglo[minIndex], arreglo[i]];
            intercambios++;
            
            pasos.push({
                paso: pasos.length + 1,
                accion: `Intercambiar ${arreglo[minIndex]} (pos ${i}) con ${arreglo[i]} (pos ${minIndex})`,
                arreglo: [...arreglo],
                indices: [i, minIndex]
            });
        }
    }
    
    return {
        arregloOrdenado: arreglo,
        pasos: pasos,
        estadisticas: {
            comparaciones,
            intercambios,
            algoritmo: 'Ordenamiento por Selección'
        }
    };
}

// Ordenamiento por Inserción
function ordenamientoInsercion(arr) {
    let pasos = [];
    let arreglo = [...arr];
    let n = arreglo.length;
    let movimientos = 0;
    let comparaciones = 0;
    
    for (let i = 1; i < n; i++) {
        let key = arreglo[i];
        let j = i - 1;
        
        while (j >= 0 && arreglo[j] > key) {
            comparaciones++;
            arreglo[j + 1] = arreglo[j];
            j--;
            movimientos++;
        }
        
        if (j >= 0) comparaciones++; // Última comparación
        
        if (j + 1 !== i) {
            arreglo[j + 1] = key;
            
            pasos.push({
                paso: pasos.length + 1,
                accion: `Insertar ${key} en posición ${j + 1}`,
                arreglo: [...arreglo],
                indices: [j + 1]
            });
        }
    }
    
    return {
        arregloOrdenado: arreglo,
        pasos: pasos,
        estadisticas: {
            comparaciones,
            intercambios: movimientos,
            algoritmo: 'Ordenamiento por Inserción'
        }
    };
}

// Ordenamiento nativo de JavaScript
function ordenamientoNativo(arr) {
    const inicio = performance.now();
    const arregloOrdenado = [...arr].sort((a, b) => a - b);
    const fin = performance.now();
    
    return {
        arregloOrdenado: arregloOrdenado,
        pasos: [],
        estadisticas: {
            comparaciones: 'N/A (optimizado)',
            intercambios: 'N/A (optimizado)',
            algoritmo: 'Ordenamiento Nativo (JavaScript)',
            tiempo: `${(fin - inicio).toFixed(4)} ms`
        }
    };
}

function parsearNumeros(texto) {
    if (!texto || texto.trim() === '') {
        throw new Error('Por favor, ingresa algunos números');
    }
    
    // Reemplazar diferentes separadores por comas
    let textoLimpio = texto
        .replace(/[;|\s]+/g, ',')  // Reemplazar ; y espacios por comas
        .replace(/,+/g, ',')       // Reemplazar múltiples comas por una
        .replace(/^,|,$/g, '');    // Quitar comas al inicio y final
    
    let numeros = textoLimpio.split(',').map(num => {
        const numero = parseFloat(num.trim());
        if (isNaN(numero)) {
            throw new Error(`"${num.trim()}" no es un número válido`);
        }
        return numero;
    });
    
    if (numeros.length === 0) {
        throw new Error('No se encontraron números válidos');
    }
    
    if (numeros.length > 50) {
        throw new Error('Máximo 50 números permitidos');
    }
    
    return numeros;
}

function ordenarArreglo() {
    const texto = document.getElementById('numeros').value;
    const algoritmo = document.getElementById('algoritmo').value;
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    const procesoDiv = document.getElementById('proceso-visual');
    const comparacionDiv = document.getElementById('comparacion');
    
    try {
        const numerosOriginales = parsearNumeros(texto);
        const inicio = performance.now();
        
        let resultado;
        switch (algoritmo) {
            case 'burbuja':
                resultado = ordenamientoBurbuja(numerosOriginales);
                break;
            case 'seleccion':
                resultado = ordenamientoSeleccion(numerosOriginales);
                break;
            case 'insercion':
                resultado = ordenamientoInsercion(numerosOriginales);
                break;
            case 'nativo':
            default:
                resultado = ordenamientoNativo(numerosOriginales);
                break;
        }
        
        const fin = performance.now();
        const tiempoTotal = (fin - inicio).toFixed(4);
        
        // Mostrar resultado principal
        contenidoDiv.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #667eea; margin-bottom: 15px;">
                    ${resultado.estadisticas.algoritmo}
                </h4>
                <div style="margin-bottom: 15px;">
                    <strong>Tiempo de ejecución:</strong> ${resultado.estadisticas.tiempo || tiempoTotal + ' ms'}
                </div>
            </div>
        `;
        
        // Mostrar comparación visual
        comparacionDiv.innerHTML = `
            <h4>Comparación:</h4>
            <div style="margin: 20px 0;">
                <h5 style="color: #dc3545;">Arreglo Original:</h5>
                <div class="array-visual" id="array-original"></div>
            </div>
            <div style="margin: 20px 0;">
                <h5 style="color: #28a745;">Arreglo Ordenado:</h5>
                <div class="array-visual" id="array-ordenado"></div>
            </div>
        `;
        
        // Mostrar arreglo original
        const arrayOriginal = document.getElementById('array-original');
        numerosOriginales.forEach((num, index) => {
            const span = document.createElement('span');
            span.className = 'array-item';
            span.textContent = num;
            span.style.background = '#dc3545';
            span.style.animationDelay = `${index * 0.05}s`;
            arrayOriginal.appendChild(span);
        });
        
        // Mostrar arreglo ordenado
        const arrayOrdenado = document.getElementById('array-ordenado');
        resultado.arregloOrdenado.forEach((num, index) => {
            const span = document.createElement('span');
            span.className = 'array-item sorted';
            span.textContent = num;
            span.style.animationDelay = `${index * 0.05}s`;
            arrayOrdenado.appendChild(span);
        });
        
        // Mostrar estadísticas y pasos (si los hay)
        let procesoHTML = `
            <h4>Estadísticas:</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0;">
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #667eea;">${numerosOriginales.length}</strong><br>
                    <small>Elementos</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #28a745;">${resultado.estadisticas.comparaciones}</strong><br>
                    <small>Comparaciones</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #ffc107;">${resultado.estadisticas.intercambios}</strong><br>
                    <small>Intercambios</small>
                </div>
                <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; text-align: center;">
                    <strong style="color: #17a2b8;">${resultado.estadisticas.tiempo || tiempoTotal + ' ms'}</strong><br>
                    <small>Tiempo</small>
                </div>
            </div>
        `;
        
        if (resultado.pasos.length > 0 && resultado.pasos.length <= 20) {
            procesoHTML += `
                <h4>Pasos del algoritmo:</h4>
                <div style="max-height: 300px; overflow-y: auto; margin-top: 15px;">
            `;
            
            resultado.pasos.forEach((paso, index) => {
                procesoHTML += `
                    <div style="
                        background: ${index % 2 === 0 ? '#f8f9fa' : '#ffffff'};
                        padding: 10px;
                        margin: 5px 0;
                        border-radius: 5px;
                        border-left: 3px solid #667eea;
                    ">
                        <strong>Paso ${paso.paso}:</strong> ${paso.accion}<br>
                        <small style="color: #666;">Resultado: [${paso.arreglo.join(', ')}]</small>
                    </div>
                `;
            });
            
            procesoHTML += '</div>';
        } else if (resultado.pasos.length > 20) {
            procesoHTML += `
                <div class="alert alert-info">
                    <strong>Información:</strong> El algoritmo realizó ${resultado.pasos.length} pasos. 
                    Solo se muestran las estadísticas para evitar saturar la pantalla.
                </div>
            `;
        }
        
        procesoDiv.innerHTML = procesoHTML;
        resultadoDiv.classList.add('show');
        
    } catch (error) {
        mostrarError(error.message);
    }
}

function generarAleatorio() {
    const cantidad = Math.floor(Math.random() * 15) + 5; // Entre 5 y 20 números
    let numeros = [];
    
    for (let i = 0; i < cantidad; i++) {
        numeros.push(Math.floor(Math.random() * 100) + 1); // Números del 1 al 100
    }
    
    document.getElementById('numeros').value = numeros.join(', ');
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    
    contenidoDiv.innerHTML = `
        <div class="alert alert-error">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
    
    document.getElementById('proceso-visual').innerHTML = '';
    document.getElementById('comparacion').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    document.getElementById('numeros').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir ordenamiento con Ctrl+Enter
document.getElementById('numeros').addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        ordenarArreglo();
    }
});

// Generar ejemplo inicial
window.addEventListener('load', function() {
    document.getElementById('numeros').value = '64, 34, 25, 12, 22, 11, 90, 5, 77, 30';
});

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    .array-item {
        animation: itemEntrada 0.3s ease forwards;
        opacity: 0;
        transform: translateY(10px);
    }
    
    .array-item.sorted {
        animation: itemOrdenado 0.5s ease forwards;
    }
    
    @keyframes itemEntrada {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes itemOrdenado {
        0% { 
            opacity: 0; 
            transform: translateY(10px) scale(0.8); 
        }
        50% { 
            transform: translateY(0) scale(1.1); 
        }
        100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
    }
`;
document.head.appendChild(style);
