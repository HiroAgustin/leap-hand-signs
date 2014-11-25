;(function (win, doc)
{
  'use strict';

  var utils = {

    $: function $ (selector, context)
    {
      // if selector starts with hashtag, 0 is falsy
      if (!selector.indexOf('#'))
        return doc.getElementById(selector.substring(1));

      return (context || doc).querySelectorAll(selector);
    }

  ,	forEach: function forEach (collection, callback)
    {
      return Array.prototype.forEach.call(collection, callback);
    }

  ,	on: function on (evnt, selector, callback)
    {
      var elements = typeof selector === 'string' ? this.$(selector) : selector.length ? selector : [selector];

      return this.forEach(elements, function (element)
      {
        element.addEventListener(evnt, callback);
      });
    }

  ,	listen: function listen (selector, events)
    {
      for (var evnt in events)
        this.on(evnt, selector, events[evnt]);
    }

  , clearElement: function clearElement (element)
    {
      while (element.firstChild)
        element.removeChild(element.firstChild);

      return element;
    }

  , areEqual: function areEqual (arr1, arr2)
    {
      var result = arr1.length === arr2.length;

      if (result)
        arr1.every(function (item, index)
        {
          if (item !== arr2[index])
            result = false;

          return result;
        });

      return result;
    }
    // EXTEND
  };

  win.utils = utils;

}(window, document));
