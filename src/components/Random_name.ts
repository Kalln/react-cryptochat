/**
 * Creates a "random" name by picking a first name and surname from t
 *
 * @returns  {string} -A randomly generated name
 *
 * @example Rand_name() might return "Kille Turing"
 **/

export function Rand_name(): string {
    //Arrays containing lists of first and surnames respectively
    const firstname_list: Array<string> = ["Kristoffer", "Viktor", "Kalle", "George", "Donald", "Hillary", "Bill", "Angela", "Emanuel", "Sanna", "Uffe", "Magdalena", "Sauli", "Vladimir", "Winston"]
    const surname_list: Array<string> = ["Berners-Lee", "Turing", "Liskov", "Babbage", "Ritchie", "Knuth", "von Neumann", "Gore", "Thompson", "Euler", "Gauss", "Noether", "Lovelace", "Cauchy"]

    const firstname  = firstname_list[Math.floor(Math.random() * firstname_list.length)];
    const surname  = surname_list[Math.floor(Math.random() * surname_list.length)];

    return firstname + " " + surname;
}

export default Rand_name;