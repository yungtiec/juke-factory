'use strict';

juke.controller('ArtistsCtrl',function ($scope, $http, $rootScope, $log, ArtistFactory) {
    ArtistFactory.fetchAll()
    .then(function (artists) {
      var artistPromises = [];
      artists.forEach(function (artist) {
        artistPromises.push(ArtistFactory.fetchById(artist.id));
      });
      return Promise.all(artistPromises);
    })
    .then(function (artists) {
      artists.forEach(function (artist) {
        artist.imageUrl = '/api/artists/' + artist.id + '/image';
      });
      $scope.artists = artists;

    });

    $scope.$on('viewSwap', function (event, data) {
      $scope.showMe = (data.name === 'allArtists');
    });

    $scope.viewOneArtist = function (id) {
      $rootScope.$broadcast('viewSwap', { name: 'oneArtist', id: id });
    };

});




