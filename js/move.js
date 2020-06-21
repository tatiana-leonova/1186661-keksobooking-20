'use strict';

(function () {

  window.map.pinMain.addEventListener('mousedown', function (evt) {
    var isMouseDown = true;
    evt.preventDefault();

    // Начальные координаты пина
    var startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Обработчик событий на передвижение мыши
    function onMouseMove(moveEvt) {
      if (isMouseDown) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoordsPin.x - moveEvt.clientX,
          y: startCoordsPin.y - moveEvt.clientY,
        };

        startCoordsPin = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.pinMain.style.top = (window.map.pinMain.offsetTop - shift.y) + 'px';
        window.map.pinMain.style.left = (window.map.pinMain.offsetLeft - shift.x) + 'px';
      }
    }
    // Обработчик событий на отпускание мыши
    function onMouseUp(UpEvt) {
      isMouseDown = false;
      UpEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    // Обработчики события передвижения мыши и отпускания кнопки мыши
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

}());
