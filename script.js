let resultado = 0;
const pantalla = document.getElementById("result");
let entradaActual = "";

function mostrarResultado(valor) {
    resultado = valor;
    pantalla.textContent = valor;
    entradaActual = String(valor);
}

function agregarAPantalla(valor) {
    entradaActual += valor;
    pantalla.textContent = entradaActual;
}

function limpiarPantalla() {
    entradaActual = "";
    resultado = 0;
    pantalla.textContent = "0.0";
}

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) return "Error: No se puede dividir por cero";
    return a / b;
}

