;(function (win, doc, utils, Simon)
{
  'use strict';

  function Game ()
  {
    this.events = {};

    this.nameMap = [
      'thumb'
    , 'index'
    , 'middle'
    , 'ring'
    , 'pinky'
    ];

    this.signs = [
      {
        image: '/images/hang-loose.png'
      , fingers: ['thumb', 'pinky']
      }
    , {
        image: '/images/heavy-metal.png'
      , fingers: ['index', 'pinky']
      }
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

  , render: function ()
    {
      this.emit('showSigns', this.simon.currentSigns[0]);
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

  , isPlayersTurn: function ()
    {
      return false;
    }
  };

  win.Game = Game;

}(window, document, utils, Simon));
