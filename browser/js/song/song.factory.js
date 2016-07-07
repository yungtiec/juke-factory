juke.factory('SongFactory', function($q) {
  var obj = {};

  obj.addAlbumInfo = function (song, i) {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
    song.albumIndex = i;
    return song;
  }

  obj.addArtistInfo = function (song, i) {
    song.audioUrl = '/api/songs/' + song.id + '/audio';
    song.artistIndex = i;
    return song;
  }

  return obj;
})