var utente = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));
var ordiniArr = utente.ordini;
var prodotti = JSON.parse(localStorage.getItem("Prodotti"));

function ordini() {
    var main = document.getElementById("containerOrdini");
    if (ordiniArr.length == 0) {
        main.className = "w-75 mx-auto mt-3 shadow-sm rounded bg-white p-5 border"
        main.innerHTML = "Non hai ancora effettuato un ordine";
    }
    for (i = 0; i < ordiniArr.length; i++) {
        var ordine = ordiniArr[i];
        var card = document.createElement("div");
        card.className = "card shadow-sm mx-auto mb-3";

        var d = new Date(ordine.dataOrdine);
        var data = d.getDate() +"-" + (parseInt(d.getMonth())+1).toString() +"-"+ d.getFullYear();
        var dataElimina = new Date(d);
        dataElimina.setDate(d.getDate()+1);
        if (dataElimina > new Date()) {
            card.innerHTML = '<h5 class="card-header p-3 bg-white" name="ordine">Ordine del: ' + data + '<button class="btn btn-danger w-25 float-right" type="button" onclick="eliminaOrdine(' + ordine.codice + ')">Elimina ordine</button></h5>';
            main.appendChild(card);
        } else {
            card.innerHTML = '<h5 class="card-header p-3 bg-white" name="ordine">Ordine del: ' + ordine.dataOrdine + '</h5>';
            main.appendChild(card);
        }
        for (j = 0; j < ordine.carrello.length; j++) {
            var prodotto = ordine.carrello[j];
            var prodotti = document.createElement("div");
            prodotti.className = "card-body p-0 border-bottom";
            prodotti.innerHTML = '<div class="row p-4  w-100 mx-auto"><div class="coltext-center ml-5"><img src="' + prodotto.Immagine + '" class="imghome"></img></div><div class="col"><a href="InfoProdotto.html?prodotto=' + prodotto.Codice + '"><h5>' + prodotto.Nome + '</h5></a><br><p>Quantità: ' + prodotto.Quantita + '</p><p>Prezzo: ' + prodotto.Prezzo + ' €</p><p>' + prodotto.Spedizione + '</p></div></div>';
            card.appendChild(prodotti);
        }
        var footer = document.createElement("div");
        footer.className = "card-footer p-3 bg-white border-top-0 text-center";
        footer.innerHTML = '<h5>Totale: ' + ordine.totale + ' €<h5>';
        card.appendChild(footer);
    }
}

function eliminaOrdine(value) {
    if(confirm("Sei sicuro di voler eliminare l'ordine?")){
       
        for (i = 0; i < ordiniArr.length; i++) {
            if (value == ordiniArr[i].codice) {

                for(j=0; j<ordiniArr[i].carrello.length; j++){
                    for(k=0; k<prodotti.length; k++){
                        if(ordiniArr[i].carrello[j].Codice == prodotti[k].Codice){
                            prodotti[k].QuantitaMax = (parseInt(prodotti[k].QuantitaMax) + parseInt(ordiniArr[i].carrello[j].Quantita)).toString();
                        }
                    }
                }
                ordiniArr.splice(i, 1);
                utente.ordini = ordiniArr;
                sessionStorage.setItem("UtenteRegistrato", JSON.stringify(utente));
                localStorage.setItem("Prodotti", JSON.stringify(prodotti));
                
            }
        }
        var clienti = JSON.parse(localStorage.getItem("Clienti"))
        for (i = 0; i < clienti.length; i++) {
            if (utente.email == clienti[i].email && utente.password == clienti[i].password) {
                clienti[i] = JSON.parse(sessionStorage.getItem("UtenteRegistrato"));
                localStorage.setItem("Clienti", JSON.stringify(clienti));
            }
        }



        window.location.href = "Ordini.html"
    }
    else{}
}