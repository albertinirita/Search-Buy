function formV(){
    document.getElementById("form-v").style.display = "block";
    document.getElementById("form-c").style.display = "none";
}

function formC(){
    document.getElementById("form-c").style.display = "block";
    document.getElementById("form-v").style.display = "none";
}


class Venditore {
    constructor(nome, cognome, nomeAttivita, tipoAttivita, telefono, email, partitaIva, password) {
        this.nome = nome;
        this.cognome = cognome;
        this.nomeAttivita = nomeAttivita;
        this.tipoAttivita = tipoAttivita;
        this.telefono = telefono;
        this.email = email;
        this.partitaIva = partitaIva;
        this.password = password;
        this.prodotti = [];
        
    }
}

class Cliente {
    constructor(nome, cognome, telefono, indirizzo, email, pagamento, privacy, password) {
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.indirizzo = indirizzo;
        this.email = email;
        this.pagamento = pagamento;
        this.privacy = privacy;
        this.password = password;
        this.ordini = [];
    }
}


function validazione(){
    if(document.getElementById("password1").value != document.getElementById("password2").value){
        alert("La password è diversa");
    }
    else{
        document.getElementById("form-c").action = "Login.html";
        registrazione();
        alert("La tua registrazione è avvenuta con successo!\nSarai reindirizzato alla pagina di login");
    }
}

function registrazione(){
    if(document.getElementById("form-v").style.display == "block"){
        var nome = document.getElementById("nomeV").value;
        var cognome = document.getElementById("cognomeV").value;
        var nomeAtt = document.getElementById("nomeAtt").value;
        var tipoAtt = document.getElementById("tipoAtt").value;
        var telefono = document.getElementById("telefonoV").value;
        var email = document.getElementById("emailV").value;
        var piva = document.getElementById("piva").value;
        var password = document.getElementById("password1").value;

        var venditore = new Venditore(nome, cognome, nomeAtt, tipoAtt, telefono, email, piva, password);

        var venditori = JSON.parse(localStorage.getItem("Venditori"));
        venditori.push(venditore);
        localStorage.setItem("Venditori", JSON.stringify(venditori));
    }    
    else{
        var nome = document.getElementById("nome").value;
        var cognome = document.getElementById("cognome").value;
        var telefono = document.getElementById("telefono").value;
        var indirizzo = document.getElementById("indirizzo").value;
        var email = document.getElementById("email").value;
        var p = document.getElementById("pagamento");
        var pagamento = p.options[p.selectedIndex].text;
        var privacy = document.getElementById("privacy").value;
        var password = document.getElementById("password1").value;

        var cliente = new Cliente(nome, cognome, telefono, indirizzo, email, pagamento, privacy, password);

        var clienti = JSON.parse(localStorage.getItem("Clienti"));
        clienti.push(cliente);
        localStorage.setItem("Clienti", JSON.stringify(clienti));
    }  
}





