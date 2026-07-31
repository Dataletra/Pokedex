//#region CHECKLIST

/* 
[] cards have different color background based on kind (fire, water etc.)

[] background not scrollable when in selected view

[] selected view closes when clicked outside of it (done through a transparent overlay, basically a layer on top )

[] if clicked on card in general view, it opens up (selected view)

[]within selected view show things like hp/ attack / defence, etc.

[] arrows like in fotogram to go to next pokemon

Werte der kleinen Pokemonkarte:
[] Name (Groß geschrieben!)
[] Typ/en
[] Bild des Pokemons
[] Hintergrundfarbe passend zum Typ
[] ID (optional)
[] Die Karte hat einen Hovereffekt.

[] load 20-40 pokemons

[] on bottom of page have button "load more"


----------------------------
[]content
<main>-Tag (Haupt-Container der Seite)

[]search-input
<input>-Feld der Suchleiste


[]not-found
Kein-Treffer-Meldung (per JS ins DOM eingefügt)


[]load-more-button
"Load More"-Button


[]dialog
<dialog>-Element (das Modal/Overlay)


[]card
<button> jeder einzelnen Pokémon-Card


[]card-image
<img> innerhalb der Pokémon-Card


[]overlay-pokemon-name
Haupt-<div> des Dialogs (enthält Namen und Inhalt)


[]close-dialog-button
Schließen-Button im Dialog


[]dialog-image
<img> innerhalb des Dialogs

[]prev-button
Zurück-Navigationsbutton im Dialog

[]next-button
Vor-Navigationsbutton im Dialog

*/
//#endregion

let apiOffset = 0;
let generalApiUrl = "https://pokeapi.co/api/v2/";
const containerRef = document.getElementById("poke-container");
function init() {

    // call for loadingCircle();
    //await fetch
    // call to start rendering fetched data
}

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