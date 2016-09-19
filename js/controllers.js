var ncApp = angular.module('ncApp', []);

ncApp.controller('GhCtrl', function($scope, $http, $filter) {

	
  var userName = 'novicell',
      userType = 'orgs',
      str1 = '0a1fde2db5ef80ea6d7f',
	    str2 = '3b643be67f8269a3a6c1',
      token = str1 + str2;

  // Get repo data
  $http.get('https://api.github.com/' + userType + '/' + userName + '/repos?access_token=' + token).success(function(data) {
    $scope.repos = data;
     console.log ($scope.repos);
  });

  // Get user data
  $http.get('https://api.github.com/' + userType + '/' + userName + '?access_token=' + token).success(function(data) {
    $scope.org = data;
    console.log ($scope.org);
  });

  var colors = [
    {Name: 'JavaScript', Color: '#f1e05a'},
    {Name: 'HTML', Color: '#e44b23'},
    {Name: 'TypeScript', Color: '#2b7489'},
    {Name: '"Objective-C++', Color: '#6866fb'},
    {Name: 'CSS', Color: '#563d7c'},
    {Name: 'CoffeeScrip', Color: '#244776'},
    {Name: 'C Sharp', Color: '#178600'},
  ]
    
 $scope.getBackgroundColor = function(str) {
   var results = $filter('filter')(colors, { Name: str });

   if(results.length > 0) {
     return results[0].Color;
   } else {
     return '#222';
   }
 }
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
