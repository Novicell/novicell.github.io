var ncApp = angular.module('ncApp', []);

ncApp.controller('GhCtrl', function($scope, $http) {
  var userName = 'novicell',
      userType = 'orgs',
      token = '8390b29418ebbdae5a87df4292a86a2f996cccd8';

  // Get repo data
  $http.get('https://api.github.com/' + userType + '/' + userName + '/repos?access_token=' + token).success(function(data) {
    $scope.repos = data;
  });

  // Get user data
  $http.get('https://api.github.com/' + userType + '/' + userName + '?access_token=' + token).success(function(data) {
    $scope.org = data;
  });

  /*
   *  Helper function
   */
  $scope.stringToColor = function(str) {
    // str to hash
    for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
    // int/hash to hex
    for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));

    return colour;
  }
});
