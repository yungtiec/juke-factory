'use strict';

juke.controller('ArtistCtrl',function ($scope, $http, $rootScope, $log, StatsFactory, ArtistFactory) {

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'oneArtist');
    if ($scope.showMe) {
      ArtistFactory.fetchById(data.id)
      .then(function (artist) {
        $scope.artist = artist;
        return ArtistFactory.fetchAllSongs(artist.id);
      })
      .then(function (songs) {
        songs.forEach(function (song, i) {
          song.audioUrl = '/api/songs/' + song.id + '/audio';
          song.artistIndex = i;
        });
        $scope.artist.songs = songs;
        return ArtistFactory.fetchAllAlbums($scope.artist.id)
      })
      .then(function (albums) {
        albums.forEach(function (album) {
          album.imageUrl = '/api/albums/' + album.id + '/image';
        });
        $scope.artist.albums = albums;
      })
      .catch($log.error);
    }
  });

});
