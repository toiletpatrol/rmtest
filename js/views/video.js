var app = app || {};

(function () {
  'use strict';

  app.VideoView = Backbone.View.extend({
    tagName:  'div',
    className: 'video',
    template: _.template($('#video-view').html()),

    render: function() {
      return this.$el.html(this.template({
        preview: this.model.getPreview()
      }));
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
      this.model.set('src', src);

      var url = this.model.getPreview();
      var downloadingImage = new Image();
      
      downloadingImage.onload = function(){
        this.render();
        this.trigger('videoSelected');
      }.bind(this);
      
      downloadingImage.src = url;
    },

    resetErrorState: function() {
      this.$el.find('input').removeClass('error');
    }
  });
})();