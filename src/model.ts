export let state={
    randomArray: [],
    prevState:"",
    prevIndex:0,
    successCount:0,
    count:30,
    rememberTime:10,
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
