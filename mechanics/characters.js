
let RNG = Math.floor(Math.random()*10)-5;





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
    }}


class Player extends Character{
    constructor(name){
      super (name)
      this.potionCarrying=1
      this.phoneixDownCarrying=1
    }
  
    basicAttack(target){
        console.log(this.name +" attack"+ target.name)
        target.health -= this.damage* target.defence}
  
    usePotion(target){
      if (this.potionCarrying<1){
        console.log(this.name + "has no potion" )
      }
      else{          
        this.potionCarrying-=1;
        target.health += 50;
          if(target.health>100){
            target.health = 100;
       }}}
      
      usePhoneixDown(target){ 
      if(this.phoneixDownCarrying<1){
        console.log(this.name + "has no phoneix down" )
      }
      else{
        this.phoneixDownCarrying-=1;
          if(target.status==0){
            console.log(this.name + " use phoneix down on "+ target.name +", he is alive again") 
            target.status = 1;
            target.health=20
          }
          else{
            console.log(this.name + "is already alive, phoneix down has NO EFFECT")
          }}}
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
        console.log(this.element +" Spell casted")
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
      if(target.health>100){
        target.health = 100;
      }
    }

    revive(target) {      
       if (target.status == 0) { 
        console.log( this.name + " casted REVIVE spell, " + target.name +" revived")
        target.status = 1}

       else{
        console.log( this.name + " tried to REVIVE " + target.name +" but they are already very much alive - NO EFFECT")
       } 
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
        target.health -= 25;
    }

}





const steven = new Warrior("Steven")
const andrew = new Mage("Andrew", "Fire" )
const sam = new Healer ("Sam")

steven.status =0;

// console.log(steven)
// steven.allOutAttack(sam)
console.log(sam)
sam.usePhoneixDown(steven)
console.log(steven)




andrew.spell(sam);
const elliot = new Enemy("Elliot", "Water" )
