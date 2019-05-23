var url = document.location.href;
var string0 = url.split("?");
var string1 = string0[1].split("=");
var codiceProdotto = string1[1];

var venditoreProdotto;
for(i=0; i<Venditori.length; i++){
    var prodotti = Venditori[i].prodotti
    for(j=0; j<prodotti.length; j++){
        if(codiceProdotto == prodotti[j]){
            venditoreProdotto = Venditori[i];  
        }
    }
}
var prodotti = JSON.parse(localStorage.getItem("Prodotti"));
var utente = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));

function infoProd(){
    if(sessionStorage.getItem("UtenteRegistrato") == null || utente.tipo == "Venditore"){
        document.getElementById("commento").style.display = "none";
        document.getElementById("aggcom").style.display = "none";
        if(prodotti[codiceProdotto-1].Recensioni.length == 0){
            document.getElementById("cardRec").style.display = "none";
        }

    }
    var nomeProd = document.getElementById("nomeProdotto");
    nomeProd.innerHTML = prodotti[codiceProdotto-1].Nome;
    var descrizione = document.getElementById("descrizione");
    descrizione.innerHTML = prodotti[codiceProdotto-1].Descrizione+'<br><br>Venduto da '+ venditoreProdotto.nomeAttivita+'<br><br>Prezzo: '+prodotti[codiceProdotto-1].Prezzo+' €<br><br>'+prodotti[codiceProdotto-1].Spedizione+'<br><br>';
    var immagine = document.getElementById("immagine"); 
    immagine.src = prodotti[codiceProdotto-1].Immagine;
    var nomeCard = document.getElementById("nomeCard");
    nomeCard.innerHTML = prodotti[codiceProdotto-1].Nome;
    var infoCard = document.getElementById("infoCard");
    infoCard.innerHTML = 'Prezzo: '+prodotti[codiceProdotto-1].Prezzo+' €<br><br>'+prodotti[codiceProdotto-1].Spedizione+'<br><br>'
    
    var form;
    if(prodotti[codiceProdotto-1].QuantitaMax>0){
        form = document.createElement('form');
        form.innerHTML =  'Quantità: <input type="number" id="quantita" name="quantita" min="0" max="'+prodotti[codiceProdotto-1].QuantitaMax+'" step="1" value="1"></input>';
    }
    else{
        form = document.createElement('form');
        form.innerHTML =  'Quantità: <input type="number" name="quantita" min="0" max="'+prodotti[codiceProdotto-1].QuantitaMax+'" step="1" value="0"></input>';
        var finito = document.getElementById("aggiungiCarrello");
        finito.className = "btn btn-danger disabled";
        finito.innerHTML = "Prodotto Terminato";
    }
    infoCard.appendChild(form);

    for(i=0; i<prodotti[codiceProdotto-1].Recensioni.length; i++){
        var commento = prodotti[codiceProdotto-1].Recensioni[i];
        var recensioni = document.getElementById("recensioni");
        var pnome = document.createElement("p");
        pnome.innerHTML = "<u>"+commento.nome + " " + commento.cognome+":</u>";
        recensioni.appendChild(pnome);
        var pcomm = document.createElement("p");
        pcomm.innerHTML = commento.messaggio + "<br><hr>";
        recensioni.appendChild(pcomm);
    }
}

var quantita;

function aggiungiCarrello(){
    quantita = document.getElementById("quantita").value;

    if(sessionStorage.getItem("Carrello") == null){
        sessionStorage.setItem("Carrello", "[]");
    }
        var carrello = JSON.parse(sessionStorage.getItem("Carrello"));

        console.log(carrello);

        var inserito = false;
        for(i=0; i<carrello.length; i++){
            if(carrello[i].Codice == prodotti[codiceProdotto-1].Codice){
                inserito = true;
                var q = parseInt(carrello[i].Quantita) + parseInt(quantita);
                if(q <= carrello[i].QuantitaMax ){
                    carrello[i].Quantita = q.toString();
                    sessionStorage.setItem("Carrello", JSON.stringify(carrello));
                    alert("Prodotto aggiunto correttamente");
                    window.location.href = "Home.html";
                }
                else{
                    alert("Non ci sono abbastanza prodotti disponibili");
                }
            }
        }
    
        if(inserito == false && quantita <= prodotti[codiceProdotto-1].QuantitaMax){
            prodotti[codiceProdotto-1].Quantita = quantita;
            carrello.push(prodotti[codiceProdotto-1]);
            sessionStorage.setItem("Carrello", JSON.stringify(carrello));
            alert("Prodotto aggiunto correttamente");
            window.location.href = "Home.html";
        }
        if(quantita > prodotti[codiceProdotto-1].QuantitaMax){
            alert("Non ci sono abbastanza prodotti disponibili");
        }
    }
    


class Commento{
    constructor(nomeUtente, cognomeUtente, messaggio){
        this.nome = nomeUtente;
        this.cognome = cognomeUtente;
        this.messaggio = messaggio;
    }
}

function aggiungiRecensione(){
    var commento = new Commento(utente.nome, utente.cognome, document.getElementById("commento").value);
    prodotti[codiceProdotto-1].Recensioni.push(commento);
    
    var recensioni = document.getElementById("recensioni");
    var pnome = document.createElement("p");
    pnome.innerHTML = "<u>"+commento.nome + " " + commento.cognome+":</u>";
    recensioni.appendChild(pnome);
    var pcomm = document.createElement("p");
    pcomm.innerHTML = commento.messaggio + "<br><hr>";
    recensioni.appendChild(pcomm);

    localStorage.setItem("Prodotti", JSON.stringify(prodotti));
    document.getElementById("commento").value = null;
}

