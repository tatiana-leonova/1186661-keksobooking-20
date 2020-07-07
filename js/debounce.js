'use strict';

(function () {
  var DEBOUNCE_INTERVAL_IN_MILLIS = 500;

  window.debounce = function (callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL_IN_MILLIS);
    };
  };
})();
