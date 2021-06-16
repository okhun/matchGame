import GameSetting from "./routes/gameSetting";
import BestScore from "./routes/bestScore";
import AboutGame from "./routes/aboutGame";
import { resetState, setCardType, setCardNumber, state } from "./model";
import { generateArrayAndRandomize } from "./helper/generateArray";

// Add Event listener
let remembertimeId: HTMLElement | null;
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "registerNewPlayer") {
    addNewPlayer();
  }
  if (e.target && e.target.id === "btn-cancalid") {
    cancalPlayer();
  }
  if (e.target && e.target.id === "start-game-btn") {
    startGame();
  }
  if (e.target && e.target.id.substr(0, 13) === "backcardimgId") {
    const arg = e.target.id.substr(14);
    backCardClick(arg);
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
  if (e.target && e.target.id === "congratulationsid") {
    removeModal();
    removeInActiveLink();
    startGameButton();
  }
});

function startGameButton() {
  const addbtnoption = document.querySelector(".addbtnoption");
  if (addbtnoption) {
    addbtnoption.innerHTML = "";
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><div class="align-items-center"><a  href="/" id="start-game-btn" class="btn btn-light text-primary mx-2 mt-2 nav__link align-self-center" data-link>START GAME</a></div><div><img class="rounded-circle" id="testImage" width="50" height="50"></div></div>`;
    doImageTest();
  }
}

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
  clearTimeout(countIntervalId);
  startGameButton();
}
function quitGameContinue() {
  removeModal();
  if (!remembertimeId) {
    startActualgame();
  }
}
function removeModal() {
  const modal = document.querySelector(".win-game");
  if (modal) {
    modal.remove();
  }
}
function removeInActiveLink() {
  const active = document.querySelector(".link-inactive");
  if (active) {
    active.remove();
  }
}

// Generate Random array
let cards: NodeListOf<Element>;

// Back card clicked
function backCardClick(index: number) {
  const cardsId = document.getElementById(`cardsId-${index}`);
  if (cardsId) {
    cardsId.classList.toggle("flip");
  }
  if (state.prevState) {
    const result = state.prevState.localeCompare(state.randomArray[index]);
    state.tryCount += 1;
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
      state.successCount += 1;
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
      const temp = state.prevIndex;
      setTimeout(() => {
        undoFlip(index, temp);
      }, 1000);
      state.prevState = state.randomArray[index];
      state.prevIndex = index;
      state.failCount += 1;
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
function updateScore(score: number) {
  const transaction = db.transaction(["players"], "readwrite");
  const objectStore = transaction.objectStore("players");
  objectStore.openCursor().onsuccess = (event: { target: { result: any } }) => {
    const cursor = event.target.result;
    if (cursor) {
      if (cursor.value.created === state.created) {
        const updateData = cursor.value;
        updateData.score = score;
        const request = cursor.update(updateData);
        request.onsuccess = () => {};
      }
      cursor.continue();
    }
  };
}

function congratulationGame() {
  console.log(state.tryCount, state.failCount);

  const score =
    (state.tryCount - state.failCount) * 100 -
    (state.minute * 60 + (state.count === -1 ? 0 : state.count)) * 10;
  if (score > state.score) {
    updateScore(score);
    getPeople();
  }

  clearTimeout(countIntervalId);
  clearTimeout(countIntervalId);
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="win-game">
                        <div class="rounded">
                            <h5>Congratulations! You successfully found all matches on ${state.minute}.${state.count} minutes.</h5>
                            <a id="congratulationsid" href="/bestscore" class="btn btn-primary win-ok nav__link" data-link>OK</a>
                        </div>
                    </div>`
  );
  resetState();
}

// Start game button clicked
let intervalId: NodeJS.Timeout;
let timeoutId: NodeJS.Timeout;
function startGame(this: any) {
  const aboutAndStart = document.querySelector(".aboute-and-start");
  const addlinkinactive = document.querySelector(".addlinkinactive");
  const startGamei = document.querySelector(".startgame");
  if (startGamei) {
    startGamei.innerHTML = "";
    startGamei.insertAdjacentHTML(
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
  if (aboutAndStart) {
    aboutAndStart.innerHTML = "";
    state.randomArray = generateArrayAndRandomize(
      state.gameSetting.cardType,
      state.gameSetting.cardNumber
    );

    aboutAndStart.insertAdjacentHTML(
      "afterbegin",
      `<div class="start-time"><h4>00:0<span id="remembertimeId" class="span-time">${
        state.rememberTime
      }</span></h4></div>
            <div class=" ${
              state.gameSetting.cardNumber === 4
                ? "grid-images4"
                : state.gameSetting.cardNumber === 6
                ? "grid-images6"
                : "grid-images8"
            }  ">
                ${state.randomArray
                  .map(
                    (el, i) => `
                    <div class="position-relative image-block cards">
                        <div id="cardsId-${i}"  class=" cards__single">
                            <div style="width:${
                              state.gameSetting.cardNumber === 4
                                ? `${150}px`
                                : state.gameSetting.cardNumber === 6
                                ? `${130}px`
                                : `${110}px`
                            };height:${
                      state.gameSetting.cardNumber === 4
                        ? `${150}px`
                        : state.gameSetting.cardNumber === 6
                        ? `${130}px`
                        : `${110}px`
                    }" class="cards__front game-image">
                                <img class="bg-primary w-100 " src="./images/${
                                  state.gameSetting.cardType === "animal"
                                    ? "animals"
                                    : "fruits"
                                }/${state.randomArray[i]}.png" alt="">
                            </div>
                            <div style="width:${
                              state.gameSetting.cardNumber === 4
                                ? `${150}px`
                                : state.gameSetting.cardNumber === 6
                                ? `${130}px`
                                : `${110}px`
                            };height:${
                      state.gameSetting.cardNumber === 4
                        ? `${150}px`
                        : state.gameSetting.cardNumber === 6
                        ? `${130}px`
                        : `${110}px`
                    }" class="cards__back game-image">
                                <img id="backcardimgId-${i}" class="w-100" src="./images/animals/front.png" alt="">
                            </div>
                        </div>
                    </div>
                    `
                  )
                  .join("")}
            </div><div style="margin-top:200px" ></div>`
    );
  }
  startRememberTime();
  cards = document.querySelectorAll(".cards__single");
  cards.flipCard = (x: { classList: { toggle: (arg0: string) => void } }) => {
    x.classList.toggle("flip");
  };
  function callok() {
    cards.forEach((card: any) => setTimeout(cards.flipCard(card), 6000));
  }
  timeoutId = setTimeout(callok, state.rememberTime * 1000);
}

// Start remember time
function startRememberTime() {
  intervalId = setInterval(() => {
    state.rememberTime -= 1;
    const spanTime = document.querySelector(".span-time");
    if (spanTime) {
      spanTime.textContent = `${state.rememberTime}`;
      if (state.rememberTime === 0) {
        clearInterval(intervalId);
        const starttime = document.querySelector(".start-time");
        if (starttime) {
          starttime.innerHTML = "";
          starttime.insertAdjacentHTML(
            "afterbegin",
            `<h4>00:<span class="span-time-start">${state.count}</span></h4>`
          );
          startActualgame();
        }
      }
    }
  }, 1000);
}

// Game time started
let countIntervalId: NodeJS.Timeout;
function startActualgame() {
  const addbtnoption = document.querySelector(".addbtnoption");
  if (addbtnoption) {
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="quit-game-btn" class="btn btn-light text-primary">QUIT GAME</button><button id="stopgame" class="btn btn-light text-primary mx-2">STOP GAME</button><h4 class="">Name</h4></div>`;
  }
  countIntervalId = setInterval(() => {
    state.count += 1;

    const starttime = document.querySelector(".start-time");
    if (starttime) {
      starttime.innerHTML = "";
      starttime.insertAdjacentHTML(
        "afterbegin",
        `<h4>${
          state.minute > 9 ? state.minute : `0${state.minute}`
        }:<span class="span-time-start">${
          state.count > 9 ? state.count : `0${state.count}`
        }</span></h4>`
      );
      if (state.count === 59) {
        state.count = -1;
        state.minute += 1;
      }
    }
  }, 1000);
  const hidecards = document.querySelector(".hide-cards");
  if (hidecards) {
    hidecards.remove();
  }
}
// ADD NEW Player
function addNewPlayer() {
  const registerPlayer = document.querySelector(".registerPlayer");
  const overlay = document.querySelector(".overlay");
  if (registerPlayer && overlay) {
    registerPlayer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
}
// Cancel player
function cancalPlayer() {
  const registerPlayer = document.querySelector(".registerPlayer");
  const overlay = document.querySelector(".overlay");
  if (registerPlayer && overlay) {
    registerPlayer.classList.add("hidden");
    overlay.classList.add("hidden");
  }
}

// Stop Game
function stopGame() {
  clearTimeout(countIntervalId);
  const addbtnoption = document.querySelector(".addbtnoption");
  const hidecards = document.querySelector(".aboute-and-start");
  if (addbtnoption && hidecards) {
    addbtnoption.innerHTML = `<div id="startgame" class="d-flex startgame justify-content-between text-white "><button id="quit-game-btn" class="btn btn-light text-primary">QUIT GAME</button><button id="continuegame" class="btn btn-light text-primary mx-2">CONTINUE GAME</button><h4 class="">Name</h4></div>`;
    hidecards.insertAdjacentHTML(
      "afterbegin",
      `<div class="hide-cards"></div>`
    );
  }
}
window.onload = () => {
  //  getPeople()
  if ("indexedDb" in window) {
    return;
  }
  registerNewPlayer();
};
// Register New PLayer
let db: { transaction: (arg0: string[], arg1: string) => any };
const imgplayer = document.querySelector("#pictureTest");
let bits: string | ArrayBuffer | null;
if (imgplayer) {
  imgplayer.addEventListener("change", doFile);
}
function doFile(e: { target: { files: any[] } }) {
  const file = e.target.files[0];

  const reader = new FileReader();
  //				reader.readAsDataURL(file);
  reader.readAsBinaryString(file);

  reader.onload = (event) => {
    bits = event.target && event.target.result;
  };
}
function registerNewPlayer() {
  const openRequest = indexedDB.open("okhun", 1);
  openRequest.onupgradeneeded = (e) => {
    const t = e.target;
    let thisDB;
    if (t) {
      thisDB = t.result;
    }

    if (!thisDB.objectStoreNames.contains("players")) {
      thisDB.createObjectStore("players", {
        keyPath: "created",
        autoIncrement: true,
      });
    }
  };
  openRequest.onsuccess = (e) => {
    const t = e.target;
    if (t) {
      db = t.result;
    }
    getPeople();
    document
      .getElementById("btn-registerPlayer")
      ?.addEventListener("click", addPlayer);
  };
  openRequest.onerror = () => {};
}
function addPlayer() {
  const firstName = document.getElementById("playerFirstname");
  const lastName = document.getElementById("playerLastname");
  const playerEmail = document.getElementById("playerEmail");

  if (firstName && lastName && playerEmail) {
    if (state.lastnameValidate && state.nameValidate && state.emailValidate) {
      // Get a transaction
      // default for OS list is all, default for type is read
      const transaction = db.transaction(["players"], "readwrite");
      // Ask for the objectStore
      const store = transaction.objectStore("players");
      // Define a person
      const person = {
        name: firstName.value,
        lastname: lastName.value,
        email: playerEmail.value,
        img: bits,
        score: 0,
        created: new Date().getTime(),
      };
      state.created = person.created;
      // Perform the add
      const request = store.add(person);

      request.onerror = () => {
        // some type of error handler
      };
      request.onsuccess = () => {
        doImageTest();
      };
      cancalPlayer();
      startGameButton();
      // checkPlayer();
    }
  }
}
// Validate name
document.getElementById("playerFirstname")?.addEventListener("change", (e) => {
  const format = /[ `!@#$%^*()_+-=\\[\];':"\\|/,.<>\\/?~]/;
  const name = e.target;
  if (name) {
    const resultName = format.test(name.value);
    const n = document.querySelector(".firstnamevalidate");
    if (resultName) {
      state.nameValidate = false;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validfail.svg" alt="fail">`;
      }
    } else {
      state.nameValidate = true;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validsuccess.svg" alt="success">`;
      }
    }
  }
});
// Validate Last name
document.getElementById("playerLastname")?.addEventListener("change", (e) => {
  const format = /[ `!@#$%^*()_+-=\\[\];':"\\|/,.<>\\/?~]/;
  const lastname = e.target;
  if (lastname) {
    const resultName = format.test(lastname.value);
    const n = document.querySelector(".lastnamevalidate");
    if (resultName) {
      state.lastnameValidate = false;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validfail.svg" alt="fail">`;
      }
    } else {
      state.lastnameValidate = true;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validsuccess.svg" alt="success">`;
      }
    }
  }
});
document.getElementById("playerEmail")?.addEventListener("change", (e) => {
  const email = e.target;
  if (email) {
    const result = validateEmail(email.value);
    const n = document.querySelector(".emailvalidate");
    if (!result) {
      state.emailValidate = false;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validfail.svg" alt="fail">`;
      }
    } else {
      state.emailValidate = true;
      if (n) {
        n.innerHTML = `<img src="./images/svg/validsuccess.svg" alt="success">`;
      }
    }
  }
  function validateEmail(emailV: string) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (validRegex.test(emailV)) {
      return true;
    }
    return false;
  }
});
function doImageTest() {
  const image = document.querySelector("#testImage");

  const trans = db.transaction(["players"], "readonly");
  // hard coded id
  const req = trans.objectStore("players").get(+state.created);
  req.onsuccess = (e: { target: { result: any } }) => {
    const record = e.target.result;
    if (image) {
      if (record.img) {
        image.src = `data:image/jpeg;base64,${btoa(record.img)}`;
      } else {
        image.src = "../images/default_avatar.png";
      }
    }
  };
}
function getPeople() {
  const trans = db.transaction(["players"], "readonly");
  const req = trans.objectStore("players").getAll();
  req.onsuccess = (e: { target: { result: any } }) => {
    const record = e.target.result;
    record.sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score
    );
    if (record.length > 10) {
      state.topPlayers = record.slice(0, 10);
    } else {
      state.topPlayers = record;
    }
  };
}
/// ///////////////////////////////////////////////////////
// Navigation
const pathToRegex = (path: string) =>
  new RegExp(`^${path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)")}$`);
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
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
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
  const potentialMatches = routes.map((route) => ({
    route,
    result: location.pathname.match(pathToRegex(route.path)),
  }));
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
  const approot = document.querySelector("#app");
  if (approot) {
    approot.innerHTML = await view.getHtml();
  }
};
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target && e.target.matches("[data-link]")) {
      e.preventDefault();
      const temp = e.target.href;
      if (temp) {
        navigateTo(temp);
      }
    }
  });
  router();
});
