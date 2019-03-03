var app = app || {};

(function () {
  'use strict';

  /**
   * ImageView - загруженное изображение
   */
  app.ImageView = Backbone.View.extend({
    tagName:  'img',
    className: 'image',

    render: function(callback) {
      this.$el.attr('src', this.model.get('src')).attr('alt', '');

      this.el.onload = function() {
        this.onImageLoad();
        callback();
      }.bind(this);

      return this;
    },

    /**
     * Вызывается на onload картинки. Высчитывает размеры изображения
     * с учетом NEW_IMAGE_MAX_SIZE
     */
    onImageLoad: function() {
      var img = this.el;
      var w = img.naturalWidth;
      var h = img.naturalHeight;
      var max = app.ImageView.NEW_IMAGE_MAX_SIZE;

      if (Math.max(w, h) > max) {
        w = (img.naturalWidth / img.naturalHeight > 1) ? max : (max * img.naturalWidth / img.naturalHeight);
        h = (img.naturalWidth / img.naturalHeight > 1) ? (max * img.naturalHeight / img.naturalWidth) : max;
      }

      this.initialWidth = w;
      this.initialHeight = h;
    }
  }, {
    NEW_IMAGE_MAX_SIZE: 600
  });
})();
