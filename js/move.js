'use strict';

(function () {

  var startCoordsPin = {};

  window.map.pinMain.addEventListener('mousedown', function (evt) {
    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    evt.preventDefault();

    // Начальные координаты пина
    startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Обработчик событий на передвижение мыши
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      moveMainPin(moveEvt);
    }

    // Обработчик событий на отпускание мыши
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

  // Функция перемещения пина
  function moveMainPin(evt) {
    var shift = {
      x: startCoordsPin.x - evt.clientX,
      y: startCoordsPin.y - evt.clientY,
    };

    startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    var currentX = window.map.pinMain.offsetLeft - shift.x;
    var currentY = window.map.pinMain.offsetTop - shift.y;

    // Проверка границ перемещения пина
    if (currentX < 0) {
      currentX = 0;
    } else if (currentX > window.form.mapPins.clientWidth - window.map.pinMain.clientWidth) {
      currentX = window.form.mapPins.clientWidth - window.map.pinMain.clientWidth;
    }

    if (currentY < window.data.LOCATION_Y_MIN) {
      currentY = window.data.LOCATION_Y_MIN;
    } else if (currentY > window.data.LOCATION_Y_MAX) {
      currentY = window.data.LOCATION_Y_MAX;
    }

    window.map.pinMain.style.left = currentX + 'px';
    window.map.pinMain.style.top = currentY + 'px';
    window.form.renderAdress(window.map.pinMain);
  }

}());
