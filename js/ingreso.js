function verificarUsuarios() {
  // Obtenemos los datos del formulario
  const form = document.getElementById("ingresar");
  const correo = document.getElementById("verificarCorreo");
  const contrasena = document.getElementById("verificarContrasena");
  const texto = document.getElementById("texto");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitamos que se recargue la página al enviar el formulario

    let entrar = false;
    texto.innerHTML = "";

    const usuariosStg = JSON.parse(localStorage.getItem("usuarios"));
    const user = usuariosStg.find(
      (user) => user.correo === correo.value && user.contrasena === contrasena.value);

    if (user) {
      // Guardamos el usuario que ingresó en sessionStorage para poder usarlos en la pagina de comprobante para mostrar los datos
      sessionStorage.setItem("usuarioActual", JSON.stringify(user));

      texto.innerHTML = "ingresando..";
      entrar = true;
      // Redirigimos a la página "simulasionPrestamo.html" después de 2 segundos
      setTimeout(() => {
        window.location.href = "simulacionPrestamo.html";
      }, 2000);
    } else {
      texto.innerHTML = "Correo o Contraseña invalidos";
    }

    // Limpiamos el formulario
    form.reset();
  });
}

verificarUsuarios();
