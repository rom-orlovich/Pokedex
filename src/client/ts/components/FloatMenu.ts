import { createElement, select } from "../utlites/domsHelpers";

export class FloatMenu {
  static folatMenuButtonID = ".scroll_up";
  static render() {
    return createElement(FloatMenu.createUI());
  }

  static createUI() {
    const folatMenu = `<div id="float_menu">
    <span> <button class="fav_pokemons"> <i class="fa fa-star"></i> </button></span>
    <span> <button class="scroll_up"> <i class="fa fa-arrow-up"></i> </button></span>
    </div>`;
    return folatMenu;
  }

  static initEvents() {
    this.scrollUpEvent();
  }

  // Scrolls smoothly to the top of the page by click the float menu button.
  static scrollUpEvent() {
    const folatMenuButton = select(this.folatMenuButtonID);
    folatMenuButton.addEventListener("click", () => {
      window.scroll({ top: 0, behavior: "smooth" });
    });
  }
}
