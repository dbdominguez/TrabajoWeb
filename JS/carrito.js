console.log("Archivo carrito.js cargado correctamente");

// Array para almacenar los productos del carrito
let carrito = [];

// Seleccionar elementos del DOM
const carritoContainer = document.getElementById("carrito");
const totalElement = document.getElementById("total");

// Función para agregar un producto al carrito
function agregarAlCarritoDesdeHTML(button) {
    console.log("Función agregarAlCarritoDesdeHTML ejecutada");

    const nombre = button.getAttribute("data-nombre");
    const descripcion = button.getAttribute("data-descripcion");
    const precio = parseInt(button.getAttribute("data-precio"));

    const producto = { nombre, descripcion, precio };

    carrito.push(producto);

    console.log("Carrito actualizado:", carrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("Contenido de localStorage después de agregar:", localStorage.getItem("carrito"));

    if (carritoContainer) {
        actualizarCarrito();
    }
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    console.log("Función actualizarCarrito ejecutada");

    if (!carritoContainer) {
        console.warn("El elemento con ID 'carrito' no existe en esta página.");
        return;
    }

    carritoContainer.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;

        const productoHTML = `
            <div class="col-md-12 mb-3">
                <div class="card text-center">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="true" href="#">${producto.nombre}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">${producto.descripcion}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Precio: $${producto.precio}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
        carritoContainer.innerHTML += productoHTML;
    });

    if (totalElement) {
        totalElement.textContent = total;
    }

    console.log("Carrito mostrado en el DOM:", carrito);
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    console.log(`Eliminando producto en la posición ${index}`);

    carrito.splice(index, 1);

    console.log("Carrito después de eliminar:", carrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    console.log("Contenido de localStorage después de eliminar:", localStorage.getItem("carrito"));

    actualizarCarrito();
}

// Cargar el carrito desde localStorage al iniciar (solo si estamos en la página del carrito)
if (carritoContainer) {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Evento DOMContentLoaded ejecutado");

        const carritoGuardado = localStorage.getItem("carrito");
        console.log("Cargando carrito desde localStorage:", carritoGuardado);

        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    });
}