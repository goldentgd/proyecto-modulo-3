"use strict";

function obtenerMinusculaAleatoria() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function obtenerMayusculaAleatoria() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function obtenerNumeroAleatorio() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function obtenerSimboloAleatorio() {
	let simbolos = "!@#$%{}_-[]";
	return simbolos[Math.floor(Math.random() * simbolos.length)];
}

let funcionesAleatorias = {
	minuscula: obtenerMinusculaAleatoria,
	mayuscula: obtenerMayusculaAleatoria,
	numero: obtenerNumeroAleatorio,
	simbolo: obtenerSimboloAleatorio,
};

// Evento al hacer clic en el botón de generar
let generar = document.getElementById("botonGenerar");
generar.addEventListener("click", () => {
	manejarGeneracionContraseña();
});

let manejarGeneracionContraseña = () => {
	let longitud = document.getElementById("longitudContrasena").value;
	let incluirMayuscula = document.getElementById("incluirMayusculas").checked;
	let incluirMinuscula = document.getElementById("incluirMinusculas").checked;
	let incluirNumero = document.getElementById("incluirNumeros").checked;
	let incluirSimbolo = document.getElementById("incluirSimbolos").checked;
	let resultado = document.getElementById("resultadoContrasena");
    let fuerza = evaluarFuerzaContraseña(resultado.value);


	resultado.value = generarContraseña(
		incluirMinuscula,
		incluirMayuscula,
		incluirNumero,
		incluirSimbolo,
		longitud,
		fuerza
	);
};
document.getElementById("btnCopiar").addEventListener("click", () => {
	let textarea = document.getElementById("resultadoContrasena");
	if (textarea.value) {
		navigator.clipboard.writeText(textarea.value)
			.then(() => {
				Alert("Contraseña copiada 📋");
			})
			.catch(() => {
				Alert("No se pudo copiar 😢");
			});
	} else {
		Alert("No hay contraseña para copiar ⚠️");
	}
});

function evaluarFuerzaContraseña(contraseña) {
	let nivelTexto = document.getElementById("nivelFuerzaTexto");
	let barras = [
		document.getElementById("barra1"),
		document.getElementById("barra2"),
		document.getElementById("barra3"),
		document.getElementById("barra4")
	];

	let fuerza = 0;
	if (contraseña.length >= 8) fuerza++;
	if (/[A-Z]/.test(contraseña)) fuerza++;
	if (/[a-z]/.test(contraseña)) fuerza++;
	if (/[0-9]/.test(contraseña)) fuerza++;
	if (/[^A-Za-z0-9]/.test(contraseña)) fuerza++;

	let nivel = Math.min(fuerza, 4);

	let texto = "-";
	let clase = "";

	if (nivel <= 1) {
		texto = "Débil";
		clase = "debil";
	} else if (nivel === 2) {
		texto = "Media";
		clase = "media";
	} else if (nivel === 3) {
		texto = "Difícil";
		clase = "dificil";
	} else if (nivel === 4) {
		texto = "Robusta";
		clase = "robusta";
	}

	nivelTexto.textContent = texto;

	barras.forEach((barra, index) => {
		barra.className = "barra"; // Reset
		if (index < nivel) {
			barra.classList.add("activa", clase);
		}
	});
}

// Función para generar la contraseña
function generarContraseña(minuscula, mayuscula, numero, simbolo, longitud) {
	let contraseñaGenerada = "";
	let tiposSeleccionados = minuscula + mayuscula + numero + simbolo;
	if(tiposSeleccionados === 0) {
		alert("Selecciona una opción para poder generar una contraseña");
		return "";
	}
	let tiposArr = [
		{ minuscula },
		{ mayuscula },
		{ numero },
		{ simbolo }
	].filter((item) => Object.values(item)[0]);
	debugger;
	for (let i = 0; i < longitud; i += tiposSeleccionados) {
		tiposArr.forEach((tipo) => {
			let nombreFuncion = Object.keys(tipo)[0];
			contraseñaGenerada += funcionesAleatorias[nombreFuncion]();
		});
	}
	let contraseñaFinal = contraseñaGenerada.slice(0, longitud);
	return contraseñaFinal;
}
let inputLongitud = document.getElementById("longitudContrasena");
let valorLongitud = document.getElementById("valorLongitud");

inputLongitud.addEventListener("input", () => {
	valorLongitud.textContent = inputLongitud.value;
});

// Inicializar al cargar
valorLongitud.textContent = inputLongitud.value;
