angular.module('footballAppFilters', []).
  filter('teamUrl', function() {
    return function(id) {
      return id.split('/').pop();
    };
  }).
  filter('score', function() {
    return function(goals) {
      var scored = goals < 0;
      return scored ? '0' : goals;
    };
  }).
  filter('addFlag', function() {
    return function(flag) {
      var flagCorrect = flag == 'Scottland' ? 'Scotland' : flag;
      var country = flagCorrect.toLowerCase().replace(' ',"-").replace("'",""); 
      return country;
    };
  }).
  filter('scotland', function() {
    return function(countryName) {
      var nameCorrect = countryName == 'Scottland' ? 'Scotland' : countryName;
      return nameCorrect;
    }
  });