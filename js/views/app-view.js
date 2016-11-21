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

      boxView.render();

      this.$canvas.append(boxView.$el);
      this.calcCanvasHeight();

      // Scroll to new box
      $('html, body').animate({scrollTop: this.collection.bottom()});

      return boxView;
    },

    destroyBoxView: function(boxView) {
      boxView.model.destroy();
      boxView.remove();
      
      this.calcCanvasHeight();
    },

    moveBoxToTop: function(boxView) {
      var max = this.collection.maxIndex();
      
      if (boxView.model.get('zIndex') < max) {
        boxView.model.set('zIndex', max + 1);
        this.collection.optimize();
      }
    },

    events: {
      'click .controls_add-image': 'onAddImage',
      'click .controls_add-video': 'onAddVideo',
      'click .controls_add-info': 'onAddInfo'
    },

    onAddImage: function() {
      var uploadView = new app.ImageUploadView();
      uploadView.render();
      
      var boxView = this.createBoxView();
      boxView.setNestedView(uploadView);

      boxView.listenToOnce(uploadView, 'imageLoaded', this.onImageLoaded.bind(this, boxView));
    },

    onImageLoaded: function(boxView, src) {
      var imgView = new app.ImageView({
        model: new app.ImageModel({
          src: src
        })
      });

      imgView.render();
      
      boxView.model.set('width', imgView.width());
      boxView.model.set('height', imgView.height());
      
      boxView.setNestedView(imgView);

      boxView.enableResize({keepRatio: true});
      boxView.enableDrag();
    },

    onAddVideo: function() {
      var videoLoadView = new app.VideoLoadView();
      videoLoadView.render();
      
      var boxView = this.createBoxView();
      boxView.setNestedView(videoLoadView);

      boxView.listenToOnce(videoLoadView, 'thumbLoaded', this.onVideoThumbLoaded.bind(this, boxView));
    },

    onVideoThumbLoaded: function(boxView, src) {
      var videoView = new app.VideoView({
        model: new app.VideoModel({
          src: src
        })
      });

      videoView.render();

      boxView.model.set('width', videoView.width());
      boxView.model.set('height', videoView.height());

      boxView.setNestedView(videoView);

      boxView.enableResize({keepRatio: false});
      boxView.enableDrag();
    },

    onAddInfo: function() {
      var infoView = new app.InfoView();
      infoView.render();

      var boxView = this.createBoxView();
      boxView.model.set('height', 'auto');

      boxView.setNestedView(infoView);
      boxView.updateModel();
      boxView.render();

      boxView.enableDrag();
    }
  });

})();
