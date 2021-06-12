import AbstractView from "./abstractView";

export default class extends AbstractView {
    constructor(params: any) {
        super(params);
        this.setTitle("Best score");
    }

    async getHtml() {
        return `
            <h1>Welcome back, Dom</h1>
            <p>
                lorem lorem lorem
            </p>
            <p>
                hammasi joyida
            </p>
        `;
    }
}