import { createElement } from "../utlites/domsHelpers";

export class Spinner {
  static render(id: string) {
    return createElement(this.createUI(id));
  }

  static createUI(id: string) {
    const loader = `<div id="${id}"  class="spinner"></div>`;
    return loader;
  }

  static loadingMode(spinner: HTMLElement) {
    spinner.classList.add("addRoateSpinner");
    return spinner;
  }
}
