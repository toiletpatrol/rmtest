var app = app || {};

(function () {
  'use strict';

  app.ImageView = Backbone.View.extend({
    tagName:  'img',
    className: 'image',

    render: function() {
      this.$el.attr('src', this.model.get('src')).attr('alt', '')

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

      return this;
    }
  }, {
    NEW_IMAGE_MAX_SIZE: 800
  });
})();