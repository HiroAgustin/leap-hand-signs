;(function (win, doc, Game, utils)
{
  'use strict';

  var game = new Game()

    , previous = []

    , output = utils.$('#js-container')[0]

    , cursor = utils.$('#js-cursor')[0]

    , start = utils.$('#js-start')[0];

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

  var hand, position, x, y, element;

  Leap.loop(function (frame)
  {
    if (game.hasStarted)
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
    }
    else if (frame.hands.length)
    {
      hand = frame.hands[0];
      position = hand.screenPosition();
      x = parseFloat(position[0].toFixed(10));
      y = parseFloat(position[1].toFixed(10)) + 400;

      cursor.style = 'transform: translateX(' + x + 'px) translateY(' + y + 'px);';
      cursor.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px)';

      element = doc.elementFromPoint(x, y);

      if (element === start && hand.grabStrength === 1)
        start.click();
    }
  }).use('screenPosition', {scale: 0.5});

}(window, document, Game, utils));
