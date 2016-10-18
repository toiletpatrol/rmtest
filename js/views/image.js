var app = app || {};

(function () {
  'use strict';

  app.ImageView = Backbone.View.extend({
    tagName:  'div',
    className: 'image',
    template: _.template($('#image-view').html()),

    render: function() {
      return this.$el.html(this.template({
        model: this.model
      }));
    },

    events: {
      'change input': 'onChange'
    },

    onChange: function(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (function (e) {
          this.model.set({ src: e.target.result });
          this.render();
          this.trigger('imageLoaded');
        }).bind(this);

        reader.readAsDataURL(input.files[0]);
      }
    }
  });
})();