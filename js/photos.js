'use strict';

(function () {

  var FILE_TYPES_IMG = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_URL_AVATAR = 'img/muffin-grey.svg';
  var IMG_SIZE_PHOTO_HOUSING = 70;
  var MAX_PHOTO_COUNT = 3;
  var photoCount = 0;

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoHousingFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var formPhoto = document.querySelector('.ad-form__photo');

  avatarFileChooser.addEventListener('change', onAvatarFileChooserCanged);
  photoHousingFileChooser.addEventListener('change', onPhotoHousingChooserCanged);

  function onAvatarFileChooserCanged() {
    loadPrewiewPhoto(avatarFileChooser, avatarPreview);
  }

  function onPhotoHousingChooserCanged() {
    if (photoCount < MAX_PHOTO_COUNT) {
      photoCount++;
      loadPrewiewPhoto(photoHousingFileChooser, formPhoto.appendChild(createImg()));
    }
  }

  function clearPhoto() {
    photoCount = 0;
    formPhoto.querySelectorAll('img').forEach(function (img) {
      img.remove();
    });
    avatarPreview.src = DEFAULT_URL_AVATAR;
  }

  function createImg() {
    var img = document.createElement('img');
    img.width = IMG_SIZE_PHOTO_HOUSING;
    img.height = IMG_SIZE_PHOTO_HOUSING;
    return img;
  }

  function loadPrewiewPhoto(fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES_IMG.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  window.photos = {
    clear: clearPhoto
  };

}());
