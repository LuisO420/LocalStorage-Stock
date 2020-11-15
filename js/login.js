function login() {
    var userCorreo = document.getElementById('correo').value;
    var userPass = document.getElementById('pass').value;
    let lis = JSON.parse(localStorage.getItem("user"));

    //buscar datos en el localstorage
    lis.forEach(listaUser => {
        for (var i=1;i<lis.length+1;i++){
            if (listaUser.correo != userCorreo){
                alert("No existe la cuenta");
            }
            //comparacion de datos ingresados con el localstorage
            else if (listaUser.correo == userCorreo && listaUser.pass == userPass){
                alert("Bienvenido, " + userCorreo);
                location.href = 'html/vista-compra.html';
            }
            else {
                alert("La contraseña es erronea.");
            }
        }
    });

}
