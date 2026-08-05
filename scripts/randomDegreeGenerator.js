
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
// .backdrop_fire::backdrop {
// 	background-image: linear-gradient(150deg, red, rgb(255, 170, 0), rgb(194, 0, 0), rgb(255, 170, 0), red);
// 	background-size: 400% 400%;
// 	animation: gradientShift 8s linear infinite;
// }