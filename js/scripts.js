
const pokemonRepository = (function(){
    const pokemonList = [
        {name: 'Charmander',
         height: 6,
         type: 'Fire' },
        {name: 'Wartortle',
         height: 1,
         type:'Water'},
        {name: 'Rattata',
         height: 3,
         type:'Normal'},
        {name:'Pikachu',
         height: 4,
         type:'Electric'}, 
  ]

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
  
    return {
        getAll: function(){
            return pokemonList

        },
        add: function(pokemon){
            pokemonList.push(pokemon)
        },
        addListItem: addListItem
    }

})()

pokemonRepository.add({name: 'Balbasaur',
 height:3,
 type: 'Electric'
 })

 pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
});