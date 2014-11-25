;(function (utils)
{
  'use strict';

  var game = new Game({
        element: utils.$('#js-container')
      })

    , cursor = new Cursor({
        element: utils.$('#js-cursor')
      , target: utils.$('#js-start')
      })

    , pointerLock = new PointerLock({
        element: utils.$('#js-overlay')
      });

  cursor.on('ready', function ()
  {
    cursor.stop();
    game.start();
  });

  pointerLock.on('pointerLocked', function (isLocked)
  {
    if (isLocked)
      cursor.start();

    else
      cursor.stop();
  });

}(utils));
