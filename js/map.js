'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var LEFT_KEY_MOUSE_CODE = 1;

  var mapPinMain = document.querySelector('.map__pin--main');

  function setMousedownListener(callback) {
    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.which === LEFT_KEY_MOUSE_CODE) { // нажатие мышки только на левую кнопку
        callback();
      }
      evt.preventDefault();
    });
  }

  function setKeydownListener(callback) {
    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        callback();
      }
    });
  }

  // Функция закрытия карточки
  function closeCard() {
    var mapCard = document.querySelector('.map__card');
    var mapPinActive = document.querySelector('.map__pin--active');

    if (mapCard) {
      mapCard.remove();
      mapPinActive.classList.remove('map__pin--active');
    }

    document.removeEventListener('keydown', onMapCardEcsKeydown);
  }

  function onMapCardEcsKeydown(evt) {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      closeCard();
    }
  }

  function setMainPinPosition(positionX, positionY) {
    mapPinMain.style.left = Math.round(positionX) + 'px';
    mapPinMain.style.top = Math.round(positionY) + 'px';
  }

  window.map = {
    pinMain: mapPinMain,
    setMousedownListener: setMousedownListener,
    setKeydownListener: setKeydownListener,
    closeCard: closeCard,
    setMainPinPosition: setMainPinPosition,
    onMapCardEcsKeydown: onMapCardEcsKeydown,
    ESCAPE_KEY: ESCAPE_KEY
  };

})();
