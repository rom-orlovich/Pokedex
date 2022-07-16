import { createElement, select, selectByID } from "../utlites/domsHelpers";

export class Spinner {
  static render(id: string) {
    return createElement(this.createUI(id));
  }

  static createUI(id: string) {
    const loader = `<div id="${id}"  class="spinner"></div>`;
    return loader;
  }

  static addLoadingSpinner(parentQuery: string, idSpinner: string, pos = "") {
    const container = select(parentQuery);
    if (!container) return;

    const spinner = Spinner.render(idSpinner);

    container.style.position = "relative";

    spinner.classList.add("addRoateSpinner");
    spinner.classList.add(`center${pos ? `-${pos}` : ""}-abs`);
    container.append(spinner);
  }

  static removeLoadingSpinner(idSpinner: string) {
    const spinner = selectByID(idSpinner);
    if (!spinner?.parentElement) return;
    spinner.parentElement.style.position = "static";
    if (spinner) spinner.remove();
  }
}
