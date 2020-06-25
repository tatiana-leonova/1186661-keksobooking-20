'use strict';

var URL_GET_REQUEST = 'https://javascript.pages.academy/keksobooking/data';

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
        }
    );
  }

}());
