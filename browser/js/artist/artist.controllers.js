'use strict';

juke.controller('ArtistCtrl',function ($scope, $http, $rootScope, $log, StatsFactory, ArtistFactory, PlayerFactory, SongFactory) {

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'oneArtist');
    if ($scope.showMe) {
      ArtistFactory.fetchById(data.id)
      .then(function (artist) {
        $scope.artist = artist;
        return ArtistFactory.fetchAllSongs(artist.id);
      })
      .then(function (songs) {
        songs.forEach(SongFactory.addArtistInfo);
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

  $scope.playing = function () {
    return PlayerFactory.isPlaying();
  }

  $scope.currentSong = function () {
    return PlayerFactory.getCurrentSong();
  }

  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else PlayerFactory.start(song, $scope.artist.songs);
  };

  $scope.playing = function () {
    return PlayerFactory.isPlaying();
  };

  $scope.currentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.viewOneAlbum = function (id) {
    $rootScope.$broadcast('viewSwap', { name: 'oneAlbum', id: id });
  }


});
