var app = app || {};

(function () {
  'use strict';

  app.ImageUploadView = Backbone.View.extend({
    tagName:  'div',
    className: 'image-upload',
    template: _.template($('#image-upload-view').html()),

    render: function() {
      return this.$el.html(this.template());
    },

    events: {
      'change input': 'onChange'
    },

    onChange: function(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (function (e) {
          var img = new Image();
          img.src = e.target.result;
          this.trigger('imageLoaded', e.target.result, img.naturalWidth, img.naturalHeight);
        }).bind(this);

        reader.readAsDataURL(input.files[0]);
      }
    }
  });
})();