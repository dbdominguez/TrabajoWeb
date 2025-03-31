// Confirmar que se está cargando el JS en el navegador
console.log("Archivo validacion.js cargado correctamente");

// Modal se maneja por el Bootstrap HTML

// Validación de formulario Registro
(function () {
    'use strict';
    
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            var passwordInput = form.querySelector("#password");
            var passwordError = form.querySelector("#passwordError");

            // Expresión para validar la contraseña
            var passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,16}$/;

            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else if (!passwordPattern.test(passwordInput.value)) {
                // No cumple
                event.preventDefault();
                event.stopPropagation();
                passwordError.textContent = "La contraseña debe tener entre 8 y 16 caracteres, incluir al menos un número y un carácter especial.";
                passwordInput.classList.add("is-invalid");
            } else {
                event.preventDefault();
                passwordInput.classList.remove("is-invalid");
                passwordError.textContent = "";

                console.log("Redirigiendo a Perfil.html..."); 

                setTimeout(function () {
                    window.location.href = "Perfil.html";
                }, 500);
            }

            form.classList.add('was-validated');
        }, false);
    });
})();