'use strict';

(function () {
// Значение фильтров по умолчанию
  var DEFAULT_VALUE_TYPE = 'any';
  var mapFilters = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomSelect = document.querySelector('#housing-rooms');
  var housingGuestSelect = document.querySelector('#housing-guests');

  var onFilterChanged;

  var priceHousingSegment = {
    'middle': {
      min: 10000,
      max: 49999
    },
    'low': {
      min: 0,
      max: 9999
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var filters = [checkHousingType, checkHousingPrice, checkHousingRoom, checkHousingGuest];

  function setupFilters(updatePins) {
    mapFilters.addEventListener('change', getFilterChanged(updatePins));
  }

  function getFilterChanged(updatePins) {
    onFilterChanged = function () {
      window.map.closeCard(); // закрываем карточки объявлений
      window.pin.clear(); // очищаем пины
      updatePins();
    };
    return onFilterChanged;
  }

  function filterOffers(elements, callback, count) {
    var filteredOffers = [];

    for (var i = 0; i < elements.length; i++) {
      if (callback(elements[i])) {
        filteredOffers.push(elements[i]);
        if (filteredOffers.length === count) {
          break;
        }
      }
    }
    return filteredOffers;
  }

  function checkHousingType(element) {
    return housingTypeSelect.value === element.offer.type ||
     housingTypeSelect.value === DEFAULT_VALUE_TYPE;
  }

  function checkHousingPrice(element) {
    if (housingPriceSelect.value === DEFAULT_VALUE_TYPE) {
      return DEFAULT_VALUE_TYPE;
    } else {
      return priceHousingSegment[housingPriceSelect.value].min <= element.offer.price &&
    priceHousingSegment[housingPriceSelect.value].max >= element.offer.price;
    }
  }

  function checkHousingRoom(element) {
    return Number(housingRoomSelect.value) === element.offer.rooms ||
    housingRoomSelect.value === DEFAULT_VALUE_TYPE;
  }

  function checkHousingGuest(element) {
    return Number(housingGuestSelect.value) === element.offer.guests ||
    housingGuestSelect.value === DEFAULT_VALUE_TYPE;
  }

  function checkFilters(element) {
    return filters.every(function (filter) {
      return filter(element);
    });
  }


  window.filter = {
    offers: filterOffers,
    setup: setupFilters,
    check: checkFilters
  };
})();
