
addEventListener('load', () => {
  const pokemonRepository = (function(){
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=80';

    function showModal(title, text, imageUrl) {
        let modalContainer = document.querySelector('.modal');
       
        // Add the new modal content
        let closeButtonElement = document.querySelector('.close');
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.querySelector('.modal-title');
        titleElement.innerText = title;


        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = '';

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('pokemon-img');
        pokemonImage.src = imageUrl;


       
        modalBody.appendChild(contentElement);
        modalBody.appendChild(pokemonImage);
       

        modalContainer.classList.remove('fade');
    }

      function hideModal() {
        let modalContainer = document.querySelector('.modal-dialog');
        modalContainer.classList.remove('is-visible');
      }

      window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('.modal-dialog');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      let modalContainer = document.querySelector('.modal-dialog');
      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      
      
    
      
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
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add(["btn","btn-primary"]);
    button.dataset.target = "#exampleModal"
    button.dataset.toggle = "modal"

    
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
})
