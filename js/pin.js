'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // Нахождение шаблон пина
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Генерация пина объявления
  function generateAdvertPin(offerItem) {
    var elementPin = pinTemplate.cloneNode(true);

    elementPin.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
    elementPin.style.top = (offerItem.location.y - PIN_HEIGHT) + 'px';

    elementPin.querySelector('img').src = offerItem.author.avatar;
    elementPin.querySelector('img').alt = offerItem.offer.title;

    elementPin.addEventListener('click', function (evt) {
      closeCard();
      elementPin.classList.add('map__pin--active');
      mapSection.insertBefore(createCard(offerItem), mapFiltersContainer);
      evt.preventDefault();
      document.addEventListener('keydown', onMapCardEcsKeydown);
    });

    return elementPin;
  }

  // Добавление пина объявлений
  function addAdvert(оffers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < оffers.length; i++) {
      if (оffers[i].offer) {
        fragment.appendChild(generateAdvertPin(оffers[i]));
      }
    }
    return fragment;
  }

  window.pin = {
    generateAdvertPin: generateAdvertPin
  };
}());
