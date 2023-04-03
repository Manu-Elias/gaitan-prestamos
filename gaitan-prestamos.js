function inicio() {


    alert("Bienvenido al simulador de Prestamos de Banck-PBE");
    aceptaRegistrarse = confirm("Desea Registrarse?");
    if (aceptaRegistrarse) {
        acceso()
    }
    else if(!aceptaRegistrarse){
        alert("Solo podra Simular el Prestamo\n No podra ");
        calcularCuota()
    }

}

function acceso() {
    let ingresarCorreo = prompt("ingrese Email\n persona@gmail.com ");
    let contrasenaCreada = prompt("Crear Contraseña");
    
    let expresionRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!expresionRegular.test(ingresarCorreo)) {
        alert("Ha ingresado un correo invalido");
    }

    else if ((contrasenaCreada.length != 8)) {
        alert("La contraseña debe tener 8 caracteres ")
    }
    else{
        calcularCuota()
    }

    
}


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



inicio()