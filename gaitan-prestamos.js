function inicio() {
  alert("Bienvenido al simulador de Prestamos de Banck-PBE");
// se pregunta si quiere cargar usuarios al sistema de consultas
  let registrarMasUser = true;

  while (registrarMasUser) {
    const contuniarRegistrando = prompt("Registre Usuarios \n Presione S  \n Presione cualquier tecla para salir").toUpperCase()
    if (contuniarRegistrando === "S") {
      registoUsuario();
    }
    else {

      registrarMasUser = false;
      acceso(datosUsuario);
    }
  }
}


class Usuario {
  constructor(nombre, apellido, correo, dni, contrasena) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.dni = dni;
    this.contrasena = contrasena;
  }
}
// se crean el registro de usuarios y se verifica 
// antes de cargarlos si el correo y la contraseña coinsiden con los parametros requeridos
let datosUsuario = [];
console.log(datosUsuario)

const registoUsuario = () => {

  let nombre = prompt("ingrese su nombre");
  let apellido = prompt("ingrese su apellido");
  let dni = prompt("ingrese su DNI");
  let correo = prompt("ingrese Email\n persona@gmail.com ");
  let expresionRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!expresionRegular.test(correo)) {
    alert("No es una direccion de correo valida ");
    correoInvalido(correo)
  }
  else {
    alert("Su correo se a guardado con exito");
  }

  let contrasena = prompt("Crear Contraseña");

  if ((contrasena.length >= 8) && (contrasena.length <= 10)) {
    alert("La contraseña se a guardado con exito");
  }
  else {
    alert("La contraseña debe contener entre 8 y 10 caracteres");
    contrasenaInvalida(contrasena)
  }

  const datosIngresados = new Usuario(nombre, apellido, correo, dni, contrasena)
  datosUsuario.push(datosIngresados);

  alert(`Usuario "${nombre} ${apellido}" registrado exitosamente!`);

}



// Si el correo no es valido entra en un loop hasta q de true

const correoInvalido = (correo) => {

  let expresionRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let intentos = 0;

  do {
    correo = prompt("ingrese Email\n persona@gmail.com ");
    intentos++
    if (!expresionRegular.test(correo)) {
      alert(`Vuelva a ingresar una direccion  Correo`);
    }
  }
  while (!expresionRegular.test(correo));
}
// Si la contraseña no es valido entra en un loop hasta q de true

const contrasenaInvalida = (contrasena) => {
  let reingresarContraseña = true;
  while (reingresarContraseña) {

    contrasena = prompt("Crear Contraseña");

    if ((contrasena.length >= 8) && (!contrasena.length <= 10)) {
      alert("La contraseña se a guardado con exito");
      reingresarContraseña = false;
    }
    else {
      alert("La contraseña debe contener entre 8 y 10 caracteres");
    }
  }
}

// La funcion de aaceso va a evaluar y comparar el correo y la contraseña 
// con los datos de usuarios guardados en el array

function acceso(datosUsuario) {
  let accesoFallido = true;
  while (accesoFallido) {
    let ingresar = prompt("ingrese Email para iniciar Sesion\n persona@gmail.com ");
    let contrasena = prompt("Ingrese su contraseña");

    const user = datosUsuario.find(user => user.correo === ingresar && user.contrasena === contrasena);
    if (user) {
      alert(`Bienvenido ${user.correo}`);
      accesoFallido = false;
      calcularCuota();

    } else {
      alert('Usuario o contraseña incorrectos');
    }

  }
}



// Se calcula el monto a devolver del pretamos solicitado del cliente

function calcularCuota() {
  let totalApagarPorMes = 0;
  let totalMonto = Number(prompt("Ingrese monto a financiar"));
  let numeroDecuotas = Number(prompt("imgrese numero de cuotas\n 12 con 10.45%\n 24 con 18.78%\n 36 con 30.52%\n 72 con 43.50%\n 84 con 57.20%"));
  let impuestos = numeroDecuotas;
  switch (numeroDecuotas) {
    case 12:
      impuestos = 10.45
      break;
    case 24:
      impuestos = 18.78;
      break;
    case 36:
      impuestos = 30.52;
      break;
    case 72:
      impuestos = 43.50;
      break;
    case 84:
      impuestos = 57.20;
      break;
  }

  let interesCuota = (totalMonto * (impuestos / 100)) * numeroDecuotas;

  totalApagarPorMes = interesCuota / numeroDecuotas;
  alert(`Capital solitado: " ${totalMonto}" \n Capital a devolver: " ${interesCuota}"  \n Numero de Cuotas: " ${numeroDecuotas} "\n Total a abonar:  " ${totalApagarPorMes}"`);
}

// Arrancque del programa 

inicio()
// Se pregunta al usuario si quiere simular otro prestamos o ingresar otro usuario para simular su prestamo volviendo al inicio del programa
let reinicio = true;
while (reinicio) {
  const nuevaSimulacion = prompt("Desea realizar otras simulacion ? \n Presoine K para continuar\nPresoine I para volver a inicio  \n Presione otra tecla para salir");
  if (nuevaSimulacion === "k") {
    calcularCuota()
  }
  else if (nuevaSimulacion === "i") {
    inicio()
  }
  else {
    reinicio = false;
  }
}



