let hero ={
    name:"Steven",
    element:"fire",
    damage:10,
    health:100,
}

let enemy ={
    name:"Elliot",
    element:"fire",
    damage:10,
    health:100,
}



let elements = ["grass",'fire','water'];

function indexCheck(element){
    for (let i = 0;i<elements.length;i++){
        if (element == elements[i]){
            return i
        }
    }
}

function battleCheck(hero,enemy){
    let attack = indexCheck(hero.element);
    let defence = indexCheck(enemy.element);
    let output = attack-defence;
    if (output == -1||output == 2){
        console.log("Weak ass attempt");
        return 0.5;
    } else if (output == 0){
        console.log('Solid hit')
        return 1;
    } else if (output == -2|| output == 1){
        console.log("Super effective bro")
        return 1.5;
    }
}