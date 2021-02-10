
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

    // function that takes an object and appends it to pokemon list in the Frotend
    function addListItem (pokemon) {
      let spanText = pokemon.height < 1 ? " " : " - This is a big one!"; // create additional text to display when Pokemon is bigger than 1
      let pokemonGrid = document.querySelector(".pokemon-grid"); // queries pokemon-grid class
      let button = document.createElement("button"); // creates new div
      button.setAttribute("class", "pokemon-grid__item"); // sets class pokemon-grid_item to div
      pokemonGrid.appendChild(button); // appends div to parent element pokemon-grid
      button.innerText = `${pokemon.name} (height: ${pokemon.height}m)${spanText}`; //adds information from passed object and additional text to pokemon-grid_item
      button.addEventListener('click', function(event) {showDetails(pokemon)}); //added eventlistener to button
    };

    function showDetails(pokemon) {
      console.log(pokemon);
    };

    /* fuction to check wether a certain Pokémon is part of the pokemonRepository
    returns a Boolean */
    function isInRepository(pokemon) {
      let filteredList = pokemonList.filter(function(item) {
        filteredList.forEach(x => console.log(`${x.name} (${x.height}m ${x.weight}kg ${x.types})`)) //formated for readability in console
        return item.name===pokemon});
      };


    /* fucntion to get the whole pokemonRepository, returns an Array */
    function getAll() {
      return pokemonList
    };

    return {
      add: add,
      getAll: getAll,
      isInRepository: isInRepository,
      addListItem: addListItem,
      }
  })();



let displayPokemon = function () {
  pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
  };

displayPokemon();