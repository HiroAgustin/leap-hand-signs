;(function (win)
{
  'use strict';

  function Simon ()
  {
    this.currentSigns = [];

    this.availableSigns = [
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

  Simon.prototype = {

    addSign: function ()
    {
      this.currentSigns.push(
        [this.selectRandom(this.availableSigns)]
      );

      return this;
    }

  , restart: function ()
    {
      this.currentSigns = [];

      return this;
    }

  , getCount: function ()
    {
      return this.currentSigns.length;
    }

  , selectRandom: function (available)
    {
      return available[Math.floor(available.length * Math.random())];
    }

  , getSign: function (index)
    {
      return this.currentSigns[index];
    }
  };

  win.Simon = Simon;

}(window));
