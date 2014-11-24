;(function (win, doc)
{
  'use strict';

  function Pointer ()
  {
    this.events = {};

    this.element = utils.$('#js-cursor')[0];
    this.target = utils.$('#js-start')[0];

    this.controller = new Leap.Controller().use('screenPosition', {scale: 0.5});
  }

  Pointer.prototype = {

    start: function ()
    {
      var element, hands, position, x, y;

      this.controller.connect().loop(function (frame)
      {
        hands = frame.hands;

        if (!hands.length)
          return this.hide();

        if (!this.isVisible())
          this.show();

        position = hands[0].screenPosition();

        x = parseFloat(position[0].toFixed(3));
        y = parseFloat(position[1].toFixed(3)) + 400;

        if (x || y)
          this.transform(x, y);

        element = doc.elementFromPoint(x, y);

        if (element === this.target && hands[0].grabStrength === 1)
          this.emit('ready');

      }.bind(this));
    }

  , transform: function (x, y)
    {
      var style = this.element.style;

      style.webkitTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0)';
      style.MozTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0)';
      style.msTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0)';
      style.OTransform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0)';
      style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px) translateZ(0)';

      return this;
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

  , isVisible: function ()
    {
      return this.element.style.display !== 'none';
    }

  , display: function (display)
    {
      this.element.style.display = display;

      return this;
    }

  , show: function ()
    {
      return this.display('block');
    }

  , hide: function ()
    {
      return this.display('none');
    }

  , stop: function ()
    {
      this.controller.disconnect();

      return this.hide();
    }
  };

  win.Pointer = Pointer;

}(window, document));
