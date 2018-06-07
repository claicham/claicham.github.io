'use strict';

// Declare app level module which depends on views, and components
angular.module('footballApp', [
  'footballApp.controllers',
  'footballApp.services',
  'ngRoute',
  'mgcrea.ngStrap',
  'footballAppFilters'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/league", { templateUrl: "partials/standings.html", controller: "standingsController"}).
		when("/latest", { templateUrl: "partials/fixtures.html", controller: "TodaysFixturesController"}).
		when("/results", { templateUrl: "partials/results.html", controller: "LastWeeksResultsController"}).
		when("/league/team/:id", { templateUrl: "partials/team.html", controller: "TeamController"}).
		/*when("/drivers/:id", { templateUrl: "partials/driver.html", controller: "driverController"}).*/
		otherwise({ redirectTo: '/league' });
}]);