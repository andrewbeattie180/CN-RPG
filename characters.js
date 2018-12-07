


const Character = class {
    constructor(name,element){
    this.name= name;
    this.health=100 ;
    this.element= element;
    this.damage=10; 
}

}

class Enemy extends Character {

    constructor(name, element){

        super (name, element)


    }
}




class Player extends Character{

    constructor(name, element, spell){
  
        super (name, element)
        this.spell = spell;
     
            
        


    }

    playerattack(target) {
        
        target.health -= this.damage*(battleCheck(this, target))
    }
} 



const steven = new Player("Steven", "Fire", "Fire")

const elliot = new Enemy("Elliot", )


cosnole.log(steven.attack)