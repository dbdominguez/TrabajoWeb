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
        localStorage.setItem("role", usuarioEncontrado.role || "cliente"); // Asignar rol por defecto si no existe

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

        // Redirigir al perfil
        setTimeout(() => {
            console.log("Redirigiendo a Perfil.html...");
            window.location.href = "../../HTML/Paginas_Principales/Perfil.html"; // Ajusta la ruta si es necesario
        }, 500);
    } else {
        console.log("Error: Credenciales incorrectas.");
        alert("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});

// Cierre de sesión
document.getElementById("logout")?.addEventListener("click", function () {
    // Limpiar datos de sesión
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    console.log("Sesión cerrada. Redirigiendo al inicio...");

    // Redirigir al inicio
    let redirectPath = window.location.pathname.includes("Paginas_Principales") ? "../../Index.html" : "Index.html";
    window.location.href = redirectPath;
});

// Redireccionar al perfil o mostrar el modal de inicio de sesión al hacer clic en el icono de perfil
document.addEventListener("DOMContentLoaded", function () {
    let perfilIcono = document.getElementById("iconoPerfil");
    let modalInicioSesion = new bootstrap.Modal(document.getElementById("ModalInicioSecion"));

    perfilIcono?.addEventListener("click", function (event) {
        let email = localStorage.getItem("email");

        if (email) {
            // Si el usuario está autenticado, redirigir al perfil
            console.log("Usuario autenticado. Redirigiendo al perfil...");
            window.location.href = "../../HTML/Paginas_Principales/Perfil.html";
        } else {
            // Si no está autenticado, mostrar el modal de inicio de sesión
            console.log("Usuario no autenticado. Mostrando modal de inicio de sesión...");
            event.preventDefault();
            modalInicioSesion.show();
        }
    });
});