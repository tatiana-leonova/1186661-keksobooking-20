'use strict';

(function () {
// Значение фильтров по умолчанию
  var defaultTypeHousingValue = 'any';
  var housingTypeSelect = document.querySelector('#housing-type');
  var onFilterChanged;

  function setupFilters(updatePins) {
    housingTypeSelect.addEventListener('change', getFilterChanged(updatePins));
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

  function checkTypeHousing(element) {
    return housingTypeSelect.value === element.offer.type ||
     housingTypeSelect.value === defaultTypeHousingValue;
  }

  window.filter = {
    offers: filterOffers,
    checkTypeHousing: checkTypeHousing,
    setup: setupFilters
  };
})();
