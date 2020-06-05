
'use strict';

var AVATAR_IMG = 'img/avatars/user0';
var PHOTO_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
var PNG_FORMAT = '.png';
var JPG_FORMAT = '.jpg';
var OFFER_TITLE = [
  'Hilton Tokyo 5*',
  'Tokyo Dome Hotel 4*',
  'Tokyo Prince Hotel 4*',
  'Mandarin Oriental Tokyo 5*',
  'Hotel Villa Fontaine Tokyo-Nihombashi Hakozaki 3*',
  'Hotel Villa Fontaine Tokyo-Tamachi 3*',
  'Hotel Villa Fontaine Tokyo-Shiodome 4*',
  'Comfort Hotel Tokyo Higashi Kanda 3*'
];
var OFFER_DESCRIPTION = [
  'Отель расположен близко к центру. Бесплатный Wi-Fi на территории',
  'К услугам гостей ресторан-буфет и бесплатный Wi-Fi в номере',
  'Завтрак: шведский стол, на крыше отеля есть бассейн',
  'Отель расположен близко к центру'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK_IN = ['12:00', '13:00', '14:00'];
var OFFER_CHECK_OUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PRICE_VALUE_MIN = 500;
var PRICE_VALUE_MAX = 3000;
var ROOM_VALUE_MIN = 1;
var ROOM_VALUE_MAX = 3;
var GUEST_VALUE_MIN = 1;
var GUEST_VALUE_MAX = 3;
var PHOTO_VALUE_MIN = 3;
var PHOTO_VALUE_MAX = 10;
var LOCATION_X_MIN = 3;
var locationXMax = document.querySelector('.map__overlay').clientWidth;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

// var width = img.clientWidth;

// Функция для создания массива из 8 сгенерированных JS-объектов
function generateData() {
  var array = [];
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
      location: location
    };
    array.push(object);
  }
  return JSON.stringify(array);
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

/* eslint-disable no-console */
console.log(generateData());
/* eslint-enable no-console */

