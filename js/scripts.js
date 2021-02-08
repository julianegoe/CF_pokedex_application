
/* IIFE that stores the whole Pokémon repository and returns an object with methods
 to get the whole repository, add Pokemon to the array 
 and check wether a Pokemon is part of the repository */
let pokemonRepository = (function() {
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7, weight: 6.9, types: ["grass", "poison"]},
    {name: "Charmander", height: 0.6, weight: 8.5, types: ["fire"]},
    {name: "Squirtle", height: 0.5, weight: 9, types: ["water"]},
    {name: "Dewgong", height: 1.7, weight: 120, types: ["ice", "water"]},
    {name: "Snorlax", height: 2.1, weight: 460, types: ["normal"]}
    ];

    /* function to add Pokemon to the pokemonRepository */
    function add (newPokemon) {
      let pokeKeys = Object.keys(newPokemon);
      if (typeof newPokemon === "object") {
        if (pokeKeys[0] === "name" 
        && pokeKeys[1] === "height" 
        && pokeKeys[2] === "weight" 
        && pokeKeys[3] === "types") {
          pokemonList.push(newPokemon);
        }
        else {
          console.error("Please enter valid Pokemon object with name, height, weight and types as an Array")
        }
      }
      else {
        console.error("This is not a valid Pokemon object")
      }
    };

    /* fuction to check wether a certain Pokémon is part of the pokemonRepository
    returns a Boolean */
    function isInRepository(pokemon) {
      let filteredList = pokemonList.filter(function(item) {
        filteredList.forEach(x => console.log(`${x.name} (${x.height}m ${x.weight}kg ${x.types})`)) //formated for readability in console
        return item.name===pokemon});
      }


    /* fucntion to get the whole pokemonRepository, returns an Array */
    function getAll() {
      return pokemonList
    };

    return {
      add: add,
      getAll: getAll,
      isInRepository: isInRepository
      }
  })();



let displayPokemon = function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height < 1) {
      document.write(`<div class="pokemon-grid__item">${pokemon.name}
      (height: ${pokemon.height}m) </div>`);
    }
    else {
        document.write(`<div class="pokemon-grid__item"> ${pokemon.name}
        (height: ${pokemon.height}m) <span>- That's quite big!</span> </div>`)
    }
  })
};

displayPokemon();