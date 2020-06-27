'use strict';

var URL_GET_REQUEST = 'https://javascript.pages.academy/keksobooking/data';
var URL_POST_REQUEST = 'https://javascript.pages.academy/keksobooking';

(function () {

  window.form.deactivateFields(true);
  window.form.deactivateFilerPins(true);

  window.map.setMousedownListener(activatePage);

  window.map.setKeydownListener(activatePage);

  function activatePage() {
    window.form.activatePage();
    window.backend.loadData(
        URL_GET_REQUEST,
        function (response) {
          window.form.renderData(response);
          window.form.deactivateFilerPins(false);
        },
        function () {
        });
  }

  window.form.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.uploadData(
        URL_POST_REQUEST,
        function () {
          window.form.showSuccessMessage();
        },
        function (error) {
          window.form.showErrorMessage(error);
        },
        new FormData(window.form.adForm)
    );
    window.form.deactivateFields(true);
    window.form.deactivateFilerPins(true);
    window.pin.clear();
    window.form.clearForm('.ad-form');
  });

}());
