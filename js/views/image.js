var app = app || {};

(function () {
  'use strict';

  app.ImageView = Backbone.View.extend({
    tagName:  'div',
    className: 'image',

    render: function() {
      this.$form = $('<div class="form" />').appendTo(this.$el);
      this.$input = $('<input type="file" />').appendTo(this.$form);
    },

    events: {
      'change input': 'onChange'
    },

    onChange: function() {
      var that = this;
      var input = this.$input.get(0);

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          that.$form.remove();
          
          that.$img = $('<img alt="your image" />')
            .attr('src', e.target.result)
            .appendTo(that.$el);

          that.trigger('imageSelected');
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
  });
})();