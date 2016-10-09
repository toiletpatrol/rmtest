var app = app || {};

(function () {
  'use strict';

  app.VideoView = Backbone.View.extend({
    tagName:  'div',
    className: 'box-video',

    render: function() {
      this.$form = $('<div class="form" />').appendTo(this.$el); 
      this.$input = $('<input type="text" value="https://www.youtube.com/watch?v=ScK1_uPz5_o" />').appendTo(this.$form);
      this.$button = $('<button>OK</button>').appendTo(this.$form);
    },

    events: {
      'click button': 'buttonPressed'
    },

    buttonPressed: function() {
      var id = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
      }(this.$input.val());

      var url = VIDEO_URL_TEMPLATE.replace('ID', id);

      this.$img = $('<img alt="" />').attr('src', url).appendTo(this.$el);

      this.$form.remove();
    }
  });
})();