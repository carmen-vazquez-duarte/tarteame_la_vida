var carritoVisible = false;

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarritoHandler);
  }
  //Agrega funcionalidad al boton sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidadHandler);
  }

  //Agrega funcionalidad al boton restar cantidad
  var botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidadHandler);
  }
  //Agrega funcionalidad a los botones Agregar al carrito
  var botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
  for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
    var button = botonesAgregarAlCarrito[i];
    button.addEventListener("click", prepararItemCarritoHandler);
  }
}

function eliminarItemCarritoHandler(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.parentElement.remove();

  actualizarTotalCarrito();

  ocultarCarrito();
}

function actualizarTotalCarrito() {
  var carritoContenedor = document.getElementsByClassName("carrito")[0];
  var carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  var total = 0;

  for (var i = 0; i < carritoItems.length; i++) {
    var item = carritoItems[i];
    var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    var precio = parseFloat(
      precioElemento.innerText.replace("€", "").replace(".", "")
    );
    var cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    var cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "€" + total.toLocaleString("es") + ",00";
}

function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
 
  if (carritoItems.childElementCount == 0) {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    var items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}
function mostrarCarrito() {
 
  if (carritoVisible===false ) {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "0";
    carrito.style.opacity = "1";
    carritoVisible = true;

    var items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "60%";
  }
}

function sumarCantidadHandler(event) {
  var buttonClicked = event.target;
  // Asegúrate de que tiene un elemento padre válido
  var selector = buttonClicked.parentElement;

  if (selector) {
    // Verifica si el elemento padre existe
    // Encuentra el input con la clase 'carrito-item-cantidad'
    var cantidadInput = selector.querySelector(".carrito-item-cantidad");

    if (cantidadInput) {
      // Verifica si el input existe
      // Convierte el valor actual a número y suma 1
      var cantidadActual = parseInt(cantidadInput.value) || 0;
      cantidadInput.value = cantidadActual + 1;
    } else {
      console.error(
        "No se encontró el elemento con la clase 'carrito-item-cantidad' dentro del padre"
      );
    }
  } else {
    console.error("No se encontró el elemento padre del botón clickeado");
  }
  actualizarTotalCarrito();
}

function restarCantidadHandler(event) {
  var buttonClicked = event.target;
  // Asegúrate de que tiene un elemento padre válido
  var selector = buttonClicked.parentElement;

  if (selector) {
    // Verifica si el elemento padre existe
    // Encuentra el input con la clase 'carrito-item-cantidad'
    var cantidadInput = selector.querySelector(".carrito-item-cantidad");

    if (cantidadInput) {
      // Verifica si el input existe
      // Convierte el valor actual a número y suma 1
      var cantidadActual = parseInt(cantidadInput.value) || 0;
      cantidadInput.value = cantidadActual - 1;
    } else {
      console.error(
        "No se encontró el elemento con la clase 'carrito-item-cantidad' dentro del padre"
      );
    }
  } else {
    console.error("No se encontró el elemento padre del botón clickeado");
  }
  if (cantidadInput.value < 0) {
    cantidadInput.value = 0;
  }
  actualizarTotalCarrito();
}

function prepararItemCarritoHandler(event) {
  var button = event.target;
  var item = button.parentElement;
  var titulo = item.getElementsByClassName("titulo-item")[0].innerText;
  var precio = item.getElementsByClassName("precio-items")[0].innerText;
  var imagenSrc = item.getElementsByClassName("img-item")[0].src;
  //La siguiente funcion agrega el elemento al carrito. Le mando por parámentros los valores
  agregarItemAlCarrito(titulo, precio, imagenSrc);
}
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  mostrarCarrito();
  var item = document.createElement("div");
  item.className = "carrito-item";
  var itemsCarrito = document.getElementsByClassName("carrito-items")[0];

  var nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (var i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      alert("El item ya se encuentra en el carrito");
      return;
    }
  }

  var itemCarritoContenido = `
        <img src="${imagenSrc}" alt="carrito de la compra" width="80px">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>             
            <input type="text" value="1" class="carrito-item-cantidad" disabled>
             <div class="selector-cantidad"></div>
                 <i class="fa-solid fa-minus restar-cantidad"></i>
                 <i class="fa-solid fa-plus sumar-cantidad"></i>
                 <span class="btn-eliminar">
                 <i class="fa-solid fa-trash"></i>
            </span>
         </div>
        <span class="carrito-item-precio">${precio}</span>
    `

    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);
    //Funcionalidad eliminar nuevo items
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarritoHandler);

    //Funcionalidad sumar nuevo items
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidadHandler)

    //Funcionalidad restar nuevo items
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidadHandler)
    actualizarTotalCarrito();
}
document.getElementsByClassName("btn-pagar")[0].addEventListener("click", mostrarAvisoHandler);
function mostrarAvisoHandler(){
  alert("¡Felicidades! Su compra se ha completado con éxito.")
}