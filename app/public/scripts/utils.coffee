((win, doc) ->

  'use strict'

  win.utils = {

    $: (selector, context) ->
      # if selector starts with hashtag, 0 is falsy
      if !selector.indexOf('#')
        return doc.getElementById(selector.substring(1))

      (context || doc).querySelectorAll(selector)

  	forEach: (collection, callback) ->
      Array.prototype.forEach.call(collection, callback)

  	on: (evnt, selector, callback) ->
      elements = if typeof selector is 'string' then @$(selector) else if selector.length then selector else [selector]

      @forEach(elements, (element) ->
        element.addEventListener(evnt, callback)
      )

  	listen: (selector, events) ->
      for evnt of events
        @on(evnt, selector, events[evnt])

    clearElement: (element) ->
      while (element.firstChild)
        element.removeChild(element.firstChild)

      return element

    areEqual: (arr1, arr2) ->
      result = arr1.length is arr2.length

      if result
        arr1.every((item, index) ->
          if (item isnt arr2[index])
            result = false

          return result
        )

      return result
  }

)(window, document)
