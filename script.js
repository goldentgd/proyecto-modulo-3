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
	const simbolos = "!@#$%{}_-[]";
	return simbolos[Math.floor(Math.random() * simbolos.length)];
}

const funcionesAleatorias = {
	minuscula: obtenerMinusculaAleatoria,
	mayuscula: obtenerMayusculaAleatoria,
	numero: obtenerNumeroAleatorio,
	simbolo: obtenerSimboloAleatorio,
};

// Evento al hacer clic en el botón de generar
const generar = document.getElementById("botonGenerar");
generar.addEventListener("click", () => {
	generarContraseña();
});

const generarContraseña = () => {
	const longitud = document.getElementById("longitudContrasena").value;
	const incluirMayuscula = document.getElementById("incluirMayusculas").checked;
	const incluirMinuscula = document.getElementById("incluirMinusculas").checked;
	const incluirNumero = document.getElementById("incluirNumeros").checked;
	const incluirSimbolo = document.getElementById("incluirSimbolos").checked;
	const resultado = document.getElementById("resultadoContrasena");
    const fuerza = evaluarFuerzaContraseña(resultado.value);


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
	const textarea = document.getElementById("resultadoContrasena");
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
	const nivelTexto = document.getElementById("nivelFuerzaTexto");
	const barras = [
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

	const nivel = Math.min(fuerza, 4);

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
	const tiposSeleccionados = minuscula + mayuscula + numero + simbolo;
	if(tiposSeleccionados === 0) {
		alert("Selecciona una opción");
		return;
	}
	const tiposArr = [
		{ minuscula },
		{ mayuscula },
		{ numero },
		{ simbolo }
	].filter((item) => Object.values(item)[0]);
	debugger;
	for (let i = 0; i < longitud; i += tiposSeleccionados) {
		tiposArr.forEach((tipo) => {
			const nombreFuncion = Object.keys(tipo)[0];
			contraseñaGenerada += funcionesAleatorias[nombreFuncion]();
		});
	}
	const contraseñaFinal = contraseñaGenerada.slice(0, longitud);
	return contraseñaFinal;
}
