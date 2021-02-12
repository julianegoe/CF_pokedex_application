/* IIFE that stores the whole Pokémon repository and returns an object with methods
 to get the whole repository, add Pokemon to the array 
 and check wether a Pokemon is part of the repository */
let pokemonRepository = (function () {
  let pokemonList = [];

  /* function to add Pokemon to the pokemonRepository */
  function add(newPokemon) {
    let pokeKeys = Object.keys(newPokemon);
    if (typeof newPokemon === "object") {
      if (pokeKeys[0] === "name" &&
        pokeKeys[1] === "detailsUrl") {
        pokemonList.push(newPokemon);
      } else {
        console.error("Please enter valid Pokemon object")
      }
    } else {
      console.error("This is not a valid Pokemon object")
    }
  };

  // function that takes an object and appends it to pokemon list in the Frotend
  function addListItem(pokemon) {
    let pokemonGrid = document.querySelector(".pokemon-grid"); // queries pokemon-grid class
    let button = document.createElement("button"); // creates new button
    button.setAttribute("class", "pokemon-grid__item"); // sets class pokemon-grid_item to button
    pokemonGrid.appendChild(button); // appends button to parent element pokemon-grid
    button.innerText = `${pokemon.name}`; //adds information from passed object and additional text to pokemon-grid_item
    logPokemon(pokemon, button)
  };

  /* Logs Pokemon details in console on Click */
  function logPokemon(pokemon, element) {
    element.addEventListener('click', function (event) {
      showDetails(pokemon)
    }); //added eventlistener to button
  };

  /* Loads Kanto Pokemon asynchronously */
  function loadPokemonList() {
    showLoadingMessage()
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage()
      return json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon)
      });
    }).catch(function (e) {
      hideLoadingMessage()
      console.log(e);
    })
  };

  /* Loads Details of Pokemon asynchronously and returns Image URL and types */
  function loadDetails(object) {
    showLoadingMessage();
    let url = object.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage()
      let details = [json.sprites.front_default, json.types]; //string of sprite png and Array of types
      return details
    }).catch(function (e) {
      hideLoadingMessage()
      console.log(e)
    })
  }

  /* Logs Pokemon Details in the console once they have loaded */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (response) {
      console.log(response[0]);
      response[1].forEach(function (item) {
        console.log(item.type.name)
      })
    });
  };

  /* Displays a message to be used while something is loading asynchronously */
  function showLoadingMessage() {
    let pokemonGrid = document.querySelector(".pokemon-grid");
    let div = document.createElement("div");
    div.setAttribute("class", "pokemon-grid__item");
    div.innerText = "Fetching Pokemon data...";
    pokemonGrid.appendChild(div)
  }
/* Hides a message defined in showLoadingMessage to be used when something is done loading */
  function hideLoadingMessage() {
    let div = document.querySelector("div.pokemon-grid__item")
    div.parentElement.removeChild(div);

  }

  /* fuction to check wether a certain Pokémon is part of the pokemonRepository
  returns a Boolean */
  function isInRepository(pokemon) {
    let filteredList = pokemonList.filter(function (item) {
      filteredList.forEach(x => console.log(`${x.name}`)) //formated for readability in console
      return item.name === pokemon
    });
  };


  /* fucntion to get the whole pokemonRepository, returns an Array */
  function getAll() {
    console.log(pokemonList)
    return pokemonList
  };

  return {
    add: add,
    getAll: getAll,
    isInRepository: isInRepository,
    addListItem: addListItem,
    loadPokemonList: loadPokemonList,
    loadDetails: loadDetails
  }
})();


/* Fetches and displays Pokemon data */
let displayPokemon = function () {
  pokemonRepository.loadPokemonList().then(function (response) {
    console.log(response);
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
  }).catch(function (e) {
    console.log(e)
  });
};

displayPokemon();