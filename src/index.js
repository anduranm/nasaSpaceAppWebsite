var express = require('express');
var path = require('path');
var app = express();
const port = process.env.PORT || 3000;

//var mongoose = require('mongoose');
//mongoose.connect(/*no hay nada*/'', { useNewUrlParser: true, useUnifiedTopology: true })
//.then(db => console.log('Db is conencted to', db.connection.host))
//.catch(err => console.error(err, "\n No hay base de datos especificado en este momento no ha sido necesaria"));

app.use(express.json());

var folder = path.join(__dirname, 'public');
app.use(express.static(folder));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, /*'public', 'FrontPage.html'*/ '/public/index.html'));
});


/*Documentacion Sica enlace*/

app.get('/surface', (req, res) => {
  res.sendFile(__dirname + '/public/frame.html');
});


// Aquí se utiliza la ruta /sendMail en lugar de /sendEMail
app.use('/sendMail', require('./api/sendEMail'));

app.listen(port, function() {
  console.log('Servidor corriendo en puerto 8777...');
});