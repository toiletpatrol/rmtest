var app = app || {};

(function () {
  'use strict';

  /**
   * Модель Video
   */
  app.VideoModel = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0
    }
  }, {
    VIDEO_URL_TEMPLATE: 'http://img.youtube.com/vi/ID/0.jpg',

    /**
     * Статический метод, который по адресу youtube-видео
     * возвращает адрес превью
     */
    getThumbURL: function(videoURL) {
      var id = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
      }(videoURL);

      return app.VideoModel.VIDEO_URL_TEMPLATE.replace('ID', id);
    }
  });
})();
