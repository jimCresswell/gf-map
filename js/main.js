/**
 * Draw a lovely map.
 *
 * Implicit dependency on jQuery.
 */
'use strict';

var L = require('leaflet');


// Kickoff.
$(go);


// Event listeners.
$(window).resize(setMapHeight);


/* Functions */
function go() {
    setMapHeight();

    var map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/jimcresswell.kie2d4km/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);
}

function setMapHeight(){
    $('#map').height($(document).height());
};
