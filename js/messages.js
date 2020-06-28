'use strict';

(function () {
  var templateMessageSuccess = document.querySelector('#success').content.querySelector('.success');
  var notice = document.querySelector('.notice');
  var templateMessageError = document.querySelector('#error').content.querySelector('.error');

  // Функция для показа сообщения успешной отправки
  function showSuccessMessage() {
    var messageSuccessElement = templateMessageSuccess.cloneNode(true);

    notice.insertBefore(messageSuccessElement, window.form.adForm);

    document.addEventListener('keydown', onShowSuccessMessageEcsKeydown);
    document.addEventListener('click', onShowSuccessMessageClick);
  }

  // Закрытие сообщения успешной отправки
  function removeSuccessMessage() {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', onShowSuccessMessageEcsKeydown);
    document.removeEventListener('click', onShowSuccessMessageClick);
  }

  // Обработчик закрытия при клике на произвольное область экрана
  function onShowSuccessMessageClick(evt) {
    if (evt.target.matches('.success')) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  }

  // Обработчик закрытия модалки с сообщением при клике на Esc
  function onShowSuccessMessageEcsKeydown(evt) {
    if (evt.key === window.map.ESCAPE_KEY) {
      evt.preventDefault();
      removeSuccessMessage();
    }
  }

  // Функция для показа сообщения об ошибке
  function showErrorMessage(
      error,
      onEcsKeydownCallback,
      onMessageClickCallback,
      onButtonClickCallback
  ) {

    var messageErrorElement = templateMessageError.cloneNode(true);
    var errorButton = messageErrorElement.querySelector('.error__button');

    var messageText = messageErrorElement.querySelector('.error__message');
    messageText.textContent = error;

    notice.insertBefore(messageErrorElement, window.form.adForm);

    document.addEventListener('keydown', onErrorMessageEcsKeydown(errorButton, onEcsKeydownCallback));
    document.addEventListener('click', onErrorLayoutClick(errorButton, onMessageClickCallback));
    errorButton.addEventListener('click', onErrorButtonClick(errorButton, onButtonClickCallback));
  }

  // Закрытие сообщения успешной отправки
  function removeErrorMessage(errorButton) {
    var currentErrorTemplate = document.querySelector('.error');
    if (currentErrorTemplate) {
      currentErrorTemplate.remove();
    }
    document.removeEventListener('keydown', onErrorMessageEcsKeydown(errorButton));
    document.removeEventListener('click', onErrorLayoutClick(errorButton));
    errorButton.removeEventListener('click', onErrorButtonClick(errorButton));
  }

  // Обработчик закрытия при клике на произвольное область экрана
  function onErrorLayoutClick(errorButton, onMessageClickCallback) {
    return function (evt) {
      if (evt.target.matches('.error')) {
        evt.preventDefault();
        removeErrorMessage(errorButton);
        if (onMessageClickCallback) {
          onMessageClickCallback();
        }
      }
    };
  }

  // Обработчик закрытия модалки с сообщением при клике на Esc
  function onErrorMessageEcsKeydown(errorButton, onEcsKeydownCallback) {
    return function (evt) {
      if (evt.key === window.map.ESCAPE_KEY) {
        evt.preventDefault();
        removeErrorMessage(errorButton);
        if (onEcsKeydownCallback) {
          onEcsKeydownCallback();
        }
      }
    };
  }

  // Функция закрытия формы после ошибки
  function onErrorButtonClick(errorButton, onButtonClickCallback) {
    return function () {
      removeErrorMessage(errorButton);
      if (onButtonClickCallback) {
        onButtonClickCallback();
      }
    };
  }

  window.messages = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

}());
