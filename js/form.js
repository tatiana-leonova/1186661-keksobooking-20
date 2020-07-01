'use strict';

(function () {

  var PIN_MAIN_SIZE = 65;
  var PIN_MAIN_HEIGHT_WITH_CORNER = 85;

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

  var timeinToTimeout = {
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

  var mapSection = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var roomSelectAdForm = adForm.querySelector('select[name="rooms"]');
  var typeHousingSelectAdForm = adForm.querySelector('select[name="type"]');
  var capacitySelectAdForm = adForm.querySelector('select[name="capacity"]');
  var titleInputAdForm = adForm.querySelector('input[name="title"]');
  var priceInputAdForm = adForm.querySelector('input[name="price"]');
  var addressInputForm = document.querySelector('input[name="address"]');
  var timeinSelectAdForm = adForm.querySelector('select[name="timein"]');
  var timeoutSelectAdForm = adForm.querySelector('select[name="timeout"]');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var isFormActiate = false;
  var resetButton = document.querySelector('.ad-form__reset');

  // Функция для деактивации страницы
  function deactivateFields() {
    isFormActiate = false;
    mapSection.classList.add('map--faded'); // Добавление "Поставь меня куда-нибудь" у пина
    adForm.classList.add('ad-form--disabled'); // Добавление opacity на форме

    window.map.setMainPinPosition(
        mapSection.offsetWidth / 2,
        mapSection.offsetHeight / 2
    );
    renderAdress(window.map.pinMain, PIN_MAIN_SIZE, PIN_MAIN_SIZE / 2);

    titleInputAdForm.removeEventListener('change', onTitleChanged);
    roomSelectAdForm.removeEventListener('change', onRoomOrCapacityChanged);
    capacitySelectAdForm.removeEventListener('change', onRoomOrCapacityChanged);
    typeHousingSelectAdForm.removeEventListener('change', onTypeHousingChanged);

    timeoutSelectAdForm.removeEventListener('change', onTimeoutChanged);
    timeinSelectAdForm.removeEventListener('change', onTimeinChanged);
    adFormSubmit.removeEventListener('click', onFormSubmitClick);
  }

  // Функция деактивации фильтрации пинов
  function deactivateFilerPins(isDeactivated) {
    disableElements('.map__filters', 'select', isDeactivated);
    disableElements('.map__filters', 'fieldset', isDeactivated);
  }

  // Функция для активации страницы
  function activatePage() {
    if (isFormActiate) {
      return;
    }

    setCapacityValidity();
    setPricePlaceholder();
    setupResetFormButton();

    renderAdress(window.map.pinMain);

    titleInputAdForm.addEventListener('change', onTitleChanged);
    roomSelectAdForm.addEventListener('change', onRoomOrCapacityChanged);

    capacitySelectAdForm.addEventListener('change', onRoomOrCapacityChanged);
    typeHousingSelectAdForm.addEventListener('change', onTypeHousingChanged);

    timeoutSelectAdForm.addEventListener('change', onTimeoutChanged);
    timeinSelectAdForm.addEventListener('change', onTimeinChanged);

    mapSection.classList.remove('map--faded'); // Удаление "Поставь меня куда-нибудь" у пина
    adForm.classList.remove('ad-form--disabled'); // Удаление opacity на форме

    adFormSubmit.addEventListener('click', onFormSubmitClick);
    isFormActiate = true;
  }

  function validateFormFields(formFields) {
    formFields.forEach(function (item) {
      item.classList.toggle('error-form', !item.validity.valid);
    });
  }

  function onFormSubmitClick() {
    validateFormFields(adForm.querySelectorAll('input, select'));
  }

  function renderData(generatedOffers, pinWidth, pinHeight) {
    mapPins.appendChild(window.pin.addAdvert(generatedOffers, pinWidth, pinHeight));
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
  function renderAdress(pin, mapWidth, mapHeight) {
    var width = mapWidth || PIN_MAIN_SIZE;
    var height = mapHeight || PIN_MAIN_HEIGHT_WITH_CORNER;
    addressInputForm.value = getPositionPin(pin, width, height);
  }

  // Функция для получения позиции пина
  function getPositionPin(pin, mapWidth, mapHeight) {
    var positionX = Math.round(pin.offsetLeft + mapWidth / 2);
    var positionY = Math.round(pin.offsetTop + mapHeight);
    return positionX + ', ' + positionY;
  }


  // Функция для валидации комнат
  function setCapacityValidity() {
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
  function setPricePlaceholder() {
    var type = OFFER_TYPES[typeHousingSelectAdForm.value];
    priceInputAdForm.placeholder = type.minPrice;
    priceInputAdForm.min = type.minPrice;
  }

  function onRoomOrCapacityChanged() {
    setCapacityValidity();
  }

  function onTypeHousingChanged() {
    setPricePlaceholder();
  }

  // Функция синхронизации Даты заезда и выезда
  function onTimeinChanged() {
    var timein = timeinToTimeout[timeinSelectAdForm.value];
    timeoutSelectAdForm.value = timein.timeout;
  }

  // Функция синхронизации Даты выезда и заезда
  function onTimeoutChanged() {
    var timeinKeys = Object.keys(timeinToTimeout);

    for (var i = 0; i < timeinKeys.length; i++) {
      if (timeoutSelectAdForm.value === timeinToTimeout[timeinKeys[i]].timeout) {
        timeinSelectAdForm.value = timeinKeys[i];
        return;
      }
    }
  }

  // Функция для очистки формы
  function clearForm(form) {
    var formElement = document.querySelector(form);
    formElement.reset();
  }

  function setupResetFormButton() {
    resetButton.addEventListener('click', onResetButtonClick);
  }

  function onResetButtonClick(evt) {
    evt.preventDefault();
    disableElements('.ad-form', 'fieldset', true);
    disableForm();
  }

  function disableForm() {
    window.map.closeCard();
    deactivateFilerPins(true);
    clearForm('.ad-form');
    window.pin.clear();
    deactivateFields();
  }

  window.form = {
    activatePage: activatePage,
    disable: disableForm,
    deactivateFields: deactivateFields,
    disableElements: disableElements,
    deactivateFilerPins: deactivateFilerPins,
    renderData: renderData,
    renderAdress: renderAdress,
    mapSection: mapSection,
    mapPins: mapPins,
    advert: adForm,
    OFFER_TYPES: OFFER_TYPES,
    PIN_MAIN_HEIGHT_WITH_CORNER: PIN_MAIN_HEIGHT_WITH_CORNER
  };

}());
