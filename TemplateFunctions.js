// function getImages(index) {
//     return /*html*/`
//         <div id="image-container">
//             <img class="image" id="img${index}" 
//             src="media/${myimages[index].filename}" 
//             onclick="highlightImage(${index})"
//             alt="media/${myimages[index].title}">
//         </div>`;
// }

function renderCardSingleType(pokemon, index) {
    return /*html*/`
        <div id="image-container-${index}" class="poke-card bg_${pokemon.types[0]}" data-name="${pokemon.name.toLowerCase()}">
            <p>${pokemon.name.toUpperCase()}</p>
            <img class="image" 
            src="${pokemon.picture}"
            onclick="highlightPokemon(${index})">
            <div class="type-container">
                <p class="first-type" data-pokeClass="${pokemon.types[0]}"></p>
            </div>
        </div>`;
}
function renderCardDoubleType(pokemon, index) {
    return /*html*/`
        <div id="image-container-${index}" class="poke-card bg_${pokemon.types[0]}" data-name="${pokemon.name.toLowerCase()}">
            <p>${pokemon.name.toUpperCase()}</p>
            <img class="image" 
            src="${pokemon.picture}"
            onclick="highlightPokemon(${index})">
            <div class="type-container">
                <p class="first-type" data-pokeClass="${pokemon.types[0]}"></p>
                <p class="second-type" data-pokeClass="${pokemon.types[1]}"></p>
            </div>
        </div>`;
}


function getModal(index, pokemon) {
    return /*html*/`
    <div class="dialog-content">
        <header class="photo-highlight-header">
			<p>${pokemon.name}</p>
			<button class="button-close" onclick="closeHighlightImage()">X</button>
		</header>
        <img class="highlight-image" id="img${index}" 
            src="${pokemon.picture}"
            alt="${pokemon.name}">
		<footer class="photo-highlight-footer">
			<button  onclick="decrementModal(${index})"><img class="button-left" src="./media/button.png"></button>
			<p>${index + 1}/${localStorage.length}</p>
			<button  onclick="incrementModal(${index})"><img class="button-right" src="./media/button.png"></button>
		</footer>
    </div>`;
}