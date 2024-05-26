

const pokemonRepository = (function(){
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

    function showModal(title, text, imageUrl) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemon-img');
  pokemonImage.src = imageUrl;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(pokemonImage);
  modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
      }

      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
      
    //   document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal();
    //   });
      
  function showDetails(pokemon){
    console.log(pokemon);
    // pokemon.detailsUrl
    // I need height of a pokemon

    loadDetails(pokemon)
        .then(function() {
            showModal(pokemon.name, "Height: "+ pokemon.height, pokemon.imgUrl);
        })
        .catch(function(e) {
            console.log(e)
        })
 }
 function handleButtonClick(button, pokemon){
    button.addEventListener('click', function(){
        showDetails(pokemon);
     });
 };

  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    handleButtonClick(button, pokemon);
 }

 function loadList(){
    return fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        return json.results.forEach(function(item){
            let pokemon = {
                name: item.name,
                detailsUrl: item.url
            };
            addListItem(pokemon);
        });
    }).catch(function(e){
        console.error(e);
    })
 };

 function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(details){
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    })
    .catch(function(e){
        console.error(e);
    });
 };


// Load details will take 1 parameter -> detailsUrl
// It will make an api call using fetch and resolve the json and return a promise.
// When promise will be resolved it will provide 3 fields in an object -> {imgUrl, height, types}

  
    return {
        getAll: function(){
            return pokemonList

        },
        add: function(pokemon){
            pokemonList.push(pokemon)
        },
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();


pokemonRepository.loadList().then(function(){
   pokemonRepository.getAll().forEach(function(pokemon){
     pokemonRepository.addListItem(pokemon);
   });
});