export default class {
  [x: string]: any;
  constructor(params: any) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
  }

  async getHtml() {
    return "";
  }
}
