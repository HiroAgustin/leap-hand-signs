(function (express, ejs, compression, bodyParser, path)
{
  'use strict';

  var app = module.exports = express();

  app.set('view engine', 'ejs');
  app.engine('html', ejs.renderFile);
  app.set('views', path.join(__dirname, '/views'));

  app.use(compression());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(express.static(path.join(__dirname, '/../public')));

  app.get('/', function (req, res)
  {
    res.render('index.html');
  });

  app.listen(process.env.PORT || 8000);

}(require('express'), require('ejs'), require('compression'), require('body-parser'), require('path')));
