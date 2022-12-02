/**
 * Denna modul är ansvarig för allt som har med API:er att göra som requests för att inhämta samt bearbeta data.
 * Modulen sköter för tillfället GET-requests som hämtar all data om planeterna
 * och gör den lättillgänglig för andra funktioner genom att parsa datan till JSON.
 */

const BASE_URL = 'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/solaris-api';

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`);
    const data = await response.json();

    return data.key;
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': key
        }
    });
    const data = await response.json();

    return data;
}

export { getPlanets };
