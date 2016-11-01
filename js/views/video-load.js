var app = app || {};

(function () {
  'use strict';

  app.VideoLoadView = Backbone.View.extend({
    tagName:  'div',
    className: 'video-load',
    template: _.template($('#video-load-view').html()),

    render: function() {
      return this.$el.html(this.template());
    },

    events: {
      'click button': 'buttonPressed',
      'change input': 'resetErrorState',
      'keyup input': 'resetErrorState'
    },

    buttonPressed: function() {
      var input =  this.$el.find('input');

      if (input.val()) {
        this.loadPreview(input.val());
      } else {
        input.addClass('error').focus();
      }
    },

    loadPreview: function(src) {
      var url = app.VideoModel.getThumbURL(src);
      var downloadingImage = new Image();
      
      downloadingImage.onload = function(){
        this.trigger('thumbLoaded', src);
      }.bind(this);
      
      downloadingImage.src = url;
    },

    resetErrorState: function() {
      this.$el.find('input').removeClass('error');
    }
  });
})();