/* IIFE that stores the whole Pokémon repository and returns an object with methods
 to get the whole repository, add Pokemon to the array 
 and check wether a Pokemon is part of the repository */
let pokemonRepository = (function () {
let pokemonList = [];
let modalContainer = document.querySelector('#modal-container');

  /* function to add Pokemon to the pokemonRepository */
  function add(newPokemon) {
    let pokeKeys = Object.keys(newPokemon);
    if (typeof newPokemon === "object") {
      if (pokeKeys[0] === "name" &&
        pokeKeys[1] === "detailsUrl") 
        {
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
    button.innerText = `${getIndexOfPokemon(pokemon)} ${capitalizeFirstLetter(pokemon.name)}`; //adds information from passed object and additional text to pokemon-grid_item
    button.addEventListener('click', (event) => {showDetails(pokemon)})
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
          detailsUrl: item.url,
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
      let details = [json.sprites.front_default, json.types, json.id, json.height, json.weight]; //string of sprite png and Array of types
      return details
    }).catch(function (e) {
      hideLoadingMessage()
      console.log(e)
    })
  }

  /* Logs Pokemon Details in the console once they have loaded */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (response) {
      showModal(response[2], pokemon.name, response[1], response[0], response[3], response[4]);
    })
  }

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

  /* Capitalizes the first letter of a Pokemon name */
  function capitalizeFirstLetter (pokemonName) {
    let capitalizedName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    return capitalizedName
  }

  function showModal (pokemonID, pokemonName, pokemonTypes, pokemonPicture, pokemonHeight, pokemonWeight) {
    
    // query modal container and make visible
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.add("is-visible");

    // clear Modal content
    modalContainer.innerHTML = "";

    // Create modal
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    //create modal header background
    let header = document.createElement("div");
    header.setAttribute("id", "modal-header-background");
    modal.appendChild(header);

    //create modal headline
    let h2 = document.createElement("h2");
    h2.classList.add("modal-headline");
    h2.innerText = "#" + pokemonID + " " + capitalizeFirstLetter(pokemonName);
    modal.appendChild(h2);

    //create modal closing section
    let modalClose = document.createElement("div");
    modalClose.classList.add("modal-close");
    modal.appendChild(modalClose);
    let button = document.createElement("button");
    button.setAttribute("id", "button-close");
    button.innerText = "close";
    modalClose.appendChild(button);

    //create modal image section
    let img = document.createElement("img");
    img.classList.add("modal-image");
    img.setAttribute("src", pokemonPicture);
    modal.appendChild(img);

    //create modal details section as html table
    let modalDetails = document.createElement("div");
    modalDetails.classList.add("modal-details");
    modal.appendChild(modalDetails);
    let table = document.createElement("table");
    modalDetails.appendChild(table);
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let trTypes = document.createElement("tr");
    tbody.appendChild(trTypes);
    let trHeight = document.createElement("tr");
    tbody.appendChild(trHeight);
    let trWeight = document.createElement("tr");
    tbody.appendChild(trWeight);
    let thTypes = document.createElement("th");
    thTypes.innerHTML = "Types:";
    trTypes.appendChild(thTypes);
    pokemonTypes.forEach(function (item) {
      let tdTypes = document.createElement("td");
      tdTypes.innerHTML = `${capitalizeFirstLetter(item.type.name)}`;
      trTypes.appendChild(tdTypes)
    });
    let thHeight = document.createElement("th");
    thHeight.innerHTML = "Height:";
    trHeight.appendChild(thHeight);
    let tdHeight = document.createElement("td");
    tdHeight.innerHTML = `${pokemonHeight}0 cm`;
    trHeight.appendChild(tdHeight);
    let thWeight = document.createElement("th");
    thWeight.innerHTML = "Weight:";
    trWeight.appendChild(thWeight);
    let tdWeight = document.createElement("td");
    tdWeight.innerHTML = `${pokemonWeight} kg`;
    trWeight.appendChild(tdWeight);
    button.addEventListener('click', (event) => {hideModal()});
  }

  function hideModal() {
    let modal = document.querySelector("#modal-container");
    modal.classList.remove("is-visible");
    modal.parentElement.appendChild(modal);
  }

  function getIndexOfPokemon (pokemon) {
    let index = pokemonList.indexOf(pokemon) + 1;
    return "#" + index
  }

  /* fucntion to get the whole pokemonRepository, returns an Array */
  function getAll() {
    return pokemonList
  };

  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    isInRepository: isInRepository,
    addListItem: addListItem,
    loadPokemonList: loadPokemonList,
    loadDetails: loadDetails,
    showModal: showModal,
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