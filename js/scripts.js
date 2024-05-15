
const pokemonRepository = (function(){
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';


  function showDetails(pokemon){
    console.log(pokemon);

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
    return fetch(apiUrl).then(function(response){
        return response.json();
    }).then(function(json){
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
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        item.imgUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
 };

//  function showDetails(item){
//     pokemonRepository.loadDetails(item).then(function(){
//         console.log(item);
//     });
//  };
  
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

pokemonRepository.add({name: 'Balbasaur',
 height:3,
 type: 'Electric'
 });

pokemonRepository.loadList().then(function(){
   pokemonRepository.getAll().forEach(function(pokemon){
     pokemonRepository.addListItem(pokemon);
   });
});