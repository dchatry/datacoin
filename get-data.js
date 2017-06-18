const leboncoin = require('leboncoin-api');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('annonces.sqlite');

db.serialize(function() {
  db.run(`CREATE TABLE IF NOT EXISTS annonces
   (
    id int NOT NULL PRIMARY KEY,
    titre varchar(255),
    prix int,
    prixm2 float,
    localisation varchar(255),
    cp varchar(5),
    ville varchar(255),
    type varchar(30),
    nb_piece int,
    surface int,
    ges varchar(1),
    classe_energie varchar(1),
    description TEXT,
    latitude float,
    longitude float
   )`);
});


for (var i = 100 - 1; i >= 0; i--) {
  var search = new leboncoin.Search()
    .setPage(i)
    .setCategory("locations"); 

  search.run().then(function (data) {
    for (var i = data.results.length - 1; i >= 0; i--) {
      var stmt = db.prepare("INSERT OR IGNORE INTO annonces VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)");
      data.results[i].getDetails().then(function (item) {
        stmt.run(item.id, item.title, item.price, item.price/item.surface, item.location, item.zip, item.city, item.category, item.rooms, item.surface, item.ges, item["classe énergie"], item.description);
      }, function (err) {
          console.error(err);
      });
    }
  }, function (err) {
      console.error(err);
  }); 
}

