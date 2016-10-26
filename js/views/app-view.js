var app = app || {};

(function () {
  'use strict';

  app.AppView = Backbone.View.extend({
    tagName: 'div',
    className: 'app',
    
    initialize: function() {
      this.collection = new app.BoxesCollection();
      this.collection.on('change', this.calcCanvasHeight.bind(this));
      
      this.render();
    },

    render: function() {
      this.$el.prependTo('body');
      var $controls = _.template($('#controls').html());
      this.$canvas = $('<div class="canvas" />');
      this.$el.append($controls).append(this.$canvas);
    },

    calcCanvasHeight: function() {
      this.$canvas.css({ height: this.collection.bottom() + NEW_BOX_PADDING });
    },

    createBoxView: function() {
      var left = this.$el.width() / 2 - DEFAULT_BOX_WIDTH / 2;
      var top = this.collection.bottom() + NEW_BOX_PADDING;

      var box = new app.BoxModel({
        left: left,
        top: top,
        zIndex: this.collection.maxIndex() + 1
      });
      
      this.collection.add(box);

      var boxView = new app.BoxView({
        model: box
      });

      boxView.once('close', this.destroyBoxView.bind(this, boxView));
      boxView.on('dragStart', this.moveBoxToTop.bind(this, boxView));

      this.$canvas.append(boxView.render());
      this.calcCanvasHeight();

      // Scroll to new box
      $('html, body').animate({scrollTop: this.collection.bottom()});

      return boxView;
    },

    destroyBoxView: function(boxView, box) {
      boxView.model.destroy();
      boxView.remove();
      
      this.calcCanvasHeight();
    },

    moveBoxToTop: function(boxView) {
      var max = this.collection.maxIndex();
      
      if (boxView.model.get('zIndex') < max) {
        boxView.model.set('zIndex', max + 1);
      }
    },

    events: {
      'click .controls_add-photo': 'onAddImage',
      'click .controls_add-video': 'onAddVideo'
    },

    onAddImage: function() {
      var imgView = new app.ImageView({
        model: new app.ImageModel()
      });
      imgView.render();
      
      var boxView = this.createBoxView();
      boxView.setNestedView(imgView);

      boxView.listenToOnce(imgView, 'imageLoaded', function() {
        boxView.enableResize({keepRatio: true});
        boxView.enableDrag();
        boxView.fitToContent();
      });
    },

    onAddVideo: function() {
      var videoView = new app.VideoView({
        model: new app.VideoModel()
      });
      videoView.render();
      
      var boxView = this.createBoxView();
      boxView.setNestedView(videoView);

      boxView.listenToOnce(videoView, 'videoSelected', function() {
        boxView.enableResize();
        boxView.enableDrag();
        boxView.fitToContent();
      });
    }
  });

})();
