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
      'click button': 'buttonPressed'
    },

    buttonPressed: function() {
      this.model.set('src', this.$el.find('input').val());

      var url = this.model.getPreview();
      var downloadingImage = new Image();
      
      downloadingImage.onload = function(){
        this.render();
        this.trigger('videoSelected');
      }.bind(this);
      
      downloadingImage.src = url;
    }
  });
})();