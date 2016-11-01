var app = app || {};

(function () {
  'use strict';

  app.VideoModel = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0
    }
  }, {
    getThumbURL: function(videoURL) {    
      var id = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
      }(videoURL);

      return VIDEO_URL_TEMPLATE.replace('ID', id);
    }
  });
})();
