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
var PIN_MAIN_SIZE = 65;
var PIN_MAIN_HEIGHT_WITH_CORNER = 85;
var IMG_WIDTH = 45;
var IMG_HEIGHT = 40;
var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';
var LEFT_KEY_MOUSE_CODE = 1;

var locationXMax = document.querySelector('.map__overlay').clientWidth;
var mapSection = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

// Генерация массива офферов
var generatedOffers = generateData(OFFER_TITLES.length);

// Нахождение шаблон пина
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
function generateAdvertPin(offerItem) {
  var elementPin = pinTemplate.cloneNode(true);

  elementPin.style.left = (offerItem.location.x - PIN_WIDTH / 2) + 'px';
  elementPin.style.top = (offerItem.location.y - PIN_HEIGHT) + 'px';

  elementPin.querySelector('img').src = offerItem.author.avatar;
  elementPin.querySelector('img').alt = offerItem.offer.title;

  elementPin.addEventListener('click', function (evt) {
    mapSection.insertBefore(createCard(offerItem), mapFiltersContainer);
    evt.preventDefault();
  });

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
      type: OFFER_TYPES[getRandomElement(Object.keys(OFFER_TYPES))].translate,
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


// ДЗ БОЛЬШЕ ДЕТАЛЕЙ (ЧАСТЬ 2)

var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');

// Функция создание карточки объявления
function createCard(offerItem) {
  var cardElement = templateCard.cloneNode(true);
  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var popupClose = cardElement.querySelector('.popup__close');

  if (offerItem.offer.features.length) {
    renderFeatures(cardFeatures, offerItem.offer.features);
  } else {
    cardFeatures.classList.add('visually-hidden');
  }

  if (offerItem.offer.photos.length) {
    renderPhotos(cardPhotos, offerItem.offer.photos);
  } else {
    cardPhotos.classList.add('visually-hidden');
  }

  cardElement.querySelector('.popup__title').textContent = offerItem.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerItem.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offerItem.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerItem.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = renderRooms(offerItem.offer.rooms) + ' для ' + renderGuests(offerItem.offer.guests);
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offerItem.offer.description;
  cardElement.querySelector('.popup__avatar').src = offerItem.author.avatar;

  popupClose.addEventListener('click', function () {
    cardElement.classList.add('hidden');
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === ESCAPE_KEY) {
      evt.preventDefault();
      cardElement.classList.add('hidden');
    }
  });

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

// ДЗ ДОВЕРЯЙ, НО ПРОВЕРЯЙ
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var roomSelectAdForm = adForm.querySelector('select[name="rooms"]');
var typeHousingSelectAdForm = adForm.querySelector('select[name="type"]');
var capacitySelectAdForm = adForm.querySelector('select[name="capacity"]');
var titleInputAdForm = adForm.querySelector('input[name="title"]');
var priceInputAdForm = adForm.querySelector('input[name="price"]');
var addressInputForm = document.querySelector('input[name="address"]');

var timeinSelectAdForm = adForm.querySelector('select[name="timein"]');
var timeoutSelectAdForm = adForm.querySelector('select[name="timeout"]');

var countOfPlacesInRoom = {
  1: {
    capacity: ['1'],
    error: 'В 1 комнате может находиться 1 гость. Измените выбранные параметры'
  },
  2: {
    capacity: ['1', '2'],
    error: 'В 2 комнатах могут находиться 1 или 2 гостя. Измените выбранные параметры'
  },
  3: {
    capacity: ['1', '2', '3'],
    error: 'В 3 комнатах могут находиться от 1 до 3 гостей. Измените выбранные параметры'
  },
  100: {
    capacity: ['0'],
    error: 'Упс! 100 комнат предназначены не для размещения гостей. Измените выбранные параметры'
  }
};

var timingTimeHousing = {
  '12:00': {
    timeout: '12:00'
  },
  '13:00': {
    timeout: '13:00'
  },
  '14:00': {
    timeout: '14:00'
  }
};

deactivatePage(true);

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

// Функция для деактивации страницы
function deactivatePage(isDisabled) {
  disableElements('.ad-form', 'fieldset', isDisabled);
  disableElements('.map__filters', 'select', isDisabled);
  disableElements('.map__filters', 'fieldset', isDisabled);

  renderAdress(false);

  onRoomOrCapacityChanged();
  onTypeHousingChanged();

  titleInputAdForm.removeEventListener('change', onTitleChanged);
  roomSelectAdForm.removeEventListener('change', onRoomOrCapacityChanged);
  capacitySelectAdForm.removeEventListener('change', onRoomOrCapacityChanged);
  typeHousingSelectAdForm.removeEventListener('change', onTypeHousingChanged);

  timeoutSelectAdForm.removeEventListener('change', onTimeoutChanged);
  timeinSelectAdForm.removeEventListener('change', onTimeinChanged);
}

// Функция для активации страницы
function activatePage() {
  mapPins.appendChild(addAdvert(generatedOffers));
  deactivatePage(false);

  renderAdress(true);

  titleInputAdForm.addEventListener('change', onTitleChanged);
  roomSelectAdForm.addEventListener('change', onRoomOrCapacityChanged);

  capacitySelectAdForm.addEventListener('change', onRoomOrCapacityChanged);
  typeHousingSelectAdForm.addEventListener('change', onTypeHousingChanged);

  timeoutSelectAdForm.addEventListener('change', onTimeoutChanged);
  timeinSelectAdForm.addEventListener('change', onTimeinChanged);

  mapSection.classList.remove('map--faded'); // Удаление "Поставь меня куда-нибудь" у пина
  adForm.classList.remove('ad-form--disabled'); // Удаление opacity на форме
}

// Функция для добавления disabled элементам
function disableElements(parent, children, isDisabled) {
  var parentElement = document.querySelector(parent);
  var childElements = parentElement.querySelectorAll(children);
  childElements.forEach(function (item) {
    item.disabled = isDisabled;
  });
}

// Функция для отрисовки адреса
function renderAdress(isPageActive) {
  if (isPageActive) {
    addressInputForm.value = getPisitionPin(mapPinMain, PIN_MAIN_SIZE, PIN_MAIN_HEIGHT_WITH_CORNER);
  } else {
    addressInputForm.value = getPisitionPin(mapPinMain, PIN_MAIN_SIZE, PIN_MAIN_SIZE / 2);
  }
}

// Функция для получения позиции пина
function getPisitionPin(pin, pinWidth, pinHeight) {
  var positionX = Math.round(pin.offsetLeft + pinWidth / 2);
  var positionY = Math.round(pin.offsetTop + pinHeight);
  return positionX + ', ' + positionY;
}

// Функция для валидации комнат
function onRoomOrCapacityChanged() {
  var room = countOfPlacesInRoom[roomSelectAdForm.value];
  var errorMessage = room.capacity.includes(capacitySelectAdForm.value) ? '' : room.error;
  roomSelectAdForm.setCustomValidity(errorMessage);
}

// Функция для валидации заголовка
function onTitleChanged() {
  if (titleInputAdForm.validity.tooShort) {
    titleInputAdForm.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
  } else if (titleInputAdForm.validity.tooLong) {
    titleInputAdForm.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else if (titleInputAdForm.validity.valueMissing) {
    titleInputAdForm.setCustomValidity('Обязательное поле');
  } else {
    titleInputAdForm.setCustomValidity('');
  }
}

// Функция для генерации минимальной цены за ночь относительно выбранного Типа жилья
function onTypeHousingChanged() {
  var type = OFFER_TYPES[typeHousingSelectAdForm.value];
  priceInputAdForm.placeholder = type.minPrice;
  priceInputAdForm.min = type.minPrice;
}

// Функция синхронизации Даты заезда и выезда
function onTimeinChanged() {
  var timein = timingTimeHousing[timeinSelectAdForm.value];
  timeoutSelectAdForm.value = timein.timeout;
}

// Функция синхронизации Даты выезда и заезда
function onTimeoutChanged() {
  var timeinKeys = Object.keys(timingTimeHousing);

  for (var i = 0; i < timeinKeys.length; i++) {
    if (timeoutSelectAdForm.value === timingTimeHousing[timeinKeys[i]].timeout) {
      timeinSelectAdForm.value = timeoutSelectAdForm.value;
      return;
    }
  }
}
