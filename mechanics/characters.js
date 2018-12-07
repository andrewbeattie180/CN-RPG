


const Character = class {
    constructor(name){
    this.name= name;
    this.health=100 ;
    this.damage=10; 
    this.defence=1
    this.status=1;  // 1 = alive,  0 = death;
}}

class Enemy extends Character {
    constructor(name, element){
        super (name)
        this.element= element;

    }
}




class Player extends Character{
    constructor(name){
        super (name)
    }
} 

class Mage extends Player{

    constructor(name, element){
        super (name)
        this.class="Dark Mage"
        this.element = element;
        this.damage=7
        this.defence=1.2
        this.name = name + " the " + this.element + " Mage";
        this.taunt="     "
    }
    spell(target) {      
      console.log("Speel casted")
        target.health -= (this.damage)*(battleCheck(this, target))
    }

}

class Healer extends Player{

    constructor(name){
        super (name)
        this.class="Medic"
        this.damage=5
        this.defence=1.2
        this.taunt="     "

    }

    heal(target) {
        target.health += 30;
    }

}

class Warrior extends Player{

    constructor(name){
        super (name)
        this.class="Knight"
        this.damage=12
        this.defence=0.8
        this.taunt="     "
    }

    allOutAttack(target) {
        this.health -= 5;
        target.health -= 25+RNG;
    }

}





const steven = new Healer("Steven")
const andrew = new Mage("Andrew", "Fire" )
const sam = new Healer ("Sam")
andrew.spell(sam);

const elliot = new Enemy("Elliot", "Water" )
console.log(steven)
console.log(andrew)
console.log(sam)