;(function (win, doc)
{
  'use strict';

  function PointerLock (options)
  {
    this.element = options.element;
    this.events = {};

    this.init();
  }

  PointerLock.prototype = {

    init: function ()
    {
      var overlay = this.element;

      overlay.requestPointerLock = overlay.requestPointerLock || overlay.mozRequestPointerLock || overlay.webkitRequestPointerLock;

      utils.listen(doc, {
        pointerlockchange: this.pointerLocked.bind(this)
      , mozpointerlockchange: this.pointerLocked.bind(this)
      , webkitpointerlockchange: this.pointerLocked.bind(this)
      });

      utils.on('click', overlay, overlay.requestPointerLock);

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

  , display: function (display)
    {
      this.element.style.display = display;

      return this;
    }

  , show: function ()
    {
      return this.display('');
    }

  , hide: function ()
    {
      return this.display('none');
    }

  , isLocked: function ()
    {
      return this.getPointerLockElement() === this.element;
    }

  , pointerLocked: function ()
    {
      if (this.isLocked())
        this.hide();
      else
        this.show();

      return this.emit('pointerLocked', this.isLocked());
    }

  , getPointerLockElement: function ()
    {
      return doc.pointerLockElement || doc.mozPointerLockElement || doc.webkitPointerLockElement;
    }
  };

  win.PointerLock = PointerLock;

}(window, document));
