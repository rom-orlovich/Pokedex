import { TDataPokemons } from "../types";

export class HomePage {
  dataPokemons: TDataPokemons;
  constructor(dataPokemons: TDataPokemons) {
    this.dataPokemons = dataPokemons;
  }
  render() {}
  createUI() {}

  static initEvents() {}
}
