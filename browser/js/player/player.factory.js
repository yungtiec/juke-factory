'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var obj = {};
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songArr = null;

  obj.start = function (song, songList) {
    obj.pause();
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
    playing = true;
    currentSong = song;
    if (songList) songArr = songList;
  }

  obj.pause = function () {
    audio.pause();
    playing = false;
  }

  obj.resume = function () {
    audio.play();
    playing = true;
  }

  obj.isPlaying = function () {
    return playing;
  }

  obj.getCurrentSong = function () {
    return currentSong;
  }

  obj.next = function () {
    var newIndex = songArr.indexOf(currentSong) + 1;
    if (newIndex === songArr.length) newIndex = 0;
    var song = songArr[newIndex];
    obj.start(song);
  }

  obj.previous = function () {
    var newIndex = songArr.indexOf(currentSong) - 1;
    if (newIndex === -1) newIndex = songArr.length-1;
    var song = songArr[newIndex];
    obj.start(song);
  }

  var progress;
  obj.getProgress = function () {
    if (!currentSong) return 0;
    return progress;
  };

  audio.addEventListener('timeupdate', function() {
    progress = 100 * audio.currentTime / audio.duration;
    $rootScope.$digest();
  });

  obj.seek = function (decimal) {
    audio.currentTime = audio.duration * decimal;
  }

  return obj;
});
