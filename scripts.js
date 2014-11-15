;(function (doc, undefined)
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

  function getExtendedFingers (hand)
  {
    return hand.fingers
      .filter(function (finger)
      {
        return finger.extended;
      })
      .map(function (finger)
      {
        return nameMap[finger.type];
      });
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
      })

    , thumbsUp = new Sign({
        image: '/images/thumbs-up.jpg'
      , fingers: [
          'thumb'
        ]
      });

  gestures.push(
    hangLoose
  , heavyMetal
  , peace
  , thumbsUp
  );

  var output = $('#output')[0];

  Leap.loop(function (frame)
  {
    var extendedFingers = frame.hands.map(getExtendedFingers);

    if (extendedFingers.length)
      output.innerHTML = JSON.stringify(extendedFingers);

    else if (output.innerHTML)
      output.innerHTML = '';
  });

}(document));
