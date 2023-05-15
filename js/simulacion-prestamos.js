const simularPrestamo = () => {
  // Obtener elementos del DOM
  const importe = document.getElementById("monto");
  const cuotas = document.querySelectorAll(".botonCuota");
  const mensaje = document.getElementById("mensaje");


  // Agregar evento click a cada botón de cuota
  cuotas.forEach((cuota) => {
    cuota.addEventListener("click", () => {
      cuotas.forEach((c) => c.classList.remove("active"));
      cuota.classList.add("active");
    });
  });

  // Agregar evento click al botón de cotizar
  document.getElementById("cotizar").addEventListener("click", () => {
    // Obtener los valores seleccionados
    const monto = parseFloat(importe.value);
    const numeroCuotas = parseInt(document.querySelector(".botonCuota.active").id);

    // Verificar si se ha ingresado un importe si elige un numero de cuotas y no ingresa un importe aparece el msj

    mensaje.innerHTML = isNaN(monto) ? "Debes ingresar un importe" : "";


    // Calcular el interés según el plazo
    let impuestos;
    switch (numeroCuotas) {
      case 12:
        impuestos = 8.05;
        break;
      case 24:
        impuestos = 12.08;
        break;
      case 36:
        impuestos = 22.52;
        break;
      case 48:
        impuestos = 38.75;
        break;
      case 72:
        impuestos = 43.50;
        break;
      case 84:
        impuestos = 57.20;
        break;
    }

    // Calcular el total a pagar por cuota
    const interesCuota = (monto * (impuestos / 100)) * numeroCuotas;
    const totalMonto = monto + interesCuota;
    const totalCuota = interesCuota / numeroCuotas;


    // Agregar los datos de la simulación al objeto prestamoCliente
    const prestamoCliente = {
      monto: monto.toFixed(2),
      numeroCuotas: numeroCuotas,
      impuestos: impuestos,
      totalMonto: totalMonto.toFixed(2),
      totalCuota: totalCuota.toFixed(2)
    };

    // Guardar el array prestamoCliente en el localStorage
    localStorage.setItem('prestamoOtorgado', JSON.stringify(prestamoCliente));

    // Genera un número de transacción aleatorio y  lo guarda en el localStorage
    prestamoCliente.numTransaccion = Math.floor(Math.random() * 100000) + 1;
    localStorage.setItem('prestamoOtorgado', JSON.stringify(prestamoCliente));

    //se muestra el resultados en la tabla  monto a devolver del pretamos solicitado por el cliente
    document.getElementById("Capital solicitado").textContent = `$${monto.toFixed(2)}`;
    document.getElementById("Capital a devolver").textContent = `$${totalMonto.toFixed(2)}`;
    document.getElementById("N° de Cuotas").textContent = `${numeroCuotas.toFixed()}`;
    document.getElementById("Monto Cuotas").textContent = `$${totalCuota.toFixed(2)}`;
  });
};

simularPrestamo();


const botonSolicitar = document.getElementById("botSolicitar");
const mensaje = document.getElementById("mensaje");
mensaje.innerHTML = "";

botonSolicitar.addEventListener("click", () => {
  // Verificar si el usuario ha iniciado sesión
  const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
  if (!usuarioActual) {
    Swal.fire({
      title: "Inicia sesión o registrate para solicitar un préstamo",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: 'blue',
    })
    return;
  }

  // Verificar si se ha simulado un préstamo
  const importe = document.getElementById("monto").value;
  if (isNaN(parseFloat(importe))) {
    Swal.fire({
      title: "Simula un préstamo antes de solicitarlo",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: 'blue',
    })
    return;
  }

  // Mostramos el mensaje "Solicitando"
  mensaje.innerHTML = "Solicitando...";

  // Redirigimos a la página "comprobante.html" después de 2 segundos
  setTimeout(() => {
    window.location.href = "comprobante.html";
  }, 2000);
});



// Verificar si el usuario ha iniciado sesión
const usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
if (usuarioActual) {
  // Ocultar los botones de ingreso y registro
  document.getElementById("botonIngresar").style.display = "none";
  document.getElementById("botonRegistrarme").style.display = "none";
  document.getElementById("botonSimularPrestamo").style.display = "none";

  // Mostrar el botón de cerrar sesión y comprobante
  botonCerrarSesion.style.display = "block";
  botonComprobante.style.display = "block";
}

botonCerrarSesion.addEventListener("click", () => {
  // Eliminar los datos de sesión del usuario
  sessionStorage.removeItem("usuarioActual");
  sessionStorage.removeItem('comprobanteUsuario');

  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = "index.html";
  // Mostrar los botones de ingreso y registro
  document.getElementById("botonIngresar").style.display = "block";
  document.getElementById("botonRegistrarme").style.display = "block";
  document.getElementById("botonSimularPrestamo").style.display = "block";

});

const mostrarComprobante = () => {
  // Obtener los datos guardados del localStorage
  const comprobanteUsuario = JSON.parse(sessionStorage.getItem('comprobanteUsuario'));

  // Obtener los datos del usuario y del préstamo
  const usuario = comprobanteUsuario.usuario;
  const prestamoCliente = comprobanteUsuario.prestamoCliente;

  //  mensaje en SweetAlert con los datos
  const mensaje = `
    Número de transacción: ${prestamoCliente.numTransaccion}
    Nombre: ${usuario.nombre} ${usuario.apellido}
    DNI: ${usuario.dni}
    Email: ${usuario.correo}
    Monto solicitado: ${prestamoCliente.monto}
    Total a devolver: ${prestamoCliente.totalMonto}
    Número de cuotas: ${prestamoCliente.numeroCuotas}
    Monto por cuota: ${prestamoCliente.totalCuota}
  `;

  
  Swal.fire({
    title: 'Comprobante',
    html: mensaje,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: 'blue',
  }).then(() => {
    //muestra el mensaje "Imprimiendo" después de hacer clic en "Aceptar"
    Swal.fire({
      title: 'Imprimiendo',
      text: 'El comprobante se está imprimiendo...',
      icon: 'info',
      confirmButtonText: 'ok',
      confirmButtonColor: 'blue',
    });
  });
};

// obtiene el boton y escucha el evento 
document.addEventListener('DOMContentLoaded', () => {
  const botonComprobante = document.getElementById('botonComprobante');
  botonComprobante.addEventListener('click', mostrarComprobante);
});


//  Obtiene la cotización del dólar oficial desde la API de DolarSI
async function obtenerCotizacion() {
  try {
    const response = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales");
    const data = await response.json();
    const dolarOficial = data.find((element) => element.casa.nombre === "Dolar Oficial");
    if (!dolarOficial) {
      throw new Error("No se encontró la cotización del Dólar Oficial.");
    }
    return {
      nombre: dolarOficial.casa.nombre,
      compra: dolarOficial.casa.compra,
      venta: dolarOficial.casa.venta,
    };
  } catch (error) {
    return Promise.reject(error.message);
  }
}

// Función para mostrar un mensaje Toastify con la cotización
function mostrarCotizacion(cotizacion) {
  const mensaje = `${cotizacion.nombre} Compra: ${cotizacion.compra} Venta: ${cotizacion.venta}`;
  Toastify({
    text: mensaje,
    newWindow: true,
    gravity: "bottom",
    position: "left",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true,
  }).showToast();
}

// Llamamos a los métodos cada 6 segundos utilizando setInterval
setInterval(() => {
  obtenerCotizacion()
    .then(cotizacion => mostrarCotizacion(cotizacion))
    .catch(error => console.error(error));
}, 6000);















