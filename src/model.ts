export let state = {
  nameValidate:false,
  lastnameValidate:false,
  emailValidate:false,
  topPlayers:[],
  minute:0,
  created:0,
  randomArray: [],
  prevState: "",
  prevIndex: 0,
  successCount: 0,
  failCount: 0,
  tryCount:0,
  count: 0,
  rememberTime: 3,
  score:0,
  gameSetting: {
    cardType: "animal",
    cardNumber: 4,
  },
};
export function resetState() {
  (state.randomArray = []), (state.prevState = ""), (state.prevIndex = 0);
  state.successCount = 0;
  state.failCount = 0;
  state.tryCount=0;
  state.count = 0;
  state.minute=0;
  state.score=0;
  state.rememberTime = 3;
}

export function setCardType(cardtype: string) {
  state.gameSetting.cardType = cardtype;
}
export function setCardNumber(cardnumber: number) {
  state.gameSetting.cardNumber = cardnumber;
}
