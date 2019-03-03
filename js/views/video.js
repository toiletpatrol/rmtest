var app = app || {};

(function () {
  'use strict';

  /**
   * VideoView - показывает видео (на самом деле только превью)
   */
  app.VideoView = Backbone.View.extend({
    tagName:  'img',
    className: 'video-thumb',

    render: function() {
      var thumb = app.VideoModel.getThumbURL(this.model.get('src'));
      this.$el.attr('src', thumb).attr('alt', '');

      console.log();
      return this;
    },

    /**
     * Возвращает оригинальную ширину превью
     */
    width: function() {
      return this.el.naturalWidth;
    },

    /**
     * Возвращает оригинальную высоту превью
     */
    height: function() {
      return this.el.naturalHeight;
    }
  });
})();
