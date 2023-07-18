import {provincesData} from "./provinces.js";

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

    layer.setStyle({
        // 7e92ed
        color: '#F5AC27',
        weight: 5,
        dashArray: '',
        fillOpacity: 0.5
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

// Setup event listeners
function featureEffects(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Bound and render the 2D map
var topLeft = L.latLng(40, 70);
var bottomRight = L.latLng(30, 140);
var bounds = L.latLngBounds(topLeft, bottomRight);

var map = L.map('map').fitBounds(bounds).setMinZoom(4); // .setMaxBounds(bounds);
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
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h2>Current Province:</h2>' +  (props ?
        '<h3>' + props.nameCN + " | " + props.nameEN + '</h3>'
        : 'Hover over a province');
};

info.addTo(map);

// Reset map view button
document.getElementById("resetButton").addEventListener("click", () => {
    map.fitBounds(bounds);
});