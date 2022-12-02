/**
 * Denna modul innehåller alla funktioner för att räkna ut storlekarna på planeterna.
 * För varje planetobjekt läggs en 'size' egenskap till som är storleken i px som planeten 
 * borde vara baserat på diameterförhållandena mellan planeterna och tillgänglig skärmyta
 */

function addPlanetSizes(planets) {
    const diameterSum = calculateDiameterSum(planets);
    const diameterRatios = calculateDiameterRatios(planets, diameterSum);
    
    planets.forEach((planet) => planet.size = calculatePlanetSize(planet, diameterRatios));
}

function calculateDiameterSum(planets) {
    return planets.reduce((sum, planet) => {
        return sum + planet.circumference / Math.PI;
    }, 0);
}

function calculateDiameterRatios(planets, diameterSum) {
    const diameterRatios = {};
    
    planets.forEach((planet) => {
        const diameter = planet.circumference / Math.PI;

        diameterRatios[planet.name] = diameter / diameterSum;
    });

    return diameterRatios;
}

function calculatePlanetSize(planet, diameterRatios) {
    let windowWidth = window.innerWidth * 2 + window.innerWidth / 2;

    const size = Math.round((windowWidth * diameterRatios[planet.name] + Number.EPSILON) * 100) / 100 + 'px';

    return size;
}

export { addPlanetSizes };