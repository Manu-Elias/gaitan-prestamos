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
        impuestos = 9.05;
        break;
      case 24:
        impuestos = 17.08;
        break;
      case 36:
        impuestos = 30.52;
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
  // Verificar si se ha simulado un préstamo
  const importe = document.getElementById("monto").value;
  if (isNaN(parseFloat(importe))) {
    mensaje.innerHTML = "Debes simular un préstamo antes de solicitarlo";
    return;
  }

  // Mostramos el mensaje "Solicitando"
  mensaje.innerHTML = "Solicitando...";

  // Redirigimos a la página "comprobante.html" después de 2 segundos
  setTimeout(() => {
    window.location.href = "comprobante.html";
  }, 2000);
});






