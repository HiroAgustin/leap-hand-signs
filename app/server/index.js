(function (express, compression, bodyParser, path)
{
  'use strict';

  var app = module.exports = express();

  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/views'));

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  if (app.get('env') === 'development')
    app.use(express.static(path.join(__dirname, '/../../.tmp')));

  app.use(express.static(path.join(__dirname, '/../public')));

  app.get('/', function (req, res)
  {
    res.render('home');
  });

  app.listen(process.env.PORT || 8000);

}(require('express'), require('compression'), require('body-parser'), require('path')));
