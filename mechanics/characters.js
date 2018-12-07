let RNG = Math.floor(Math.random()*10)-5;


const Character = class {
    constructor(name,element){
    this.name= name;
    this.health=100 ;
    this.element= element;
    this.damage=10;
    this.defence = 1 
}
attack(target){
    console.log(this.name + " attacked " +target.name)
    target.health -= (this.damage+RNG)*target.defence
}

defend(){
    this.defence * 0.5
}
resetDefence(){
    this.defence = 1;
}
heal(target){
    target.health += 30 + RNG
}
}

class Enemy extends Character {
    constructor(name, element){
        super (name, element)
    }
    cackle(){
        console.log(this.name + " cackled manically")
    }
}




class Player extends Character{

    constructor(name, element, spell){
  
        super (name, element)
        this.spell = spell;
     
            
        


    }

    spell(target) {
        console.log(this.name + "used " + this.spell);
        target.health -= this.damage*(battleCheck(this, target));
    }
} 



const steven = new Player("Steven", "Fire", "Fire")

const elliot = new Enemy("Elliot", )


cosnole.log(steven.attack)