var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    Schema = new mongoose.Schema({
      id       : String, 
      nome     : String,
      estado   : String
    }),

    Todo = mongoose.model('Todo', Schema);

mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

express()
  // https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .use(function(req, res, next){
		res.setHeader("Access-Control-allow-Origin", "*");
		res.setHeader("Access-Control-allow-Methods", "GET, POST, PUT, DELETE");
		res.setHeader("Access-Control-allow-Headers", "Content-type");
		res.setHeader("Access-Control-allow-Credentials", true);
		next();
  })

  .get('/', function(req, res){
	res.send('ola');
   })

  .get('/iluminacao', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .get('/temperatura', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .get('/alarme', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .get('/presenca', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Todo.find( function ( err, todos ){
      res.json(200, todos);
    });
  })

  .post('/iluminacao', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .post('/temperatura', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .post('/alarme', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .post('/presenca', function (req, res) {
    var todo = new Todo( req.body );
    todo.id = todo._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    todo.save(function (err) {
      res.json(200, todo);
    });
  })

  .get('/iluminacao/:nome', function(req, res){
    Todo.findOne({
      nome: req.params.nome
    })
    .exec(function(err, sensor){
      if(err){
        res.send('err has ocurred');
      }else{
        res.json(sensor.estado);
      }
    })
  })

  .get('/temperatura/:nome', function(req, res){
    Todo.findOne({
      nome: req.params.nome
    })
    .exec(function(err, sensor){
      if(err){
        res.send('err has ocurred');
      }else{
        res.json(sensor.estado);
      }
    })
  })

  .put('/iluminacao/:nome', function(req, res){
    Todo.findOneAndUpdate({
      nome: req.params.nome
    },
    {$set: {estado: req.body.estado}},
    {upsert: true},
    function(err, sensor){
      if(err){
        res.send('err has ocurred');
      }else{
        res.json(sensor);
      }
    })
  })

  .put('/temperatura/:nome', function(req, res){
    Todo.findOneAndUpdate({
      nome: req.params.nome
    },
    {$set: {estado: req.body.estado}},
    {upsert: true},
    function(err, sensor){
      if(err){
        res.send('err has ocurred');
      }else{
        res.json(sensor);
      }
    })
  })

  .delete('/iluminacao/:nome', function(req, res){
    Todo.findOneAndRemove(
      {nome: req.params.nome},
      function(err, sensor){
        if(err){
          res.send('err has ocurred');
        } else{
          res.send(sensor);
        }
      })
    })

  .delete('/temperatura/:nome', function(req, res){
    Todo.findOneAndRemove(
      {nome: req.params.nome},
      function(err, sensor){
        if(err){
          res.send('err has ocurred');
        } else{
          res.send(sensor);
        }
      })
    })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);