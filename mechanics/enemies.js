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
  let randomEnemy = () => {
      let enemies = [new Munchkin(randomElement()),new Slime(randomElement()),new Dragon(randomElement())];
      let number = Math.floor(Math.random()*100)
      if (number<60){
          return enemies[0]
      } else if (number>=60 && number <96){
          return enemies[1]
      } else {
          return enemies[2];
      }
      
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
      this.health = 40;
      this.defence = 1.1;
    }
    slime(target) {
      console.log(this.name + " slimed " + target.name);
    }
  }
  
  class Munchkin extends Enemy {
    constructor(element) {
      super(element);
      this.element = element
      this.class = "Munchkin"
      this.name = this.element +" "+this.class;
      this.defence = 0.9;
      this.health = 120;
    }
    bash(target) {
      console.log(
        this.name +
          "raised it's club and smashed " +
          target.name +
          " but it's defence has wobbled"
      );
      target.health -= 20 + RNG();
      this.defence += 0.05 * RNG();
    }
  }
  
  class Dragon extends Enemy{
    constructor(element){
      super(element);
      this.element = element
      this.class = "Dragon"
      this.name = this.element + " Dragon";
    }
    obliterate(target){
      console.log('FUUUUUUUUUUUUUUUUUUUUUUUU............')
      target.health = 0;
    }
    breatheFire(target){
      console.log(this.name + " let out a mighty roar, and roasted "+target.name+ " with fire made of " + this.element);
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

 
  let  badGuy=()=>{
    return randomEnemy();
  }
  const Elliot = badGuy();
  const Andrew = badGuy();
  const Steven = badGuy();
  const Sam = badGuy();
  console.log(Steven);
  console.log(Sam);
  console.log(Elliot);
  console.log(Andrew);

  