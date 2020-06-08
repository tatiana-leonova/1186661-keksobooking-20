
'use strict';

var AVATAR_IMG = 'img/avatars/user0';
var PHOTO_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
var PNG_FORMAT = '.png';
var JPG_FORMAT = '.jpg';
var OFFER_TITLES = [
  'Шикарная квартира в центре',
  'Уютное гнездышко для молодоженов',
  'Квартира-студия недалеко от центра',
  'Элитная хрущевка на окраине',
  'Скромная квартирка для студентов',
  'Унылая однокомнатная квартира',
  'Роскошный дворец  с просторными комнатами',
  'Частный дом на две семьи'
];
var OFFER_DESCRIPTIONS = [
  'Бесплатный безлимитный Wi-Fi, рядом торговый центр',
  'Чистая и уютная квартира. Все достопримечательности Токио рядом.',
  'Просторная кухня. Лоджия с прекрасным видом на город',
  'До центра 5 минут. Удобная транспортная развязка'
];
// var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'};
var OFFER_CHECK_INS = ['12:00', '13:00', '14:00'];
var OFFER_CHECK_OUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PRICE_VALUE_MIN = 0;
var PRICE_VALUE_MAX = 1000000;
var OFFER_ROOMS = [1, 2, 3, 100];
var GUEST_VALUE_MIN = 0;
var GUEST_VALUE_MAX = 3;
var PHOTO_VALUE_MIN = 1;
var PHOTO_VALUE_MAX = 3;
var LOCATION_X_MIN = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var IMG_WIDTH = 45;
var IMG_HEIGHT = 40;

var locationXMax = document.querySelector('.map__overlay').clientWidth;
var mapSection = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

// Генерация массива офферов
var generatedOffers = generateData(OFFER_TITLES.length);

// Нахождение шаблон пина
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Добавление пинов на карту
mapPins.appendChild(addAdvert(generatedOffers));

// Удаление класса .map--faded у блока .map
mapSection.classList.remove('map--faded');

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

// Генерация пина объявления
function generateAdvertPin(advertPin) {
  var elementPin = pinTemplate.cloneNode(true);

  elementPin.style.left = (advertPin.location.x - PIN_WIDTH / 2) + 'px';
  elementPin.style.top = (advertPin.location.y - PIN_HEIGHT) + 'px';

  elementPin.querySelector('img').src = advertPin.author.avatar;
  elementPin.querySelector('img').alt = advertPin.offer.title;

  return elementPin;
}

// Функция для создания массива из 8 сгенерированных JS-объектов
function generateData(countOfTitles) {
  var offers = [];
  for (var i = 0; i < countOfTitles; i++) {
    var object = {};
    var location = {
      x: generateRandomValue(LOCATION_X_MIN, locationXMax),
      y: generateRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };
    object.author = {
      avatar: AVATAR_IMG + (i + 1) + PNG_FORMAT
    };
    object.offer = {
      title: OFFER_TITLES[i],
      address: location.x + ', ' + location.y,
      price: generateRandomValue(PRICE_VALUE_MIN, PRICE_VALUE_MAX),
      type: getRandomElement(Object.keys(OFFER_TYPES)),
      rooms: getRandomElement(OFFER_ROOMS),
      guests: generateRandomValue(GUEST_VALUE_MIN, GUEST_VALUE_MAX),
      checkin: getRandomElement(OFFER_CHECK_INS),
      checkout: getRandomElement(OFFER_CHECK_OUTS),
      features: sliceElement(OFFER_FEATURES),
      description: getRandomElement(OFFER_DESCRIPTIONS),
      photos: generatePhotos()
    };
    object.location = {
      x: location.x,
      y: location.y
    };
    offers.push(object);
  }
  return offers;
}

/* eslint-disable no-console */
// console.log(generatedOffers);
/* eslint-enable no-console */

// Функция генерации случайных чисел
function generateRandomValue(min, max) {
  return Math.floor(Math.random() * max + min);
}

// Функция генерации случайного значения из массива
function getRandomElement(elements) {
  return elements[generateRandomValue(0, elements.length)];
}

// Функция генерации случайной длины массива
function sliceElement(elements) {
  return elements.slice(0, generateRandomValue(1, elements.length));
}

// Функция генерации массива строк случайной длины, содержащий адреса фотографий
function generatePhotos() {
  var photos = [];
  var lastValue = generateRandomValue(PHOTO_VALUE_MIN, PHOTO_VALUE_MAX);
  for (var i = 0; i < lastValue; i++) {
    var photo = PHOTO_URL + (i + 1) + JPG_FORMAT;
    photos.push(photo);
  }
  return photos;
}


// БОЛЬШЕ ДЕТАЛЕЙ (ЧАСТЬ 2)

var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Добавление карточки объявления в блок .map перед блоком .map__filters-container
mapSection.insertBefore(document.createDocumentFragment().appendChild(createCard(generatedOffers[0])), mapFiltersContainer);

// Функция создание карточки объявления
function createCard(offer) {
  var cardElement = templateCard.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotos = cardElement.querySelector('.popup__photos');

  if (offer.offer.features.length) {
    renderFeatures(cardFeatures, offer.offer.features);
  } else {
    cardFeatures.classList.add('visually-hidden');
  }

  if (offer.offer.photos.length) {
    renderPhotos(cardPhotos, offer.offer.photos);
  } else {
    cardPhotos.classList.add('visually-hidden');
  }

  cardElement.querySelector('.popup__title').textContent = offer.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = renderRooms(offer.offer.rooms) + ' для ' + renderGuests(offer.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до ' + offer.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.offer.description;
  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
  return cardElement;
}

// Функция отрисовки преимуществ
function renderFeatures(container, features) {
  container.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature', 'popup__feature--' + features[i]);
    container.appendChild(feature);
  }
}

// Функция отрисовки фото
function renderPhotos(container, photos) {
  container.innerHTML = '';
  for (var i = 0; i < photos.length; i++) {
    var photo = document.createElement('img');
    photo.src = photos[i];
    photo.width = IMG_WIDTH;
    photo.height = IMG_HEIGHT;
    container.appendChild(photo);
  }
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
