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

const imgEnemy = new Image();

let enemyID = null;
let enterPressed = false;
let gameInProgress = false;



function keyDownHandler(e) {
    e.preventDefault()
    if (e.keyCode == 13) {
        console.log("Enter Pressed")
        enterPressed = true;
    }
}

const drawWarrior = ()=>{
    ctx.drawImage(imgWarrior,20,60,100,100)
    fillText(warrior.name.toUpperCase(),70,65,'lime',15);
    drawBox(10,50,120,120)
    drawCharacterHealth(warrior,130,50)
    drawCharacterSpeedBar(warrior,200,130)
}
const drawMage = ()=>{
    ctx.drawImage(imgMage,20,180,100,100);
    fillText(mage.name.toUpperCase(),70,185,'lime',15);
    drawBox(10,170,120,120)
    drawCharacterHealth(mage,130,170)
    drawCharacterSpeedBar(mage,200,250)
}
const drawHealer = ()=>{
    ctx.drawImage(imgHealer,20,300,100,100)
    fillText(healer.name.toUpperCase(),70,305,'lime',15)
    drawBox(10,290,120,120)
    drawCharacterHealth(healer,130,290)
    drawCharacterSpeedBar(healer,200, 380)
}
const drawMessage=(text)=>{
    ctx.clearRect(10,420,canvas.width-20,70);
    drawBox(10,420, canvas.width-20,70)
    fillText(text.toUpperCase(),canvasCenterX,470,"lime",20);
}
 
const drawBox = (x,y,width,height) =>{
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="lime";
    ctx.rect(x,y,width,height);
    ctx.stroke();
}
const drawCharacterSpeedBar = (player,x,y) =>{
    ctx.clearRect(x,y,(player.turn/800)*100,10);
    drawBox(x-4,y-4,108,18);
    ctx.fillRect(x,y,(player.turn/800)*100,10);
}
const drawCharacterHealth = (player,x,y) =>{
    let maxHealth = 100;
    ctx.beginPath();
    ctx.lineWidth="4";
    ctx.strokeStyle="lime";
    ctx.rect(x,y,200,120);
    ctx.stroke();
    fillText("HEALTH: ",x+40,y+30,'lime',15);
    if (player.health < 0) {
        player.health = 0
    }
    let hbc = 'lime'
    if (player.health > 50) {
        hbc = 'lime';
    } else if (player.health > 20 && player.health <= 50) {
        hbc = 'yellow';
    } else {
        hbc = 'red';
    }
    ctx.fillStyle = hbc;
    ctx.fillRect(x+70, y+15, (100-(maxHealth-player.health)), 20);
    fillText(player.health + "/"+maxHealth,x+105,y+60,'lime',20)

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

const drawEnemyImage = () => {
    imgEnemy.src = './img/'+enemy.class+enemy.element+'.svg'; 
    ctx.drawImage(imgEnemy,enemyCenterX-150/2,enemyCenterY-150/2,150,150);
    fillText(enemy.name.toUpperCase(),enemyCenterX,35,'lime',25);
    drawEnemyHealth();
    drawBox(enemyCenterX-150,10,300,80);
}

let playerTurn = false;
let inventory = [];
let stage = 1;
let difficulty = stage*stage;

let difficultyCheck = ()=>{
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
        return enemies[0]
    } else if (number>=(67-difficulty) && number <97-(difficulty)){
        return enemies[1]
    } else {
        return enemies[2];
    }
    
}

const fillText = (text, x, y, color, fontSize) => {
    if (color.typeOf !== 'undefined') ctx.fillStyle = color;
    if (fontSize.typeOf !== 'undefined') ctx.font = fontSize + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

let actionInProgress = false

let currentMessage = "Welcome to Dungeon Balti";

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
      this.turn = 0;
      this.health = 100;
      this.damage = 10;
      this.defence = 1;
      this.status=1;  // 1 = alive,  0 = death;

    }
    attack(target) {
      let damage = Math.floor((currentPlayer.damage + RNG()) * target.defence);
        currentMessage = currentPlayer.name + " attacked " + target.name + " and caused " + damage + " damage";
        target.health -= damage;
        }
    defend() {
      currentMessage =   currentPlayer.name + " raised it's shield"
    //   console.log(currentPlayer.name + " raised it's shield");
      currentPlayer.defence * 0.5;
    }
  };

  class Player extends Character{
    constructor(name){
      super (name)
    }
    openInventory(){
        if (inventory.length === 0){
        console.log("Oh frack, your bag is empty")
    }
} 
} 

class Mage extends Player{

    constructor(element){
        super ()
        this.class="Mage"
        this.element = element;
        this.damage=7
        this.defence=1.2
        this.speed = 6
        this.name = this.element + " " + this.class;
        this.attackA = "CAST SPELL"
        this.attackB = "FOCUS"
    }
    attackOne(target) {      
        let damage = Math.floor(currentPlayer.damage)*(battleCheck(currentPlayer, target))
        currentMessage = currentPlayer.name + " cast " + currentPlayer.element + " for " + damage + " damage";
        target.health -= damage
    }
    attackTwo(target){
        currentMessage = currentPlayer.name + " has concentrated their powers";
        currentPlayer.damage = currentPlayer.damage*1.1;
    }


}

class Healer extends Player{

    constructor(){
        super ()
        this.class="Healer"
        this.name = this.class
        this.damage=2
        this.speed = 4
        this.defence=1.2
        this.taunt="     "
        this.attackA = "HEAL"
        this.attackB = "REVIVE"

    }

    attackOne(target) {
        currentMessage = currentPlayer.name + " healed their team"
    let team = [warrior,mage,healer]
      for(i=0;i<team.length;i++){
        team[i].health += 30 +RNG();
      if(target.health>100){
        target.health = 100;
      }
    }
    }
    attackTwo(target) {  
        let team = [warrior,healer,mage]
        for (let i = 0;i<team.length;i++){   
            if (team[i].status == 0) { 
        currentMessage =  currentPlayer.name + " casted REVIVE spell, " + team[i].name +"is revived";
        team[i].status = 1;
        } else {
        currentMessage = currentPlayer.name + " tried to REVIVE " + team[i].name +" but they are already very much alive - NO EFFECT";
       } 
      }
    }
}


class Warrior extends Player{

    constructor(){
        super ()
        
        this.class="Knight"
        this.name = this.class;
        this.damage = 12
        this.speed = 1
        this.defence=0.8
        this.taunt="     "
        this.attackA = "GO ALL OUT"
        this.attackB = "RAGE"
    }

    allOutAttack(target) {
        currentMessage = currentPlayer.name + " attacked with all their might and did 25 damage"
        currentPlayer.health -= 5;
        target.health -= 25;
    }
    rage(target){
        currentMessage = currentPlayer.name + " is angry";
        currentPlayer.damage = currentPlayer.damage*1.2;
        currentPlayer.defence= currentPlayer.defence*1.2;
    }

}
  
  class Enemy extends Character {
    constructor(name) {
      super(name);
      this.name = name;
    }
    cackle(target) {
        currentMessage = currentPlayer.name + " cackled manically";
    }
  }
  
  class Slime extends Enemy {
    constructor(element) {
      super(element);
      this.element = element
      this.class = 'Slime'
      this.speed = 2
      this.name = this.element+ " " + this.class;
      this.health = 70;
      this.defence = 1.1;
    }
    basic(target) {
      currentMessage = currentPlayer.name + " slimed " + target.name 
      target.health -= (currentPlayer.damage * battleCheck(currentPlayer,target))+RNG();
    }
    special(target){
        let absorbedHealth = 10 + RNG();
        currentMessage = currentPlayer.name + " absorbed " + absorbedHealth + " of "+target.name+"'s health";
        target.health -= absorbedHealth;
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
      this.speed = 5}
    basic(target) { 
      currentMessage = 
        currentPlayer.name +
          " raised it's sword and smashed " +
          target.name +
          " but it's defence has wobbled"
      ;
      target.health -= 20 + RNG();
      currentPlayer.defence += 0.05 * RNG();
    }
    special(target){
        currentMessage = currentPlayer.name + " roared and " + target.name + " is scared";
        target.damage = target.damage*0.8
    }

  }
  
  class Dragon extends Enemy{
    constructor(element){
      super(element);
      this.element = element
      this.speed = 10
      this.class = "Dragon"
      this.health = 180
      this.name = this.element + " Dragon";
    }
    basic(target){
        let probability = (RNG() + 5)/10;
        if (probability < 0.75){
        let damage = 70 + RNG();  
      currentMessage = currentPlayer.name + " incinerated " + target.name + " causing " + damage + " damage!"
      target.health -= 70 + RNG();
    } else {
      currentMessage = target.name + " somehow rolled out of the way of the flames"
    }
}
    special(target){
      currentMessage = currentPlayer.name + " attacked " +target.name +" with elemental flames";
      target.health -= (currentPlayer.damage * battleCheck(currentPlayer,target))+RNG();
    }
  }
  
  const performAction = (e) =>{
      if (playerTurn){
          if(e.keyCode == 49){
              currentPlayer.attack(enemy)
          } else if (e.keyCode == 50){
              currentPlayer.defend()
          } else if (e.keyCode == 51){
              currentPlayer.attackOne(enemy)
          } else if (e.keyCode == 52){
              currentPlayer.attackTwo(enemy)
          }
          
          playerTurn = false;
          actionUnpauseFunction();
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
    if (!enemy.element){
        enemy.element = hero.element
    }
    let attack = indexCheck(hero.element);
    let defence = indexCheck(enemy.element);
   
    let output = attack - defence;
    if (output == -1 || output == 2) {
      return 0.5;
    } else if (output === 0) {
      return 1;
    } else if (output === -2 || output === 1) {
      return 1.5;
    }
  }
  let mage = new Mage(randomElement());
  let warrior = new Warrior();
  let healer = new Healer ()
  let enemy;
  
  const enemyActions = (player)=>{
    let targets = [healer,mage,warrior];
        let target = targets[Math.floor(Math.random()*3)]
        let actions = [
          player.attack,
          player.defend,
          player.cackle,
          player.basic,
          player.special
        ];
        let enemyRNG = (RNG()+5);
        if (enemyRNG > 4){
            enemyRNG = enemyRNG - 5;
        }
        actions[enemyRNG](target);
  }


  const action = (player)=>{
      if(player.class === 'Munchkin'||player.class==="Dragon"||player.class==="Slime"){
        enemyActions(player);
        actionUnpauseFunction();
        } else {
        playerTurn = true;    
        }
  }
 
  let  badGuy=()=>{
    enemy = randomEnemy();
  }

  const blinkingText = (text, x, y, frequency, color, fontSize) => {
    if (~~(0.5 + Date.now() / frequency) % 2) {
        fillText(text, x, y, color, fontSize)
    }
}
let temp = [];
let actionPaused = false;

const actionPauseFunction = ()=>{
    actionPaused = true;
    let players = [warrior,mage,healer,enemy]
    for(let j = 0;j<players.length;j++){
        temp.push(players[j].speed)
          players[j].speed = 0;
    }    
}

const actionPauseCheck = ()=>{
    if(actionPaused && currentPlayer !== null){
        currentMessage = "it is " + currentPlayer.name + "'s turn";
    }
}

const actionUnpauseFunction = ()=>{
    actionPaused = false
    let players = [warrior,mage,healer,enemy]
    for (let j = 0;j<players.length;j++){
        currentPlayer.turn = 0;
        players[j].speed = temp[j];
    }
    temp=[];
}


let currentPlayer = null;

let speedFunction = ()=>{
    let players = [warrior,mage,healer,enemy]
      for (let i = 0;i<players.length;i++){
          players[i].turn += players[i].speed;
          if(players[i].turn > 800){
              currentPlayer = players[i];
              actionPauseFunction();
              action(currentPlayer)
            }
        }
  }

  const drawActionBox = ()=>{
    drawBox(10, 500, canvas.width-20,190)
}
  
const drawActions = ()=>{
        if(playerTurn === true){
            fillText("1 ATTACK",canvasCenterX/2,560,'lime',45);
            fillText('2 DEFEND',canvasCenterX/2,610,'lime',45);
            fillText('INVENTORY',canvasCenterX/2,660,'lime',45)
            fillText('3 '+ currentPlayer.attackA,canvasCenterX + canvasCenterX/2,560,'lime',45);
            fillText('4 '+ currentPlayer.attackB,canvasCenterX + canvasCenterX/2,610,'lime',45)
        }
    }


  let draw = () =>{
      ctx.clearRect(0,0,canvas.width,canvas.height)
      drawWarrior();
      drawMage();
      drawHealer();
      drawActionBox();
      drawActions()
      drawMessage(currentMessage);
      actionPauseCheck();

  }
let speedID
let gameID;
let loadScreenID = null;
let creditsScreenDisplayed = false;
let creditScreenId = null;

const end = (func) => {
    clearInterval(func)
}

const drawEnemy = ()=>{
        enemyID = setInterval(drawEnemyImage,10)
}

const loadScreen = ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillText("DUNGEON BALTI ", canvas.width / 2, canvas.height / 2.75, '#00FF00', 75);
    blinkingText('Press Enter', canvas.width / 2, canvas.height / 2, 500, '#00FF00', 60);
    fillText("Press C for credits", canvas.width - 90, canvas.height - 20, 'lime', 20)
}

  let game = ()=>{
      end(loadScreenID)
      badGuy();
      gameID = setInterval(draw,10);
      speedID = setInterval(speedFunction,50)
      drawEnemy();
  }

const runGame = ()=>{
    if (!enterPressed && !gameInProgress && !creditsScreenDisplayed){
        loadScreenID = setInterval(loadScreen,10);
    } else {
        end(loadScreenID)
        loadScreenID = null;
    }
    if (enterPressed && !gameInProgress && !creditsScreenDisplayed) {
        enterPressed = false;
        gameInProgress = true;
        game();
    }
}



const creditsScreen = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillText('CREDITS', canvasCenterX, canvasCenterY, 'lime', 40);
    fillText('Developed by', canvasCenterX, canvasCenterY + 40, 'lime', 30);
    fillText('Andrew Beattie, Seng Ng', canvasCenterX, canvasCenterY + 70, 'lime', 20);
    fillText('Game icons from: game-icons.net', canvasCenterX, canvasCenterY + 100, 'lime', 25);
};

const creditsScreenFunction = (e) => {
    if (!enterPressed && !gameInProgress) {
        if (e.keyCode === 67) {
            creditsScreenDisplayed = !creditsScreenDisplayed;
            if (creditsScreenDisplayed) {
                console.log(loadScreenID)
                end(dungeonBalti);
                end(loadScreenID);
                creditScreenId = setInterval(creditsScreen, 10);
                console.log('credits shown - error check')
            } else if (!creditsScreenDisplayed) {
                console.log('credits hidden');
                end(creditScreenId);
                creditScreenId = null;
                runGame();
            }
        }
    }
}

const dungeonBalti = (e) => {
    if (e.keyCode == 13) {
        runGame();
    }
}
runGame();

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keydown", dungeonBalti, false)
document.addEventListener('keydown', creditsScreenFunction, false);
document.addEventListener('keydown', performAction, false);