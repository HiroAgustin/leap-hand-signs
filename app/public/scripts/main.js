;(function ()
{
  'use strict';

  var game = new Game()
    , pointer = new Pointer();

  pointer.on('ready', function ()
  {
    pointer.stop();
    game.start();
  });

  pointer.start();

}());
