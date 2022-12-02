/**
 * Denna modul innehåller generella & övriga funktioner som inte platsar i andra moduler
 * men som på olika sätt behövs för att allt ska fungera.
 * En del av funktionerna nedan skulle kunna lagts i UI.js men uppdelat så här för att
 * UI.js huvudfokus ska vara att skapa och rendera planeterna samt att definiera eventlyssnare.
 */

import { elements } from "./documentElements.js";

const helpers = {
    adjustPlanetsWrapper(planets) {
        const planetsObject = this.getPlanetsObject(planets);
        const adjustPixels = planetsObject['Solen'].size;
    
        elements.planetsWrapper.style['margin-left'] = `-${adjustPixels}`;
    },
    getSunSize(planets) {
        const planetsObject = this.getPlanetsObject(planets);
    
        return planetsObject['Solen'].size;
    },
    getPlanetsObject(planets) {
        const planetsObject = {};
    
        planets.forEach((planet) => {
            planetsObject[planet.name] = planet;
        });
    
        return planetsObject;
    },
    togglePlanetInfo(planetName) {
        elements.planetsWrapper.classList.toggle('hide');
        elements.closeBtn.classList.toggle('hide');

        if (planetName) {
            document.querySelector(`section.${planetName.toLowerCase()}-info`).classList.toggle('hide');
        }
    
        this.toggleBodyOverflow();    
    },
    toggleBodyOverflow() {
        const body = elements.body;
    
        if (body.style.overflow === '' || body.style.overflow === 'hidden') {
            body.style.overflow = 'scroll';
        } else {
            body.style.overflow = 'hidden';
        }
    },
    hidePlanetsInfo() {
        document.querySelectorAll('.infoWrapper section').forEach((section) => {
            section.classList.add('hide');
        });
    },
    removeLoader() {
        elements.loader.remove();
    }
};

export { helpers };