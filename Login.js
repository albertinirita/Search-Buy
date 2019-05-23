if(localStorage.getItem("Clienti") == null){
    localStorage.setItem("Clienti", JSON.stringify(Clienti));
}
if(localStorage.getItem("Venditori") == null){
    localStorage.setItem("Venditori", JSON.stringify(Venditori));
}

function login(){
    var e = document.getElementById("email").value;
    var p = document.getElementById("password").value;
    var giusto = false;
    
    if(document.getElementsByName("tipo")[0].checked){
        var clienti = JSON.parse(localStorage.getItem("Clienti"));
        for(var i=0; i<clienti.length; i++){
            if(e == clienti[i].email && p == clienti[i].password){
                clienti[i].tipo = "Cliente"
                sessionStorage.setItem("UtenteRegistrato", JSON.stringify(clienti[i]));
                window.location.href = "Home.html";
                giusto = true;
                if(sessionStorage.getItem("Carrello") != null){
                    sessionStorage.setItem("Carrello", sessionStorage.getItem("Carrello"));
                }
                else{
                    sessionStorage.setItem("Carrello", "[]");
                }
            }
        }
        if(giusto == false){
            alert("E-mail o password sbagliati");
        }
    }
    else if(document.getElementsByName("tipo")[1].checked){
        var venditori = JSON.parse(localStorage.getItem("Venditori"));
        for(i=0; i<venditori.length; i++){
            if(e == venditori[i].email && p == venditori[i].password){
                venditori[i].tipo = "Venditore"
                sessionStorage.setItem("UtenteRegistrato", JSON.stringify(venditori[i]));
                window.location.href = "Home.html";
                giusto = true;
                if(sessionStorage.getItem("Carrello") != null){
                    sessionStorage.removeItem("Carrello");
                }
            }  
        }
        if(giusto == false){
            alert("E-mail o password sbagliati");
        }
    }
}
