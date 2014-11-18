;(function (doc, Game, utils)
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

    utils.clearElement(output).appendChild(fragment);
  }

  game.on('showSigns', showSigns);

  utils.on('click', '#js-start', game.start.bind(game));

  Leap.loop(function (frame)
  {
    if (game.isPlayerTurn)
    {
      var current = game.getMatchingSigns(frame.hands);

      if (!current.length)
        return showSigns(current);

      if (!utils.areEqual(previous, current))
      {
        previous = current;

        showSigns(current);

        game.validateSigns(current);
      }
    }
    else
      previous = [];
  });

}(document, Game, utils));
