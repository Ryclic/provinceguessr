import {provincesData} from "./provinces.js";
import * as game from "./game.js";

let selected = "";

// Default outline for all provinces
function style(feature) {
    return {
        // ef7678
        fillColor: '#CC232A',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Outline on mouseover
function highlightFeature(e) {
    var layer = e.target;
    info.update(layer.feature.properties);
    if((!selected) || e.target.feature.properties != selected.target.feature.properties){
        layer.setStyle({
            fillColor: '#8B0000',
            color: '#F5AC27',
            weight: 2,
            dashArray: '10',
            fillOpacity: 0.725
        });
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    if((!selected) || e.target.feature.properties != selected.target.feature.properties){
        geojson.resetStyle(e.target);
        info.update();
    }
}

function selectProvince(e) {
    if(selected && (e.target != selected)){
        selected.target.setStyle(style());
        highlightFeature(e);

    }
    e.target.setStyle({
        // 7e92ed
        fillColor: '#8B0000',
        color: '#00000',
        weight: 2,
        dashArray: '10',
        fillOpacity: 0.85
    });
    // map.fitBounds(e.target.getBounds());
    selected = e;
}

// Setup event listeners
function featureEffects(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: selectProvince
    });
}

// Bound and render the 2D map
const topLeft = L.latLng(40, 70);
const bottomRight = L.latLng(30, 140);
const bounds = L.latLngBounds(topLeft, bottomRight);

const map = L.map('map').fitBounds(bounds).setMinZoom(4); // .setMaxBounds(bounds);
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© CartoDB'
}).addTo(map);

// Imported province data setup with Leaflet, setup map styles
var geojson;
geojson = L.geoJson(provincesData, {
    style: style,
    onEachFeature: featureEffects
}).addTo(map);

// Create a key for provinces
const info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = "<h2>Current Province:</h2>"
    + (props ? "<h3>" + props.nameCN + " | " + props.nameEN + "</h3>" : "<h3>Hover over a province</h3>")
    + "<h2>Selected Province:</h2>" 
    + (selected ? "<h3>" + selected.target.feature.properties.nameCN + " | "+ selected.target.feature.properties.nameEN + "</h3>" : "<h3>Select a province</h3>");
};

info.addTo(map);

// Reset map view button
document.getElementById("resetButton").addEventListener("click", () => {
    map.fitBounds(bounds);
});

// Start game button
document.getElementById("startGame").addEventListener("click", () => {
    // Remove blur and show game
    const elements = document.querySelectorAll("#map, #resetButton, #submitButton");
    elements.forEach(element => {
      element.style.filter = "none";
    });
    document.getElementsByClassName("initScreen")[0].style.visibility = "hidden";
    document.getElementsByClassName("gameScreen")[0].style.visibility = "visible";
    game.newRound();
})

// Submit player response
document.getElementById("submitButton").addEventListener("click", () => {
    // Only submit if user has selected a province
    if(selected){
        game.evaluateAnswer(selected.target.feature.properties.nameEN);
    } 
});