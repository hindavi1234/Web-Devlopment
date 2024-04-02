let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false; //matlab abhi tak game start nahi hua hai
let levels = 0;

let highestScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    //console.log("key pressed");

    if (!started) {
        console.log("game is started");
        started = true;

        levelUp();

    }
});

// jab game me according to random number 
// white color flash hoga
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
    // levaelUp();
}

//jab ham user button ko press karenge
// tab green color flash krega
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
    //is time mean(250s) tak wo flash karega
    // levaelUp();
}


function levelUp() {
    levels++;//jab level start hojayega,
    //  to ek level aage bad jayega
    h2.innerText = `Level ${levels}`;//h2 ke innertext pe level ka number print hoga

    //random btn choose
    /* as u know there are 4 element in the array btns, to array indexing 0 to 3
    to random number bhi 0 to 3 ke between aane chahiye*/ 
    let ranIdx = Math.floor(Math.random() * btns.length); 

    /*yaha par btns array me ranIndx jo bhi number dega wo pass kiya jayega
     and btns ke us num par jo bhi color hoga wo rancolor ko allocate kiya gaya hai */ 
    let ranColor = btns[ranIdx];

    /*to yaha jo bhi rancolor hoga wo button ke uppr apply kiya jayega*/ 
   let ranBtn = document.querySelector(`.${ranColor}`);

    /*it is not neccessary to print*/ 
    // console.log(ranIdx);
    // console.log(ranBtn);
    // console.log(ranColor);
    
    /*jaise hi random color generate hoga to hum use push 
    kar denge apane game sequence ke andr*/
    gameSeq.push(ranColor);
    console.log(gameSeq);

    /*jab hum ranbtn pass karenge to jab key press ki jayegi
    waha white colot flash hoga*/ 

    gameFlash(ranBtn);
}


/*user ne jo last color add kiya hai, 
kya o hamare game sequense ke saath match karta hai*/
function checkAns()
{
     let idx = userSeq.length-1;
    if(userSeq[idx] === gameSeq[idx])
    {
        if(userSeq.length === gameSeq.length)
        {
            userSeq = [];//clear user input for next round
            levelUp();
        }
    }
    else
    {
        h2.innerHTML = `Game over! Your score was <b>${levels}</b> any key to start`;
       document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(function(){
           document.querySelector("body").style.backgroundColor ="white";
        },150);

        reset();
    }
}

/*jo hamre current level ka number hai vahi hamari
gameSeq aur userSeq ki size hoti hai */ 

function btnPress() {
    // console.log(this);
    let btn = this;
    // gameFlash(btn);
    userFlash(btn);
    // console.log(this);
    // console.log("Button get pressed");

    /*hamane har ek div ko id diya hai, which is used to know
    what color the id have*/
    userColor = btn.getAttribute("id");
    userSeq.push(userColor); 

    // setTimeout(function(){
    //     gameFlash(ranBtn);
    // },500);
    checkAns();
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


function reset(){
    
   if(levels>highestScore)
   {
    highestScore = levels;

    //update the UI to display the highest score
    console.log("New highest score: ", highestScore);
    updateHighestScore();
   }

    // reset the game variables for a new game
    started = false;
    levels = 0;
    gameSeq = [];
    userSeq = [];
    h2.innerText = "Level 0";
}
