;(function ()
{
  'use strict';

  function Simon (signs)
  {
    this.availableSigns = signs;
  }

  Simon.prototype = {

    start: function ()
    {
      this.duration = 2800;

      this.currentSigns = [];

      return this
        .addSign()
        .render();
    }

  , addSign: function ()
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

  // , render: function ()
  //   {
  //     var index = 0
  //
  //       , renderInterval = setInterval(function ()
  //         {
  //           clearElement(output);
  //
  //           if (index >= this.currentSigns.length)
  //             return clearInterval(renderInterval);
  //
  //           setTimeout(function ()
  //           {
  //             this.renderSign(index++);
  //
  //           }.bind(this), 800);
  //
  //         }.bind(this), this.duration);
  //
  //     clearElement(output);
  //
  //     this.renderSign(index++);
  //   }
  };

}());
