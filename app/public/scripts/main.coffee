((get) ->

  'use strict';

  game = new Game(
    element: get '#js-container'
  )

  cursor = new Cursor(
    element: get '#js-cursor'
    target: get '#js-start'
  )

  pointerLock = new PointerLock(
    element: get '#js-overlay'
  )

  cursor.on 'ready', ->
    cursor.stop()
    game.start()

  pointerLock.on 'pointerLocked', (isLocked) ->
    if isLocked then cursor.start() else cursor.stop()

)(utils.$)
