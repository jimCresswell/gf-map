/**
 * Draw a lovely map.
 *
 * Implicit dependency on jQuery.
 */
'use strict';

// npm modules.
var L = require('leaflet');

// Custom modules.
var dataService = require('./dataService');


// Kickoff.
$(go);


// Event listeners.
$(window).resize(setMapHeight);

// Shared variables.
var map;
var userMarker;
var clientId = 'FV2WB3ZXPH5ZHHYR12XAH4WENOCXOXAD31YFJF4LDDDQJVK4';

/* Functions */
function go() {
    setMapHeight();

    map = L.map('map');

    // Configure default markers.
    L.Icon.Default.imagePath = 'images/vendor/leaflet'

    var geo_options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
    var wpid = navigator.geolocation.watchPosition(geo_update, geo_error, geo_options);
}


function setMapHeight(){
    $('#map').height($(document).height());
};


function geo_success(position) {
  var geoLat = position.coords.latitude;
  var geoLong = position.coords.longitude;

  // 51.505, -0.09
  map.setView([geoLat, geoLong], 13);

  // Create the user marker
  userMarker = L.circleMarker([geoLat, geoLong], {
      color: 'green',
      fillColor: '#0f3',
      fillOpacity: 0.5,
      weight: 4
  }).addTo(map);
  userMarker.bindPopup("You are here!").openPopup();

  // Get tiles.
  L.tileLayer('http://{s}.tiles.mapbox.com/v3/jimcresswell.kie2d4km/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
  }).addTo(map);

  // Get venue data
  dataService
    .getData({
      url: 'https://api.foursquare.com/v2/venues/explore',
      params: {
        ll: '' + geoLat + ',' + geoLong,
        radius: '10000',
        query: 'gluten free',
        client_id: clientId,
        client_secret: 'ZF5G3BX4T5O1HW1AWKNHLZUMVFEG1RUST2CSX2JNAVDVCMI1',
        v: '20141223'
      }
    })
    .then(function(data) {
      if (data.response.warning) {
        console.log(data.response.warning.text);
      }
      data.response.groups[0].items.forEach(function(item) {
          item.reasons.items.forEach(function(reasonItem) {
            if ("tipsMatchReason" === reasonItem.reasonName) {
              var venLat = item.venue.location.lat;
              var venLong = item.venue.location.lng;
              var tipText = item.tips[0].text;
              var venueMarker = L.marker([venLat, venLong]).addTo(map);
              var venue = item.venue;
              var markerContent = '<p class="venue__name">';
              markerContent +=    venue.url ? '<a href="' + venue.url + '">' + venue.name + '</a>' : venue.name;
              markerContent +=    '</p>';
              markerContent +=    '<p class="venue__comment">' + tipText + '</p>' +
                                  '<p class="venue__details"><a href="https://foursquare.com/v/' + venue.id + '?ref=' + clientId + '">More Details</a></p>';

              venueMarker.bindPopup(markerContent);
            }
          });
      });
    })
    .done();
}


function geo_update(position) {
  var geoLat = position.coords.latitude;
  var geoLong = position.coords.longitude;

  if (userMarker) {
    userMarker.setLatLng([geoLat, geoLong]);
  }
}


function geo_error() {
  alert("Sorry, no position available.");
}



