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
document.getElementById("FormularioInicio").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Obtener lista de usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar si existe un usuario con ese email y contraseña
    let usuarioEncontrado = usuarios.find(user => user.email === email && user.password === password);

    if (usuarioEncontrado) {
        // Guardar sesión en localStorage
        localStorage.setItem("email", usuarioEncontrado.email);
        localStorage.setItem("role", usuarioEncontrado.role);

        console.log("Inicio de sesión exitoso:", usuarioEncontrado);

        // Cerrar modal correctamente
        let modalElement = document.getElementById('ModalInicioSecion');
        let modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();

        // Redirigir después de cerrar el modal
        setTimeout(() => {
            window.location.href = "../TrabajoWeb/HTML/Paginas_Principales/Perfil.html";
        }, 500); // Pequeña espera para evitar conflictos con el modal
    } else {
        alert("Credenciales incorrectas. Intenta de nuevo.");
    }
});

// Cierre de sesión
document.getElementById("logout")?.addEventListener("click", function() {
    localStorage.clear();

    // Detectar si estamos en una subcarpeta y ajustar la ruta
    let redirectPath = window.location.pathname.includes("Paginas_Principales") ? "../../Index.html" : "Index.html";

    window.location.href = redirectPath;
});