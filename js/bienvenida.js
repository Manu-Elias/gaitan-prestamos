const mostrarMensajeBienvenida = () => {
    swal.fire({
        title: "¡Bienvenido/a al simulador de préstamos Bank-PBE!",
        text: `Presione el botón 'Simular Préstamos' para simular un préstamo. Si desea solicitar un préstamo, regístrese o inicie sesión. De lo contrario, solo podrá simular préstamos."`,
        icon: "info",
        button: "Aceptar",
    });
};


const botonInfo = document.getElementById("botonInfo");

botonInfo.addEventListener("click", () => {
    mostrarMensajeBienvenida();
});
