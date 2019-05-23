var utente = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));
var venditori = JSON.parse(localStorage.getItem("Venditori"));
var clienti = JSON.parse(localStorage.getItem("Clienti"));


function infoUtente(){
    var titolo = document.getElementById("titolo");
    titolo.innerHTML = utente.nome +' '+ utente.cognome;

    if(utente.tipo == "Cliente"){
        var tipo = document.getElementById("tipoUtente");
        tipo.innerHTML = utente.tipo;
        var nome = document.getElementById("nome");
        nome.value = utente.nome;
        var cognome = document.getElementById("cognome");
        cognome.value = utente.cognome;
        var telefono = document.getElementById("telefono");
        telefono.value = utente.telefono;
        var indirizzo = document.getElementById("indirizzo");
        indirizzo.value = utente.indirizzo;
        var email = document.getElementById("email");
        email.value = utente.email;
        var password1 = document.getElementById("password1");
        password1.value = utente.password;
        var password2 = document.getElementById("password2");
        password2.value = utente.password;


        for(i=0; i<document.getElementsByName("pagamento").length; i++){
            if(document.getElementsByName("pagamento")[i].text == utente.pagamento){
                document.getElementsByName("pagamento")[i].selected = true;
            }
        }

    }
    else{
        document.getElementById("form-v").style.display = "block";
        document.getElementById("form-c").style.display = "none";

        var tipo = document.getElementById("tipoUtente");
        tipo.innerHTML = utente.tipo;
        var nome = document.getElementById("nomeV");
        nome.value = utente.nome;
        var cognome = document.getElementById("cognomeV");
        cognome.value = utente.cognome;
        var nomeAtt = document.getElementById("nomeAtt");
        nomeAtt.value = utente.nomeAttivita;
        var tipoAtt = document.getElementById("tipoAtt");
        tipoAtt.value = utente.tipoAttivita;
        var telefono = document.getElementById("telefonoV");
        telefono.value = utente.telefono;
        var piva = document.getElementById("piva");
        piva.value = utente.partitaIva;
        var email = document.getElementById("emailV");
        email.value = utente.email;
        var password1 = document.getElementById("password1");
        password1.value = utente.password;
        var password2 = document.getElementById("password2");
        password2.value = utente.password;
    }
}

function ripristinaAccount(){
    window.location.href = "InfoUtente.html";
}

function modificaAccount(){
    var utenteModificato;

    if(document.getElementById("password1").value != document.getElementById("password2").value){
        alert("La password è diversa");
    }
    else if(document.getElementById("privacy").checked == false){
        alert("Devi accettare le condizioni di privacy");
    }
    else{
        if(utente.tipo == "Cliente"){
            var nome = document.getElementById("nome").value;
            var cognome = document.getElementById("cognome").value;
            var telefono = document.getElementById("telefono").value;
            var indirizzo = document.getElementById("indirizzo").value;
            var email = document.getElementById("email").value;
            var p = document.getElementById("pagamento");
            var pagamento = p.options[p.selectedIndex].text;
            var privacy = document.getElementById("privacy").value;
            var password = document.getElementById("password1").value;
    
            utenteModificato = new Cliente(nome, cognome, telefono, indirizzo, email, pagamento, privacy, password);

            for(var i=0; i<clienti.length; i++){
                if(utente.email == clienti[i].email && utente.password == clienti[i].password){
                    utenteModificato.tipo = "Cliente";
                    clienti.splice(i,1);
                    clienti.push(utenteModificato);
                    localStorage.setItem("Clienti", JSON.stringify(clienti));     
                }
            }
            sessionStorage.setItem("UtenteRegistrato", JSON.stringify(utenteModificato));
        }    
        else{    
            var nome = document.getElementById("nomeV").value;
            var cognome = document.getElementById("cognomeV").value;
            var nomeAtt = document.getElementById("nomeAtt").value;
            var tipoAtt = document.getElementById("tipoAtt").value;
            var telefono = document.getElementById("telefonoV").value;
            var email = document.getElementById("emailV").value;
            var piva = document.getElementById("piva").value;
            var password = document.getElementById("password1").value;
    
            utenteModificato = new Venditore(nome, cognome, nomeAtt, tipoAtt, telefono, email, piva, password);
    
            for(var i=0; i<venditori.length; i++){    
                if(utente.email == venditori[i].email && utente.password == venditori[i].password){    
                    utenteModificato.tipo = "Venditore";
                    venditori.splice(i,1);
                    venditori.push(utenteModificato);
                    localStorage.setItem("Venditori", JSON.stringify(venditori));                    
                }
            }    
            sessionStorage.setItem("UtenteRegistrato", JSON.stringify(utenteModificato));    
        }   
        alert("Modifica avvenuta con successo!");
        window.location.href = "InfoUtente.html"
    }  
}

function eliminaAccount(){
    if(utente.tipo == "Cliente"){
        for(var i=0; i<clienti.length; i++){
            if(utente.email == clienti[i].email && utente.password == clienti[i].password){
                clienti.splice(i,1);
                localStorage.setItem("Clienti", JSON.stringify(clienti));   
            }
        }
    }
    else{
        for(var i=0; i<venditori.length; i++){
            if(utente.email == venditori[i].email && utente.password == venditori[i].password){
                venditori.splice(i,1);
                localStorage.setItem("Venditori", JSON.stringify(venditori));        
            }
        }
    }
    sessionStorage.clear();
    window.location.href = "Home.html";
}