let xp=0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory =  ['Stick'];
 
const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText")
const monsterStats=document.querySelector("#monsterStats");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "Stick",
        power: 5
    },
    {
        name:"Dagger",
        power: 30
    },
    {
        name:"Claw hammer",
        power: 50
    },
    {
        name:"Sword",
        power:100
    }
];

const monsters=[
    {
        name:"Slime",
        level:2,
        health:60
    },
    {
        name:"Fanged Beast",
        level:8,
        health:60
    },
    {
        name:"Dragon",
        level: 20,
        health: 300
    }
]

// There's a comma check that out
const locations=[
    {
        name: "town square",
        "button text": ["Go to store","Go to cave","Fight dragon"],
        "button functions": [goStore,goCave,fightDragon],
         text : "You are in the town square. You see a sign that says 'store'."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 Gold)","Buy weapon (30 Gold)","Go to town square"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text : "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight Slime","Fight fanged Beast","Go to town square"],
        "button functions": [fightSlime,fightBeast,goTown],
        text : "You enter the cave, You see some monsters."
    },
    {
        name: "Fight",
        "button text":["Attack","dodge","Run"],
        "button functions": [attack,dodge,goTown],
        text:"You are fighting a monster."
    },
    {
        name: "Kill Monster",
        "button text": ["Go to town square", "Go to town square"," Go to town square"],
        "button functions": [goTown,goTown,easterEgg],
        text: "The monster screams 'Arg!' as it dies. You gain experience points and find gold."
    },
    {
        name: "Lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You die.💀"
    },
    {
        name: "WIN",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You defeat the Dragon!! YOU WIN THE GAME!!🥨"
    },
    {
        name: "easter egg",
        "button text":["2","8","Go to town square"],
        "button functions": [pickTwo,pickEight,goTown],
        text:"You find a secret game.Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!  "
    }
]

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    monsterStats.style.display="none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
    //text.innerText = location["text"]; even this type of syntax can be used instead of the other one
    //The above way only works if its a single word if it was like button text that we had to go with the box method itslef
}

function goTown(){
    /*
    button1.innerText = "Go to Store";
    button2.innerText = "Go to Cave";
    button3.innerText = "Fight dragon";
    button1.onclick = goStore;
    button2.onclick = goCave;
    button3.onclick = fightDragon;
    text.innerText = "You are in the town square. You see a sign that says 'store'.";
    // text.innerText = "You are in the town square. You see a sign that says \"store\"."; This can also be written this way this is called escaping or method used by me in above case
    */
   // The above code was here before being removed

   // To pass in the first (or single) element of the code snippet we use[0]
   update(locations[0]);
}

function goStore(){
   /*
    button1.innerText = "Buy 10 health (10 Gold)";
    button2.innerText = "Buy weapon (30 Gold)";
    button3.innerText = "Go to town square";
    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = "You enter the Store.";
    */
   // The above code was here before being removed
   update(locations[1]);
}
function goCave(){
    // console.log("Going to store")
    // This is quite not necessary cause no one sees the console while playing but its just if u wanna log
    update(locations[2]);
}
function buyHealth(){
    if(gold >= 10){
        gold = gold-10 ;//or gold-=10
        health  = health+10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText="You bought 10 health.";
    } else {
        //text.innerText = "You do not have enough gold to buy health.";
    }
}
function buyWeapon(){
    if (currentWeapon < weapons.length-1) {
        if (gold >= 30){
            gold -= 30;
            currentWeapon += 1; //or currentWeapon++
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText="You now have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += "In your inventory you have: " + inventory.join(",")+".";
        } else {
            text.innerText="You do not have enough gold to buy new weapon.";
        }
    } 
    else { 
        text.innerText="You already have the most powerful weapon!";
        button2.innerText="Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}
function sellWeapon(){
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText="You sold a" + currentWeapon + ".";
        text.innerText += "in your inventory you have:" + inventory.join(",") + ".";
        currentWeapon --;
    } else {
        text.innerText="Don't sell your only weapon!!!";
    }
}
function fightSlime(){
    fighting=0;
    goFight();
}
function fightBeast(){
    fighting=1;
    goFight();
}
function fightDragon(){
    console.log("Fighting Dragon.");
    fighting=2;
    goFight();
}  
function goFight(){
    update(locations[3]);
    monsterHealth=monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText=monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack(){
    text.innerText= "The" + monsters[fighting].name + "attacks.";
    text.innerText += "You attack it with your" + weapons[currentWeapon].name + ".";
    if (isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += "You Miss.";
    }
    health = Math.max(health,0);
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText=monsterHealth;
    
    if(health<=0 ){
        lose();
    } else if(monsterHealth<=0) {
        fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() << .1 && inventory.length !== 1){
        text.innerText += "Your" + inventory.pop() + "breaks.";
        currentWeapon--;
    }
}

  /*   else if(monsterHealth<=0) {
        if(fighting === 2){
            winGame();
        } else {
            defeatMonster();
        }   
     }
     */ 

// Look into ternary operators dont forget
// Teranary operators
// Ternary Statementd


function getMonsterAttackValue(level){
    let hit = (level*5)-(Math.floor(Math.random()*xp));
    console.log(hit);
    return hit;
}
function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}
function dodge(){
    text.innerText = "You dodge the attack from the" + monsters[fighting].name + ".";
}
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);
}
function restart(){
    xp=0;
    health=100;
    gold=50;
    currentWeapon=0;
    inventory=["Stick"];
    goldText.innerText=gold;
    healthText.innerText=health;
    xpText.innerText=xp;
    goTown();
}
function easterEgg(){
    update(locations[7]);
}
function pickTwo(){
    pick(2);
}
function pickEight(){
    pick(8);
} 
function pick(guess){
    let numbers=[];
    while (numbers.length<10){
        numbers.push(Math.floor(Math.random()*11));
    }
    text.innerText= "You picked" + guess + ".Here are the random numbers:\n"
    for(let i=0; i<10; i++){
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.indexOf(guess) !== -1){
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health;
        if (health <= 0){
            lose();
        }
    }
}