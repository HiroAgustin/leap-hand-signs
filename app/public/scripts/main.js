;(function ()
{
  'use strict';

  var game = new Game()

    , cursor = new Cursor({
        element: utils.$('#js-cursor')
      , target: utils.$('#js-start')
      });

  cursor.on('ready', function ()
  {
    cursor.stop();
    game.start();
  });

  cursor.start();

}());
