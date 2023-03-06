const förnamn_lista: Array<string> = ["Kristoffer", "Viktor", "Kalle", "George", "Donald", "Hillary", "Bill", "Angela", "Emanuel", "Sanna", "Uffe", "Magdalena", "Sauli", "Vladimir", "Winston"]
const titel_lista: Array<string> = ["Berners-Lee", "Turing", "Liskov", "Babbage", "Ritchie", "Knuth", "von Neumann", "Gore", "Thompson", "Euler", "Gauss", "Noether", "Lovelace", "Cauchy"]

export function Rand_name(): string {
    const förnamn  = förnamn_lista[Math.floor(Math.random() * förnamn_lista.length)];
    const titel  = titel_lista[Math.floor(Math.random() * titel_lista.length)];

    return förnamn + " " + titel;
}

export default Rand_name;