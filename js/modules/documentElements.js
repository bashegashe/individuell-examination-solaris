/**
 * Denna modul innehåller alla relevanta element på sidan. Uppdelad så här så att alla
 * javascript filer som behöver tillgång till elementen kan hämta dem härifrån
 * och för att undvika att ha flera platser där samma element är definierade.
 * På detta sätt vet man att alla element finns definierade här att hämta.
 */

const elements = {
    planets: document.querySelector('.planets'),
    infoWrapper: document.querySelector('.infoWrapper'),
    planetsWrapper: document.querySelector('.planetsWrapper'),
    closeBtn: document.querySelector('.close'),
    body: document.querySelector('body'),
    loader: document.querySelector('.loader')
};

export { elements };