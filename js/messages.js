'use strict';

(function () {
  var templateMessageSuccess = document.querySelector('#success').content.querySelector('.success');
  var notice = document.querySelector('.notice');
  var templateMessageError = document.querySelector('#error').content.querySelector('.error');
  var onErrorLayoutClick;
  var onErrorMessageEcsKeydown;
  var onErrorButtonClick;

  // Функция для показа сообщения успешной отправки
  function showSuccessMessage() {
    var messageSuccessElement = templateMessageSuccess.cloneNode(true);

    notice.insertBefore(messageSuccessElement, window.form.advert);

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
      onEcsKeydown,
      onMessageClick,
      onButtonClick
  ) {

    var messageErrorElement = templateMessageError.cloneNode(true);
    var errorButton = messageErrorElement.querySelector('.error__button');

    var messageText = messageErrorElement.querySelector('.error__message');
    messageText.textContent = error;

    notice.insertBefore(messageErrorElement, window.form.advert);

    document.addEventListener('keydown', getErrorMessageEcsHandler(errorButton, onEcsKeydown));
    document.addEventListener('click', getErrorLayoutClickHandler(errorButton, onMessageClick));
    errorButton.addEventListener('click', getErrorButtonHandler(errorButton, onButtonClick));
  }

  // Закрытие сообщения успешной отправки
  function removeErrorMessage(errorButton) {
    var currentErrorTemplate = document.querySelector('.error');
    if (currentErrorTemplate) {
      currentErrorTemplate.remove();
    }
    document.removeEventListener('keydown', onErrorMessageEcsKeydown);
    document.removeEventListener('click', onErrorLayoutClick);
    errorButton.removeEventListener('click', onErrorButtonClick);
  }

  // Обработчик закрытия при клике на произвольное область экрана
  function getErrorLayoutClickHandler(errorButton, onMessageClick) {
    onErrorLayoutClick = function (evt) {
      if (evt.target.matches('.error')) {
        evt.preventDefault();
        removeErrorMessage(errorButton);
        if (onMessageClick) {
          onMessageClick();
        }
      }
    };
    return onErrorLayoutClick;
  }

  // Обработчик закрытия модалки с сообщением при клике на Esc
  function getErrorMessageEcsHandler(errorButton, onEcsKeydown) {
    onErrorMessageEcsKeydown = function (evt) {
      if (evt.key === window.map.ESCAPE_KEY) {
        evt.preventDefault();
        removeErrorMessage(errorButton);
        if (onEcsKeydown) {
          onEcsKeydown();
        }
      }
    };
    return onErrorMessageEcsKeydown;
  }

  // Функция закрытия формы после ошибки
  function getErrorButtonHandler(errorButton, onButtonClick) {
    onErrorButtonClick = function () {
      removeErrorMessage(errorButton);
      if (onButtonClick) {
        onButtonClick();
      }
    };
    return onErrorButtonClick;
  }

  window.messages = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
  };

}());
