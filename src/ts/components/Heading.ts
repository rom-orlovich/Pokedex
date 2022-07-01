import { createElement, createImg } from "../utlites/domsHelpers";

export class Header {
  static render() {
    return this.createUI();
  }

  static createUI() {
    const div = createElement(`
    
    <div class="heading_pokedex">${createImg(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png",
      "pokemon_heading"
    )}</div>
    
    `);
    return div;
  }
}
