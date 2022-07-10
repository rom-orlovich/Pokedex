"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAVE_FAVORITE_POKEMONS_URL = exports.GET_FAVORITE_POKEMONS_URL = exports.GET_ALL_POKEMONS_URL = exports.EXPRESS_SERVER_URL = exports.POKEMONS_FAVORITE_LIST_KEY = exports.POKEMONS_LIST_KEY = exports.EndPointsAPI = void 0;
var helpers_1 = require("./helpers");
/* eslint-disable no-unused-vars */
var EndPointsAPI;
(function (EndPointsAPI) {
    EndPointsAPI["getAllPokemons"] = "getAllPokemons";
    EndPointsAPI["getFavoritePokemons"] = "getFavoritePokemons";
    EndPointsAPI["saveFavoritePokemons"] = "saveFavoritePokemons";
})(EndPointsAPI = exports.EndPointsAPI || (exports.EndPointsAPI = {}));
exports.POKEMONS_LIST_KEY = "pokemons_list";
exports.POKEMONS_FAVORITE_LIST_KEY = "pokemons_favorite_list";
exports.EXPRESS_SERVER_URL = "http://localhost:5000";
exports.GET_ALL_POKEMONS_URL = (0, helpers_1.createApiEndPoint)(exports.EXPRESS_SERVER_URL, EndPointsAPI.getAllPokemons);
exports.GET_FAVORITE_POKEMONS_URL = (0, helpers_1.createApiEndPoint)(exports.EXPRESS_SERVER_URL, EndPointsAPI.getFavoritePokemons);
exports.SAVE_FAVORITE_POKEMONS_URL = (0, helpers_1.createApiEndPoint)(exports.EXPRESS_SERVER_URL, EndPointsAPI.saveFavoritePokemons);
//# sourceMappingURL=constantVariables.js.map