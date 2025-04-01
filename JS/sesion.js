document.addEventListener("DOMContentLoaded", function() {
    let email = localStorage.getItem("email");
    let role = localStorage.getItem("role");

    if (email) {
        console.log("Usuario autenticado:", email, "Rol:", role);
    } else {
        console.log("No hay usuario autenticado.");
    }
});

// Manejar el inicio de sesión en el modal
document.getElementById("FormularioInicio").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener los valores ingresados en el formulario
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Obtener usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log("Usuarios en localStorage:", usuarios);

    // Verificar si hay usuarios registrados
    if (usuarios.length === 0) {
        console.log("No hay usuarios registrados en localStorage.");
        alert("No hay usuarios registrados. Por favor, regístrate primero.");
        return;
    }

    // Buscar usuario 
    let usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

    if (usuarioEncontrado) {
        // Guardar sesión
        localStorage.setItem("email", usuarioEncontrado.email);
        localStorage.setItem("role", usuarioEncontrado.role || "cliente"); // Asignar rol por defecto si no existe

        console.log("Inicio de sesión exitoso:", usuarioEncontrado);

        // Cerrar modal 
        let modalElement = document.getElementById('ModalInicioSecion');
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();

        // Redirigir 
        setTimeout(() => {
            window.location.href = "../TrabajoWeb/HTML/Paginas_Principales/Perfil.html";
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


// Redireccionar Icono
document.addEventListener("DOMContentLoaded", function() {
    let perfilIcono = document.getElementById("iconoPerfil");
    let modalInicioSesion = new bootstrap.Modal(document.getElementById("ModalInicioSecion"));

    perfilIcono.addEventListener("click", function(event) {
        let email = localStorage.getItem("email");

        if (email) {

            window.location.href = "../TrabajoWeb/HTML/Paginas_Principales/Perfil.html";
        } else {

            event.preventDefault(); 
            modalInicioSesion.show();
        }
    });
});