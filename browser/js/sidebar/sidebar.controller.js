'use strict';

juke.controller('SidebarCtrl',function ($scope, $http, $rootScope) {

  $scope.viewAlbums = function() {
    $rootScope.$broadcast('viewSwap', { name: 'allAlbums' });
  }

});