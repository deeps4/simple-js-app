
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
         type:'Electric'}
  ]
    return {
        getAll: function(){
            return pokemonList

        },
        add: function(pokemon){
            pokemonList.push(pokemon)

        }
    }

})()

pokemonRepository.add({name: 'Balbasaur',
 height:3,
 type: 'Electric'
 })

 pokemonRepository.getAll().forEach(function(pokemon){
   
});