export let state = {
  randomArray: [],
  prevState: "",
  prevIndex: 0,
  successCount: 0,
  failCount: 0,
  tryCount:0,
  count: 30,
  rememberTime: 10,
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
  state.count = 30;
  state.rememberTime = 10;
}

export function setCardType(cardtype: string) {
  state.gameSetting.cardType = cardtype;
}
export function setCardNumber(cardnumber: number) {
  state.gameSetting.cardNumber = cardnumber;
}
