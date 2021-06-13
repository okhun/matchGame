import GameSetting from "./routes/gameSetting";
import BestScore from "./routes/bestScore";
import AboutGame from "./routes/aboutGame";
import {resetState, setCardType, setCardNumber, state } from "./model";
////////////////////////////////////////////////////////
// Add Event listener
let remembertimeId: HTMLElement | null;
document.addEventListener("click", function (e) {
  if (e.target && e.target.id === "registerNewPlayer") {
    addNewPlayer();
  }
  if (e.target && e.target.id === "start-game-btn") {
    startGame();
  }
  if (e.target && e.target.id.substr(0, 13) === "backcardimgId") {
    backCardClick(e.target.id.substr(14));
  }
  if (e.target && e.target.id === "stopgame") {
    stopGame();
  }
  if (e.target && e.target.id === "continuegame") {
    startActualgame();
  }
  if (e.target && e.target.id === "cardstypeid") {
    if (e.target.value === "animal") {
      setCardType("animal");
    }
    if (e.target.value === "fruit") {
      setCardType("fruit");
    }
  }
  if (e.target && e.target.id === "cardsnumberid") {
    setCardNumber(+e.target.value);
  }
  if (e.target && e.target.id === "quit-game-btn") {
    remembertimeId = document.getElementById("remembertimeId");
    quitGame();
  }
  if (e.target && e.target.id === "quitgame-yes") {
    quitGameYes();
  }
  if (e.target && e.target.id === "quitgame-continue") {
    quitGameContinue();
  }
});

/////////////////////////////////////////////////
// Quit Game
function quitGame() {
  clearTimeout(countIntervalId);
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="win-game">
                  <div class="rounded">
                      <h5>Are you sure? Do you want to quit the game?</h5>
                      <div class="text-center mt-4">
                          <a href="/" id="quitgame-yes" class="nav__link btn btn-primary  " data-link>YES</a>
                          <button id="quitgame-continue" class="btn btn-primary ">Continue</button>
                      </div>
                  </div>
              </div>`
  );
}
function quitGameYes() {
  removeModal();
  removeInActiveLink();
  resetState();
  clearTimeout(intervalId);
  clearTimeout(timeoutId);
  let addbtnoption = document.querySelector(".addbtnoption");
  if (addbtnoption) {
    addbtnoption.innerHTML = "";
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><a href="/" id="start-game-btn" class="btn btn-light text-primary mx-2 nav__link" data-link>START GAME</a><h4 class="">Name</h4></div>`;
  }
}
function quitGameContinue() {
  removeModal();
  if (!remembertimeId) {
    startActualgame();
  }
}
function removeModal() {
  let modal = document.querySelector(".win-game");
  if (modal) {
    modal.remove();
  }
}
function removeInActiveLink() {
  let active = document.querySelector(".link-inactive");
  if (active) {
    active.remove();
  }
}
////////////////////////////////////////////////////////
// Check player
function checkPlayer() {
  const playerData = localStorage.getItem("playerData");
  if (playerData) {
    let addbtnoption = document.querySelector(".addbtnoption");
    if (addbtnoption) {
      addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><a href="/" id="start-game-btn" class="btn btn-light text-primary mx-2 nav__link" data-link>START GAME</a><h4 class="">Name</h4></div>`;
    }
  } else if (playerData === null) {
    let addbtnoption = document.querySelector(".addbtnoption");
    if (addbtnoption) {
      addbtnoption.innerHTML = `<button  id="registerNewPlayer" class="btn btn-light text-primary registerplayer ">REGISTER NEW PLAYER</button>`;
    }
  }
}
/////////////////////////////////////
// Generate Random array
let cards: NodeListOf<Element>;
const generateArrayAndRandomize = (cardType: string, cardNumber: number) => {
  const animals = [
    "australian-shepherd",
    "basenji",
    "basset-hound",
    "beagle",
    "beagle2",
    "border-collie",
    "boxer",
    "bull-terrier",
    "bulldog",
    "chihuahua",
    "corgi",
    "dachshund",
    "dalmatian",
    "french-bulldog",
    "golden-retriever",
    "great-dane",
    "jack-russell-terrier",
    "labrador-retriever",
    "miniature-schnauzer",
    "pitbull",
    "pointer",
    "pomeranian",
    "poodle",
    "rottweiler",
    "saint-bernard",
    "samoyed",
    "shar-pei",
    "shiba-inu",
    "shih-tzu",
    "siberian-husky",
    "yorkshire-terrier",
    "dogdog",
  ];
  const fruits = [
    "apricot",
    "avocado",
    "banana",
    "basil",
    "beet",
    "bell-pepper",
    "berries",
    "blueberry",
    "broccoli",
    "cabbage",
    "cauliflower",
    "coconut",
    "fig",
    "garlic",
    "grapefruit",
    "guava",
    "kiwi",
    "lemon",
    "mango",
    "orange",
    "papaya",
    "passion-fruit",
    "persimmon",
    "pineapple",
    "plum",
    "potato",
    "raspberry",
    "spinach",
    "strawberry",
    "tomato",
    "watermelon",
    "grapes",
  ];
  function generateArray(arraytype: string[], n: number) {
    let rand = Math.floor(Math.random() * (32 - n));
    let newArray = arraytype.slice(rand, rand + n);
    let lastnewArray = [...newArray, ...newArray];
    return lastnewArray.sort(() => Math.random() - 0.5);
  }
  if (cardType === "animal") {
    if (cardNumber === 4) {
      return generateArray(animals, 8);
    } else if (cardNumber === 6) {
      return generateArray(animals, 18);
    } else if (cardNumber === 8) {
      return generateArray(animals, 32);
    }
  }
  if (cardType === "fruit") {
    if (cardNumber === 4) {
      return generateArray(fruits, 8);
    } else if (cardNumber === 6) {
      return generateArray(fruits, 18);
    } else if (cardNumber === 8) {
      return generateArray(fruits, 32);
    }
  }
};
///////////////////////////////////////////////
// Back card clicked
function backCardClick(index: number) {
  state.tryCount++;
  let cardsId = document.getElementById(`cardsId-${index}`);
  if (cardsId) {
    cardsId.classList.toggle("flip");
  }
  if (state.prevState) {
    const result = state.prevState.localeCompare(state.randomArray[index]);
    if (result === 0) {
      document
        .getElementById(`cardsId-${index}`)
        .parentElement.insertAdjacentHTML(
          "afterbegin",
          `<div class='${
            state.gameSetting.cardNumber === 4
              ? "success4"
              : state.gameSetting.cardNumber === 6
              ? "success6"
              : "success8"
          }'><img src='/images/svg/success.svg'></img></div>`
        );
      document
        .getElementById(`cardsId-${state.prevIndex}`)
        .parentElement.insertAdjacentHTML(
          "afterbegin",
          `<div class='${
            state.gameSetting.cardNumber === 4
              ? "success4"
              : state.gameSetting.cardNumber === 6
              ? "success6"
              : "success8"
          }'><img src='/images/svg/success.svg'></img></div>`
        );
      state.prevState = "";
      state.prevIndex = index;
      state.successCount++;
      if (state.gameSetting.cardNumber === 4) {
        if (state.successCount === 8) {
          congratulationGame();
        }
      }
      if (state.gameSetting.cardNumber === 6) {
        if (state.successCount === 18) {
          congratulationGame();
        }
      }
      if (state.gameSetting.cardNumber === 8) {
        if (state.successCount === 32) {
          congratulationGame();
        }
      }
    } else {
      document
        .getElementById(`cardsId-${index}`)
        .parentElement.insertAdjacentHTML(
          "afterbegin",
          `<div id='fail-${index}' class='${
            state.gameSetting.cardNumber === 4
              ? "fail4"
              : state.gameSetting.cardNumber === 6
              ? "fail6"
              : "fail8"
          }'><img src='/images/svg/fail.svg'></img></div>`
        );
      document
        .getElementById(`cardsId-${state.prevIndex}`)
        .parentElement.insertAdjacentHTML(
          "afterbegin",
          `<div id='fail-${state.prevIndex}' class='${
            state.gameSetting.cardNumber === 4
              ? "fail4"
              : state.gameSetting.cardNumber === 6
              ? "fail6"
              : "fail8"
          }'><img src='/images/svg/fail.svg'></img></div>`
        );
      document
        .querySelector(".aboute-and-start")
        .insertAdjacentHTML("afterbegin", `<div class="hide-cards"></div>`);
      let temp = state.prevIndex;
      setTimeout(function () {
        undoFlip(index, temp);
      }, 1000);
      state.prevState = state.randomArray[index];
      state.prevIndex = index;
      state.failCount++;
    }
    function undoFlip(i: any, pi: number) {
      document.getElementById(`fail-${i}`).remove();
      document.getElementById(`fail-${pi}`).remove();
      document.getElementById(`cardsId-${i}`).classList.toggle("flip");
      document.getElementById(`cardsId-${pi}`).classList.toggle("flip");
      document.querySelector(".hide-cards").remove();
      state.prevState = "";
    }
  } else if (state.prevState === "") {
    state.prevState = state.randomArray[index];
    state.prevIndex = index;
  }
}

function congratulationGame() {
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
/////////////////////////////////////////////////////
// Start game button clicked
let intervalId: NodeJS.Timeout;
let timeoutId: NodeJS.Timeout;
function startGame(this: any) {
  let about_and_start = document.querySelector(".aboute-and-start");
  let addlinkinactive = document.querySelector(".addlinkinactive");
  let start_game = document.querySelector(".startgame");
  if (start_game) {
    start_game.innerHTML = "";
    start_game.insertAdjacentHTML(
      "afterbegin",
      `<button id="quit-game-btn" class="btn btn-light text-primary">QUIT GAME</button><h4 class="ml-3">Name</h4>`
    );
  }
  if (addlinkinactive) {
    addlinkinactive.insertAdjacentHTML(
      "afterbegin",
      `<div class="position-absolute link-inactive"></div>`
    );
  }
  if (about_and_start) {
    about_and_start.innerHTML = "";
    state.randomArray = generateArrayAndRandomize(
      state.gameSetting.cardType,
      state.gameSetting.cardNumber
    );

    about_and_start.insertAdjacentHTML(
      "afterbegin",
      `<div class="start-time"><h4>00:0<span id="remembertimeId" class="span-time">${
        state.rememberTime
      }</span></h4></div>
            <div class="${
              state.gameSetting.cardNumber === 4
                ? "grid-images4"
                : state.gameSetting.cardNumber === 6
                ? "grid-images6"
                : "grid-images8"
            }  ">
                ${state.randomArray
                  .map((el, i) => {
                    return `
                    <div class="position-relative image-block cards">
                        <div id="cardsId-${i}"  class=" cards__single">
                            <div style="width:${
                              state.gameSetting.cardNumber === 4
                                ? 150 + "px"
                                : state.gameSetting.cardNumber === 6
                                ? 130 + "px"
                                : 110 + "px"
                            };height:${
                      state.gameSetting.cardNumber === 4
                        ? 150 + "px"
                        : state.gameSetting.cardNumber === 6
                        ? 130 + "px"
                        : 110 + "px"
                    }" class="cards__front game-image">
                                <img class="bg-primary w-100 " src="./images/${
                                  state.gameSetting.cardType === "animal"
                                    ? "animals"
                                    : "fruits"
                                }/${state.randomArray[i]}.png" alt="">
                            </div>
                            <div style="width:${
                              state.gameSetting.cardNumber === 4
                                ? 150 + "px"
                                : state.gameSetting.cardNumber === 6
                                ? 130 + "px"
                                : 110 + "px"
                            };height:${
                      state.gameSetting.cardNumber === 4
                        ? 150 + "px"
                        : state.gameSetting.cardNumber === 6
                        ? 130 + "px"
                        : 110 + "px"
                    }" class="cards__back game-image">
                                <img id="backcardimgId-${i}" class="w-100" src="./images/animals/front.png" alt="">
                            </div>
                        </div>
                    </div>
                    `;
                  })
                  .join("")}
            </div>`
    );
  }
  startRememberTime();
  cards = document.querySelectorAll(".cards__single");
  cards.flipCard = function (x: {
    classList: { toggle: (arg0: string) => void };
  }) {
    x.classList.toggle("flip");
  };
  function callok() {
    cards.forEach((card: any) => {
      return setTimeout(cards.flipCard(card), 6000);
    });
  }
  timeoutId = setTimeout(callok, state.rememberTime * 1000);
}
////////////////////////////////////////////////////////
// Start remember time
function startRememberTime() {
  intervalId = setInterval(() => {
    state.rememberTime = state.rememberTime - 1;
    let span_time = document.querySelector(".span-time");
    if (span_time) {
      span_time.textContent = `${state.rememberTime}`;
      if (state.rememberTime === 0) {
        clearInterval(intervalId);
        let start_time = document.querySelector(".start-time");
        if (start_time) {
          start_time.innerHTML = "";
          start_time.insertAdjacentHTML(
            "afterbegin",
            `<h4>00:<span class="span-time-start">${state.count}</span></h4>`
          );
          startActualgame();
        }
      }
    }
  }, 1000);
}
////////////////////////////////////////////////////////
// Game time started
let countIntervalId: NodeJS.Timeout;
function startActualgame() {
  let addbtnoption = document.querySelector(".addbtnoption");
  if (addbtnoption) {
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="quit-game-btn" class="btn btn-light text-primary">QUIT GAME</button><button id="stopgame" class="btn btn-light text-primary mx-2">STOP GAME</button><h4 class="">Name</h4></div>`;
  }
  countIntervalId = setInterval(() => {
    state.count = state.count - 1;
    let spantimestart = document.querySelector(".span-time-start");
    if (spantimestart) {
      spantimestart.textContent = `${state.count}`;
    }

    if (state.count === 0) {
      clearInterval(countIntervalId);
    }
  }, 1000);
  let hidecards = document.querySelector(".hide-cards");
  if (hidecards) {
    hidecards.remove();
  }
}
///////////////////////////////////////////////////////////
// ADD NEW Player
function addNewPlayer() {
  let registerPlayer = document.querySelector(".registerPlayer");
  let overlay = document.querySelector(".overlay");
  if (registerPlayer && overlay) {
    registerPlayer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}
// Cancel player
function cancalPlayer() {
  let registerPlayer = document.querySelector(".registerPlayer");
  let overlay = document.querySelector(".overlay");
  if (registerPlayer && overlay) {
    registerPlayer.classList.add("hidden");
    overlay.classList.add("hidden");
  }
}
////////////////////////////////////////////////////////
// Add user
let btn_addUser = document.querySelector(".btn-addUser");
if (btn_addUser) {
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
///////////////////////////////////////////////////////////////
// Stop Game
function stopGame() {
  clearTimeout(countIntervalId);
  let addbtnoption = document.querySelector(".addbtnoption");
  let hidecards = document.querySelector(".aboute-and-start");
  if (addbtnoption && hidecards) {
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="quit-game-btn" class="btn btn-light text-primary">QUIT GAME</button><button id="continuegame" class="btn btn-light text-primary mx-2">CONTINUE GAME</button><h4 class="">Name</h4></div>`;
    hidecards.insertAdjacentHTML(
      "afterbegin",
      `<div class="hide-cards"></div>`
    );
  }
}
window.onload = function () {
  checkPlayer();
};
//////////////////////////////////////////////////////////
// Navigation
const pathToRegex = (path: string) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
const getParams = (match: {
  result: string | any[];
  route: {
    path: {
      matchAll: (arg0: RegExp) => Iterable<unknown> | ArrayLike<unknown>;
    };
  };
}) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};
const navigateTo = (url: string) => {
  history.pushState(null, null, url);
  router();
};
const router = async () => {
  const routes = [
    { path: "/", view: AboutGame },
    { path: "/gamesetting", view: GameSetting },
    { path: "/bestscore", view: BestScore },
  ];
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );
  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }
  const view = new match.route.view(getParams(match));
  let approot = document.querySelector("#app");
  if (approot) {
    approot.innerHTML = await view.getHtml();
  }
};
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target && e.target.matches("[data-link]")) {
      e.preventDefault();
      let temp = e.target.href;
      if (temp) {
        navigateTo(temp);
      }
    }
  });
  router();
});
