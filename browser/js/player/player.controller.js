'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // state
  $scope.playing = function () {
    return PlayerFactory.isPlaying();
  }

  $scope.currentSong = function () {
    return PlayerFactory.getCurrentSong();
  }

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.start(song);
  };

  $scope.next = PlayerFactory.next;
  $scope.prev = PlayerFactory.previous;
  $scope.progress = PlayerFactory.getProgress;
  $scope.handleProgressClick = function (evt) {
    PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
  };

});
