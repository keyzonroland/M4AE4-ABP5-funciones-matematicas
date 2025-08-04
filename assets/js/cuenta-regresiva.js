// Variables globales para controlar la cuenta regresiva
let intervaloCuenta = null;
let cuentaActiva = false;

// Función para generar cuenta regresiva
function cuentaRegresiva(n) {
    if (n <= 0 || n >= 100) {
        throw new Error('El número debe ser mayor que 0 y menor que 100');
    }
    
    let secuencia = [];
    for (let i = n; i >= 1; i--) {
        secuencia.push(i);
    }
    
    return secuencia;
}

function iniciarCuentaRegresiva() {
    const numero = document.getElementById('numero').value;
    const velocidad = parseInt(document.getElementById('velocidad').value);
    const resultadoDiv = document.getElementById('resultado');
    
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
    
    // Detener cuenta anterior si existe
    detenerCuenta();
    
    try {
        const secuencia = cuentaRegresiva(n);
        mostrarCuentaAnimada(secuencia, velocidad);
        resultadoDiv.classList.add('show');
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarCuentaAnimada(secuencia, velocidad) {
    const numeroActualDiv = document.getElementById('numero-actual');
    const secuenciaDiv = document.getElementById('secuencia-completa');
    const progresoDiv = document.getElementById('progreso');
    
    cuentaActiva = true;
    let indice = 0;
    
    // Configurar visualización inicial
    numeroActualDiv.innerHTML = `
        <div style="text-align: center; margin: 20px 0;">
            <div id="numero-grande" style="font-size: 4em; font-weight: bold; color: #667eea; margin-bottom: 10px;">
                ${secuencia[0]}
            </div>
            <div id="estado-cuenta" style="font-size: 1.2em; color: #666;">
                Iniciando cuenta regresiva...
            </div>
        </div>
    `;
    
    // Mostrar secuencia completa
    secuenciaDiv.innerHTML = '<h4>Secuencia completa:</h4>';
    const secuenciaContainer = document.createElement('div');
    secuenciaContainer.className = 'sequence-numbers';
    secuenciaContainer.id = 'secuencia-container';
    
    secuencia.forEach((num, idx) => {
        const span = document.createElement('span');
        span.className = 'sequence-number';
        span.id = `num-${idx}`;
        span.textContent = num;
        span.style.opacity = '0.3';
        secuenciaContainer.appendChild(span);
    });
    
    secuenciaDiv.appendChild(secuenciaContainer);
    
    // Barra de progreso
    progresoDiv.innerHTML = `
        <h4>Progreso:</h4>
        <div style="background: #e9ecef; border-radius: 10px; height: 20px; margin: 10px 0;">
            <div id="barra-progreso" style="background: #667eea; height: 100%; border-radius: 10px; width: 0%; transition: width 0.3s ease;"></div>
        </div>
        <div id="contador-progreso">0 de ${secuencia.length} completados</div>
    `;
    
    // Ejecutar animación
    intervaloCuenta = setInterval(() => {
        if (!cuentaActiva || indice >= secuencia.length) {
            finalizarCuenta(secuencia.length);
            return;
        }
        
        const numeroGrande = document.getElementById('numero-grande');
        const estadoCuenta = document.getElementById('estado-cuenta');
        const numActual = document.getElementById(`num-${indice}`);
        const barraProgreso = document.getElementById('barra-progreso');
        const contadorProgreso = document.getElementById('contador-progreso');
        
        // Actualizar número principal con animación
        numeroGrande.style.transform = 'scale(1.2)';
        numeroGrande.style.color = indice === secuencia.length - 1 ? '#dc3545' : '#667eea';
        setTimeout(() => {
            numeroGrande.style.transform = 'scale(1)';
        }, 200);
        
        numeroGrande.textContent = secuencia[indice];
        
        // Actualizar estado
        if (indice === secuencia.length - 1) {
            estadoCuenta.textContent = '¡Cuenta regresiva completada!';
            estadoCuenta.style.color = '#dc3545';
            estadoCuenta.style.fontWeight = 'bold';
        } else {
            estadoCuenta.textContent = `Siguiente: ${secuencia[indice + 1]}`;
        }
        
        // Resaltar número en secuencia
        if (numActual) {
            numActual.style.opacity = '1';
            numActual.style.background = '#28a745';
            numActual.style.transform = 'scale(1.1)';
            setTimeout(() => {
                numActual.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Actualizar progreso
        const progreso = ((indice + 1) / secuencia.length) * 100;
        barraProgreso.style.width = `${progreso}%`;
        contadorProgreso.textContent = `${indice + 1} de ${secuencia.length} completados`;
        
        indice++;
    }, velocidad);
}

function finalizarCuenta(total) {
    detenerCuenta();
    
    const estadoCuenta = document.getElementById('estado-cuenta');
    if (estadoCuenta) {
        estadoCuenta.innerHTML = `
            <div style="color: #28a745; font-weight: bold; font-size: 1.3em;">
                🎉 ¡Cuenta regresiva finalizada! 🎉
            </div>
        `;
    }
    
    // Mostrar mensaje de finalización
    setTimeout(() => {
        const numeroGrande = document.getElementById('numero-grande');
        if (numeroGrande) {
            numeroGrande.innerHTML = `
                <div style="color: #28a745;">
                    ✅ FINALIZADO
                </div>
            `;
        }
    }, 1000);
}

function detenerCuenta() {
    if (intervaloCuenta) {
        clearInterval(intervaloCuenta);
        intervaloCuenta = null;
    }
    cuentaActiva = false;
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const numeroActualDiv = document.getElementById('numero-actual');
    
    numeroActualDiv.innerHTML = `
        <div class="alert alert-error">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
    
    document.getElementById('secuencia-completa').innerHTML = '';
    document.getElementById('progreso').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    detenerCuenta();
    document.getElementById('numero').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir inicio con Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        iniciarCuentaRegresiva();
    }
});

// Detener cuenta al salir de la página
window.addEventListener('beforeunload', detenerCuenta);

// Agregar estilos adicionales para las animaciones
const style = document.createElement('style');
style.textContent = `
    #numero-grande {
        transition: all 0.3s ease;
    }
    
    .sequence-number {
        transition: all 0.3s ease;
    }
    
    #barra-progreso {
        transition: width 0.3s ease;
    }
    
    @keyframes pulso {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
