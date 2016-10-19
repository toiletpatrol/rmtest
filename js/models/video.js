var app = app || {};

(function () {
  'use strict';

  app.VideoModel = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0
    },

    getPreview: function() {
      if (this.get('src')) {
        var id = function(url) {
          var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
          var match = url.match(regExp);
          return (match && match[7].length == 11) ? match[7] : false;
        }(this.get('src'));

        return VIDEO_URL_TEMPLATE.replace('ID', id);
      }
    }
  });
})();
