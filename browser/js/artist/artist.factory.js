juke.factory('ArtistFactory', function ($http) {
  var obj = {};
  obj.fetchAll = function () {
    return $http.get('/api/artists/')
    .then(function (res) { return res.data; });
  };
  obj.fetchById = function (id) {
    return $http.get('/api/artists/' + id)
    .then(function (res) { return res.data; });
  };
  obj.fetchAllSongs = function (id) {
    return $http.get('/api/artists/' + id + '/songs')
    .then(function (res) { return res.data; });
  };
  obj.fetchAllAlbums = function (id) {
    return $http.get('/api/artists/' + id + '/albums')
    .then(function (res) { return res.data; });
  };
  return obj;
});
