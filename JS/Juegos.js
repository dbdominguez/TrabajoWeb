//Modal REGISTRO

//Confirmar que se este cargando el JS en el navegador
console.log("Archivo Juegos.js cargado correctamente");

//Modal se maneja por el boostrap HTML

//Validación de formulario Registro
    (function () {
        'use strict';
        // Seleccionar todos los formularios que necesitan validación
        var forms = document.querySelectorAll('.needs-validation');

        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener('submit', function (event) {
                // Prevenir el envío si el formulario no es válido
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    // Si es válido, redirigir al usuario
                    event.preventDefault(); // Prevenir el envío predeterminado
                    window.location.href = '../../../../Index.html';
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();