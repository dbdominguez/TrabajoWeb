//Modal REGISTRO

//Confirmar que se este cargando el JS en el navegador
console.log("Archivo Juegos.js cargado correctamente");


document.addEventListener("DOMContentLoaded", () => {
    const registroBtn = document.getElementById("registroBtn"); //Seleccion del boton REGISTRO
    const modal = document.getElementById("modal"); //Seleccion del ID MODAL (DIV)
    const cerrarModal = document.getElementById("enviarModal"); //Seleccion del boton Enviar

    // Abrir el modal
    registroBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Cerrar el modal
    cerrarModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Cerrar al hacer clik afuera
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});