const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name ? result.name : "Pokémon sem nome",
            image: result.sprites['front_default'] ? result.sprites['front_default'] : 'https://via.placeholder.com/150',
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
          }));
        displayPokemon(pokemon);
    });
};

const typeTranslations = {
    "fire": "Fogo",
    "water": "Água",
    "grass": "Grama",
    "poison": "Veneno",
    "bug": "Inseto",
    "flying": "Voador",
    "normal": "Normal",
    "ground": "Terra",
    "fairy": "Fada",
    "fighting": "Lutador",
    "psichic": "Psíquico",
    "rock": "Pedra",
    "electric": "Elétrico",
  };
  
  const displayPokemon = (pokemon) => {
      console.log(pokemon);
      pokemon.forEach(p => {
        p.type.split(',').forEach(element => {
            console.log(element)
        });
      })
      const pokemonHTMLString = pokemon
          .map(
              (pokeman) => `
          <li class="cartao-pokemon">
              <img class="gif" src="${pokeman.image}"/>
              <span> ${pokeman.name}</span>
              <div class="tipo">
                  ${pokeman.type.split(',').map(type => `
                      <p class="${typeTranslations[type]}">${typeTranslations[type.replace(/\s/g, '')]}</p>
                  `).join('')} 
              </div>
          </li>
      `
          )
          .join('');
      pokedex.innerHTML = pokemonHTMLString;
  };

const getTypeClass = (type) => {
        if (type === "Fogo") return "fogo";
        
        if (type === "Grama") return "grama";
        
        if (type === "Veneno") return "veneno";
        
    return "padrao";   
};

fetchPokemon();



