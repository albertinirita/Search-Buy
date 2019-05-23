var carr = JSON.parse(sessionStorage.getItem("Carrello"));
var utente = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));
var prodotti = JSON.parse(localStorage.getItem("Prodotti"));

var totale = 0;

function carrello(){

    var mainContainer = document.getElementById("main");
    var riepilogo = document.getElementById("riepilogo");

    if(sessionStorage.getItem("Carrello") == null || sessionStorage.getItem("Carrello") == "[]"){

        var cont = document.getElementById("cont")

        var vuoto = document.createElement("div");
        vuoto.className = "w-75 mx-auto shadow-sm rounded bg-white p-5 border"
        vuoto.innerHTML = "Il tuo carrello è vuoto";
        cont.appendChild(vuoto);

        document.getElementById("riepilogoCard").style.display = "none";
        document.getElementById("main").style.display = "none";

    }

    else{

        for(i=0; i<carr.length; i++){

            var row = document.createElement("div");
            row.className = "row border-bottom w-100 mx-auto";
            mainContainer.appendChild(row);
    
            var colfoto = document.createElement("div");
            colfoto.className = "col-4 text-center p-4";
            colfoto.innerHTML = '<img class=" mt-3 mx-auto w-75" src="' + carr[i].Immagine + '">';
            row.appendChild(colfoto);
    
            var colprezzi = document.createElement("div");
            colprezzi.className = "col-4 p-4";
            colprezzi.innerHTML = '<a href="InfoProdotto.html?prodotto=' + carr[i].Codice + '"><h5>' + carr[i].Nome + '</h5></a><br><form>Quantità: <input type="number" id="quantita" name="quantita" min="0" max="'+carr[i].QuantitaMax+'" step="1" value="'+carr[i].Quantita+'"></input></form><br><p>Prezzo: ' + carr[i].Prezzo + ' €</p><p>' +carr[i].Spedizione+'</p>';
            row.appendChild(colprezzi);
    
            var colbottoni = document.createElement("div");
            colbottoni.className = "col-sm-4 my-auto";
            colbottoni.innerHTML = '<button class="btn btn-danger w-75 align-middle mb-3" id="eliminaProdotto" type="button" onclick="eliminaProdotto('+carr[i].Codice+')">Elimina Prodotto</button><button class="btn btn-primary align-middle w-75" id="aggiorna" type="button" onclick="aggiornaCarrello('+carr[i].Codice+')">Aggiorna</button>';
            row.appendChild(colbottoni);
    
            var prezzo = document.createElement("p");
            prezzo.innerHTML = carr[i].Quantita + " x " + carr[i].Nome +": " +carr[i].Prezzo+" €<br>";
            riepilogo.appendChild(prezzo)
    
            totale = totale + (parseFloat(carr[i].Prezzo) * parseInt(carr[i].Quantita));
    
        }

        var tot = document.getElementById("totale");
        tot.innerHTML = totale.toFixed(2) + " €";

    }

}

function eliminaProdotto(value){

    for(i=0; i<carr.length; i++){
        if(value == carr[i].Codice){
            carr.splice(i,1);
            sessionStorage.setItem("Carrello", JSON.stringify(carr));
        }
    }

    window.location.href = "Carrello.html";

}

function aggiornaCarrello(value){

    for(i=0; i<carr.length; i++){
        if(value == carr[i].Codice){

            carr[i].Quantita = document.getElementsByName("quantita")[i].value;
            sessionStorage.setItem("Carrello", JSON.stringify(carr));
        }
    }

    window.location.href = "Carrello.html";

}

class Ordine {
    constructor(dataOrdine, totale, carrello, codice) {
        this.dataOrdine = dataOrdine;
        this.totale = totale;
        this.carrello = carrello;
        this.codice = codice;
    }
}

function confermaAcquisto(){

    if(sessionStorage.getItem("UtenteRegistrato") == null){
        alert("accedi per completare l'acquisto");
    }
    else{

        var codice = 1;

        if(confirm("Sei sicuro di voler completare l'acquisto?")){
            if(utente.ordini.length > 0){
                codice = utente.ordini[0].codice + 1;
            }
            var clienti = JSON.parse(localStorage.getItem("Clienti"));
            var dataOrdine = new Date();
            var ordine = new Ordine(dataOrdine, parseFloat(totale).toFixed(2), carr, codice);

            
            for(i=0; i<clienti.length; i++){
                if(utente.email == clienti[i].email && utente.password == clienti[i].password){
                    clienti[i].ordini.unshift(ordine);
                    localStorage.setItem("Clienti", JSON.stringify(clienti));
                    sessionStorage.setItem("UtenteRegistrato", JSON.stringify(clienti[i]));
                }
            }
            for(i=0; i<carr.length; i++){
                for(j=0; j<prodotti.length; j++){
                    if(carr[i].Codice == prodotti[j].Codice){
                        prodotti[j].QuantitaMax = (parseInt(carr[i].QuantitaMax) - parseInt(carr[i].Quantita)).toString();
                    }
                }
            }
            localStorage.setItem("Prodotti", JSON.stringify(prodotti));
            alert("Acquisto completato con successo")
            sessionStorage.removeItem("Carrello");
            sessionStorage.setItem("Carrello", "[]");
            window.location.href = "Carrello.html";
        }
        else{}  
    }
}