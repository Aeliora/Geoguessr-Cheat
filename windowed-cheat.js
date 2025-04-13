// ==UserScript==
// @name         GeoGuessr Live Location Viewer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  View live location in a new window
// @author       OpenAI
// @match        https://www.geoguessr.com/*
// @grant        GM_webRequest
// @downloadURL https://raw.githubusercontent.com/DEIN-GITHUB-USERNAME/DEIN-REPO/main/live-viewer.js
// ==/UserScript==

// Global variable to hold coordinates
let globalCoordinates = {
    lat: 0,
    lng: 0
};

// Function to extract coordinates (from the GeoGuessr page)
function extractCoordinates() {
    const pattern = /-?\d+\.\d+,-?\d+\.\d+/g;
    let match = document.documentElement.innerHTML.match(pattern);
    if (match && match[0]) {
        const [lat, lng] = match[0].split(",");
        globalCoordinates.lat = parseFloat(lat);
        globalCoordinates.lng = parseFloat(lng);
    }
}

// Function to update the second window with Google Maps link
function updateMapInPopup(popup) {
    if (!popup) return;
    const url = `https://maps.google.com/maps?q=${globalCoordinates.lat},${globalCoordinates.lng}&t=m&z=3&output=embed`;
    const iframe = popup.document.getElementById("map-frame");
    if (iframe) {
        iframe.src = url;
    }
}

// Function to create the popup window for displaying coordinates
function createPopup() {
    const popup = window.open('', 'GeoGuessr Live Viewer', 'width=800,height=600');
    popup.document.write(`
        <html>
        <head>
            <title>GeoGuessr Live Location</title>
        </head>
        <body>
            <h2>Live Location View</h2>
            <iframe id="map-frame" width="100%" height="100%" frameborder="0"></iframe>
        </body>
        </html>
    `);
    return popup;
}

// Main function to initialize and update the popup window
function startLiveLocationViewer() {
    let popup = createPopup();
    setInterval(() => {
        extractCoordinates(); // Extract the coordinates
        updateMapInPopup(popup); // Update the map in the popup
    }, 2000); // Update every 2 seconds
}

// Start the live location viewer when the script is loaded
startLiveLocationViewer();
