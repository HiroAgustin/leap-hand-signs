;(function (win, doc, utils, Simon)
{
  'use strict';

  function Game ()
  {
    this.container = utils.$('#js-container')[0];

    this.nameMap = ['thumb', 'index', 'middle', 'ring', 'pinky'];

    this.simon = new Simon();

    this.controller = new Leap.Controller();
  }

  Game.prototype = {

    start: function (delay)
    {
      this.playerIndex = 0;
      this.isPlayerTurn = false;
      this.isGameOver = false;

      this.duration = 2000;

      this.simon.restart().addSign();

      return this.render(delay);
    }

  , stopListening: function ()
    {
      this.controller.disconnect();

      return this;
    }

  , listen: function ()
    {
      var previous, current;

      this.controller.connect().loop(function (frame)
      {
        current = this.getMatchingSign(frame.hands)[0];

        if (!current)
        {
          previous = {};
          this.clearScreen();
        }
        else if (previous !== current)
        {
          previous = current;

          this.showSign(current);

          this.evaluateSign(current);
        }

      }.bind(this));

      return this;
    }

  , render: function (delay)
    {
      var index = 0

        , duration = this.duration

        , length = this.simon.getCount()

        , renderInterval = setInterval(function ()
          {
            this.clearScreen();

            if (index >= length)
            {
              clearInterval(renderInterval);

              this.toggleTurn();
            }
            else
            {
              setTimeout(function ()
              {
                this.showSign(index++);

              }.bind(this), duration / 4);
            }

          }.bind(this), duration);

      if (!delay)
        this.showSign(index++);

      if (duration > 400)
        this.duration -= 200;

      return this;
    }

  , clearScreen: function ()
    {
      return utils.clearElement(this.container);
    }

  , showSign: function (sign)
    {
      var img = doc.createElement('img');

      img.src = (typeof sign === 'number' ? this.simon.getSign(sign) : sign).image;

      this.clearScreen().appendChild(img);
    }

  , isFingerExtended: function (finger)
    {
      return finger.extended;
    }

  , getFingerName: function (finger)
    {
      return this.nameMap[finger.type];
    }

  , getExtendedFingers: function (hand)
    {
      return hand.fingers
        .filter(this.isFingerExtended)
        .map(this.getFingerName.bind(this));
    }

  , getMatchingSign: function (hands)
    {
      hands = hands.map(this.getExtendedFingers.bind(this));

      return this.simon.availableSigns
        .filter(function (sign)
        {
          return hands
            .filter(function (fingers)
            {
              return utils.areEqual(sign.fingers, fingers);
            }).length;
        });
    }

  , gameOver: function ()
    {
      if (win.confirm('WRONG! Want to try again?'))
        this.start(true);

      this.clearScreen();
    }

  , evaluateSign: function (sign)
    {
      if (sign !== this.simon.getSign(this.playerIndex++))
        this.gameOver();

      else if (this.playerIndex >= this.simon.getCount())
        this.toggleTurn();

      return this;
    }

  , toggleTurn: function ()
    {
      this.isPlayerTurn = !this.isPlayerTurn;

      console.log(this.isPlayerTurn ? 'Player Turn' : 'CPU Turn');

      if (this.isPlayerTurn)
      {
        this.listen();
      }
      else
      {
        this.stopListening();

        this.playerIndex = 0;

        this.simon.addSign();

        this.render(true);
      }

      return this;
    }
  };

  win.Game = Game;

}(window, document, utils, Simon));
