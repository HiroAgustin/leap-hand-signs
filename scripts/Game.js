;(function (win, utils, Simon)
{
  'use strict';

  function Game ()
  {
    this.events = {};

    this.playerIndex = 0;

    this.duration = 2000;

    this.nameMap = ['thumb', 'index', 'middle', 'ring', 'pinky'];

    this.signs = [
      {
        image: '/images/hang-loose.png'
      , fingers: ['thumb', 'pinky']
      }
    // , {
    //     image: '/images/heavy-metal.png'
    //   , fingers: ['index', 'pinky']
    //   }
    , {
        image: '/images/peace.jpg'
      , fingers: ['index', 'middle']
      }
    , {
        image: '/images/high-five.jpg'
      , fingers: ['thumb', 'index', 'middle', 'ring', 'pinky']
      }
    ];

    this.simon = new Simon(this.signs);
  }

  Game.prototype = {

    start: function ()
    {
      this.simon.addSign();

      return this.render();
    }

  , render: function (delay)
    {
      var index = 0

        , duration = this.duration

        , length = this.simon.getCount()

        , renderInterval = setInterval(function ()
          {
            this.clearSign();

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

      return this;
    }

  , clearSign: function ()
    {
      return this.emit('showSigns', []);
    }

  , showSign: function (index)
    {
      return this.emit('showSigns', this.simon.getSign(index));
    }

  , on: function (evnt, fn)
    {
      var events = this.events;

      if (!(evnt in events))
        events[evnt] = [];

      events[evnt].push(fn);

      return this;
    }

  , emit: function (evnt)
    {
      var self = this
        , args = Array.prototype.slice.call(arguments, 1);

      this.events[evnt].forEach(function (fn)
      {
        fn.apply(self, args);
      });

      return this;
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

  , getMatchingSigns: function (hands)
    {
      hands = hands.map(this.getExtendedFingers.bind(this));

      return this.signs.filter(function (sign)
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
      alert("Wrong!");

      this.isPlayerTurn = false;
    }

  , validateSigns: function (signs)
    {
      if (!utils.areEqual(signs, this.simon.getSign(this.playerIndex++)))
        this.gameOver();

      else if (this.playerIndex >= this.simon.getCount())
        this.toggleTurn();

      return ;
    }

  , isPlayerTurn: false

  , toggleTurn: function ()
    {
      this.isPlayerTurn = !this.isPlayerTurn;

      console.log(this.isPlayerTurn ? 'Player Turn' : 'CPU Turn');

      if (!this.isPlayerTurn)
      {
        this.playerIndex = 0;

        this.simon.addSign();

        this.render(true);
      }

      return this;
    }

  , isGameOver: false
  };

  win.Game = Game;

}(window, utils, Simon));
