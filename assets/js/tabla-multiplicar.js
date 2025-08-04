// Función para generar tabla de multiplicar
function tablaMultiplicar(n, limite = 12) {
    if (!n || n <= 0) {
        throw new Error('Por favor, ingresa un número válido mayor que 0');
    }
    
    if (limite <= 0 || limite > 20) {
        throw new Error('El límite debe estar entre 1 y 20');
    }
    
    let tabla = [];
    
    for (let i = 1; i <= limite; i++) {
        tabla.push({
            multiplicador: i,
            operacion: `${n} × ${i}`,
            resultado: n * i,
            expresion: `${n} × ${i} = ${n * i}`
        });
    }
    
    return {
        numero: n,
        limite: limite,
        tabla: tabla,
        total: tabla.reduce((sum, item) => sum + item.resultado, 0)
    };
}

function generarTabla() {
    const numero = document.getElementById('numero').value;
    const limite = parseInt(document.getElementById('limite').value);
    const animacion = document.getElementById('mostrarAnimacion').checked;
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    const tablaDiv = document.getElementById('tabla-visual');
    
    // Validar entrada
    if (!numero || numero === '') {
        mostrarError('Por favor, ingresa un número válido');
        return;
    }
    
    const n = parseInt(numero);
    
    if (n <= 0) {
        mostrarError('El número debe ser mayor que 0');
        return;
    }
    
    try {
        const resultado = tablaMultiplicar(n, limite);
        
        // Mostrar información general
        contenidoDiv.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <h4 style="font-size: 2em; color: #667eea;">
                    Tabla del ${resultado.numero}
                </h4>
                <p style="font-size: 1.1em; color: #666;">
                    Multiplicaciones del 1 al ${resultado.limite}
                </p>
            </div>
        `;
        
        if (animacion) {
            mostrarTablaAnimada(resultado);
        } else {
            mostrarTablaCompleta(resultado);
        }
        
        resultadoDiv.classList.add('show');
        
    } catch (error) {
        mostrarError(error.message);
    }
}

function mostrarTablaCompleta(resultado) {
    const tablaDiv = document.getElementById('tabla-visual');
    
    let tablaHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
    `;
    
    resultado.tabla.forEach((item, index) => {
        tablaHTML += `
            <div class="multiplicacion-card" style="
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            ">
                <div style="font-size: 1.2em; margin-bottom: 5px;">
                    ${item.operacion}
                </div>
                <div style="font-size: 2em; font-weight: bold;">
                    ${item.resultado}
                </div>
            </div>
        `;
    });
    
    tablaHTML += '</div>';
    
    // Tabla tradicional
    tablaHTML += `
        <h4>Tabla tradicional:</h4>
        <table class="result-table" style="margin: 20px auto;">
            <thead>
                <tr>
                    <th>Multiplicación</th>
                    <th>Resultado</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    resultado.tabla.forEach(item => {
        tablaHTML += `
            <tr>
                <td style="text-align: center; font-weight: 500;">${item.operacion}</td>
                <td style="text-align: center; font-weight: bold; color: #667eea;">${item.resultado}</td>
            </tr>
        `;
    });
    
    tablaHTML += `
            </tbody>
        </table>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 10px;">
            <strong>Suma total de todos los resultados: ${resultado.total}</strong>
        </div>
    `;
    
    tablaDiv.innerHTML = tablaHTML;
}

let animacionActiva = false;

function mostrarTablaAnimada(resultado) {
    const tablaDiv = document.getElementById('tabla-visual');
    animacionActiva = true;
    
    tablaDiv.innerHTML = `
        <div id="animacion-container" style="text-align: center;">
            <div id="operacion-actual" style="
                font-size: 3em; 
                margin: 30px 0; 
                color: #667eea; 
                font-weight: bold;
                min-height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                Preparando...
            </div>
            <div id="progreso-animacion" style="margin: 20px 0;">
                <div style="background: #e9ecef; border-radius: 10px; height: 20px;">
                    <div id="barra-progreso-tabla" style="
                        background: linear-gradient(135deg, #667eea, #764ba2); 
                        height: 100%; 
                        border-radius: 10px; 
                        width: 0%; 
                        transition: width 0.5s ease;
                    "></div>
                </div>
                <div id="contador-progreso-tabla">0 de ${resultado.tabla.length}</div>
            </div>
            <div id="resultados-acumulados" style="
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); 
                gap: 10px; 
                margin-top: 20px;
            "></div>
        </div>
    `;
    
    let indice = 0;
    const intervalo = setInterval(() => {
        if (!animacionActiva || indice >= resultado.tabla.length) {
            finalizarAnimacion(resultado);
            clearInterval(intervalo);
            return;
        }
        
        const item = resultado.tabla[indice];
        const operacionDiv = document.getElementById('operacion-actual');
        const barraProgreso = document.getElementById('barra-progreso-tabla');
        const contadorProgreso = document.getElementById('contador-progreso-tabla');
        const resultadosDiv = document.getElementById('resultados-acumulados');
        
        // Animación de la operación actual
        operacionDiv.style.transform = 'scale(1.1)';
        operacionDiv.innerHTML = `${item.operacion} = ?`;
        
        setTimeout(() => {
            operacionDiv.innerHTML = `${item.operacion} = <span style="color: #28a745;">${item.resultado}</span>`;
            operacionDiv.style.transform = 'scale(1)';
            
            // Agregar resultado a la colección
            const resultadoCard = document.createElement('div');
            resultadoCard.style.cssText = `
                background: linear-gradient(135deg, #28a745, #20c997);
                color: white;
                padding: 10px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease;
            `;
            resultadoCard.innerHTML = `
                <div style="font-size: 0.9em;">${item.operacion}</div>
                <div style="font-size: 1.2em;">${item.resultado}</div>
            `;
            
            resultadosDiv.appendChild(resultadoCard);
            
            // Animar entrada
            setTimeout(() => {
                resultadoCard.style.opacity = '1';
                resultadoCard.style.transform = 'translateY(0)';
            }, 100);
            
        }, 800);
        
        // Actualizar progreso
        const progreso = ((indice + 1) / resultado.tabla.length) * 100;
        barraProgreso.style.width = `${progreso}%`;
        contadorProgreso.textContent = `${indice + 1} de ${resultado.tabla.length}`;
        
        indice++;
    }, 1500);
}

function finalizarAnimacion(resultado) {
    animacionActiva = false;
    
    setTimeout(() => {
        const operacionDiv = document.getElementById('operacion-actual');
        if (operacionDiv) {
            operacionDiv.innerHTML = `
                <div style="color: #28a745;">
                    🎉 ¡Tabla completada! 🎉
                </div>
            `;
        }
        
        // Mostrar tabla completa después de la animación
        setTimeout(() => {
            mostrarTablaCompleta(resultado);
        }, 2000);
    }, 500);
}

function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    const contenidoDiv = document.getElementById('contenido-resultado');
    
    contenidoDiv.innerHTML = `
        <div class="alert alert-error">
            <strong>Error:</strong> ${mensaje}
        </div>
    `;
    
    document.getElementById('tabla-visual').innerHTML = '';
    resultadoDiv.classList.add('show');
}

function limpiar() {
    animacionActiva = false;
    document.getElementById('numero').value = '';
    document.getElementById('resultado').classList.remove('show');
}

// Permitir generación con Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generarTabla();
    }
});

// Detener animación al salir
window.addEventListener('beforeunload', () => {
    animacionActiva = false;
});

// Agregar estilos para las animaciones
const style = document.createElement('style');
style.textContent = `
    .multiplicacion-card {
        animation: cardEntrada 0.5s ease forwards;
        opacity: 0;
        transform: translateY(20px);
    }
    
    @keyframes cardEntrada {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #operacion-actual {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);
