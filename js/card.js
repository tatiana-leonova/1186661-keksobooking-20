'use strict';

(function () {

  var IMG_WIDTH = 45;
  var IMG_HEIGHT = 40;

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');

  // Функция создание карточки объявления
  function createCard(offerItem) {
    var cardNode = templateCard.cloneNode(true);
    var cardFeatures = cardNode.querySelector('.popup__features');
    var cardPhotos = cardNode.querySelector('.popup__photos');
    var popupClose = cardNode.querySelector('.popup__close');

    if (offerItem.offer.features.length) {
      renderFeatures(cardFeatures, offerItem.offer.features);
    } else {
      cardFeatures.classList.add('visually-hidden');
    }

    if (offerItem.offer.photos.length) {
      renderPhotos(cardPhotos, offerItem);
    } else {
      cardPhotos.classList.add('visually-hidden');
    }

    cardNode.querySelector('.popup__title').textContent = offerItem.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = offerItem.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = offerItem.offer.price + ' ₽/ночь';
    cardNode.querySelector('.popup__type').textContent = window.form.offerTypes[offerItem.offer.type].translate;
    cardNode.querySelector('.popup__text--capacity').textContent = renderRooms(offerItem.offer.rooms) + ' для ' + renderGuests(offerItem.offer.guests);
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    cardNode.querySelector('.popup__description').textContent = offerItem.offer.description;
    cardNode.querySelector('.popup__avatar').src = offerItem.author.avatar;

    popupClose.addEventListener('click', onCloseClickListener);

    return cardNode;
  }

  function onCloseClickListener() {
    window.map.closeCard();
  }

  // Функция отрисовки преимуществ
  function renderFeatures(container, features) {
    container.innerHTML = '';
    features.forEach(function (item) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature', 'popup__feature--' + item);
      container.appendChild(feature);
    });
  }

  // Функция отрисовки фото квартиры в карточке
  function renderPhotos(container, offerItem) {
    container.innerHTML = '';

    offerItem.offer.photos.forEach(function (item) {
      var photo = document.createElement('img');
      photo.src = item;
      photo.width = IMG_WIDTH;
      photo.height = IMG_HEIGHT;
      photo.alt = 'Фото объекта ' + offerItem.offer.title;
      photo.classList.add('popup__photo');
      container.appendChild(photo);
    });
  }

  // Функция для подстановки верного окончания для "комнат"
  function renderRooms(room) {
    var result = '';
    switch (room) {
      case 1:
        result = room + ' комната';
        break;

      case 100:
        result = room + ' комнат';
        break;

      default:
        result = room + ' комнаты';
    }
    return result;
  }

  // Функция для подстановки верного окончания для "гостей"
  function renderGuests(guest) {
    var result = '';
    switch (guest) {
      case 1:
        result = guest + ' гостя';
        break;

      default:
        result = guest + ' гостей';
    }
    return result;
  }

  window.card = {
    create: createCard
  };

}());
