/**
 * Denna modul är skapad för att hantera det mesta som har med user-interface att göra.
 * Exempel på user-interface är alla element (och deras styling) som användaren interagerar med på sidan
 * och all input användaren gör med musen/tangentbordet.
 * Modulens huvudsakliga funktion just nu är att skapa, styla och rendera alla planeter
 * och deras tillhörande information samt att definiera diverse eventlyssnare.
 */

import { helpers } from "./helpers.js";
import { elements } from "./documentElements.js";

const PLANETS = {
    Solen: { background: '#FFD029', hasGlow: true },
    Merkurius: { background: '#888888' },
    Venus: { background: '#E7CDCD' },
    Jorden: { background: '#428ED4' },
    Mars: { background: '#EF5F5F' },
    Jupiter: { background: '#E29468' },
    Saturnus: { background: '#C7AA72', hasRing: true },
    Uranus: { background: '#C9D4F1' },
    Neptunus: { background: '#7A91A7' },
};

function displayPlanet(planetElem, planetInfoElem) {
    elements.planets.append(planetElem);
    elements.infoWrapper.append(planetInfoElem);
}

function displayPlanets(planets) {
    for (const planet of planets) {
        // Lägg till alla egenskaper från PLANETS på planeten som background, hasGlow, hasRing ...
        Object.assign(planet, PLANETS[planet.name]);

        const planetElem = createPlanetElem(planet);
        const planetInfoElem = createPlanetInfoElem(planet);

        displayPlanet(planetElem, planetInfoElem);
    }

    helpers.adjustPlanetsWrapper(planets);
}

function createPlanetElem(planet) {
    const planetElem = document.createElement('aside');

    planetElem.classList.add(planet.name.toLowerCase());

    planetElem.style.width = planet.size;
    planetElem.style.height = planet.size;
    planetElem.style.background = planet.background;

    if (planet.hasGlow) addPlanetGlow(planetElem, planet.background);
    if (planet.hasRing) addPlanetRing(planetElem, planet.size);

    return planetElem;
}

function createPlanetInfoElem(planet) {
    const section = document.createElement('section');

    section.classList.add('planetsInfo', `${planet.name.toLowerCase()}-info`);

    section.innerHTML =
        `
         <header class="infoHeader">
             <h1 class="infoHeader__heading heading">${planet.name}</h1>
             <h2 class="infoHeader__subheading subheading">${planet.latinName}</h2>
         </header>
 
         <article class="planetText">
             ${planet.desc}
         </article>
 
         <article class="planetInfo">
             <h3>OMKRETS</h3>
             <h3>KM FRÅN SOLEN</h3>
             <p>${planet.circumference.toLocaleString('sv-SE')} km</p>
             <p>${planet.distance.toLocaleString('sv-SE')} km</p>
 
             <h3>MAX TEMPERATUR</h3>
             <h3>MIN TEMPERATUR</h3>
             <p>${planet.temp.day}C</p>
             <p>${planet.temp.night}C</p>
         </article>
 
         <article class="planetMoons">
             <h3>MÅNAR</h3>
             <p>${planet.moons.join(', ')}</p>
         </article>`;

    const bigPlanetElem = createBigPlanetElem(planet);
    section.append(bigPlanetElem);

    section.classList.add('hide');

    return section;
}

/* TEMPORÄR LÖSNING FÖR ATT RENDERA STORA PLANETER TILL VÄNSTER AV INFORMATIONSRUTAN FÖR EN PLANET */
function createBigPlanetElem(planet) {
    const bigPlanetElem = createPlanetElem({
        size: planet.size,
        background: planet.background,
        hasGlow: true,
        name: `big-${planet.name}`
    });

    bigPlanetElem.style.position = 'absolute';
    bigPlanetElem.style.height = '100%';
    bigPlanetElem.style.width = window.innerHeight + 'px';
    bigPlanetElem.style.left = '-' + (7 * window.innerHeight / 8) + 'px';

    return bigPlanetElem;
}

function addPlanetGlow(planetElem, background) {
    planetElem.style['box-shadow'] = `0 0 250px ${background}33`;
}

function addPlanetRing(planetElem, size) {
    planetElem.style.position = 'relative';

    const div = document.createElement('div');

    div.style.cssText = `background: rgba(255, 255, 255, 0.4);
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%) rotate(-30deg);
                          border-radius: 50%`;

    div.style.width = parseFloat(size) + (parseFloat(size) / 2) + 'px';
    div.style.height = parseFloat(size) / 24 + 'px';

    planetElem.append(div);
}

function addEventListeners() {
    // Eventlyssnare för när användaren klickar på en planet
    for (const planetElem of elements.planets.children) {
        planetElem.addEventListener('click', (event) => {
            const planetName = event.target.getAttribute('class');

            helpers.togglePlanetInfo(planetName);
        });
    }

    elements.closeBtn.addEventListener('click', () => {
        helpers.togglePlanetInfo();
        helpers.hidePlanetsInfo();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && elements.planetsWrapper.classList.contains('hide')) {
            helpers.togglePlanetInfo();
            helpers.hidePlanetsInfo();
        }
    });
}

export { displayPlanets, addEventListeners };