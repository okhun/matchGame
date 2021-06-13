import AbstractView from "./abstractView";

export default class extends AbstractView {
    constructor(params: any) {
        super(params);
        this.setTitle("Best score");
    }

    async getHtml() {
        return `
            <div class="container mt-4">
                <div class="jumbotron">
                    <h4 class="mb-4">Best players</h4>
                    <div class="d-flex justify-content-between border-bottom mb-2">
                        <div class="d-flex">
                            <img src="./images/okhun.jpg" width="70" height="70" class="rounded-circle" alt="">
                            <div class="mt-2 ml-4">
                                <h5>Nicci Troiani</h5>
                                <p>nicci@gmail.com</p>
                            </div>
                        </div>
                        <div>
                            <h5 class="mt-4">Score 4:4</h5>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}