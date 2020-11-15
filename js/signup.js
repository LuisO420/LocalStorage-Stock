if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", JSON.stringify([]));
}

function signup() {     

//creacion del localstorage para el usuario
if (localStorage.getItem("user") === null) {
  localStorage.setItem("user", JSON.stringify([]));
}

//obteniendo variables para el usuario
let usuario = JSON.parse(localStorage.getItem("user"));
let correo = document.getElementById('correo').value;  
let pass = document.getElementById('pass').value;    
let nombre = document.getElementById('nom').value;    
let apellido = document.getElementById('ape').value;    

//asignar una identificacion en el localstorage a cada usuario
let listaUser = usuario.find(lis => lis.correo == correo);
if (listaUser === undefined) {
    usuario.push({
        correo: correo,
        pass: pass,
        nombre: nombre,
        apellido: apellido,
    });

//guardar datos en el local storage
localStorage.setItem("user", JSON.stringify(usuario));

alert("Cuenta creada éxitosamente!");   
document.getElementById("signup").reset();
    }
}
