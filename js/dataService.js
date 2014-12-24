/**
 * Data service module.
 *
 * Responsible for retrieving the data.
 */
'use strict';

var agent = require('superagent');
var defer = require('q').defer;

module.exports = {
    getData: getData
};


function getData(options) {
    var deferred = defer();

    var req = agent.get(options.url);

    if (options.params) {
        req.query(options.params);
    }

    if (options.cors) {
        req.withCredentials();
    }

    req.end(function(res) {
            if (res.error) {
                deferred.reject(res.error);
            } else {
                deferred.resolve(res.body);
            }
        });

    return deferred.promise;
}