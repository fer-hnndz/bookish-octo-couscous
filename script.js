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

function aPostfija(expresion) {
    //TO DO
    const salida = [];
    return salida;
}

function evaluarPostfija(tokens) {
    const pilaEvaluacion = [];

    for (const token of tokens) {
        if (typeof token === "number") {
            pilaEvaluacion.push(token);
        } else if (esOperador(token)) {
            const b = pilaEvaluacion.pop();
            const a = pilaEvaluacion.pop();
            const parcial = aplicarOperador(a, b, token);
            if (typeof parcial === "string") return parcial;
            pilaEvaluacion.push(parcial);
        }
    }

    return pilaEvaluacion[0];
}

function calcular() {
    if (entradaActual === "") return;

    const tokens = aPostfija(entradaActual);
    const resultadoFinal = evaluarPostfija(tokens);

    if (typeof resultadoFinal === "string") {
        pantalla.textContent = resultadoFinal;
        entradaActual = "";
        resultado = 0;
    } else {
        mostrarResultado(resultadoFinal);
    }
}
