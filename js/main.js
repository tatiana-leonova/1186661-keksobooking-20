'use strict';

var URL_GET_REQUEST = 'https://javascript.pages.academy/keksobooking/data';

(function () {

  window.form.deactivateFields(true);

  window.map.setMousedownListener(activatePage);

  window.map.setKeydownListener(activatePage);

  function activatePage() {
    window.backend.loadData(
        URL_GET_REQUEST,
        function (response) {
          window.form.activatePage(response);
        }
    );
  }

}());
