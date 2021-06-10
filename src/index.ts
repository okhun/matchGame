

function checkPlayer() {
  const playerData = localStorage.getItem("playerData");
  if(playerData){
      let addbtnoption = document.querySelector(".addbtnoption");
      if(addbtnoption){
          addbtnoption.innerHTML=`<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="start-game-btn" class="btn btn-light text-primary">START GAME</button><h4 class="ml-3">Name</h4></div>`
      }
  }else if (playerData === null) {
       let addbtnoption = document.querySelector(".addbtnoption");
       if(addbtnoption){
            addbtnoption.innerHTML = `<button  id="registerNewPlayer" class="btn btn-light text-primary registerplayer ">REGISTER NEW PLAYER</button>`;
       }
    }  
}

let cards: NodeListOf<Element>;

const generateArrayAndRandomize = () => {
  const someArray = [
    "australian-shepherd",
    "australian-shepherd",
    "basenji",
    "basenji",
    "basset-hound",
    "basset-hound",
    "beagle",
    "beagle",
    "border-collie",
    "border-collie",
    "boxer",
    "boxer",
    "bull-terrier",
    "bull-terrier",
    "bulldog",
    "bulldog",
  ];
  someArray.sort(() => Math.random() - 0.5);
  return someArray;
};
let randomArray: any[];
let prevState = "";
let prevIndex = 0;
let successCount = 0;

// Back card clicked
function backCardClick(index: number) {
  
  let cardsId=document.getElementById(`cardsId-${index}`);
  if(cardsId){
    cardsId.classList.toggle("flip");
  }
  if (prevState) {
    const result = prevState.localeCompare(randomArray[index]);
    if (result === 0) {
      document.getElementById(`cardsId-${index}`).parentElement.insertAdjacentHTML("afterbegin","<div class='success'><img src='/images/svg/success.svg'></img></div>");
      document.getElementById(`cardsId-${prevIndex}`).parentElement.insertAdjacentHTML("afterbegin","<div class='success'><img src='/images/svg/success.svg'></img></div>");
      prevState = "";
      prevIndex = index;
      successCount++;
      if (successCount === 8) {
        document.body.insertAdjacentHTML(
          "afterbegin",
          `<div class="win-game">
                <div class="rounded">
                    <h5>Congratulations! You successfully found all matches on 1.21 minutes.</h5>
                    <button class="btn btn-primary win-ok">OK</button>
                </div>
            </div>`
        );
      }
    } else {
      document.getElementById(`cardsId-${index}`).parentElement.insertAdjacentHTML("afterbegin",`<div id='fail-${index}' class='fail'><img src='/images/svg/fail.svg'></img></div>`);
      document.getElementById(`cardsId-${prevIndex}`).parentElement.insertAdjacentHTML("afterbegin",`<div id='fail-${prevIndex}' class='fail'><img src='/images/svg/fail.svg'></img></div>`);
      document.querySelector(".aboute-and-start").insertAdjacentHTML("afterbegin", `<div class="hide-cards"></div>`);
      let temp = prevIndex;
      setTimeout(function () {
        undoFlip(index, temp);
      }, 1000);
      prevState = randomArray[index];
      prevIndex = index;
    }
    function undoFlip(i: any, pi: number) {
      document.getElementById(`fail-${i}`).remove();
      document.getElementById(`fail-${pi}`).remove();
      document.getElementById(`cardsId-${i}`).classList.toggle("flip");
      document.getElementById(`cardsId-${pi}`).classList.toggle("flip");
      document.querySelector(".hide-cards").remove();
      prevState = "";
    }
  } else if (prevState === "") {
    prevState = randomArray[index];
    prevIndex = index;
  }
  
}



// Start game button clicked
function startGame(this: any) {
    let about_and_start= document.querySelector(".aboute-and-start");
    if(about_and_start){
        about_and_start.innerHTML = "";
        randomArray = generateArrayAndRandomize();
        about_and_start.insertAdjacentHTML(
            "afterbegin",
            `<div class="start-time"><h4>00:0<span class="span-time">2</span></h4></div>
            <div class=" grid-images ">
                ${randomArray
                .map((el, i) => {
                    return `
                    <div class="position-relative image-block cards">
                        <div id="cardsId-${i}"  class=" cards__single">
                            <div onclick="frontCardClick(${i})" class="cards__front game-image">
                                <img class="bg-primary w-100 " src="./images/4x4/${randomArray[i]}.png" alt="">
                            </div>
                            <div  class="cards__back game-image">
                                <img id="backcardimgId-${i}" class="w-100" src="./images/4x4/front.png" alt="">
                            </div>
                        </div>
                    </div>
                    `;
                })
                .join("")}
            </div>`
        );
    }

  let counter = 2;
  let intervalId = setInterval(() => {
    counter = counter - 1;
    let span_time=document.querySelector(".start-time");
    if(span_time){
        span_time.textContent = `${counter}`;
        if (counter === 0) {
      clearInterval(intervalId);
      span_time.innerHTML = "";
      span_time
        .insertAdjacentHTML(
          "afterbegin",
          `<h4>00:<span class="span-time-start">30</span></h4>`
        );
      startActualgame();
    }
    }
    
  }, 1000);

 cards = document.querySelectorAll(".cards__single");
  cards.flipCard = function (x: { classList: { toggle: (arg0: string) => void; }; }) {
      
    x.classList.toggle("flip");
  };
  function callok() {
    cards.forEach((card: any) => {
      return setTimeout(cards.flipCard(card), 6000);
    });
  }
  setTimeout(callok, 2000);
}

// Game time started
let count =30;
let countIntervalId: NodeJS.Timeout
function startActualgame() {
    let addbtnoption=document.querySelector(".addbtnoption");
    if(addbtnoption){
        addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="stopgame" class="btn btn-light text-primary">STOP GAME</button><h4 class="ml-3">Name</h4></div>`;
    }
  countIntervalId = setInterval(() => {
    count = count - 1;
    let spantimestart=document.querySelector(".span-time-start");
    if(spantimestart){
        spantimestart.textContent = `${count}`;
    }
    
     if (count === 0) {
      clearInterval(countIntervalId);
    }
  }, 1000);
  let hidecards=document.querySelector(".hide-cards");
  if(hidecards){
      hidecards.remove();
    }
}
///////////

// Add new Player
document.addEventListener('click', function(e){ 
    if(e.target && e.target.id=== 'registerNewPlayer'){
         addNewPlayer();
    }
    if(e.target&&e.target.id==="start-game-btn"){
        startGame();
    }
    if(e.target&&e.target.id.substr(0,13)==="backcardimgId"){
        backCardClick(e.target.id.substr(14));
    }
    if(e.target&&e.target.id==="stopgame"){
        stopGame();
    }
    if(e.target&&e.target.id==="continuegame"){
        startActualgame();
    }
});

function addNewPlayer() {
    let registerPlayer=document.querySelector(".registerPlayer");
    let overlay=document.querySelector(".overlay");
    if(registerPlayer&&overlay){
        registerPlayer.classList.remove("hidden");
        overlay.classList.remove("hidden");
    } 
}
function cancalPlayer() {
    let registerPlayer=document.querySelector(".registerPlayer");
    let overlay=document.querySelector(".overlay");
    if(registerPlayer&&overlay){
        registerPlayer.classList.add("hidden");
        overlay.classList.add("hidden");
    }
}
// Add user
let btn_addUser = document.querySelector(".btn-addUser");
if(btn_addUser){
btn_addUser.addEventListener("click", () => {
  let firstName = document.getElementById("playerFirstname");
  let lastName = document.getElementById("playerLastname");
  let playerEmail = document.getElementById("playerEmail");

  if (firstName && lastName && playerEmail) {
    const player = {
      firstName: firstName.value,
      lastName: lastName.value,
      playerEmail: playerEmail.value,
    };
    localStorage.setItem("playerData", JSON.stringify(player));
    cancalPlayer();
    checkPlayer();
  }
});
}

// Stop Game
function stopGame(){
    clearTimeout(countIntervalId) ;   
  let addbtnoption= document.querySelector(".addbtnoption");
  let hidecards=document.querySelector(".aboute-and-start");
  if(addbtnoption&&hidecards){
      addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="continuegame" class="btn btn-light text-primary">CONTINUE GAME</button><h4 class="ml-3">Name</h4></div>`;
      hidecards.insertAdjacentHTML("afterbegin", `<div class="hide-cards"></div>`);
    }
}


window.onload = function () {
  checkPlayer();
};