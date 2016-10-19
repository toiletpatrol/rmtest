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
        top: top
      });
      
      this.collection.add(box);

      var boxView = new app.BoxView({
        model: box
      });

      this.$canvas.append(boxView.render());
      this.calcCanvasHeight();

      // Scroll to new box
      $('html, body').animate({scrollTop: this.collection.bottom()});

      return boxView;
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

      boxView.listenTo(imgView, 'imageLoaded', function(src) {
        boxView.enableResize({keepRatio: true});
        boxView.enableDrag();
        boxView.fitToContent();
      });
    },

    onAddVideo: function() {
      var boxView = this.createBoxView();
      var video = new app.VideoView({
        model: new app.VideoModel()
      });

      video.render();
      
      boxView.setNestedView(video);

      video.on('videoSelected', function() {
        boxView.enableResize();
        boxView.enableDrag();
        boxView.fitToContent();
      });
    }
  });

})();
