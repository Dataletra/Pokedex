function getImages(index) {
    return /*html*/`
        <div id="image-container">
            <img class="image" id="img${index}" 
            src="media/${myimages[index].filename}" 
            onclick="highlightImage(${index})"
            alt="media/${myimages[index].title}">
        </div>`;
}

function getModal(index) {
    return /*html*/`
    <div class="dialog-content">
        <header class="photo-highlight-header">
			<p>${myimages[index].title}</p>
			<button class="button-close" onclick="closeHighlightImage()">X</button>
		</header>
        <img class="highlight-image" id="img${index}" 
            src="media/${myimages[index].filename}"
            alt="media/${myimages[index].title}"
            onclick="highlightImage(${index})">
		<footer class="photo-highlight-footer">
			<button  onclick="decrementModal(${index})"><img class="button-left" src="./media/button.png"></button>
			<p>${index + 1}/${myimages.length}</p>
			<button  onclick="incrementModal(${index})"><img class="button-right" src="./media/button.png"></button>
		</footer>
    </div>`;
}