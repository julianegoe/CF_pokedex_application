/* IIFE that stores the whole Pokémon repository and returns an object with methods
 to get the whole repository, add Pokemon to the array 
 and check wether a Pokemon is part of the repository */
let pokemonRepository = (function () {
  let searchInput = document.querySelector("#search");
  let pokemonList = [];
  let modalContainer = document.querySelector("#modal-container");


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
  }

  // function that takes an object and appends it to pokemon list in the Frotend
  function addListItem(pokemon) {
    let pokemonGrid = document.querySelector(".pokemon-grid");
    let button = document.createElement("button");
    button.classList.add("pokemon-grid__item", "pokemon");
    pokemonGrid.appendChild(button);
    button.innerText = `${getIndexOfPokemon(pokemon)} ${capitalizeFirstLetter(pokemon.name)}`;
    button.addEventListener("click", () => {
      showDetails(pokemon)
    })
  }


  /* Loads Kanto Pokemon asynchronously */
  function loadPokemonList() {
    showLoadingSpinner()
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingSpinner()
      return json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon)
      });
    }).catch(function (e) {
      hideLoadingSpinner()
      console.log(e);
    })
  }


  /* Loads Details of Pokemon asynchronously and returns Image URL and types */
  function loadDetails(object) {
    showLoadingSpinner(".box");
    let url = object.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingSpinner()
      return response.json()
    }).then(function (json) {
      let details = [json.sprites.front_default, json.types, json.id, json.height, json.weight];
      return details
    }).catch(function (e) {
      console.log(e)
    })
  }


  /* Logs Pokemon Details in the console once they have loaded */
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function (response) {
      showModal(response[2], pokemon.name, response[1], response[0], response[3], response[4]);
    })
  }

  /* fuction to check wether a certain Pokémon is part of the pokemonRepository
  returns a Boolean */
  function isInRepository(pokemon) {
    let filteredList = pokemonList.filter(function (item) {
      filteredList.forEach(x => console.log(`${x.name}`))
      return item.name === pokemon
    });
  }


  /* Capitalizes the first letter of a Pokemon name */
  function capitalizeFirstLetter(pokemonName) {
    let capitalizedName = pokemonName[0].toUpperCase() + pokemonName.slice(1);
    return capitalizedName
  }

  function showLoadingSpinner() {
    let body = document.querySelector("body");
    let parent = document.createElement("div");
    parent.classList.add("box");
    body.prepend(parent);
    let loadingSpinner = document.createElement("div");
    loadingSpinner.classList.add("sk-circle");
    loadingSpinner.innerHTML = `
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
    `
    parent.prepend(loadingSpinner);
  }

  function hideLoadingSpinner() {
    let spinner = document.querySelector(".box");
    spinner.parentElement.removeChild(spinner)
  }


  function showModal(pokemonID, pokemonName, pokemonTypes, pokemonPicture, pokemonHeight, pokemonWeight) {


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

    //create modal image section
    let img = document.createElement("img");
    img.classList.add("modal-image");
    img.setAttribute("src", pokemonPicture);
    modal.appendChild(img);

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
    tdHeight.innerHTML = `${pokemonHeight / 10} m`;
    trHeight.appendChild(tdHeight);
    let thWeight = document.createElement("th");
    thWeight.innerHTML = "Weight:";
    trWeight.appendChild(thWeight);
    let tdWeight = document.createElement("td");
    tdWeight.innerHTML = `${pokemonWeight / 10} kg`;
    trWeight.appendChild(tdWeight);
    button.addEventListener("click", () => {
      hideModal()
    });
  }


  function hideModal() {
    let modal = document.querySelector("#modal-container");
    modal.classList.remove("is-visible");
    modal.parentElement.appendChild(modal);
  }


  function getIndexOfPokemon(pokemon) {
    let index = pokemonList.indexOf(pokemon) + 1;
    return "#" + index
  }


  /* fucntion to get the whole pokemonRepository, returns an Array */
  function getAll() {
    return pokemonList
  }


  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });


  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  searchInput.addEventListener("input", function () {
    let allPokemon = document.querySelectorAll(".pokemon");
    let filterValue = searchInput.value.toUpperCase();
    allPokemon.forEach(function (item) {
      if (item.innerText.toUpperCase().indexOf(filterValue) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    })
  });

  searchInput.addEventListener("input", function () {
    let egg = document.querySelector("#easterEgg");
    if (egg) {egg.remove()}
    if (searchInput.value === "Gotta Catch 'Em All!") {
      let pokemonGrid = document.querySelector(".pokemon-grid");
      let easterEggContainer = document.createElement("div");
      easterEggContainer.style.position = "fixed";
      easterEggContainer.style.top = 0;
      easterEggContainer.style.left = 200;
      easterEggContainer.setAttribute("id", "easterEgg");
      pokemonGrid.appendChild(easterEggContainer);
      let easterEgg = document.createElement("img");
      easterEgg.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/87.gif")
      easterEggContainer.appendChild(easterEgg);
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
    showDetails: showDetails,
    showLoadingSpinner: showLoadingSpinner
  }
})();




/* Fetches and displays Pokemon data */
let displayPokemon = function () {
  pokemonRepository.loadPokemonList().then(function () {
    pokemonRepository.getAll().forEach(pokemon => pokemonRepository.addListItem(pokemon));
  }).catch(function (e) {
    console.log(e)
  });
};


displayPokemon();