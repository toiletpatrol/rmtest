var app = app || {};

(function () {
  'use strict';

  app.VideoView = Backbone.View.extend({
    tagName:  'img',
    className: 'video-thumb',

    render: function() {
      var thumb = app.VideoModel.getThumbURL(this.model.get('src'));
      this.$el.attr('src', thumb).attr('alt', '');

      console.log();
      return this;
    },

    width: function() {
      return this.el.naturalWidth;
    },

    height: function() {
      return this.el.naturalHeight;
    }
  });
})();