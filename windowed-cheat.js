// Speichert die aktuellen Koordinaten, die durch die Google Maps API erhalten werden
let globalCoordinates = {
    lat: 0,
    lng: 0
};

// Interzeptiert die Google Maps API-Anfragen und speichert die Koordinaten
var originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url) {
    if (method.toUpperCase() === 'POST' &&
        (url.startsWith('https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetMetadata') ||
            url.startsWith('https://maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/SingleImageSearch'))) {

        this.addEventListener('load', function () {
            let interceptedResult = this.responseText
            const pattern = /-?\d+\.\d+,-?\d+\.\d+/g;
            let match = interceptedResult.match(pattern)[0];
            let split = match.split(",")
            globalCoordinates.lat = Number.parseFloat(split[0])
            globalCoordinates.lng = Number.parseFloat(split[1])
        });
    }
    return originalOpen.apply(this, arguments);
};

// Funktion zum Öffnen eines neuen Fensters mit Google Maps
function openLiveWindow() {
    const popup = window.open('', 'GeoGuessr Live Cheat', 'width=800,height=600');
    popup.document.write(`
        <html>
            <head>
                <title>GeoGuessr Live Cheat</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    #map {
                        width: 100%;
                        height: 100%;
                    }
                </style>
            </head>
            <body>
                <div id="map"></div>
            </body>
        </html>
    `);
    return popup;
}

// Funktion zur Aktualisierung des Fensters mit den aktuellen Koordinaten
function updateLiveWindow(popup, lat, lng) {
    const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=3&output=embed`;
    popup.document.getElementById('map').innerHTML = `<iframe width="100%" height="100%" frameborder="0" src="${mapUrl}"></iframe>`;
}

// Funktion, die alle 2 Sekunden die Koordinaten abfragt und das Fenster aktualisiert
function startLiveUpdating(popup) {
    const updateInterval = setInterval(() => {
        const { lat, lng } = globalCoordinates;
        if (lat && lng) {
            updateLiveWindow(popup, lat, lng);
        }
    }, 2000); // Aktualisiere alle 2 Sekunden
    return updateInterval;
}

// Funktion zur Ausführung des Codes, wenn der GitHub-Link aufgerufen wird
function executeLiveUpdate() {
    fetch('https://raw.githubusercontent.com/Aeliora/Geoguessr-Cheat/main/windowed-cheat.js')
        .then(response => response.text())
        .then(script => {
            eval(script); // Führe den heruntergeladenen Code aus
            const popup = openLiveWindow(); // Öffne das Live-Fenster
            startLiveUpdating(popup); // Beginne mit der Aktualisierung alle 2 Sekunden
        })
        .catch(error => console.error('Error loading script:', error));
}

// Bei Tastendruck 1, rufe die `executeLiveUpdate()`-Methode auf, um das zweite Fenster zu öffnen und zu aktualisieren
let onKeyDown = (e) => {
    if (e.keyCode === 49) { // Taste 1
        e.stopImmediatePropagation();
        executeLiveUpdate();
    }
}

document.addEventListener("keydown", onKeyDown);
