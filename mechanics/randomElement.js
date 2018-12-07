const elements = ['fire','water','grass'];

function randomElement(){
    let randomIndex = Math.floor(Math.random()*elements.length)
    return elements[randomIndex];
}