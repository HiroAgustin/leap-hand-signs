;(function (win)
{
  'use strict';

  function Simon (signs)
  {
    this.availableSigns = signs;
    this.currentSigns = [];
    this.duration = 2800;
  }

  Simon.prototype = {

    addSign: function ()
    {
      this.currentSigns.push(
        [this.selectSign(this.availableSigns)]
      );

      return this;
    }

  , selectSign: function (available)
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