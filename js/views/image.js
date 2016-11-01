var app = app || {};

(function () {
  'use strict';

  app.ImageView = Backbone.View.extend({
    tagName:  'img',
    className: 'image',

    render: function() {
      return this.$el.attr('src', this.model.get('src')).attr('alt', '');
    },

    width: function() {
      return this.el.naturalWidth;
    },

    height: function() {
      return this.el.naturalHeight;
    }
  });
})();