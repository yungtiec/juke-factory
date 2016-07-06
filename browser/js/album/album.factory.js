juke.factory('StatsFactory', function ($q) {
  var statsObj = {};
  statsObj.totalTime = function (album) {
    var audio = document.createElement('audio');
    return $q(function (resolve, reject) {
      var sum = 0;
      var n = 0;
      function resolveOrRecur () {
        if (n >= album.songs.length) resolve(sum);
        else audio.src = album.songs[n++].audioUrl;
      }
      audio.addEventListener('loadedmetadata', function () {
        sum += audio.duration;
        resolveOrRecur();
      });
      resolveOrRecur();
    });
  };
  statsObj.toHHMMSS = function (sec) {
    sec = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = sec - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  };
  return statsObj;
});

juke.factory('HttpRequests', function ($http) {
  var obj = {};
  obj.fetchAll = function () {
    return $http.get('/api/albums/')
    .then(function (res) { return res.data; });
  };
  obj.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(function (res) { return res.data; });
  };
  return obj;
});
