

// LAS ANOTACIONES SON PARA MI POR QUE SI NO ME OLVIDO XD


// un login de usuario para despues darle las gracias cuando finalize la compra

const usuario = {
    nombre : prompt ("cual es tu nombre ?"),
    edad: Number(prompt (" cuantos años tienes ?")),
    correo: prompt ("Ingresa tu mail para recibir los links de descarga"),
};

const {nombre,edad,correo} = usuario;

const permiso = usuario.edad >= 18 ? true: false;

permiso?alert( "bienvenido, agrega productos al carrito"):alert( usuario.nombre + " sos menor de edad, volve cuando seas mayor" )

// agradecimiento compra

let gracias = document.getElementById("comprarModalLabel")
gracias.innerText = "gracias por la compra " + nombre ;

let gracias2 =document.getElementById("gracias2")
gracias2.innerText = " en breve recibiras un mail a " + correo ;


// LOS EVENTOS PARA CLICKEAR LOS BOTONES

const addToShoppingCartButton = document.querySelectorAll(".addToCart");
addToShoppingCartButton.forEach(addToCardButton => {
    addToCardButton.addEventListener("click", addTocartClicked)
})
// SE VA A USAR VARIAS VECES, POR ESO LA PONGO DE FORMA GLOBAL

const shoppingCartItemsContainer=document.querySelector(".shoppingCartItemsContainer");
function addTocartClicked(event){
    const button = event.target ;
    const item = button.closest(".item")

    const itemTitle = item.querySelector(".item-title").textContent;
    const itemPrice= item.querySelector(".item-price").textContent;
    const itemImage=item.querySelector(".item-image").src;

    addItemToShoppingCart(itemTitle,itemPrice,itemImage)

}


//ESTO SE VA A VER DENTRO DEL CARRITO 

function addItemToShoppingCart(itemTitle,itemPrice,itemImage){
    const shoppingCartRow = document.createElement("div");

// STRINGLITERAL, SE AGREGA TODO EL HTML A USAR
    const shoppingCartContent = 

// ${------}     SELECCIONAR UNA VARIABLE A USAR
`
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}        
                </h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
    </div>
</div> `

// DEFINICION DE FUNCIONES EN LA PARTE DE CARRITO 
shoppingCartRow.innerHTML = shoppingCartContent;
shoppingCartItemsContainer.append (shoppingCartRow);

//funciones para el botton de sacar

shoppingCartRow.querySelector(".buttonDelete"),addEventListener("click", removeShoppingCartItem );

// funcion para actualizar el precio con el boton rojo 

shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change", quantityChanged );

upDateShoppingCartTotal();


}

// funcion para ir sumar el total del carrito //
function  upDateShoppingCartTotal(){
    let total = 0;
    const shoppingCartTotal = document.querySelector(".shoppingCartTotal");

    const shoppingCartItems=  document.querySelectorAll(".shoppingCartItem")

    shoppingCartItems.forEach(shoppingCartItem => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice");

        const shoppingCartItemPrice = Number (
            shoppingCartItemPriceElement.textContent.replace("$","" )
        );

    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector (".shoppingCartItemQuantity");

    const shoppingCartItemQuantity = Number (shoppingCartItemQuantityElement.value);

// esto imprime la actualizacion del total 
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity
    }); 
shoppingCartTotal.innerHTML = ` ${total} $ `  

localStorage.setItem("carritoimg", itemImage);
localStorage.setItem("carritotitle", itemTitle);
localStorage.setItem("carritoprecio", itemPrice);

}

let itemImageStorage = localStorage.getItem("carritoimg", "carritotitle", "carritoprecio");

shoppingCartContent = itemImageStorage






// funcion para remover con el botton 

function removeShoppingCartItem(event) {
    const buttonClicked= event.target;
    buttonClicked.closest(".shoppingCartItem").remove();
}

// funcion para que actualize el precio cuando se retira el producto 

function quantityChanged(event){
    const input = event.target;
    if (input.value <= 0){
        input.value = 1;
    }
}


//confirmacion de compra
let button = document.getElementById("mybut")
button.addEventListener("click", () => {
    Swal.fire(
    'Compra Realizada',
    'Haz realizado la compra con exito!',
    'success'
)
})

//  traer producto de json 

const pedirDatos = async() => {
    const respuesta = await fetch("/producto.json");
    const productos = await respuesta.json ();
    const contenedorProductos = document.getElementsByClassName("shoppingCartItem")
    productos.forEach(prod => {
        const div = document.createElement("div")
        div.innerHTML =
        `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${producto.img} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${producto.nombre}        
                </h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${producto.precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
    </div>
</div> `
contenedorProductos.append(div)


    })
}
