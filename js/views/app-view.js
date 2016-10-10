var app = app || {};

(function () {
  'use strict';

  app.AppView = Backbone.View.extend({
    el: '.app',
    
    initialize: function() {
      this.collection = new app.BoxesCollection();
      this.collection.on('change', this.calcCanvasHeight.bind(this));
      this.canvas = this.$el.find('.canvas');
      this.render();
    },

    render: function() {},

    calcCanvasHeight: function() {
      this.canvas.css({ height: this.collection.bottom() + NEW_BOX_PADDING });
    },

    createBoxView: function() {
      var left = this.$el.width() / 2 - DEFAULT_BOX_WIDTH / 2;
      var top = this.collection.bottom() + NEW_BOX_PADDING;

      var box = new app.BoxModel({
        left: left,
        top: top
      });
      
      this.collection.add(box);

      var boxView = new app.BoxView({
        model: box
      });

      this.canvas.append(boxView.render());
      this.calcCanvasHeight();

      // Scroll to new box
      $('html, body').animate({scrollTop: this.collection.bottom()});

      return boxView;
    },

    events: {
      'click .controls_add-photo': 'onAddPhoto',
      'click .controls_add-video': 'onAddVideo'
    },

    onAddPhoto: function() {
      var boxView = this.createBoxView();
      var img = new app.ImageView();

      img.render();
      
      boxView.appendView(img);

      img.on('imageSelected', function() {
        boxView.enableResize();
        boxView.enableDrag();
        boxView.fitToContent();
      });
    },

    onAddVideo: function() {
      var boxView = this.createBoxView();
      var video = new app.VideoView();

      video.render();
      
      boxView.appendView(video);

      video.on('videoSelected', function() {
        boxView.enableResize();
        boxView.enableDrag();
        boxView.fitToContent();
      });
    }
  });

})();
