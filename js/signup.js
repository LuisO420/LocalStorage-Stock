function signup() {     
    var uname = document.getElementById('uname').value;    
    var pass = document.getElementById('pass').value;    
    localStorage.setItem(uname, pass);
    alert("Cuenta creada éxitosamente!");   
    document.getElementById("signup").reset();
     
}
