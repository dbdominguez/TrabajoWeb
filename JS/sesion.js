// Confirmar que el archivo se está cargando correctamente
console.log("Archivo sesion.js cargado correctamente");

// Manejar el inicio de sesión en el modal
document.getElementById("FormularioInicio").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores ingresados en el formulario
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    console.log("Correo ingresado:", email);
    console.log("Contraseña ingresada:", password);

    // Obtener usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Usuarios en localStorage:", usuarios);

    // Verificar si hay usuarios registrados
    if (usuarios.length === 0) {
        console.log("No hay usuarios registrados en localStorage.");
        alert("No hay usuarios registrados. Por favor, regístrate primero.");
        return;
    }

    // Buscar usuario
    let usuarioEncontrado = usuarios.find(user => 
        user.email.trim().toLowerCase() === email.toLowerCase() && 
        user.password === password
    );

    if (usuarioEncontrado) {
        // Guardar sesión
        localStorage.setItem("email", usuarioEncontrado.email);
        localStorage.setItem("role", usuarioEncontrado.role || "cliente");

        console.log("Inicio de sesión exitoso:", usuarioEncontrado);

        // Cerrar modal
        let modalElement = document.getElementById('ModalInicioSecion');
        if (modalElement) {
            let modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
                console.log("Cerrando modal...");
                modal.hide();
            }
        }

        // Redirigir según el rol del usuario
        setTimeout(() => {
            if (usuarioEncontrado.role === "admin") {
                console.log("Redirigiendo a Perfil-Admin.html...");
                window.location.href = "../../HTML/Paginas_Principales/Perfil-Admin.html";
            } else if (usuarioEncontrado.role === "cliente") {
                console.log("Redirigiendo a Perfil.html...");
                window.location.href = "../../HTML/Paginas_Principales/Perfil.html";
            } else {
                console.log("Rol desconocido. No se puede redirigir.");
                alert("Error: Rol desconocido. Contacta al administrador.");
            }
        }, 500);
    } else {
        console.log("Error: Credenciales incorrectas.");
        alert("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});