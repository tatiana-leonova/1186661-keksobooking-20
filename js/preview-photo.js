'use strict';

(function () {

  var FILE_TYPES_IMG = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoHousingFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoHousingPreview = document.querySelector('.ad-form__photo');

  avatarFileChooser.addEventListener('change', onAvatarFileChooserCanged);
  photoHousingFileChooser.addEventListener('change', onPhotoHousingChooserCanged);

  function onAvatarFileChooserCanged() {
    loadPrewiewPhoto(avatarFileChooser, avatarPreview);
  }

  function onPhotoHousingChooserCanged() {
    loadPrewiewPhoto(photoHousingFileChooser, photoHousingPreview);
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

}());
