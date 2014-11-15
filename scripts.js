;(function (doc, undefined)
{
  'use strict';

  function Sign (options)
  {
    this.image = options.image;
    this.fingers = options.fingers;
  }

  var gestures = []

    , left = doc.getElementById('left')

    , right = doc.getElementById('right')

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

  var prevGestures = {
    left: null
  , right: null
  };

  var currentGestures = {
    left: null
  , right: null
  };

  Leap.loop(function (frame)
  {
    if (!frame.hands.length)
    {
      left.src = '';
      right.src = '';
    }

    frame.hands.forEach(function (hand)
    {
      var currentExtendedFingers = hand.fingers.filter(function (finger)
      {
        return finger.extended;
      });

      currentGestures[hand.type] = gestures.filter(function (gesture)
      {
        var valid = currentExtendedFingers.length === gesture.fingers.length;

        if (valid)
          currentExtendedFingers.forEach(function (finger)
          {
            valid = valid && ~gesture.fingers.indexOf(nameMap[finger.type]);
          });

        return valid;
      })[0];
    });

    if (currentGestures.left && currentGestures.left !== prevGestures.left)
    {
      left.src = currentGestures.left.image;
      prevGestures.left = currentGestures.left;
    }
    else if (!currentGestures.left)
      left.src = '';

    if (currentGestures.right && currentGestures.right !== prevGestures.right)
    {
      right.src = currentGestures.right.image;

      prevGestures.right = currentGestures.right;
    }
    else if (!currentGestures.right)
      right.src = '';
  });

}(document));
