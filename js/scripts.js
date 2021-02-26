/* IIFE that stores the whole Pokémon repository and returns an object with methods
 to get the whole repository, add Pokemon to the array
 and check wether a Pokemon is part of the repository */
let pokemonRepository = (function () {
  let searchInput = document.querySelector(".search");
  let pokemonList = [];

  /* function to add Pokemon to the pokemonRepository */
  function add(newPokemon) {
    let pokeKeys = Object.keys(newPokemon);
    if (typeof newPokemon === "object") {
      if (pokeKeys[0] === "name" &&
        pokeKeys[1] === "detailsUrl") {
        pokemonList.push(newPokemon);
      } else {
        console.error("Please enter valid Pokemon object");
      }
    } else {
      console.error("This is not a valid Pokemon object");
    }
  }

  // function that takes an object and appends it to pokemon list in the Frotend
  function addListItem(pokemon) {
    let divRow = $(".row");
    divRow.addClass("row", "d-flex", "my-5");
    let divCol = $('<div class="col-12 col-md-4 col-lg-3 text-center list-group"></div>'); // creates new button
    divRow.append(divCol); // appends button to parent element pokemon-grid
    let button = $('<button class= "pokemon btn btn-lg btn-light list-group-item my-2"></button>').append(`${getIndexOfPokemon(pokemon)} ${capitalizeFirstLetter(pokemon.name)}`); //adds information from passed object and additional text to pokemon-grid_item
    button.attr("type", "button");
    button.attr("data-toggle", "modal");
    button.attr("data-target", "#detailsModal");
    divCol.append(button);
    // Click event on Button
    button.click(e => {
      showDetails(pokemon)
    })
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

  /*Loads Details of Pokemon asynchronously and returns Image URL, types,
  ID, height and weight */
  function loadDetails(object) {
    showLoadingMessage();
    console.log(object.detailsUrl)
    let url = object.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage()
      let details = [json.sprites.other.dream_world.front_default, json.types, json.id, json.height, json.weight]; //string of sprite png and Array of types
      return details
    }).catch(function (e) {
      hideLoadingMessage()
      console.log(e)
    })
  }

  function showModal(pokemonId, pokemonName, pokemonTypes, pokemonImage, pokemonHeight, pokemonWeight) {
    let modalContent = $(".modal-content");

    //clear Modal content
    modalContent.empty();

    // construct Modal header
    let modalHeader = $(`<div class="modal-header">#${pokemonId} ${capitalizeFirstLetter(pokemonName)}</div>`);
    modalContent.append(modalHeader);
    let closeButton = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>')
    modalHeader.append(closeButton);

    // construct Modal body including image and details
    let modalContainer = $('<div class="container"></div>')
    let modalBody = $(`<div class=" row justify-content-center modal-body"></div>}`);
    modalContainer.append(modalBody);
    modalBody.append(`<img class="col-6 m-4 img-fluid" src="${pokemonImage}" aria-label="A cartoon image of ${pokemonName}">`)
    modalBody.append(`<p class="col-6 m-2"><strong>Height:</strong> ${pokemonHeight}0 cm</p>`);
    modalBody.append(`<p class="col-6 m-2"><strong>Weight:</strong> ${pokemonWeight} kg</p>`);
    let typesDiv = $(`<div id="type-div" class="col-6 m-2"><strong>Types: </strong></div>`);
    modalBody.append(typesDiv);
    pokemonTypes.forEach(function (item) {
      typesDiv.append(`${capitalizeFirstLetter(item.type.name)} `);
    })
    modalContent.append(modalBody)
  }

  // is called to asynchronously load detail data and construct modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (response) {
      showModal(response[2], pokemon.name, response[1], response[0], response[3], response[4]);
    })
  }

  /* Displays a message to be used while something is loading asynchronously */
  function showLoadingMessage() {
    let body = $("body");
    let div = '<div class="col my-3">Fetching Pokemon data...</div';
    body.append(div)
  }
  /* Hides a message defined in showLoadingMessage to be used when something is done loading */
  function hideLoadingMessage() {
    let div = $("div.col");
    div.remove()

  }

  /* Capitalizes the first letter of a Pokemon name */
  function capitalizeFirstLetter(pokemonName) {
    let capitalizedName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    return capitalizedName
  }

  function getIndexOfPokemon(pokemon) {
    let index = pokemonList.indexOf(pokemon) + 1;
    return "#" + index
  }

  /* fucntion to get the whole pokemonRepository, returns an Array */
  function getAll() {
    return pokemonList
  };

  searchInput.addEventListener('input', function () {
    let allPokemon = document.querySelectorAll('.pokemon');
    let filterValue = searchInput.value.toUpperCase();
    allPokemon.forEach(function (item) {
      console.log(item.innerText);
      if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    })
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadPokemonList: loadPokemonList,
    loadDetails: loadDetails,
    showDetails: showDetails
  }
})();


/* Fetches and displays Pokemon data */
let displayPokemon = function () {
  pokemonRepository.loadPokemonList().then(function (response) {
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
  }).catch(function (e) {
    console.log(e)
  });
};

displayPokemon();