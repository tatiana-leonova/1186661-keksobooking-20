'use strict';

(function () {

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
  var OFFER_TYPES = {
    'bungalo': {
      translate: 'Бунгало',
      minPrice: 0
    },
    'flat': {
      translate: 'Квартира',
      minPrice: 1000
    },
    'house': {
      translate: 'Дом',
      minPrice: 5000
    },
    'palace': {
      translate: 'Дворец',
      minPrice: 10000
    }
  };
  var OFFER_CHECK_INS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECK_OUTS = ['12:00', '13:00', '14:00'];
  var LOCATION_X_MIN = 0;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var PHOTO_VALUE_MIN = 1;
  var PHOTO_VALUE_MAX = 3;
  var PRICE_VALUE_MIN = 0;
  var PRICE_VALUE_MAX = 1000000;
  var GUEST_VALUE_MIN = 0;
  var GUEST_VALUE_MAX = 3;
  var OFFER_ROOMS = [1, 2, 3, 100];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var locationXMax = document.querySelector('.map__overlay').clientWidth;

  // Генерация массива офферов
  // var generatedOffers = generateData(OFFER_TITLES.length);

  function generatedOffers() {
    var offers = [];
    for (var i = 0; i < OFFER_TITLES.length; i++) {
      var offerItem = {};
      var location = {
        x: generateRandomValue(LOCATION_X_MIN, locationXMax),
        y: generateRandomValue(LOCATION_Y_MIN, LOCATION_Y_MAX)
      };
      offerItem.author = {
        avatar: AVATAR_IMG + (i + 1) + PNG_FORMAT
      };
      offerItem.offer = {
        title: OFFER_TITLES[i],
        address: location.x + ', ' + location.y,
        price: generateRandomValue(PRICE_VALUE_MIN, PRICE_VALUE_MAX),
        type: OFFER_TYPES[getRandomElement(Object.keys(OFFER_TYPES))],
        rooms: getRandomElement(OFFER_ROOMS),
        guests: generateRandomValue(GUEST_VALUE_MIN, GUEST_VALUE_MAX),
        checkin: getRandomElement(OFFER_CHECK_INS),
        checkout: getRandomElement(OFFER_CHECK_OUTS),
        features: sliceElement(OFFER_FEATURES),
        description: getRandomElement(OFFER_DESCRIPTIONS),
        photos: generatePhotos()
      };
      offerItem.location = {
        x: location.x,
        y: location.y
      };
      offers.push(offerItem);
    }
    return offers;
  }

  // Функция генерации случайного значения из массива
  function getRandomElement(elements) {
    return elements[generateRandomValue(0, elements.length)];
  }

  // Функция генерации случайных чисел
  function generateRandomValue(min, max) {
    return Math.floor(Math.random() * max + min);
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

  window.data = {
    OFFER_TYPES: OFFER_TYPES,
    generatedOffers: generatedOffers
  };

})();
