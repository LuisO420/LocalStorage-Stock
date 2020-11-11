// creando un arreglo vacio en el localstorage si es que no existe
if (localStorage.getItem("cart") === null) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// obteniendo el arreglo del carrito del localstorage
let cart = JSON.parse(localStorage.getItem("cart"));

// obteniendo el contenedor principal en la pagina del carrito y el elemento de la tabla 
let products = document.querySelector("#products-list");
let table = document.querySelector("table");

// el numero de orden de los productos en la tabla y el numero del precio total
let order = 1;
let total = 0;

// creando la vista de la pagina del carrito acorde a su largo
if (cart.length === 0) {  //si no hay productos en el carrito
    emptyCart();
} else {  // si hay productos en el carrito
    cart.forEach(product => {
        // mostrando elemento tabla
        table.classList.remove("d-none");

        // creando las filas de la tabla que guarda los productos agregados al carrito
        let row = document.createElement("tr");
        let orderCell = document.createElement("th");
        let imgCell = document.createElement("td");
        let nameCell = document.createElement("td");
        let priceCell = document.createElement("td");
        let quantityCell = document.createElement("td");
        let removeCell = document.createElement("td");

        // creando los elementos que serán localizados dentro de las celdas de la tabla
        let img = document.createElement("img");
        let proQuantity = document.createElement("span");
        let removeButton = document.createElement("button");
        // llenando los elementos encima si se tienen los datos necesarios
        img.setAttribute("src", product.img);
        proQuantity.innerText = product.quantity;
        let quantityStyle = "padding: 0 10px; font-size: 18px; font-weight: bold";
        proQuantity.setAttribute("style", quantityStyle);
        removeButton.setAttribute("href", "#");
        removeButton.textContent = "Comprar";
        let removeStyle = "font-size: 20px; text-decoration: none; color: #000";
        removeButton.setAttribute("style", removeStyle);

        // llenando los elementos encima con la informacion de los productos
        [orderCell, imgCell, nameCell, priceCell, quantityCell, removeCell].forEach(cell => {
            cell.classList.add("align-middle");
        });
        orderCell.setAttribute("scope", "row");
        orderCell.innerText = order++;
        nameCell.innerText = product.name;
        priceCell.innerText = `$${product.price} * ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`;

        // botones para incrementar y disminuir la cantidad de los productos comprados
        let decrement = document.createElement("i");
        let increment = document.createElement("i");
        decrement.className = "fas fa-minus";
        increment.className = "fas fa-plus";

        // agregando la funcion para disminuir la cantidad de productos por click
        decrement.onclick = function() {
            if (this.nextElementSibling.innerText == 1) {
                cart.splice(cart.indexOf(cart.find(p => p.id === product.id)), 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                this.parentElement.parentElement.remove();
                if (cart.length === 0) {
                    table.style.display = "none";
                    emptyCart();
                }
                total = 0;
                cart.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
            } else {
                let index = cart.indexOf(cart.find(p => p.id === product.id));
                cart[index].quantity--;
                proQuantity.innerText = product.quantity;
                priceCell.innerText = `$${product.price} * ${product.quantity} = $${(product.price * product.quantity).toFixed(2)}`;
                total = 0;
                cart.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
        }

        // agregando la funcion para aumentar la cantidad de productos por click
        increment.onclick = () => {
            let index = cart.indexOf(cart.find(p => p.id === product.id));
            // siempre tomar en cuenta el limite del stock
            if (product.quantity < product.limit){
                cart[index].quantity++;
                proQuantity.innerText = product.quantity;
                priceCell.innerText = `$${product.price} * ${product.quantity} = $${product.price * product.quantity}`;
                total = 0;
                cart.forEach(p => total += p.quantity * p.price);
                totalPrice.innerText = `$${total.toFixed(2)}`;
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            else{
                alert("Ya no hay más en existencia");
            }
        }

        // agregando un evento click para eliminar los productos especificados
        removeButton.onclick = function(e) {
            e.preventDefault();
            cart.splice(cart.indexOf(cart.find(p => p.id === product.id)), 1);
            alert("Gracias por su compra, fue un total de: " + `$${product.price * product.quantity}`);
            localStorage.setItem("cart", JSON.stringify(cart));
            this.parentElement.parentElement.remove();
            if (cart.length === 0) {
                table.style.display = "none";
                emptyCart();
            }
            productQuantity();
            total = 0;
            cart.forEach(p => total += p.quantity * p.price);
            totalPrice.innerText = `$${total.toFixed(2)}`;
        }

        // añadiendo elementos a los elementos padres
        imgCell.appendChild(img);
        quantityCell.append(decrement, proQuantity, increment);
        removeCell.appendChild(removeButton);
        row.append(orderCell, imgCell, nameCell, priceCell, quantityCell, removeCell);
        table.lastElementChild.appendChild(row);

        // alguna funcionalidades responsivas para la tabla
        if (screen.width < 578) {
            imgCell.style.display = "none";
        }
    });

    // adding last table cell for showing the total price of purchased items
    let totalPriceRow = document.createElement("tr");
    let totalPriceCell = document.createElement("td");
    totalPriceCell.setAttribute("colspan", "6");
    totalPriceCell.classList.add("text-right");
    cart.forEach(p => total += p.quantity * p.price);
    totalPriceCell.innerHTML = `<span style="font-size: 20px; margin-right: 20px;">Precio total:</span>`;
    let totalPrice = document.createElement("span");
    totalPrice.style.fontWeight = "bold";
    totalPrice.style.fontSize = "20px";
    totalPrice.innerText = `$${total.toFixed(2)}`;
    totalPriceCell.appendChild(totalPrice);
    totalPriceRow.appendChild(totalPriceCell);
    table.appendChild(totalPriceRow);

    // some functionalities for responsiveness of the table
    if (screen.width < 768) {
        products.classList.remove("container");
        totalPriceCell.classList.remove("text-right");
        totalPriceCell.classList.add("text-left");
    }
}

// function for changing the product quantity near the shopping cart icon
function productQuantity() {
    if (localStorage.getItem("cart") === null) {
        document.getElementById("productQuantity").innerText = 0;
    } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        document.getElementById("productQuantity").innerText = cart.length;
    }
}

// llama a la función cada vez que se actualice la cantidad de productos en cada carga
productQuantity();

// llamando a la función cada seg. por si el usuario borra el localstorage
setInterval(productQuantity, 1000);

// funcion mensaje por si el carrito está vacío
function emptyCart() {
    table.style.display = "none";
    let message = document.createElement("h1");
    message.style.padding = "200px 0";
    message.style.border = "2px dashed rgb(167, 161, 161)";
    message.style.borderRadius = "10px";
    message.innerHTML = `<p style="text-align: center;">No hay productos en tu carrito... <br /><br /> <a href="vista-compra.html">Adelante</a> y agrega algo...</p>`;
    products.appendChild(message);
}