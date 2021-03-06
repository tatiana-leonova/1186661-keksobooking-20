'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_COUNT_OFFER = 5;

  var URL_GET_REQUEST = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST_REQUEST = 'https://javascript.pages.academy/keksobooking';

  window.form.deactivateFields();
  window.form.disableNodes('.ad-form', 'fieldset', true);
  window.form.deactivateFilterPins(true);

  window.map.setMousedownListener(activatePage);

  window.map.setKeydownListener(activatePage);

  function activatePage() {
    window.form.activatePage();
    window.form.disableNodes('.ad-form', 'fieldset', false);
    window.backend.loadData(
        URL_GET_REQUEST,
        function (response) {
          prepareData(response);
          setupPinUpdating(response);
          window.form.deactivateFilterPins(false);
        },
        function (error) {
          window.messages.showError(
              error,
              function () {
                disableFormWhenError();
              },
              function () {
                disableFormWhenError();
              },
              function () {
                disableFormWhenError();
              }
          );
        });
  }

  function prepareData(offers) {
    var filterOffers = window.filter.offers(offers, window.filter.check, MAX_COUNT_OFFER);
    window.form.renderData(filterOffers, PIN_WIDTH, PIN_HEIGHT);
  }

  function setupPinUpdating(response) {
    var prepareDebounceData = window.debounce(function () {
      prepareData(response);
    });
    window.filter.setup(function () {
      prepareDebounceData();
    });
  }

  function disableFormWhenError() {
    window.form.deactivateFields(true);
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
