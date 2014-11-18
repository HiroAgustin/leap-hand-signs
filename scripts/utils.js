;(function (win, doc)
{
  'use strict';

  var utils = {

    $: function (selector)
    {
      return doc.querySelectorAll(selector);
    }

  , areEqual: function (arr1, arr2)
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

  , clearElement: function (element)
    {
      while (element.firstChild)
        element.removeChild(element.firstChild);

      return element;
    }
  };

  win.utils = utils;

}(window, document));
