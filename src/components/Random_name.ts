const förnamn_lista = ["Kristoffer", "Viktor", "Kalle", "Pelle", "Gustav", "Göran", "Brynjolf", "Snurjolf"]
const titel_lista = ["Röda", "Runda", "Sjätte", "fula", "håriga", "Allvarliga", "Helige", "pinsamma"]

export function Rand_name() {
    const förnamn  = förnamn_lista[Math.floor(Math.random() * förnamn_lista.length)];
    const titel  = titel_lista[Math.floor(Math.random() * titel_lista.length)];

    return förnamn + " den " + titel;
}

export default Rand_name;