
'use strict';

var AVATAR_IMG = 'img/avatars/user0';
var PHOTO_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
var PNG_FORMAT = '.png';
var JPG_FORMAT = '.jpg';
var OFFER_TITLE = [
  'Шикарная квартира в центре',
  'Уютное гнездышко для молодоженов',
  'Квартира-студия недалеко от центра',
  'Элитная хрущевка на окраине',
  'Скромная квартирка для студентов',
  'Унылая однокомнатная квартира',
  'Роскошный дворец  с просторными комнатами',
  'Частный дом на две семьи'
];
var OFFER_DESCRIPTION = [
  'Бесплатный безлимитный Wi-Fi, рядом торговый центр',
  'Чистая и уютная квартира. Все достопримечательности Токио рядом.',
  'Просторная кухня. Лоджия с прекрасным видомна город',
  'До центра 5 минут. Удобная транспортная развязка'
];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK_IN = ['12:00', '13:00', '14:00'];
var OFFER_CHECK_OUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PRICE_VALUE_MIN = 500;
var PRICE_VALUE_MAX = 3000;
var ROOM_VALUE_MIN = 1;
var ROOM_VALUE_MAX = 7;
var GUEST_VALUE_MIN = 1;
var GUEST_VALUE_MAX = 4;
var PHOTO_VALUE_MIN = 3;
var PHOTO_VALUE_MAX = 10;
var LOCATION_X_MIN = 3;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var locationXMax = document.querySelector('.map__overlay').clientWidth;
var mapSection = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

// Нахождение шаблон пина
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Добавление пинов на карту
mapPins.appendChild(addAdvert(generateData(OFFER_TITLE)));

// Удаление класса .map--faded у блока .map
mapSection.classList.remove('map--faded');

// Добавление объявлений
function addAdvert(оffers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < оffers.length; i++) {
    fragment.appendChild(generateAdvertPin(оffers[i]));
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
function generateData() {
  var arrayOffers = [];
  for (var i = 0; i < OFFER_TITLE.length; i++) {
    var object = {};
    var location = {
      x: generateRandomValue(LOCATION_X_MIN, locationXMax),
      y: generateRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };
    object.author = {
      avatar: AVATAR_IMG + (i + 1) + PNG_FORMAT
    };
    object.offer = {
      title: OFFER_TITLE[i],
      address: location.x + ', ' + location.y,
      price: generateRandomValue(PRICE_VALUE_MIN, PRICE_VALUE_MAX),
      type: getRandomInArray(OFFER_TYPE),
      rooms: generateRandomValue(ROOM_VALUE_MIN, ROOM_VALUE_MAX),
      guests: generateRandomValue(GUEST_VALUE_MIN, GUEST_VALUE_MAX),
      checkin: getRandomInArray(OFFER_CHECK_IN),
      checkout: getRandomInArray(OFFER_CHECK_OUT),
      features: sliceArray(OFFER_FEATURES),
      description: getRandomInArray(OFFER_DESCRIPTION),
      photos: generatePhotos()
    };
    object.location = {
      x: location.x,
      y: location.y
    };
    arrayOffers.push(object);
  }
  return arrayOffers;
}

// Функция генерации случайных чисел
function generateRandomValue(min, max) {
  return Math.floor(Math.random() * max + min);
}

// Функция генерации случайного значения из массива
function getRandomInArray(array) {
  return array[generateRandomValue(0, array.length)];
}

// Функция генерации случайной длины массива
function sliceArray(array) {
  return array.slice(0, generateRandomValue(1, array.length));
}

// Функция генерации массива строк случайной длины, содержащий адреса фотографий
function generatePhotos() {
  var array = [];
  var lastValue = generateRandomValue(PHOTO_VALUE_MIN, PHOTO_VALUE_MAX);
  for (var i = 0; i < lastValue; i++) {
    var photo = PHOTO_URL + (i + 1) + JPG_FORMAT;
    array.push(photo);
  }
  return array;
}
