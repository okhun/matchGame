import AbstractView from "./abstractView";
import { state } from "../model";

export default class extends AbstractView {
  constructor(params: any) {
    super(params);
    this.setTitle("Best score");
  }

  getHtml = async () => `
            <div class="container mt-4">
                <div class="jumbotron">
                    <h4 class="mb-4">Best players</h4>
                    ${
                      state.topPlayers.length &&
                      state.topPlayers
                        .map(
                          (el) => `
                          <div class="d-flex justify-content-between border-bottom mb-2">
                        <div class="d-flex">
                            <img src="${
                              el.img
                                ? `data:image/jpeg;base64,${btoa(el.img)}`
                                : "../images/default_avatar.png"
                            } " width="70" height="70" class="rounded-circle" alt="">
                            <div class="mt-2 ml-4">
                                <h5>${el.name} ${el.lastname}</h5>
                                <p>${el.email}</p>
                            </div>
                        </div>
                        <div>
                            <h5 class="mt-4">Score: <span class="text-primary">${
                              el.score
                            }</span></h5>
                        </div>
                    </div>
                        `
                        )
                        .join("")
                    }
                
                </div>
            </div>
        `;
}
