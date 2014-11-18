;(function (win, doc, Game, utils)
{
  'use strict';

  var game = new Game()

    , previous = []

    , output = utils.$('#js-container')[0];

  function showSigns (signs)
  {
    var img, fragment = doc.createDocumentFragment();

    signs.forEach(function (sign)
    {
      img = doc.createElement('img');
      img.src = sign.image;
      fragment.appendChild(img);
    });

    clearScreen().appendChild(fragment);
  }

  function clearScreen ()
  {
    return utils.clearElement(output);
  }

  function gameOver ()
  {
    if (win.confirm('WRONG! Want to try again?'))
      game.start(true);

    clearScreen();
  }

  game
    .on('showSigns', showSigns)
    .on('gameOver', gameOver);

  utils.on('click', '#js-start', function ()
  {
    output.classList.remove('flex-1');

    game.start();
  });

  Leap.loop(function (frame)
  {
    if (game.isPlayerTurn)
    {
      var current = game.getMatchingSigns(frame.hands);

      if (!current.length)
      {
        previous = [];
        clearScreen();
      }
      else if (!utils.areEqual(previous, current))
      {
        previous = current;

        showSigns(current);

        game.validateSigns(current);
      }
    }
  });

}(window, document, Game, utils));
