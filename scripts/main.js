;(function (Game, utils)
{
  'use strict';

  var game = new Game()
    , matching = []
    , output = utils.$('#container')[0];

  Leap.loop(function (frame)
  {
    var current = game.getMatchingSigns(frame.hands);

    if (!utils.areEqual(matching, current))
    {
      matching = current;

      game.showSign(output, current);
    }
  });

}(Game, utils));
