;(function (win, doc, undefined)
{
  'use strict';

  function Sign (options)
  {
    this.image = options.image;
    this.fingers = options.fingers;
  }

  function $ (selector)
  {
    return doc.querySelectorAll(selector);
  }

  function getFingerName (finger)
  {
    return nameMap[finger.type];
  }

  function getExtendedFingers (hand)
  {
    return hand.fingers
      .filter(function (finger)
      {
        return finger.extended;
      })
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

  var gestures = []

    , left = $('#left')[0]

    , right = $('#right')[0]

    , nameMap = [
        'thumb'
      , 'indexFinger'
      , 'middleFinger'
      , 'ringFinger'
      , 'pinky'
      ]

    , hangLoose = new Sign({
        image: '/images/hang-loose.png'
      , fingers: [
          'thumb'
        , 'pinky'
        ]
      })

    , heavyMetal = new Sign({
        image: '/images/heavy-metal.png'
      , fingers: [
          'indexFinger'
        , 'pinky'
        ]
      })

    , peace = new Sign({
        image: '/images/peace.jpg'
      , fingers: [
          'indexFinger'
        , 'middleFinger'
        ]
      });

  gestures.push(
    hangLoose
  , heavyMetal
  , peace
  );

  var output = $('#output')[0]
    , extendedFingers = []
    , changed = false;

  Leap.loop(function (frame)
  {
    var current = frame.hands.map(getExtendedFingers);

    changed = !areEqual(current, extendedFingers);

    if (changed)
      extendedFingers = current;
  });

  function render ()
  {
    if (changed)
      output.innerHTML = JSON.stringify(extendedFingers);

    win.requestAnimationFrame(render);
  }

  win.requestAnimationFrame(render);

}(window, document));
