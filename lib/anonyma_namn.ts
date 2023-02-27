const förnamn_lista = ["Kristoffer", "Viktor", "Kalle", "Pelle", "Gustav", "Göran", "Brynjolf", "Snurjolf"]

const titel_lista = ["Röda", "Runda", "Sjätte", "fula", "håriga", "Allvarliga", "Helige", "pinsamma"]

function namn_skapare(): string {
    const förnamn : string = förnamn_lista[Math.floor(Math.random() * förnamn_lista.length)];
    const titel : string = titel_lista[Math.floor(Math.random() * titel_lista.length)];

    return förnamn + " den " + titel;
}

console.log(namn_skapare());
