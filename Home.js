if(localStorage.getItem("Prodotti") == null){
    localStorage.setItem("Prodotti", JSON.stringify(Prodotti));
}

var prodotti = JSON.parse(localStorage.getItem("Prodotti"));

function accesso(){
    if(sessionStorage.getItem("UtenteRegistrato") == null){
        var log = document.getElementById("log");
        var a = document.createElement('a');
        a.className = "nav-link text-dark";
        a.href = "Login.html";
        a.innerHTML = "Accedi";
        log.appendChild(a);

        document.getElementById("ordini").href = "";
        document.getElementById("ordini").onclick = function(){alert("Accedi per vedere i tuoi ordini")};
    }
    else{
        if (JSON.parse(sessionStorage.getItem("UtenteRegistrato")).tipo == "Venditore") {
            var nav1 = document.getElementById("ordini");
            nav1.innerHTML = "Prodotti";
            nav1.href = "ProdottiVenditore.html";
            document.getElementById("carrello").style.display = "none";
        }
        var log = document.getElementById("log");
        var a = document.createElement('a');
        a.className = "nav-link text-dark";
        a.href = "InfoUtente.html";
        var utente = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));
        var nome = utente.nome +' '+utente.cognome;
        a.innerHTML = '<u>'+nome+'</u>';
        log.appendChild(a);

        var nav = document.getElementById("navbarCollapse");
        var esci = document.createElement('ul');
        esci.className = "navbar-nav";
        esci.innerHTML = '<li class="nav-item"><button class="btn border-0 p-0 text-dark" type="button" onclick="logout()">Esci</button></li>';
        nav.appendChild(esci);
    }
    if(sessionStorage.getItem("Carrello") != null && sessionStorage.getItem("Carrello") != "[]"){
        var carrello = document.getElementById("carrello");
        var nProd = document.createElement('span');
        nProd.className = "badge badge-primary ml-1";
        nProd.innerHTML = JSON.parse(sessionStorage.getItem("Carrello")).length;
        carrello.appendChild(nProd);
    }
}
    
function caricamento(){
    var mainContainer = document.getElementById("main");
    for(i=0; i<prodotti.length; i++){
        var div = document.createElement("div");
        div.className = "media border-bottom p-4 divhome";
        div.innerHTML = '<img class="bd-placeholder-img mr-4 imghome" src="' + prodotti[i].Immagine + '"><div class="media-body"><a href="InfoProdotto.html?prodotto=' + prodotti[i].Codice + '"><h5>' + prodotti[i].Nome + '</h5></a><br><p>' + prodotti[i].Descrizione + '</p><hr><p>Prezzo: ' + prodotti[i].Prezzo + ' €</p><p>' +prodotti[i].Spedizione+'</p> </div>';
        mainContainer.appendChild(div);
    }
}

function logout(){
    if(confirm("Sei sicuro di voler uscire dal tuo account?")){
        sessionStorage.clear();
        window.location.href = "Home.html";
    }
    else{}
}

function cerca(){
    var str = document.getElementById("search").value.toUpperCase();
    var mainContainer = document.getElementById("main");
    
    for(i=0; i<prodotti.length; i++){
        var nomeProd = prodotti[i].Nome.toUpperCase();

        if(nomeProd.search(str) >= 0){
            while (mainContainer.hasChildNodes()) {   
                mainContainer.removeChild(mainContainer.firstChild);
            }
            var div = document.createElement("div");
            div.className = "media border-bottom p-4 divhome";
            div.innerHTML = '<img class="bd-placeholder-img mr-4 imghome" src="' + prodotti[i].Immagine + '"><div class="media-body"><a href="InfoProdotto.html?prodotto=' + prodotti[i].Codice + '"><h5>' + prodotti[i].Nome + '</h5></a><br><p>' + prodotti[i].Descrizione + '</p><hr><p>Prezzo: ' + prodotti[i].Prezzo + ' €</p><p>' +prodotti[i].Spedizione+'</p> </div>';
            mainContainer.appendChild(div);
        }
    }
}

function caricaCategoria(value){
    var mainContainer = document.getElementById("main");
    while (mainContainer.hasChildNodes()) {   
        mainContainer.removeChild(mainContainer.firstChild);
    }
    for(i=0; i<prodotti.length; i++){
        if(value == prodotti[i].Categoria){
            var div = document.createElement("div");
            div.className = "media border-bottom p-4";
            div.innerHTML = '<img class="bd-placeholder-img mr-4 imghome" src="' + prodotti[i].Immagine + '"><div class="media-body"><a href="InfoProdotto.html?prodotto=' + prodotti[i].Codice + '"><h5>' + prodotti[i].Nome + '</h5></a><br><p>' + prodotti[i].Descrizione + '</p><hr><p>Prezzo: ' + prodotti[i].Prezzo + ' €</p><p>' +prodotti[i].Spedizione+'</p> </div>';
            mainContainer.appendChild(div);
        }
    }
}