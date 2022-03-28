/** Aqui están todas las variables necesaria para manejar el documento*/
const pokeCard = document.getElementById("card");
const pokeName = document.getElementById("pokeName");
const pokeImg = document.getElementById("pokeImg");
const pokeImgContainer = document.getElementById("imageContainer");
const pokeId = document.getElementById("pokeId");
const pokeWeight = document.getElementById("pokeWeight");
const pokeHeight = document.getElementById("pokeHeight");
const pokeTypes = document.getElementById("pokeTypes");
const pokeStats = document.getElementById("pokeStats");
const typeColors = {  /** los colores dependiendo del tipo de pokemon que es*/
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const fetchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound()) /** En caso de error para que no truene la app */

}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    pokeWeight.textContent = `Weight ${parseInt(data.weight)/10} kg`;
    pokeHeight.textContent = `Height ${parseInt(data.height)/10} m`;

    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = ''; /** Borra lo que ya había en div */
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        pokeName.style.color = typeColors[type.type.name];
        typeTextElement.textContent = `Type: ${type.type.name}`;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado, intenta de nuevo';
    pokeImg.setAttribute('src', './images/questionmark.jpg');
    pokeImg.style.background =  '#ffffff';
    pokeWeight.innerHTML = '';
    pokeHeight.innerHTML = '';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}