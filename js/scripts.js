let pokemonList = [
{name: "Bulbasaur", height: 0.7, weight: 6.9, types: ["grass", "poison"]},
{name: "Charmander", height: 0.6, weight: 8.5, types: ["fire"]},
{name: "Squirtle", height: 0.5, weight: 9, types: ["water"]},
{name: "Dewgong", height: 1.7, weight: 120, types: ["ice", "water"]},
{name: "Snorlax", height: 2.1, weight: 460, types: ["normal"]}
];


function printPokemonList(pokeArray) {
  for (let i = 0; i< pokeArray.length; i++) {
      console.log(pokeArray[i].name);
      if (pokeArray[i].height < 1) {
        document.write(`<div class="pokemon-grid__item">${pokeArray[i]["name"]}
        (height: ${pokeArray[i]["height"]}m) </div>`);
      }
      else {
          document.write(`<div class="pokemon-grid__item"> ${pokeArray[i]["name"]}
          (height: ${pokeArray[i]["height"]}m) <span>- That's quite big!</span> </div>`);
      }
    };
};

printPokemonList(pokemonList);