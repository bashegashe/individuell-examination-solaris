import { getPlanets } from "./modules/api.js";
import { addPlanetSizes } from "./modules/calculatePlanetSizes.js";
import { helpers } from "./modules/helpers.js";
import { displayPlanets, addEventListeners } from "./modules/UI.js";

async function main() {
    // Hämtar planetobjekt med information om planeterna först från ett API
    const planets = await getPlanets();

    // Lägger till en 'size' (diameter/width i px) egenskap till varje planetobjekt
    addPlanetSizes(planets);

    // Skapar, stylar och renderar ut alla planeter och tillhörande information
    displayPlanets(planets);

    // Lägger eventlyssnare på de skapade elementen samt övriga eventlyssnare
    addEventListeners();

    // Tar bort 'loadern' nu när allt laddat klart
    helpers.removeLoader();
}

main();