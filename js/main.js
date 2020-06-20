'use strict';

(function () {
// Генерация массива офферов
  var generatedOffers = window.data.generatedOffers();

  window.form.deactivateFields(true);

  window.map.setMousedownListener(activatePage);

  window.map.setKeydownListener(activatePage);

  function activatePage() {
    window.form.activatePage(generatedOffers);
  }

}());
