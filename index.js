'use strict';

var request = require('request');
var R = require('ramda');
var Q = require("q");

require('dotenv').config();

var AUTH0_GLOBAL_CLIENT_ID = process.env.AUTH0_GLOBAL_CLIENT_ID;
var AUTH0_GLOBAL_CLIENT_SECRET = process.env.AUTH0_GLOBAL_CLIENT_SECRET;


var getToken = function () {

  var deferred = Q.defer();

  var options = {
    method: 'POST',
    url: 'https://agl-flows.auth0.com/oauth/token',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: `{ "client_id": "${AUTH0_GLOBAL_CLIENT_ID}", "client_secret": "${AUTH0_GLOBAL_CLIENT_SECRET}",  "grant_type": "client_credentials"}`
  };

  request(options, function (error, response, body) {
    if (error) {
      return deferred.reject(new Error(error));
    }
    var result = JSON.parse(body);
    var token = result.access_token;
    return deferred.resolve(token);
  });

  return deferred.promise;

};

var getLogs = function (token, allLogs, perPage, pageNumber) {

  var deferred = Q.defer();

  var options = {
    method: 'GET',
    url: 'https://agl-flows.auth0.com/api/logs',
    qs: {
      page: pageNumber,
      per_page: perPage,
      'sort:1': '',
      fields: 'client_id,type',
      exclude_fields: 'false',
      search: 'type:"s"'
    },
    headers: {
      'cache-control': 'no-cache',
      authorization: `Bearer ${token}`,
      'content-type': 'application/json'
    },
    json: true
  };

  request(options, function (error, response, body) {
    if (error) {
      return deferred.reject(new Error(error));
    }
    var newLogs = body.logs;
    console.log('page number: ', pageNumber);
    // take maximum of recursive limit if more logs than limit exists...
    if (pageNumber >= recursiveMaxSize) {
      console.log('Recursive max size reached, returning logs at pageNumber: ', pageNumber);
      return deferred.resolve(allLogs);
    } else if (newLogs && newLogs.length > 0) {
      allLogs = R.concat(allLogs, newLogs);
      setTimeout(function () {
        return deferred.resolve(getLogs(token, allLogs, perPage, pageNumber + 1));
      }, 2000);
    } else {
      return deferred.resolve(allLogs);
    }
  });
  return deferred.promise;
};


var recursiveMaxSize = function () {
  try {
    return 1 + recursiveMaxSize();
  } catch (e) {
    // Call stack overflow
    return 1;
  }
};

var recursiveMaxSize = recursiveMaxSize();
console.log('Recursive max size: ', recursiveMaxSize);


getToken()
  .then(function (token) {
    console.log(token);
    return getLogs(token, [], 20, 0)
      .then(function (logs) {
        var totalLogs = logs.length;
        console.log('Total number of Auth0 users: ', totalLogs);
        var clientIds = R.compose(R.uniq, R.map(x => x.client_id))(logs);
        console.log('Client Ids with logins: ', clientIds);
      });
  })
  .catch(function (err) {
    console.log(err);
  });



