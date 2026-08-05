
async function randomDegreeGenerator() {
    document.querySelectorAll('[class*="bg_"]').forEach(card => {
        const randomDeg = Math.floor(Math.random() * 360);
        card.style.setProperty('--gradient-angle', `${randomDeg}deg`);
    });
}
function setRandomGradientAngle() {
    const randomDeg = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty('--gradient-angle', `${randomDeg}deg`);
}