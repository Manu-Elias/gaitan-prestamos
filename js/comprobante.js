const mostrarDatos = () => {
    // Obtener los datos del localStorage
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const prestamoCliente = JSON.parse(localStorage.getItem('prestamoOtorgado'));


    //  tabla con los datos del usuario
    document.getElementById("nombreUsuario").innerText = usuario.nombre;
    document.getElementById("apellidoUsuario").innerText = usuario.apellido;
    document.getElementById("dniUsuario").innerText = usuario.dni;
    document.getElementById("emailUsuario").innerText = usuario.correo;

    // tabla con los datos del préstamo
    document.getElementById("capital").innerText = prestamoCliente.monto;
    document.getElementById("capitalDevolver").innerText = prestamoCliente.totalMonto;
    document.getElementById("meses").innerText = prestamoCliente.numeroCuotas;
    document.getElementById("montoPorMes").innerText = prestamoCliente.totalCuota;
};

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    mostrarDatos();
});
