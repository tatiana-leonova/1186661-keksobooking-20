'use strict';

(function () {
  var DEBOUNCE_INTERVAL_IN_MILLIS = 500;
  var lastTimeout = null;

  function executeWithDebounce(callback) {
    var parameters = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      callback.apply(null, parameters);
    }, DEBOUNCE_INTERVAL_IN_MILLIS);

  }

  window.debounce = {
    execute: executeWithDebounce
  };
})();
