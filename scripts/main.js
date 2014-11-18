;(function (doc, Game, utils)
{
  'use strict';

  var game = new Game()

    , matching = []

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

  utils.$('#js-start')[0].addEventListener('click', game.start.bind(game));

  Leap.loop(function (frame)
  {
    if (game.isPlayersTurn())
    {
      var current = game.getMatchingSigns(frame.hands);

      if (!utils.areEqual(matching, current))
      {
        matching = current;

        showSigns(output, current);
      }
    }
  });

  game.on('showSigns', showSigns);

}(document, Game, utils));
