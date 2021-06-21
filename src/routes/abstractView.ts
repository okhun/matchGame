export class Abstract {
  [x: string]: any;

  constructor(params: any) {
    this.params = params;
  }

  setTitle(title: string) {
    document.title = title;
    this.a = 3;
  }

  async getHtml() {
    this.b = 4;
    return "";
  }
}
