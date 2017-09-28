"use strict";

var ncApp = angular.module('ncApp', []);

ncApp.controller('GhCtrl', function($scope, $http) {
    $scope.filter = '';

    var userName = 'novicell',
        userType = 'orgs',
        str1 = '0a1fde2db5ef80ea6d7f',
        str2 = '3b643be67f8269a3a6c1',
        token = str1 + str2,
        activeIndex = 0;

    // Get repo data
    $http.get('https://api.github.com/' + userType + '/' + userName + '/repos?access_token=' + token).success(function(data) {
        $scope.repos = data;
    });

    // Get user data
    $http.get('https://api.github.com/' + userType + '/' + userName).success(function(data) {
        $scope.org = data;
    });

    $scope.goToTab = function (index) {
        var tabsContainer = document.querySelector('.filter');
        var tablinks = tabsContainer.querySelectorAll('.filter__tab');

        if (index !== activeIndex && index >= 0 && index <= tablinks.length) {
            tablinks[activeIndex].classList.remove('filter__tab--active');
            tablinks[index].classList.add('filter__tab--active');

            activeIndex = index;
        }
    };
});
