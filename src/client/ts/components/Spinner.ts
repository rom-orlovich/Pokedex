import { createElement, select } from "../utlites/domsHelpers";
import { delayFunction } from "../utlites/helpers";

export class Spinner {
  static render() {
    return createElement(this.createUI());
  }

  static createUI() {
    const loader = `<div class="spinner"></div>`;
    return loader;
  }

  static loadingMode(spinner: HTMLElement) {
    spinner.classList.add("addRoateSpinner");
    return spinner;
  }

  static async addSpinnerToElement(
    query: string,
    funDelay: (...args: any[]) => any,
    delay: number
  ) {
    const container = select(query);

    container.innerHTML = "";
    const spinner = Spinner.loadingMode(Spinner.render());
    spinner.classList.add("center-abs");
    container.append(spinner);
    await delayFunction(() => {
      funDelay();
      spinner.remove();
    }, delay);
    // return spinner;
  }
}
