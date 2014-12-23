/**
 * Data service module.
 *
 * Responsible for retrieving the data.
 */
'use strict';

var get = require('superagent').get;
var defer = require('q').defer;

module.exports = {
    getData: getData
};


function getData(options) {
    var deferred = defer();

    var url = options.url;
    if (options.params) {
        url += Object.keys(options.params).reduce(function(param) {
            return param + '=' + options.params[param] + '&';
        },'?');
    }

    get(options.url, function(res) {
        if (res.error) {
            deferred.reject(res.error);
        } else {
            deferred.resolve(res.body);
        }
    });

    return deferred.promise;
}