const mostrarDatos = () => {
    // Obtener los datos del localStorage y sessionStorage
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


    // Mostrar el número de transacción generado en la tabla
    const numTransaccion = JSON.parse(localStorage.getItem('prestamoOtorgado')).numTransaccion;
    document.getElementById("numTransaccion").innerText = numTransaccion;
};



const guardarComprobante = () => {
    // Obtener los datos del usuario y del préstamo
    const usuario = JSON.parse(sessionStorage.getItem("usuarioActual"));
    const prestamoCliente = JSON.parse(localStorage.getItem('prestamoOtorgado'));
    const numTransaccion = JSON.parse(localStorage.getItem('prestamoOtorgado')).numTransaccion;

    // Crear un objeto para almacenar los datos
    const comprobanteUsuario = {
        usuario,
        prestamoCliente,
        numTransaccion
    };

    // Guardar los datos en el localStorage
    sessionStorage.setItem('comprobanteUsuario', JSON.stringify(comprobanteUsuario));
};


document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    mostrarDatos();
    guardarComprobante();
});
