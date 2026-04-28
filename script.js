document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementsByTagName("canvas")[0];

  if (!canvas) alert("No se encontró el canvas para el fondo de Matrix");
  matrix(canvas, {
    chars: ["0", "1"],
    font_size: 16,
  });
});

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
  if (b === 0) return "Err";
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

function aPostfija(expr) {
  const precedencia = {
    "(": 4,
    ")": 4,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2,
  };

  console.debug("Converting to postfix:", expr);
  const operatorsStack = [];
  const out = [];

  let hasParenthesesOpen = false;

  let buffer = "";
  while (expr.length > 0) {
    const char = expr[0];
    expr = expr.slice(1);

    if (/\s/.test(char)) continue; // Ignorar espacios

    // * Verificacion de Numeros
    console.debug("Processing char:", char, "Buffer:", buffer);
    if (/\d/.test(char))
      buffer += char; // Acumular dígitos
    else {
      if (buffer.length > 0) out.push(Number(buffer)); // Sacar el número acumulado
      buffer = ""; // Reiniciar el buffer
    }

    // * Verificacion de Operadores y Parentesis
    if (char === "(") {
      operatorsStack.push(char);
      hasParenthesesOpen = true;
    } else if (char === ")") {
      if (!hasParenthesesOpen) alert("Err");

      // Sacar operadores hasta encontrar el "("
      while (
        operatorsStack.length > 0 &&
        operatorsStack[operatorsStack.length - 1] !== "("
      ) {
        out.push(operatorsStack.pop());
      }

      if (operatorsStack.length > 0) operatorsStack.pop(); // Quitar el "("
      hasParenthesesOpen = false;
    } else if (esOperador(char)) {
      if (
        operatorsStack.length === 0 ||
        operatorsStack[operatorsStack.length - 1] === "("
      ) {
        operatorsStack.push(char);
        continue;
      }

      const shouldPush =
        obtenerPrecedencia(operatorsStack[operatorsStack.length - 1]) >=
        obtenerPrecedencia(char);

      if (shouldPush) {
        out.push(operatorsStack.pop());
        operatorsStack.push(char);
      } else operatorsStack.push(char);
    }
  }

  if (buffer.length > 0) out.push(Number(buffer)); // Sacar cualquier número restante

  // Sacar cualquier operador restante
  while (operatorsStack.length > 0) {
    const op = operatorsStack.pop();
    if (op === "(" || op === ")") {
      alert("Err");
      return [];
    }
    out.push(op);
  }

  console.log(out);
  return out;
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
  console.log("Obtained tokens:", tokens);
  const resultadoFinal = evaluarPostfija(tokens);

  if (typeof resultadoFinal === "string") {
    pantalla.textContent = resultadoFinal;
    entradaActual = "";
    resultado = 0;
  } else {
    mostrarResultado(resultadoFinal);
  }
}
