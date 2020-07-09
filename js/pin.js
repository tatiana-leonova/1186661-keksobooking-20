'use strict';

(function () {

  // Нахождение шаблон пина
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // Генерация пина объявления
  function generateAdvertPin(offerItem, pinWidth, pinHeight) {
    var pinNode = pinTemplate.cloneNode(true);

    pinNode.style.left = (offerItem.location.x - pinWidth / 2) + 'px';
    pinNode.style.top = (offerItem.location.y - pinHeight) + 'px';

    pinNode.querySelector('img').src = offerItem.author.avatar;
    pinNode.querySelector('img').alt = offerItem.offer.title;

    pinNode.addEventListener('click', function (evt) {
      window.map.closeCard();
      pinNode.classList.add('map__pin--active');
      window.form.mapSection.insertBefore(window.card.create(offerItem), mapFiltersContainer);
      evt.preventDefault();
      document.addEventListener('keydown', window.map.onMapCardEcsKeydown);
    });

    return pinNode;
  }

  // Добавление пина объявлений
  function addAdvert(offers, pinWidth, pinHeight) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (item) {
      if (item.offer) {
        fragment.appendChild(generateAdvertPin(item, pinWidth, pinHeight));
      }
    });
    return fragment;
  }

  function clearPins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      item.remove();
    });
  }

  window.pin = {
    addAdvert: addAdvert,
    clear: clearPins
  };
}());
