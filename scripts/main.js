;(function (win, doc, undefined)
{
  'use strict';

  function $ (selector)
  {
    return doc.querySelectorAll(selector);
  }

  function isFingerExtended (finger)
  {
    return finger.extended;
  }

  function getFingerName (finger)
  {
    return nameMap[finger.type];
  }

  function getExtendedFingers (hand)
  {
    return hand.fingers
      .filter(isFingerExtended)
      .map(getFingerName);
  }

  function areEqual (arr1, arr2)
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

  function clearElement (element)
  {
    while (element.firstChild)
      element.removeChild(element.firstChild);

    return element;
  }

  function showSign (container, signs)
  {
    var img, fragment = doc.createDocumentFragment();

    signs.forEach(function (sign)
    {
      img = doc.createElement('img');
      img.src = sign.image;
      fragment.appendChild(img);
    });

    clearElement(container).appendChild(fragment);
  }

  function getMatchingSigns (signs, hands)
  {
    return signs.filter(function (sign)
    {
      return hands.filter(function (fingers)
      {
        return areEqual(sign.fingers, fingers);
      }).length;
    });
  }

  var output = $('#container')[0]

    , nameMap = [
        'thumb'
      , 'index'
      , 'middle'
      , 'ring'
      , 'pinky'
      ]

    , signs = [
        {
          image: '/images/hang-loose.png'
        , fingers: [
            'thumb'
          , 'pinky'
          ]
        }
      , {
          image: '/images/heavy-metal.png'
        , fingers: [
            'index'
          , 'pinky'
          ]
        }
      , {
          image: '/images/peace.jpg'
        , fingers: [
            'index'
          , 'middle'
          ]
        }
      , {
          image: '/images/high-five.jpg'
        , fingers: [
            'thumb'
          , 'index'
          , 'middle'
          , 'ring'
          , 'pinky'
          ]
        }
      ]

    , matching = [];

  Leap.loop(function (frame)
  {
    var current = getMatchingSigns(signs, frame.hands.map(getExtendedFingers));

    if (!areEqual(matching, current))
    {
      matching = current;

      showSign(output, current);
    }
  });

}(window, document));
