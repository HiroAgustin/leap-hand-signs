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
      arr1.forEach(function (item, index)
      {
        if (item !== arr2[index])
          result = false;
      });

    return result;
  }

  function clearElement (element)
  {
    while (element.firstChild)
      element.removeChild(element.firstChild);

    return element;
  }

  function appendGestures (container, gestures)
  {
    var img, fragment = doc.createDocumentFragment();

    gestures.forEach(function (gesture)
    {
      img = doc.createElement('img');
      img.src = gesture.image;
      fragment.appendChild(img);
    });

    clearElement(container).appendChild(fragment);
  }

  function getMatchingGestures (gestures, hands)
  {
    return gestures.filter(function (gesture)
    {
      return hands.filter(function (fingers)
      {
        return areEqual(gesture.fingers, fingers);
      }).length;
    });
  }

  var output = $('body')[0]

    , nameMap = [
        'thumb'
      , 'index'
      , 'middle'
      , 'ring'
      , 'pinky'
      ]

    , gestures = [
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
    var current = getMatchingGestures(gestures, frame.hands.map(getExtendedFingers));

    if (!areEqual(matching, current))
    {
      matching = current;

      appendGestures(output, current);
    }
  });

}(window, document));
