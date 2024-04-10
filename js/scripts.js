let pokemonList = [
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
console.log(pokemonList);

for(let i= 0; i < pokemonList.length; i++){
    const pokemon= pokemonList[i];
    console.log(` "${pokemon.name} (height:${pokemon.height})" `);
    if(pokemon.height > 4){
        console.log("-Wow, that's big!")
    }
} 