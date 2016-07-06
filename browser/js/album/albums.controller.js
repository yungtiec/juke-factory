'use strict';

juke.controller('AlbumsCtrl',function ($scope, $http, $rootScope, $log, HttpRequests) {
    HttpRequests.fetchAll()
    .then(function (albums) {
      var albumPromises = [];
      albums.forEach(function (album) {
        albumPromises.push(HttpRequests.fetchById(album.id));
      });
      return Promise.all(albumPromises)
    })
    .then(function (albums) {
      albums.forEach(function (album) {
        album.imageUrl = '/api/albums/' + album.id + '/image';
      });
      $scope.albums = albums;

    });

    $scope.$on('viewSwap', function (event, data) {
      $scope.showMe = (data.name === 'allAlbums');
    });

    $scope.viewOneAlbum = function (id) {
      $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: id });
    }

});




