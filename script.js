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

function obtenerPrecedencia(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
}

function esOperador(token) {
    return ["+", "-", "*", "/"].includes(token);
}

function aplicarOperador(a, b, op) {
    if (op === "+") return sumar(a, b);
    if (op === "-") return restar(a, b);
    if (op === "*") return multiplicar(a, b);
    if (op === "/") return dividir(a, b);
}
