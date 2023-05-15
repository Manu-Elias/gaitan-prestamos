// Definimos la clase Usuarios
class Usuario {
  constructor(nombre, apellido, correo, dni, contrasena) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.dni = dni;
    this.contrasena = contrasena;
  }
}

// Definimos el array que va a guardar los usuarios registrados
let usuariosRegistrados = [];

// Función que se ejecuta cuando se envía el formulario
const enviarFormulario = () => {
  // Obtenemos los datos del formulario
  const form = document.getElementById('registro');
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const dni = document.getElementById('dni');
  const correo = document.getElementById('correo');
  const contrasena = document.getElementById('contrasena');
  const parrafo = document.getElementById("alerta")
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitamos que se recargue la página al enviar el formulario
    let alerta = "";
    let entrar = false;
    parrafo.innerHTML = "";
   // Expresión regular para verificar el formato del correo electrónico
    let expresionRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  
   // Se validan los campos del formulario utilizando operadores abanzados
    alerta += dni.value.length < 8 ? "Ingrese un DNI válido <br>" : "";
    alerta += !expresionRegular.test(correo.value) ? "El email no es válido <br>" : "";
    alerta += contrasena.value.length < 8 ? "La contraseña no es válida <br>" : "";
    // Si se encuentra alguna alerta, cambiamos la variable 'entrar' a true
    if (alerta !== "") {
      entrar = true;
    }
    // Si la variable 'entrar' es true, mostramos las alertas, de lo contrario mostramos "Enviado"
    parrafo.innerHTML = entrar ? alerta : "Enviado";




    // Creamos una nueva instancia de Usuario con los datos del formulario
    const nuevoUsuario = new Usuario(nombre.value, apellido.value, correo.value, dni.value, contrasena.value);

    // Agregamos el usuario al array de usuarios registrados
    usuariosRegistrados.push(nuevoUsuario);

    // Guardamos los datos en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));


    // Limpiamos el formulario
    form.reset();

    // Imprimimos el array de usuarios registrados en la consola
    console.log(usuariosRegistrados);
  });
};

enviarFormulario();