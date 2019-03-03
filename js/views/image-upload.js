var app = app || {};

(function () {
  'use strict';

  /**
   * ImageUploadView - форма загрузки изображения
   */
  app.ImageUploadView = Backbone.View.extend({
    tagName:  'div',
    className: 'image-upload',
    template: _.template($('#image-upload-view').html()),
    events: {
      'change input': 'onChange'
    },

    render: function() {
      return this.$el.html(this.template());
    },

    /**
     * Вызывается если пользователь что-то выбрал в поле file
     */
    onChange: function(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (function (e) {
          this.trigger('imageLoaded', e.target.result);
        }).bind(this);

        reader.readAsDataURL(input.files[0]);
      }
    }
  });
})();
