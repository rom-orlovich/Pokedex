import { createElement, select } from "../utlites/domsHelpers";

export class Spinner {
  static render() {
    return createElement(this.createUI());
  }

  static createUI() {
    const loader = `<div class="spinner"></div>`;
    return loader;
  }

  static loadingMode(spinner: HTMLElement) {
    spinner.classList.toggle("addRoateSpinner");
    return spinner;
  }

  static addSpinnerToElement(query: string) {
    const container = select(query);
    container.innerHTML = "";
    const spinner = Spinner.loadingMode(Spinner.render());
    container.append(spinner);
    return spinner;
  }
}
