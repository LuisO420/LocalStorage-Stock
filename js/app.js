// creando un arreglo vacio en el localstorage si es que no existe
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// definiendo los botones para agregarlos a los productos del carrito
let add = document.querySelectorAll(".add");
let proQuantity = document.createElement("span");

for (let button of add) {
    button.addEventListener("click", function(e) {
        e.preventDefault();

        // checando si el arreglo del carrito exista en el localstorage o no
        if (JSON.parse(localStorage.getItem("cart")) === null) {
            localStorage.setItem("cart", JSON.stringify([]));
        }

        // creando los valores para el objeto que ser'a agregado al carrito
        let cart = JSON.parse(localStorage.getItem("cart"));
        let id = this.parentNode.parentNode.getAttribute("id");
        let img = this.parentNode.previousElementSibling.getAttribute("src");
        let name = this.parentElement.firstElementChild.innerText;
        let price = Number(this.previousElementSibling.lastElementChild.innerText);
        let limit = Number(this.previousElementSibling.previousElementSibling.lastElementChild.innerText);

        // creando y checando que el producto clickeado exista en el carrito o no
        let product = cart.find(pro => pro.id == id);
        if (product === undefined) {
            cart.push({
                id: id,
                img: img,
                name: name,
                price: price,
                quantity: 1,
                limit: limit,
            });
            
        localStorage.setItem("cart", JSON.stringify(cart));

        // llamando a la funci'on para actualizar los productos en el carrito
        productQuantity();
        } else {
            if (product.quantity < product.limit){
                product.quantity++;
                localStorage.setItem("cart", JSON.stringify(cart));
                productQuantity();
                this.previousElementSibling.previousElementSibling.lastElementChild.innerText = product.limit - product.quantity;
            }
            else{
                this.previousElementSibling.previousElementSibling.lastElementChild.innerText = " No hay más en existencia";
            }
        }
    });
}


// funcion que cambia la cantidad de tipo de productos cerca del icono del carrito
function productQuantity() {
    if (localStorage.getItem("cart") === null) {
        document.getElementById("productQuantity").innerText = 0;
    } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        document.getElementById("productQuantity").innerText = cart.length;
    }
}

//para que se actualice cada prodcuto en correspondencia al cambio del localstorage
if (cart.length === 0)
{
}
else{
    //se busca en cada parte de cart un producto y se compara la id del producto en cart con la id de los elementos en el html para que su string
    //se reemplazado con el valor actual.
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.forEach(product => {
        for (var i=1;i<7;i++){
            if (product.id == "product"+String(i)){
                document.getElementById("cantidad"+String(i)).innerText = product.limit - product.quantity;
                if(product.limit - product.quantity == 0){
                    document.getElementById("cantidad"+String(i)).innerText = " No hay más en existencia";
                }
            }
        }
    });
}

// calling the function for updating the product quantity on each load
productQuantity();

// calling productQuantity function each 1 second for updating the product quantity if the user will clear all localStorage items
setInterval(productQuantity, 1000);