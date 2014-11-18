;(function (win, doc, utils)
{
  'use strict';

  function Game ()
  {
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
  }

  Game.prototype = {

    isFingerExtended: function (finger)
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

  , showSign: function (container, signs)
    {
      var img, fragment = doc.createDocumentFragment();

      signs.forEach(function (sign)
      {
        img = doc.createElement('img');
        img.src = sign.image;
        fragment.appendChild(img);
      });

      utils.clearElement(container).appendChild(fragment);
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
  };

  win.Game = Game;

}(window, document, utils));
