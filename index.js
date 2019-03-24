var restify = require('restify');
var errors = require('restify-errors');

const googleMapsClient = require('@google/maps').createClient({
    key: '',
    Promise: Promise
  });

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'db'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/all', function (req, res, next) {
    knex('places')
    .then(function(dados){
      res.send(dados);
    },next );
    return next();
  });

  server.get('/geogoogle', (req, res, next) => {
    googleMapsClient.geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise()
    .then((response) => {
        res.send(response.json.results);
    })
    .catch((err) => {
        //console.log(err);
        res.send(err);
    });
  });