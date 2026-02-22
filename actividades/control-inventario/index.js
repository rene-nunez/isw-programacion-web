class Producto {
    constructor(codigo, nombre, cantidad, costo, categoria) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.categoria = categoria;
    }
}

class Inventario {
    constructor() {
        this.productos = new Map();
    }

    agregarProducto(producto) {
        if(this.productos.has(producto.codigo)) {
            return false;
        } else {
            this.productos.set(producto.codigo, producto)
            return true;
        }
    }
}

let inventario = new Inventario();

const form = document.getElementById("formProducto");

form.addEventListener("submit", ()=> {
    event.preventDefault();
    
    let codigo = document.getElementById("inputCodigo").value;
    let nombre = document.getElementById("inputNombre").value;
    let cantidad = parseInt(document.getElementById("inputCantidad").value);
    let costo = parseFloat(document.getElementById("inputCosto").value) ;
    let categoria = document.getElementById("inputCategoria").value;

    if(cantidad < 1) {
        return alert("Cantidad inválida");
    } 
    
    if(costo < 1) {
        return alert("Costo inválida");
    }
    
    let producto = new Producto(codigo, nombre, cantidad, costo, categoria);
    
    if(!inventario.agregarProducto(producto)) {
        mostrarNotificacion("Producto ya existe", "error");
    } else {
        inventario.productos.forEach((valor, clave) => {
            console.log(clave, valor);
        });
        mostrarNotificacion("Producto agregado", "exito");
    }
});

function mostrarNotificacion(mensaje, tipo) {
    const contenedor = document.getElementById("notificaciones");
    const notif = document.createElement("div");
    notif.classList.add("notificacion", tipo);
    notif.textContent = mensaje;
    contenedor.appendChild(notif);

    // animación de entrada
    setTimeout(() => notif.classList.add("show"), 10);

    // desaparecer después de 3 segundos
    setTimeout(() => {
        notif.classList.remove("show");
        // remover del DOM después de la animación
        setTimeout(() => contenedor.removeChild(notif), 500);
    }, 3000);
    Notificacion("Producto agregado", "exito");
}