
'use strict';

var AVATAR_IMG = 'img/avatars/user0';
var PHOTO_URL = 'http://o0.github.io/assets/images/tokyo/hotel';
var PNG_FORMAT = '.png';
var JPG_FORMAT = '.jpg';
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK_IN = ['12:00', '13:00', '14:00'];
var OFFER_CHECK_OUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

// Функция для создания массива из 8 сгенерированных JS-объектов
function generateData() {
  var array = [];
  for (var i = 1; i <= 8; i++) {
    var object = {};
    object.author = {
      avatar: AVATAR_IMG + i + PNG_FORMAT
    };
    object.offer = {
      title: 'test',
      address: 'test',
      price: 'test',
      type: getRandomInArray(OFFER_TYPE),
      rooms: generateRandomValue(1, 3),
      guests: generateRandomValue(1, 4),
      checkin: getRandomInArray(OFFER_CHECK_IN),
      checkout: getRandomInArray(OFFER_CHECK_OUT),
      features: sliceArray(OFFER_FEATURES),
      description: 'test',
      photos: generatePhotos()
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
  return array.slice(0, generateRandomValue(0, array.length));
}

// Функция генерации массива строк случайной длины, содержащий адреса фотографий
function generatePhotos() {
  var array = [];
  var lastValue = generateRandomValue(3, 10);
  for (var i = 1; i <= lastValue; i++) {
    var photo = PHOTO_URL + i + JPG_FORMAT;
    array.push(photo);
  }
  return array;
}

/* eslint-disable no-console */
console.log(generateData());
/* eslint-enable no-console */

