import AbstractView from "./abstractView";

export default class extends AbstractView {
    constructor(params: any) {
        super(params);
        this.setTitle("About Game");
    }

    async getHtml() {
        return `
            <section class="aboute-and-start position-relative">
        <div style="width: 70%; height: 1100px;" class="bg-light m-auto">
            <h4 class="m-5 pt-3">How to play?</h3>
                <div style="width: 85%;" class="d-flex justify-content-between ml-4">
                    <div class="bg-white w-50">
                        <div class="d-flex mt-5 ml-5">
                            <div style="width: 28px; height: 28px;"
                                class="bg-primary text-white rounded-circle text-center mr-3">1</div>
                            <p>
                                Register new player in game
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src="./images/svg/newPlayer.svg" alt="">
                    </div>
                </div>
                <div style="width: 85%;" class="d-flex justify-content-between ml-4 mt-5">
                    <div style="height: 200px;" class="bg-white w-50">
                        <div class="d-flex mt-5 ml-5">
                            <div style="width: 28px; height: 28px;"
                                class="bg-primary text-white rounded-circle text-center mr-3">2</div>
                            <p>
                                Configure your game settings
                            </p>
                        </div>
                    </div>
                    <div>
                        <div style="width: 250px; height: 100px;" class=" bg-primary text-center rounded">
                            <h4 class="text-white pt-5">Game Settings</h4>
                        </div>
                    </div>
                </div>
                <div style="width: 85%;" class="d-flex justify-content-between  ml-4 mt-5">
                    <div class="bg-white w-50">
                        <div class="d-flex mt-5 ml-5">
                            <div style="width: 28px; height: 28px;"
                                class="bg-primary text-white rounded-circle text-center mr-3">3</div>
                            <p>
                                Start you new game! Remember card <br> positions and match it before times up.
                            </p>
                        </div>
                    </div>
                    <div>
                        <img src="./images/svg/gameDemo.svg" alt="">
                    </div>
                </div>
        </div>
    </section>
        `;
    }
}