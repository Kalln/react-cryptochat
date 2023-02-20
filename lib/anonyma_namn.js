var förnamn_lista = ["Kristoffer", "Viktor", "Kalle"];
var titel_lista = ["Röda", "Runda", "Sjätte", "fula", "håriga"];
function namn_skapare() {
    var förnamn = förnamn_lista[Math.floor(Math.random() * förnamn_lista.length)];
    var titel = titel_lista[Math.floor(Math.random() * titel_lista.length)];
    return förnamn + " den " + titel;
}
console.log(namn_skapare());
