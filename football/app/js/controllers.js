angular.module('footballApp.controllers', []).


  controller('NavBarController', function($scope, $location) {
    $scope.$location = $location;
  
  }).

  /* standings controller */
  controller('standingsController', function($scope, footballAPIservice) {
    $scope.standingsList = [];
    $scope.fullData = [];

    footballAPIservice.getStandings().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.standingsList = response.standing;
        $scope.fullData = response;
    });
  }).
  
  /* last results */
  controller('LastWeeksResultsController', function($scope, footballAPIservice) {
    $scope.lastWeeksResultsList = [];

    footballAPIservice.getLastResults().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.lastWeeksResultsList = response.fixtures;
    });
  }).

  /* today's fixtures */
  controller('TodaysFixturesController', function($scope, footballAPIservice) {
    $scope.todaysFixturesList = [];

    footballAPIservice.getTodaysFixtures().success(function (response) {
        //Digging into the response to get the relevant data
        $scope.todaysFixturesList = response.fixtures;
    });
  }).

  /* today's fixtures */
  controller('TeamController', function($scope, $routeParams, footballAPIservice) {
    $scope.id = $routeParams.id;
    $scope.teamDetails = [];
    $scope.teamFixturesList = [];
    $scope.teamPlayersList = [];

    footballAPIservice.getTeamDetails($scope.id).success(function (response) {
        //Digging into the response to get the relevant data
        $scope.teamDetails = response;
    });
    
    footballAPIservice.getTeamFixtures($scope.id).success(function (response) {
        //Digging into the response to get the relevant data
        $scope.teamFixturesList = response.fixtures;
    });
    
    footballAPIservice.getTeamPlayers($scope.id).success(function (response) {
        //Digging into the response to get the relevant data
        $scope.teamPlayersList = response.players;
    });
  });