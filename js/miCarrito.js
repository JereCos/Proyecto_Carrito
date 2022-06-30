let limitRetry = 3;
let flagLogueo = true;
let flagMostrarProductos = false;
let precioTotal = 0;
let aux;
let auxPrecio;
let auxiliar;
let productos = [];
let mostrarCarrito = [];
let precios = [];

/*----------------------------------------------Funciones para recuperar productos del carrito--------------------------------------------*/

//Función mostrar carrito como array
function showCarrito (){
    mostrarCarrito = JSON.parse(localStorage.getItem("carrito"))
    
    if (mostrarCarrito == null){
        console.warn("No hay productos en el carro");
    }
}   

//Función para quitar todos los productos del carrito
function limpiarCarrito (){
    mostrarCarrito = localStorage.clear("carrito");
    productos = [];
    precioTotal = 0;
}

//función para agregar producto comprado al array nombreProductos
function finalizarCompra (){ 
/*     mostrarCarrito.forEach(objeto => {
        for (const propiedad in objeto) {
            console.log(`${propiedad}: ${objeto.subtotal}`)
        }
    });  */

    let total = mostrarCarrito.reduce((precioTotal, subtotal) => precioTotal + subtotal.subtotal,0)
    return total

}

//Botón Finalizar compra
function btnFinalizarCompra (){
    btnConfirma.innerHTML = `<button id="btnFinaliza" class="waves-effect waves-light btn" type="submit">Confirmar compra</button>
    <br><br>`
}

//Botón Limpiar Carrito
function btnVaciar (){
    btnLimpia.innerHTML = `<button id="btnVacia" class="waves-effect waves-light btn" type="submit">Vaciar carrito</button>
    <br><br>`
}

//Botón Mostrar Carrito
function btnGeneraTabla (){
    btnCrearTabla.innerHTML = `<button id="btnComprar" class="waves-effect waves-light btn" type="submit">Mostrar carrito</button>
    <br><br>`
}

//Función Generar Tabla de productos comprados
function mostrarProductos(){
    if(mostrarCarrito == null){
        console.warn("No hay productos en el carro");
    }else{
        if(flagMostrarProductos === false){
            mostrarCarrito.forEach(producto => {

                const {imagen, titulo, subtotal, cantidad} = producto

                let tarjeta = `<a href="#" class="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${imagen}" alt="${titulo}">
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${titulo}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Subtotal: $${subtotal}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Cantidad: ${cantidad}</p>
                </div>
            </a>
            <br><br>` 

                btnCrearTabla.innerHTML += tarjeta;

                flagMostrarProductos = true;
            });
        }else{
            btnCrearTabla.innerHTML = `<button id="btnFinaliza" class="waves-effect waves-light btn" type="submit">Mostrar Carrito</button>
            <br><br>`

            flagMostrarProductos = false;

        }
    }
};

/* function generarTabla (){
    let tabla   = document.createElement("table");                                           //crea etiqueta table en miCarrito
    let tblBody = document.createElement("tbody");                                           //crea etiqueta tbody en miCarrito

    const headTabla = ["Producto", "Precio", "Cantidad", "Total"]

    for(k = 0 ; k < headTabla.length; k += 1){
        let tablaHead = document.createElement("th");                                       //crea etiqueta thead en miCarrito
        let celdaEncabezado = document.createElement("td");                                 //crea etiqueta td en miCarrito
        let textoCeldaEncabezado = document.createTextNode(headTabla[k]);                   //Escribe cada Encabezado
        celdaEncabezado.appendChild(textoCeldaEncabezado);                                  //Agrega texto a encabezado
        tablaHead.appendChild(celdaEncabezado);                                             //Agrega encabezado a la tabla
        tblBody.appendChild(tablaHead);                                                     //Agrega encabezado a body
    }
    for (i = 0; i < productos.length; i += 1) {
        let fila = document.createElement("tr");                                            //Crea nueva fila
        let celdaUno = document.createElement("td");                                        //Agrega etiqueda td en miCarrito (1era celda de fila)
        let textoCeldaUno = document.createTextNode(productos[i]);                                   //Escribe número de alumno
        celdaUno.appendChild(textoCeldaUno);                                                //Agrega el número de alumno a la celda
        fila.appendChild(celdaUno);                                                         //Agrega a la fila la celda
        tblBody.appendChild(fila);                                                          //Agrega al body la fila
        let celdaDos = document.createElement("td");                                        //Agrega etiqueda td en miCarrito (2da celda de fila)
        let textoCeldaDos = document.createTextNode(precios[i]);                         //Escribe nota asociada al número de alumno
        celdaDos.appendChild(textoCeldaDos);                                                //Agrega nota a la celda
        fila.appendChild(celdaDos);                                                         //Agrega la fila la celda
        tblBody.appendChild(fila);                                                          //Agrega la fila al body
    }
    tabla.appendChild(tblBody);
    btnCrearTabla.appendChild(tabla);
} */

//Función sweet alert
function compraConfirmada (){
    if (mostrarCarrito == null){
        swal("Compra no realizada", "Ningun producto fue agregado al carro", "error");
    }else{
        swal("Su compra fue confirmada", "El total de su compra es $" + finalizarCompra(), "success");

        btnCrearTabla.innerHTML = `<button id="btnFinaliza" class="waves-effect waves-light btn" type="submit">Mostrar Carrito</button>
        <br><br>`
    }
}
//----------------------------------------------------COMIENZO DE MAIN-----------------------------------------------------//

const btnCrearTabla = document.querySelector("#btnTabla")
const btnConfirma = document.querySelector("#btnFinalizar")
const btnLimpia = document.querySelector("#btnLimpiar")

btnGeneraTabla();
btnFinalizarCompra();
btnVaciar();

showCarrito();

console.log(mostrarCarrito)


btnCrearTabla.addEventListener("click", function (e){
    e.preventDefault();
    mostrarProductos();
});

btnConfirma.addEventListener("click", function (e){
    e.preventDefault();
    compraConfirmada();
    limpiarCarrito(); 
});

btnLimpia.addEventListener("click", function (e){
    e.preventDefault();
    limpiarCarrito();
});