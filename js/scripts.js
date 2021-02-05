let pokemonRepository = (function() {
  let pokemonList = [
    {name: "Bulbasaur", height: 0.7, weight: 6.9, types: ["grass", "poison"]},
    {name: "Charmander", height: 0.6, weight: 8.5, types: ["fire"]},
    {name: "Squirtle", height: 0.5, weight: 9, types: ["water"]},
    {name: "Dewgong", height: 1.7, weight: 120, types: ["ice", "water"]},
    {name: "Snorlax", height: 2.1, weight: 460, types: ["normal"]}
    ];

    function add (newPokemon) {
      if (typeof newPokemon === "object") {
        if (Object.keys(newPokemon) === ["name", "height", "weight", "types"]) {
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


    function getAll() {
      return pokemonList
    };

    return {
      add: add,
      getAll: getAll,
      }
  })();

let displayPokemon = (function () {
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
})();