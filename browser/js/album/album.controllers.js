'use strict';

juke.controller('AlbumCtrl',function ($scope, $http, $rootScope, $log, StatsFactory, HttpRequests, PlayerFactory, SongFactory) {

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === PlayerFactory.getCurrentSong()) {
      PlayerFactory.pause();
    } else PlayerFactory.start(song, $scope.album.songs);
  };

  $scope.playing = function () {
    return PlayerFactory.isPlaying();
  };

  $scope.currentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.$on('viewSwap', function (event, data) {
    $scope.showMe = (data.name === 'oneAlbum');
    if ($scope.showMe) {
      HttpRequests.fetchById(data.id)
      .then(function (album) {
        album.imageUrl = '/api/albums/' + album.id + '/image';
        album.songs.forEach(SongFactory.addAlbumInfo);
        $scope.album = album;
        StatsFactory.totalTime(album)
        .then(function (albumDuration) {
            $scope.fullDuration = StatsFactory.toHHMMSS(albumDuration);
        });

      })
      .catch($log.error);
    }
  });

});




