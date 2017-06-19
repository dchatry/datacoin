var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../assets/db/annonces.sqlite');

var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'opendatafrance',
  httpAdapter: 'https',
  formatter: null
};

var geocoder = NodeGeocoder(options);
var stmt = db.prepare("UPDATE annonces SET latitude = ?, longitude = ? WHERE id = ?");
db.each("SELECT id, localisation FROM annonces WHERE latitude IS NULL OR longitude IS NULL", function(err, row) {
  geocoder.geocode(row.localisation)
    .then(function(res) {
      stmt.run(res[0].latitude, res[0].longitude, row.id);
    })
    .catch(function(err) {
      console.log(err);
    });
});






