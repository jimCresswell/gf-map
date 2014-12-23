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

    // Configure default markers.
    L.Icon.Default.imagePath = 'node_modules/leaflet/dist/images'

    var geo_options = {
      enableHighAccuracy: true
    };
    var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);

}

function setMapHeight(){
    $('#map').height($(document).height());
};


function geo_success(position) {
  var geoLat = position.coords.latitude;
  var geoLong = position.coords.longitude;

  // 51.505, -0.09
  var map = L.map('map').setView([geoLat, geoLong], 13);

  L.tileLayer('http://{s}.tiles.mapbox.com/v3/jimcresswell.kie2d4km/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
  }).addTo(map);

  var marker = L.marker([geoLat, geoLong]).addTo(map);
  marker.bindPopup("You are here!").openPopup();
}

function geo_error() {
  alert("Sorry, no position available.");
}



