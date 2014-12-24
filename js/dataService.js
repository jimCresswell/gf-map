/**
 * Data service module.
 *
 * Responsible for retrieving the data.
 */
'use strict';

var defer = require('q').defer;

module.exports = {
    getData: getData
};


function getData(options) {
    var deferred = defer();

    var url = options.url;
    url += Object.keys(options.params).reduce(function(soFar, param) {
        return soFar + param + '=' + options.params[param] + '&';
    },'?');

    get(url, function(response) {
        var data = JSON.parse(response);
        deferred.resolve(data);
    }, function(err) {
        deferred.reject(err);
    });

    return deferred.promise;
}


function get(url, res, err) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = function () {
        return res(xhr.response);
    };
    xhr.onerror = function () {
        if (err !== undefined) {
            return err(xhr.response);
        }
    };
    xhr.send();
}
