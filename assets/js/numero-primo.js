// Función para verificar si un número es primo
function esPrimo(n) {
    if (n <= 1) {
        return {
            esPrimo: false,
            razon: 'Los números menores o iguales a 1 no son considerados primos',
            divisores: []
        };
    }
    
    if (n === 2) {
        return {
            esPrimo: true,
            razon: '2 es el único número primo par',
            divisores: [1, 2]
        };
    }
    
    if (n % 2 === 0) {
        return {
            esPrimo: false,
            razon: 'Es divisible por 2 (número par)',
            divisores: [1, 2, n]
        };
    }
    
    let divisores = [1];
    let esPrimoResult = true;
    
    // Verificar divisibilidad hasta la raíz cuadrada del número
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
            divisores.push(i);
            if (i !== n / i) {
                divisores.push(n / i);
            }
            esPrimoResult = false;
        }
    }
    
    divisores.push(n);
    divisores.sort((a, b) => a - b);
    
    return {
        esPrimo: esPrimoResult,
        razon: esPrimoResult ? 
            'Solo es divisible por 1 y por sí mismo' : 
            `Es divisible por otros números además de 1 y ${n}`,
        divisores: divisores
    };
}

function verificarPrimo() {
    const numero = document.getElementById('numero').value;
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    const procesoDiv = document.getElementById('proceso-verificacion');
    
    // Validar entrada
    if (!numero || numero === '') {
        mostrarError('Por favor, ingresa un número válido');
        return;
    }
    
    const n = parseInt(numero);
    
    if (n < 1) {
        mostrarError('Por favor, ingresa un número mayor que 0');
        return;
    }
    
    const resultado = esPrimo(n);
    
    // Mostrar resultado principal
    contenidoDiv.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h4 style="font-size: 2em; color: ${resultado.esPrimo ? '#28a745' : '#dc3545'};">
                ${n} ${resultado.esPrimo ? 'ES PRIMO' : 'NO ES PRIMO'}
            </h4>
            <p style="font-size: 1.1em; margin: 10px 0;">
                <strong>Razón:</strong> ${resultado.razon}
            </p>
        </div>
    `;
    
    // Mostrar proceso de verificación
    let procesoHTML = '<h4>Proceso de verificación:</h4>';
    
    if (n <= 1) {
        procesoHTML += '<p>Los números menores o iguales a 1 no son considerados primos por definición.</p>';
    } else if (n === 2) {
        procesoHTML += '<p>El número 2 es primo porque es el único número primo par.</p>';
    } else {
        procesoHTML += `
            <p><strong>Divisores encontrados:</strong> ${resultado.divisores.join(', ')}</p>
            <p><strong>Cantidad de divisores:</strong> ${resultado.divisores.length}</p>
        `;
        
        if (resultado.esPrimo) {
            procesoHTML += `
                <p>✅ ${n} tiene exactamente 2 divisores (1 y ${n}), por lo tanto ES PRIMO.</p>
            `;
        } else {
            procesoHTML += `
                <p>❌ ${n} tiene ${resultado.divisores.length} divisores, por lo tanto NO ES PRIMO.</p>
            `;
        }
        
        // Mostrar tabla de verificación para números pequeños
        if (n <= 100) {
            procesoHTML += '<h5>Verificación paso a paso:</h5>';
            procesoHTML += '<table class="result-table"><thead><tr><th>Divisor</th><th>¿Divide exactamente?</th><th>Resultado</th></tr></thead><tbody>';
            
            for (let i = 2; i < n; i++) {
                if (i > Math.sqrt(n) && resultado.esPrimo) break;
                const divide = n % i === 0;
                procesoHTML += `
                    <tr style="background-color: ${divide ? '#ffebee' : '#e8f5e8'};">
                        <td>${i}</td>
                        <td>${divide ? 'Sí' : 'No'}</td>
                        <td>${n} ÷ ${i} = ${divide ? (n/i) : (n/i).toFixed(2)}</td>
                    </tr>
                `;
                if (divide && !resultado.esPrimo) break; // Solo mostrar hasta encontrar el primer divisor
            }
            procesoHTML += '</tbody></table>';
        }
    }
    
    procesoDiv.innerHTML = procesoHTML;
    resultadoDiv.classList.add('show');
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    
    contenidoDiv.innerHTML = `
        <div class="alert alert-error">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
    
    document.getElementById('proceso-verificacion').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    document.getElementById('numero').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir verificación con Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        verificarPrimo();
    }
});

// Función auxiliar para generar ejemplos de números primos
function mostrarEjemplosPrimos() {
    const primos = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    console.log('Primeros 15 números primos:', primos);
}
