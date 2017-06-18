var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('annonces.sqlite');

var NodeGeocoder = require('node-geocoder');
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'YOUR_API_KEY',
  formatter: null
};

var stmt = db.prepare("UPDATE annonces SET latitude = ?, longitude = ? WHERE id = ?");
db.each("SELECT id, localisation FROM annonces", function(err, row) {
  geocoder.geocode(row.localisation)
    .then(function(res) {
      console.log(res.latitude);
      console.log(res.longitude);
      // stmt.run(res.latitude, res.longitude, row.id);
    })
    .catch(function(err) {
      console.log(err);
    });
});






