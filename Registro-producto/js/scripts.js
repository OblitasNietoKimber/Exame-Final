const formulario = document.querySelector("form");
    let nombre;
    let producto;
    let cantidad;
    let precio;
    let subtotal;
    let descuento;
    let subtotalDescuento;
    let igv;
    let total;
    let venta;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    try {

        nombre = document.getElementById("nombre").value.trim();
        producto = document.getElementById("producto").value.trim();
        cantidad = Number(document.getElementById("cantidad").value);
        precio = Number(document.getElementById("precio").value);

        if (nombre === "" ||producto === "" ||document.getElementById("cantidad").value.trim() === "" ||
        document.getElementById("precio").value.trim() === "") {
            throw new Error("Todos los campos son obligatorios.");
        }

        if (cantidad <= 0) {
            throw new Error("La cantidad debe ser mayor a 0.");
        }

        if (precio <= 0) {
            throw new Error("El precio debe ser mayor a 0.");
        }

        calcularVenta(nombre, producto, cantidad, precio);

    } catch (error) {
        document.getElementById("resultado").innerHTML =`<h3 style="color:red;">${error.message}</h3>`;
        console.error(error.message);
    }
});

function calcularVenta(nombre, producto, cantidad, precio) {

    let subtotal = cantidad * precio;
    let descuento;
    let subtotalDescuento;
    let igv;
    let total;

    if (subtotal > 200) {
        descuento = subtotal * 0.10;
    } else {
        descuento = 0;
    }

    subtotalDescuento = subtotal - descuento;
    igv = subtotalDescuento * 0.18;
    total = subtotalDescuento + igv;

    let venta = {
        cliente: nombre,
        producto: producto,
        cantidad: cantidad,
        precio: precio,
        subtotal: subtotal,
        descuento: descuento,
        igv: igv,
        total: total
    };

    mostrarResultado(venta);

    console.log(venta);
    console.log("JSON:");
    console.log(JSON.stringify(venta, null, 2));
}
function mostrarResultado(venta) {
    document.getElementById("resultado").innerHTML = `
        <h2>Resultado</h2>
        <p>Cliente: ${venta.cliente}</p>
        <p>Producto: ${venta.producto}</p>
        <p>Cantidad: ${venta.cantidad}</p>
        <p>Precio: S/. ${venta.precio.toFixed(2)}</p>
        <p>Subtotal: S/. ${venta.subtotal.toFixed(2)}</p>
        <p>Descuento: S/. ${venta.descuento.toFixed(2)}</p>
        <p>IGV: S/. ${venta.igv.toFixed(2)}</p>
        <h3>Total: S/. ${venta.total.toFixed(2)}</h3>
    `;
}