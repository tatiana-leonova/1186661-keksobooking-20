'use strict';

(function () {

  // Нахождение шаблон пина
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Генерация пина объявления
  function generateAdvertPin(offerItem, pinWidth, pinHeight) {
    var elementPin = pinTemplate.cloneNode(true);

    elementPin.style.left = (offerItem.location.x - pinWidth / 2) + 'px';
    elementPin.style.top = (offerItem.location.y - pinHeight) + 'px';

    elementPin.querySelector('img').src = offerItem.author.avatar;
    elementPin.querySelector('img').alt = offerItem.offer.title;

    elementPin.addEventListener('click', function (evt) {
      window.map.closeCard();
      elementPin.classList.add('map__pin--active');
      window.form.mapSection.insertBefore(window.card.create(offerItem), mapFiltersContainer);
      evt.preventDefault();
      document.addEventListener('keydown', window.map.onMapCardEcsKeydown);
    });

    return elementPin;
  }

  // Добавление пина объявлений
  function addAdvert(generatedOffers, pinWidth, pinHeight) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < generatedOffers.length; i++) {
      if (generatedOffers[i].offer) {
        fragment.appendChild(generateAdvertPin(generatedOffers[i], pinWidth, pinHeight));
      }
    }
    return fragment;
  }

  function clearPins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  }

  window.pin = {
    addAdvert: addAdvert,
    clear: clearPins
  };
}());
