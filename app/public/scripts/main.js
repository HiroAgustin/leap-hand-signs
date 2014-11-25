;(function ()
{
  'use strict';

  var game = new Game()

    , pointer = new Pointer({
        element: utils.$('#js-cursor')
      , target: utils.$('#js-start')
      });

  pointer.on('ready', function ()
  {
    pointer.stop();
    game.start();
  });

  pointer.start();

}());
