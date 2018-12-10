const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const canvasCenterX = canvas.width/2;
const canvasCenterY = canvas.height/2;

const enemyCenterX = canvasCenterX*(1.5);
const enemyCenterY = canvasCenterY*0.75;

const imgWarrior = new Image ();
imgWarrior.src = './img/visored-helm.svg';

const imgMage = new Image ();
imgMage.src = './img/wizard-face.svg';

const imgHealer = new Image ();
imgHealer.src = './img/woman-elf-face.svg';

const imgSlime = new Image ()
const imgDragon = new Image ();
const imgMunchkin  = new Image ();

let dragonID = null;
let munchkinID = null;
let slimeID = null;
let mageID = null;
let warriorID = null;
let healerID = null;

const drawWarriorImage = ()=>{
    ctx.drawImage(imgWarrior,20,60,100,100)
    fillText('WARRIOR',70,65,'lime',15);
    drawBox(10,50,120,120)
    drawCharacterHealth(this,130,50)

}

const drawWarrior = ()=>{
    warriorID = setInterval(drawWarriorImage,10);
}

const drawMageImage = ()=>{
    ctx.drawImage(imgMage,20,180,100,100);
    fillText('MAGE',70,185,'lime',15);
    drawBox(10,170,120,120)
    drawCharacterHealth(this,130,170)

}

const drawMage = ()=>{
    mageID = setInterval(drawMageImage,10);
}

const drawHealerImage = ()=>{
    ctx.drawImage(imgHealer,20,300,100,100)
    fillText('HEALER',70,305,'lime',15)
    drawBox(10,290,120,120)
    drawCharacterHealth(this,130,290)
}

const drawHealer = ()=>{
    healerID = setInterval(drawHealerImage,10);
}

const drawBox = (x,y,width,height) =>{
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="lime";
    ctx.rect(x,y,width,height);
    ctx.stroke();
}

const drawCharacterHealth = (player,x,y) =>{
    let maxHealth = 100;
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="lime";
    ctx.rect(x,y,200,120);
    ctx.stroke();
    fillText("HEALTH: ",x+40,y+30,'lime',15);
    // if (player.health < 0) {
    //     player.health = 0
    // }
    let hbc = 'lime'
    // if (player.health > 50) {
    //     hbc = 'lime';
    // } else if (player.health > 20 && player.health <= 50) {
    //     hbc = 'yellow';
    // } else {
    //     hbc = 'red';
    // }
    ctx.fillStyle = hbc;
    ctx.fillRect(x+70, y+15, (100), 20);
    fillText("100" + "/"+maxHealth,x+105,y+60,'lime',20)

}
const drawEnemyHealth = () => {
    if (enemy.health < 0) {
        enemy.health = 0
    }
    let hbc;
    if (enemy.health > 50) {
        hbc = 'lime';
    } else if (enemy.health > 20 && enemy.health <= 50) {
        hbc = 'yellow';
    } else {
        hbc = 'red';
    }
    fillText("HEALTH: ", 500, 60, hbc, 17);
    ctx.fillStyle = hbc;
    ctx.fillRect(550, 45, (100 - (100 - enemy.health)), 20);

}

const stopDrawingEnemies = ()=>{
    dragonID = null;
    munchkinID = null;
    slimeID = null;
}

const drawMunchkinImage = ()=>{
    if (enemy.element === 'Fire'){
        imgMunchkin.src = './img/munchkin-fire.svg'; 
    } else if (enemy.element === 'Grass'){
        imgMunchkin.src = './img/munchkin-grass.svg'
    } else {imgMunchkin.src = './img/munchkin-water.svg'}
    ctx.drawImage(imgMunchkin,enemyCenterX-200/2,enemyCenterY-200/2, 200,200);
    fillText(enemy.name.toUpperCase(),enemyCenterX,35,'lime',25);
    drawEnemyHealth();
    drawBox(enemyCenterX-150,10,300,80);
}

const drawDragonImage = ()=>{
    if (enemy.element === 'Fire'){
        imgDragon.src = './img/wyvern-fire.svg'; 
    } else if (enemy.element === 'Grass'){
        imgDragon.src = './img/wyvern-grass.svg'
    } else {imgDragon.src = './img/wyvern-water.svg'}
    ctx.drawImage(imgDragon,enemyCenterX-350/2,enemyCenterY-350/2,350,350);
    fillText(enemy.name.toUpperCase(),enemyCenterX,35,'lime',25);
    drawEnemyHealth();
    drawBox(enemyCenterX-150,10,300,80);
}

const drawSlimeImage = () => {
    if (enemy.element === 'Fire'){
        imgSlime.src = './img/slime-fire.svg'; 
    } else if (enemy.element === 'Grass'){
        imgSlime.src = './img/slime-grass.svg'
    } else {imgSlime.src = './img/slime-water.svg'}
    ctx.drawImage(imgSlime,enemyCenterX-150/2,enemyCenterY-150/2,150,150);
    fillText(enemy.name.toUpperCase(),enemyCenterX,35,'lime',25);
    drawEnemyHealth();
    drawBox(enemyCenterX-150,10,300,80);
}

const drawDragon = ()=>{
    dragonID=setInterval(drawDragonImage,10);
}

const drawMunchkin = ()=>{
    munchkinID = setInterval(drawMunchkinImage,10);
}

const drawSlime = () => {
    slimeID = setInterval(drawSlimeImage,10);
}


let stage = 1;
let difficulty = stage*stage;
let difficultyCheck = ()=>{
    // console.log(difficulty)
    if (difficulty>=65){
        difficulty = 65
    }
}

let randomEnemy = () => {
    difficultyCheck();
    let enemies = [
        new Slime(randomElement()),
        new Munchkin(randomElement()),
        new Dragon(randomElement())
    ];
    let number = Math.floor(Math.random()*100)
    if (number<(67-difficulty)){
        stopDrawingEnemies();
        drawSlime();
        return enemies[0]

    } else if (number>=(67-difficulty) && number <97-(difficulty)){
        stopDrawingEnemies();
        drawMunchkin();
        return enemies[1]

    } else {
        stopDrawingEnemies();
        drawDragon();
        return enemies[2];


    }
    
}

const fillText = (text, x, y, color, fontSize) => {
    if (color.typeOf !== 'undefined') ctx.fillStyle = color;
    if (fontSize.typeOf !== 'undefined') ctx.font = fontSize + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}




let RNG = () => {
    return Math.floor(Math.random() * 10) - 5;
  };
  
  let elements = ["Grass", "Fire", "Water"];
  let randomElement = () => {
    let randomIndex = Math.floor(Math.random() * (elements.length));
    if (randomIndex === elements.length){
      randomIndex-=1;
    }
    return elements[randomIndex];
  }

  
  const Character = class {
    constructor(name) {
      this.name = name;
      this.health = 100;
      this.damage = 10;
      this.defence = 1;
    }
    attack(target) {
      let damage = Math.floor((this.damage + RNG()) * target.defence);
      console.log(
        this.name +
          " attacked " +
          target.name +
          " and caused " +
          damage +
          " damage"
      );
      target.health -= damage;
    }
    defend() {
      console.log(this.name + " raised it's shield");
      this.defence * 0.5;
    }
    resetDefence(target) {
      target.defence = 1;
    }
    heal(target) {
      target.health += 30 + RNG();
    }
  };
  
  class Enemy extends Character {
    constructor(name) {
      super(name);
    }
    cackle() {
      console.log(this.name + " cackled manically");
    }
  }
  
  class Slime extends Enemy {
    constructor(element) {
      super(element);
      this.element = element
      this.class = 'Slime'
      this.name = this.element+ " " + this.class;
      this.health = 70;
      this.defence = 1.1;
    }
    basic() {
      console.log(this.name + " slimed the player");
    //   target.health -= (this.damage * battleCheck(this,target))+RNG();
    }
    special(){
        let absorbedHealth = 10 + RNG();
        console.log(this.name + " absorbed " + absorbedHealth + " of player's health")
        // target.health -= absorbedHealth;
        this.health += absorbedHealth;
      }
  }
  
  class Munchkin extends Enemy {
    constructor(element) {
      super(element);
      this.element = element
      this.class = "Munchkin"
      this.name = this.element +" "+this.class;
      this.defence = 0.9;
      this.health = 100;
    }
    basic() { //needs a target
      console.log(
        this.name +
          " raised it's sword and smashed " +
        //   target.name +
          "player but it's defence has wobbled"
      );
    //   target.health -= 20 + RNG();
    //   this.defence += 0.05 * RNG();
    }
    special(){
        // console.log(target.name + " is scared");
        console.log("Player is scared to attack")
        // target.damage = target.damage*0.8
    }

  }
  
  class Dragon extends Enemy{
    constructor(element){
      super(element);
      this.element = element
      this.class = "Dragon"
      this.health = 180
      this.name = this.element + " Dragon";
    }
    basic(){
        let probability = (RNG() + 5)/10;
        if (probability < 0.75){
      console.log('FUUUUUUUUUUUUUUUUUUUUUUUU............')
    //   target.health -= 70 + RNG();
    } else {
        // console.log(target.name + " somehow rolled out of the way")
        console.log("Player dodged")
    }
}
    special(){
      console.log(this.name + " attacked player with elemental flames");
    //   target.health -= (this.damage * battleCheck(this,target))+RNG();
    }
  }
  
  class Player extends Character {
    constructor(name, element, spell) {
      super(name, element);
      this.spell = spell;
    }
    cast(target) {
      let damage = (this.damage * battleCheck(this, target))+RNG();
      console.log(this.name + " used " + this.spell + " on " + target.name + " causing "+damage+" damage");
      target.health -= damage
    }
  }
  
  function indexCheck(element) {
    for (let i = 0; i < elements.length; i++) {
      if (element == elements[i]) {
        return i;
      }
    }
  }
  
  function battleCheck(hero, enemy) {
    let attack = indexCheck(hero.element);
    let defence = indexCheck(enemy.element);
    let output = attack - defence;
    if (output == -1 || output == 2) {
      console.log("Weak ass attempt");
      return 0.5;
    } else if (output === 0) {
      console.log("Solid hit");
      return 1;
    } else if (output === -2 || output === 1) {
      console.log("Super effective bro");
      return 1.5;
    }
  }

  let enemy;

  function getAllMethodNames(obj) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
      let keys = Reflect.ownKeys(obj)
      keys.forEach((k) => methods.add(k));
    }
    return methods;
  }
  
 
  let  badGuy=()=>{
    enemy = randomEnemy();
    console.log(enemy)
    // enemy.basic();
    // enemy.special();
;
  }

  let draw = () =>{
      badGuy();
      drawWarrior();
      drawMage();
      drawHealer();
  }
draw();