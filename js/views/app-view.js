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
      this.canvas.css({height: this.collection.bottom()});
    },

    createBoxView: function() {
      var left = this.$el.width() / 2 - DEFAULT_BOX_WIDTH / 2;
      var top = this.collection.bottom();

      // Add padding if new top is larger than 0
      top = top && top + NEW_BOX_PADDING;

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
    },

    onAddVideo: function() {
      var boxView = this.createBoxView();
      var video = new app.VideoView();

      video.render();
      
      boxView.appendView(video);
    }
  });

})();
