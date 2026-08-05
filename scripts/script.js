//#region script
const generalPokemonUrl = "https://pokeapi.co/api/v2/";
const pokeContainerRef = document.getElementById("poke-container");
const btnContainerRef = document.getElementById("button-container");
const dialogRef = document.getElementById("pokemon-highlight");
const ALL_POKEMON = [];
const POKEMON_TYPE_ARR =
    ["Normal", "Fire", "Water",
        "Grass", "Electric", "Ice",
        "Fighting", "Poison", "Ground",
        "Flying", "Psychic", "Bug",
        "Rock", "Ghost", "Dragon",
        "Steel", "Fairy", "Dark"
    ];
const API_LIMIT = 30;
let apiOffset = 0;
let pokemonList = [];
let uncollectedPokemon = [];
let searchedPokemon = [];

function start() {
    init();
}

async function init() {
    showLoadingSpinner();
    await fetchPokemonlist(API_LIMIT, apiOffset);
    const cachedNames = getCachedNames();
    const newFind = checkLocalStorageDupplicates(cachedNames);
    if (newFind) await fetchExactPokemon(uncollectedPokemon, newFind);
    searchedPokemon = ALL_POKEMON;
    loadFromLocalStorage();
    renderSmallPokiCards();
    btnContainerRef.classList.remove("d_none");
    await randomDegreeGenerator();
}

function showLoadingSpinner() {
    btnContainerRef.classList.add("d_none");
    pokeContainerRef.innerHTML = `<span class="loader"></span>`
}

function getCachedNames() {
    let cachedNames = [];
    for (let index = 0; index < localStorage.length; index++) {
        try {
            let key = localStorage.key(index);
            let rawData = localStorage.getItem(key);
            let pokemon = JSON.parse(rawData);
            cachedNames.push(pokemon.name);
        } catch (error) { console.error(error); }
    }
    return cachedNames;
}

async function checkLocalStorageDupplicates(cachedNames) {
    let newFind = false;
    for (const pokemon of pokemonList) {
        if (cachedNames.includes(pokemon.PokemonName)) {
        } else {
            uncollectedPokemon.push(pokemon);
            newFind = true;
        }
    }
    return newFind;
}

function loadFromLocalStorage() {
    ALL_POKEMON.length = 0;
    for (let index = 0; index < localStorage.length; index++) {
        try {
            let key = localStorage.key(index);
            let rawData = localStorage.getItem(key);
            let pokemon = JSON.parse(rawData);
            ALL_POKEMON.push(pokemon);
            ALL_POKEMON.sort((a, b) => a.id - b.id)
        } catch (error) { console.error(error); }
    }
}

function renderSmallPokiCards() {
    pokeContainerRef.innerHTML = "";
    for (let index = 0; index < searchedPokemon.length; index++) {
        if (searchedPokemon[index].types.length === 2) {
            pokeContainerRef.innerHTML += renderCardDoubleType(searchedPokemon[index], index);
        } else if (searchedPokemon[index].types.length === 1) {
            pokeContainerRef.innerHTML += renderCardSingleType(searchedPokemon[index], index);
        }
    }
    renderTypes();
}

function renderTypes() {
    for (type of POKEMON_TYPE_ARR) {
        document.querySelectorAll(`[data-pokeclass*="${type.toLowerCase()}"]`).forEach(element => {
            element.innerHTML = `${type}`;
        });
    }
}

async function fetchPokemonlist(limit = 30, offset = 0) {
    const response = await fetch(`${generalPokemonUrl}/pokemon?limit=${limit}&offset=${offset}`);
    const responseAsJson = await response.json();
    responseAsJson.results.forEach((pokemon) => {
        pokemonList.push({ "PokemonName": pokemon.name, "PokemonUrl": pokemon.url });
    });
}

async function fetchExactPokemon(pokiList) {
    for (const pokemon of pokiList) {
        const response = await fetch(pokemon.PokemonUrl);
        const responseAsJson = await response.json();
        const pokemonTypes = [];
        const pokemonId = responseAsJson.id;
        responseAsJson.types.forEach(pokiType => pokemonTypes.push(pokiType.type.name));
        const pokemonObject = createPkmnObjFromJson(responseAsJson, pokemonTypes);
        localStorage.setItem(pokemonId, JSON.stringify(pokemonObject));
    }
}

function createPkmnObjFromJson(jsonObj, allTypes) {
    return {
        id: jsonObj.id,
        name: jsonObj.species.name,
        picture: jsonObj.sprites.other['official-artwork'].front_shiny,
        hp: jsonObj.stats[0].base_stat,
        attack: jsonObj.stats[1].base_stat,
        defense: jsonObj.stats[2].base_stat,
        specialDefense: jsonObj.stats[3].base_stat,
        speed: jsonObj.stats[4].base_stat,
        types: allTypes
    }
}

function fetchMore() {
    pokemonList = [];
    uncollectedPokemon = []; //Dont remove, otherwise it recursively fetches every pokemon after initial load
    if (apiOffset < localStorage.length) {
        apiOffset = localStorage.length
    } else apiOffset += API_LIMIT;
    document.getElementById("search-field").value = "";
    init();
}

function searchFieldTrigger() {
    searchedPokemon = [];
    const searchFieldContentRef = document.getElementById("search-field").value.toLowerCase();
    const imageContainerRef = document.querySelectorAll(".poke-card");
    for (let index = 0; index < ALL_POKEMON.length; index++) {
        if (ALL_POKEMON[index].name.includes(searchFieldContentRef)) {
            searchedPokemon.push(ALL_POKEMON[index])
        }
    }
    if (searchedPokemon.length > 0) {
        renderSmallPokiCards()
    } else pokeContainerRef.innerHTML = "Not found";
}

function resetSearch() {
    document.getElementById("search-field").value = "";
    searchFieldTrigger();
}

function highlightPokemon(index) {
    dialogRef.className = "";
    updateModal(index);
    dialogRef.classList.add("open");
    dialogRef.showModal()
}

function closePokemon(index) {
    dialogRef.classList.remove("open");
    dialogRef.className = "";
    dialogRef.close()
}

function updateModal(index) {
    try {
        dialogRef.className = "";
        dialogRef.classList.add("open");
        dialogRef.innerHTML = getModal(index, searchedPokemon[index]);
        dialogRef.classList.add(`backdrop_${searchedPokemon[index].types[0]}`);
        setRandomGradientAngle();
    } catch (error) {
        console.error(error);
    }
}

function incrementModal(index) {
    if (index == searchedPokemon.length - 1) index = -1;
    updateModal(index + 1);
}

function decrementModal(index) {
    if (index == 0) index = searchedPokemon.length;
    updateModal(index - 1);
}

function closeHighlightImage() {
    dialogRef.close()
    dialogRef.classList.remove("open");
}

start();


//#endregion
