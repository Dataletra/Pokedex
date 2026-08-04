//#region CHECKLIST

/* 
[x] cards have different color background based on kind (fire, water etc.)

[x] background not scrollable when in selected view

[x] selected view closes when clicked outside of it (done through a transparent overlay, basically a layer on top )

[x] if clicked on card in general view, it opens up (selected view)

[x]within selected view show things like hp/ attack / defence, etc.

[x] arrows like in fotogram to go to next pokemon

Werte der kleinen Pokemonkarte:
[x] Name (Groß geschrieben!)
[x] Typ/en
[x] Bild des Pokemons
[x] Hintergrundfarbe passend zum Typ
[x] ID (optional)
[x] Die Karte hat einen Hovereffekt.

[x] load 20-40 pokemons

[x] on bottom of page have button "load more"


----------------------------
[x]content
<main>-Tag (Haupt-Container der Seite)

[x]search-input
<input>-Feld der Suchleiste


[]not-found
Kein-Treffer-Meldung (per JS ins DOM eingefügt)


[x]load-more-button
"Load More"-Button


[x]dialog
<dialog>-Element (das Modal/Overlay)


[]card
<button> jeder einzelnen Pokémon-Card


[x]card-image
<img> innerhalb der Pokémon-Card


[x]overlay-pokemon-name
Haupt-<div> des Dialogs (enthält Namen und Inhalt)


[x]close-dialog-button
Schließen-Button im Dialog


[x]dialog-image
<img> innerhalb des Dialogs

[x]prev-button
Zurück-Navigationsbutton im Dialog

[x]next-button
Vor-Navigationsbutton im Dialog

[] Replace DA Watermark

[] Replace fotogram logo

[] clean up media folder

[] put css/js files into assets folder
[] make button to reset searchbar next to load more (easy)
[] hover effect on small cards needs fixing
[] cursor pointer on small cards
[] auslagern von big code (14 zeilen)
[x] rheinfolge fixen
*/
//#endregion

//#region FOTOGRAM CODE
/*
let myimages = [{ title: "Moon", filename: "010.jpg" },
{ title: "Dataletra 1", filename: "271837003_456094392842517_8842353332537776650_n (1).png" },
{ title: "COD solider", filename: "5000x2813-px-call-duty-gun-soldier-warrior-805327-wallhere.com.png" },
{ title: "Blue space", filename: "7006585-blue-space.jpg" },
{ title: "time travel", filename: "70F6C444-BBA0-46E3-A51F3E8ABEAF6B23_source.jpg" },
{ title: "Can you feel the sun?", filename: "711tEiOsDCL._SL1200_.jpg" },
{ title: "The tree", filename: "8fydajjfq9f31.jpg" },
{ title: "I dont even know what this is", filename: "951164a9cd5e2e13bc3f1f84757a731e@2x.jpg" },
{ title: "Corpse 1", filename: "a0mmzqsvth261 (1).png" },
{ title: "Corpse 2", filename: "Corpse colored final.png" },
{ title: "Ready Or Not Dataletra", filename: "Dataletra 2.png" },
{ title: "Minecraft my beloved", filename: "Minecraft_-_Volume_Beta.jpg" }
];
const containerRef = document.getElementById("photo-container");
const dialogRef = document.getElementById("photo-highlight");

function renderImages() {
    containerRef.innerHTML = "";
    for (let index = 0; index < myimages.length; index++) {
        const element = myimages[index];
        containerRef.innerHTML += getImages(index);
    }
}

function highlightImage(index) {
    updateModal(index);
    dialogRef.classList.add("open");
    dialogRef.showModal()
}

function updateModal(index) {
    dialogRef.innerHTML = "";
    dialogRef.innerHTML += getModal(index);
}

function incrementModal(index) {
    //safetycheck
    if (index == myimages.length - 1) index = -1;
    updateModal(index + 1);
}

function decrementModal(index) {
    //safetycheck
    if (index == 0) index = myimages.length;
    updateModal(index - 1);
}

function closeHighlightImage() {
    dialogRef.close()
    dialogRef.classList.remove("open");
}
    */
//#endregion
//#region script
let apiOffset = 0;
let apiLimit = 30;
let pokemonWithinLocalStorage = 0;
const generalPokemonUrl = "https://pokeapi.co/api/v2/";
const pokeContainerRef = document.getElementById("poke-container");
const dialogRef = document.getElementById("pokemon-highlight");
let pokemonList = [];
let uncollectedPokemon = [];
const ALL_POKEMON = [];
const POKEMON_TYPE_ARR =
    ["Normal", "Fire", "Water",
        "Grass", "Electric", "Ice",
        "Fighting", "Poison", "Ground",
        "Flying", "Psychic", "Bug",
        "Rock", "Ghost", "Dragon",
        "Steel", "Fairy", "Dark"
    ];
let searchedPokemon = [];

function start() {
    init();
}

async function init() {
    await fetchPokemonlist(apiLimit, apiOffset);
    await updateLocalStorage();
    // call for loadingCircle();
    searchedPokemon = ALL_POKEMON;
    loadFromLocalStorage();
    renderSmallPokiCards();
}

async function updateLocalStorage() {
    let cachedNames = [];
    pokemonWithinLocalStorage = 0;
    for (let index = 0; index < localStorage.length; index++) {
        try {
            let key = localStorage.key(index);
            let rawData = localStorage.getItem(key);
            let pokemon = JSON.parse(rawData);
            cachedNames.push(pokemon.name);
            pokemonWithinLocalStorage++
        } catch (error) {
            console.error(error);
        }
    }
    await checkLocalStorageDupplicates(cachedNames)
}

async function checkLocalStorageDupplicates(cachedNames) {
    let newFind = false;
    for (const pokemon of pokemonList) {
        if (cachedNames.includes(pokemon.PokemonName)) {
            console.log("Found in cache, skipping API:", pokemon.PokemonName);
        } else {
            uncollectedPokemon.push(pokemon);
            console.log("NEW FIND:", pokemon.PokemonName);
            newFind = true;
        }
    }
    if (newFind) {
        console.log(uncollectedPokemon);
        await fetchExactPokemon(uncollectedPokemon, newFind);
    }
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
        } catch (error) {
            console.error(error);
        }
    }
}

function renderSmallPokiCards() {
    console.log("RENDER STARTS");
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
        console.log("FETCHING EXACT ->" + pokemon.PokemonName);
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
    } else apiOffset += apiLimit;
    document.getElementById("search-field").value = "";
    init();
}

function searchFieldTrigger() {
    searchedPokemon = [];
    console.log("SEARCH RENDER STARTS");
    const searchFieldContentRef = document.getElementById("search-field").value.toLowerCase();
    const imageContainerRef = document.querySelectorAll(".poke-card");
    for (let index = 0; index < ALL_POKEMON.length; index++) {
        if (ALL_POKEMON[index].name.includes(searchFieldContentRef)) {
            searchedPokemon.push(ALL_POKEMON[index])
        }
    }
    if (searchedPokemon.length > 0) {
        renderSmallPokiCards()
    } else {
        pokeContainerRef.innerHTML = "";
    }
}

function resetSearch() {
    document.getElementById("search-field").value = "";
    searchFieldTrigger();
}
function highlightPokemon(index) {
    updateModal(index);
    dialogRef.classList.add("open");
    dialogRef.showModal()
}

function closePokemon(index) {
    dialogRef.classList.remove("open");
    dialogRef.close()
}

function updateModal(index) {
    try {
        dialogRef.innerHTML = getModal(index, searchedPokemon[index]);
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
