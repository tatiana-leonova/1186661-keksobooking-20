'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var URL_GET_REQUEST = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST_REQUEST = 'https://javascript.pages.academy/keksobooking';

  window.form.deactivateFields();
  window.form.disableElements('.ad-form', 'fieldset', true);
  window.form.deactivateFilerPins(true);

  window.map.setMousedownListener(activatePage);

  window.map.setKeydownListener(activatePage);

  function activatePage() {
    window.form.activatePage();
    window.form.disableElements('.ad-form', 'fieldset', false);
    window.backend.loadData(
        URL_GET_REQUEST,
        function (response) {
          window.form.renderData(response, PIN_WIDTH, PIN_HEIGHT);
          window.form.deactivateFilerPins(false);
        },
        function (error) {
          window.messages.showError(
              error,
              function () {
                window.form.deactivateFields();
              },
              function () {
                window.form.deactivateFields();
              },
              function () {
                window.form.deactivateFields();
              }
          );
        });
  }

  window.form.advert.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(
        URL_POST_REQUEST,
        function () {
          window.messages.showSuccess();
          window.form.disable();
        },
        function (error) {
          window.messages.showError(error);
        },
        new FormData(window.form.advert)
    );
  });

}());
