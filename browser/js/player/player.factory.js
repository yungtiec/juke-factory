'use strict';

juke.factory('PlayerFactory', function(){
  var obj = {};
  var audio = document.createElement('audio');
  var playing = false;
  var currentSong = null;
  var songArr = null;

  obj.start = function (song, songList) {
    this.pause();
    audio.src = song.audioUrl;
    audio.load();
    audio.play();
    playing = true;
    currentSong = song;
    songArr = songList;
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
    this.start(song);
  }

  obj.previous = function () {
    var newIndex = songArr.indexOf(currentSong) - 1;
    if (newIndex === -1) newIndex = songArr.length-1;
    var song = songArr[newIndex];
    this.start(song);
  }

  obj.getProgress = function () {
    if (!currentSong) return 0;
    return audio.currentTime / audio.duration;
  }

  return obj;
});
