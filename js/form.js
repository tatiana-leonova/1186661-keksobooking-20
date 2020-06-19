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

  var mapSection = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var roomSelectAdForm = adForm.querySelector('select[name="rooms"]');
  var typeHousingSelectAdForm = adForm.querySelector('select[name="type"]');
  var capacitySelectAdForm = adForm.querySelector('select[name="capacity"]');
  var titleInputAdForm = adForm.querySelector('input[name="title"]');
  var priceInputAdForm = adForm.querySelector('input[name="price"]');
  var addressInputForm = document.querySelector('input[name="address"]');
  var timeinSelectAdForm = adForm.querySelector('select[name="timein"]');
  var timeoutSelectAdForm = adForm.querySelector('select[name="timeout"]');


  deactivateFields(true);
  onRoomOrCapacityChanged();
  onTypeHousingChanged();

  // Функция для деактивации страницы
  function deactivateFields(isDeactivated) {
    disableElements('.ad-form', 'fieldset', isDeactivated);
    disableElements('.map__filters', 'select', isDeactivated);
    disableElements('.map__filters', 'fieldset', isDeactivated);

    renderAdress(false);

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
    deactivateFields(false);

    renderAdress(true);

    titleInputAdForm.addEventListener('change', onTitleChanged);
    roomSelectAdForm.addEventListener('change', onRoomOrCapacityChanged);

    capacitySelectAdForm.addEventListener('change', onRoomOrCapacityChanged);
    typeHousingSelectAdForm.addEventListener('change', onTypeHousingChanged);

    timeoutSelectAdForm.addEventListener('change', onTimeoutChanged);
    timeinSelectAdForm.addEventListener('change', onTimeinChanged);

    mapSection.classList.remove('map--faded'); // Удаление "Поставь меня куда-нибудь" у пина
    adForm.classList.remove('ad-form--disabled'); // Удаление opacity на форме

    function validateFormFields(formFields) {
      formFields.forEach(function (item) {
        item.classList.toggle('error-form', !item.validity.valid);
      });
    }

    var adFormSubmit = adForm.querySelector('.ad-form__submit');
    adFormSubmit.addEventListener('click', function () {
      validateFormFields(adForm.querySelectorAll('input, select'));
    });
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

  window.form = {
    activatePage: activatePage,
    disableElements: disableElements
  };

}());
