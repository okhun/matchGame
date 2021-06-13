export let state={
    gameSetting:{
        cardType: "animal",
        cardNumber: 4,
    }
}
export function setCardType(cardtype: string){
    state.gameSetting.cardType=cardtype;
}
export function setCardNumber(cardnumber: number){
    state.gameSetting.cardNumber=cardnumber;
}
