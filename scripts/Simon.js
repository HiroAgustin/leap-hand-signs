;(function (win)
{
  'use strict';

  function Simon (signs)
  {
    this.availableSigns = signs;
    this.currentSigns = [];
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
