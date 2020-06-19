'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var LEFT_KEY_MOUSE_CODE = 1;

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (event.which === LEFT_KEY_MOUSE_CODE) { // нажатие мышки только на левую кнопку
      activatePage();
    }
    evt.preventDefault();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) { // нажатие клавиши enter
      activatePage();
    }
  });

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

})();
