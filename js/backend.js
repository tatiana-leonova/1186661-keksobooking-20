'use strict';

(function () {
  var TIMEOUT_IN_MILIS = 10000;
  var REQUEST_GET = 'GET';
  var REQUEST_POST = 'POST';
  var StatusCode = {
    OK: 200,
  };

  function loadData(url, onSuccess, onError) {
    var xhr = prepareResponse(onSuccess, onError);
    xhr.open(REQUEST_GET, url);

    xhr.send();
  }

  function uploadData(url, onSuccess, onError, data) {
    var xhr = prepareResponse(onSuccess, onError);

    xhr.open(REQUEST_POST, url);
    xhr.send(data);
  }

  function prepareResponse(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MILIS;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT_IN_MILIS + ' мс');
    });
    return xhr;
  }

  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };

}());
