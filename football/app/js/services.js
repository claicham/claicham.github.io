angular.module('footballApp.services', []).
  factory('footballAPIservice', function($http) {

    var footballAPI = {};

    footballAPI.getStandings = function() {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' },
        url: '//api.football-data.org/v1/competitions/445/leagueTable'
      });
    }

    footballAPI.getLastResults = function() {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' },
        url: '//api.football-data.org/v1/competitions/445/fixtures?timeFrame=p7'
      });
    }

    footballAPI.getTodaysFixtures = function() {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' },
        url: '//api.football-data.org/v1/competitions/445/fixtures?timeFrame=n8'
      });
    }

    footballAPI.getTeamDetails = function(id) {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' }, 
        url: '//api.football-data.org/v1/teams/'+ id + '/'
      });
    }
    
    footballAPI.getTeamFixtures = function(id) {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' }, 
        url: '//api.football-data.org/v1/teams/'+ id + '/fixtures'
      });
    }
    
    footballAPI.getTeamPlayers = function(id) {
      return $http({
        method: 'GET',
        headers: { 'X-Auth-Token': '7880a62f2e154773958ac8801365554d' }, 
        url: '//api.football-data.org/v1/teams/'+ id + '/players'
      });
    }

    /*
    footballAPI.getDriverRaces = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2014/drivers/'+ id +'/results.json?callback=JSON_CALLBACK'
      });
    }*/

    return footballAPI;
  });
