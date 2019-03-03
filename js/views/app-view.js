var app = app || {};

(function () {
  'use strict';

  /**
   * AppView - корневая view, содержит всю логику приложения
   */
  app.AppView = Backbone.View.extend({
    tagName: 'div',
    className: 'app',
    events: {
      'click .controls_add-image': 'showImageUploadForm',
      'click .controls_add-video': 'showVideoUploadForm',
      'click .controls_add-info': 'showInfoBox'
    },

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

    /**
     * canvas это родительский элемент для всех добавляемых блоков,
     * высота вычисляется по нижней границе последнего элемента
     */
    calcCanvasHeight: function() {
      this.$canvas.css({ height: this.collection.bottom() + app.AppView.NEW_BOX_PADDING });
    },

    /**
     * Создает новый box, скроллит документ к нему
     */
    createBoxView: function() {
      var width = app.AppView.NEW_BOX_WIDTH;
      var height = app.AppView.NEW_BOX_HEIGHT;

      var left = this.$el.width() / 2 - app.AppView.NEW_BOX_WIDTH / 2;
      var top = this.collection.bottom() + app.AppView.NEW_BOX_PADDING;

      var box = new app.BoxModel({
        width: width,
        height: height,
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

      $('html, body').animate({scrollTop: this.collection.bottom()});

      return boxView;
    },

    /**
     * Удаляет box
     */
    destroyBoxView: function(boxView) {
      boxView.model.destroy();
      boxView.remove();

      this.calcCanvasHeight();
    },

    /**
     * Поднимает box над другими
     */
    moveBoxToTop: function(boxView) {
      var max = this.collection.maxIndex();

      if (boxView.model.get('zIndex') < max) {
        boxView.model.set('zIndex', max + 1);
        this.collection.optimize();
      }
    },

    /**
     * Создает box с формой загрузки картинки
     */
    showImageUploadForm: function() {
      var uploadView = new app.ImageUploadView();
      uploadView.render();

      var boxView = this.createBoxView();
      boxView.setNestedView(uploadView);
      boxView.render();

      boxView.listenToOnce(uploadView, 'imageLoaded', this.onImagePicked.bind(this, boxView));
    },

    /**
     * Вызывается после того, как пользователь выбрал картинку
     */
    onImagePicked: function(boxView, src) {
      var imgModel = new app.ImageModel({
        src: src
      });

      var imgView = new app.ImageView({
        model: imgModel
      });

      boxView.setNestedView(imgView);
      boxView.render();

      imgView.render(() => {
        boxView.model.set('width', imgView.initialWidth);
        boxView.model.set('height', imgView.initialHeight);
        boxView.render();

        console.log(imgView.initialWidth, imgView.initialHeight);

        boxView.enableResize({keepRatio: true});
        boxView.enableDrag();
      });
    },

    /**
     * Создает box с формой загрузки видео с youtube
     */
    showVideoUploadForm: function() {
      var videoLoadView = new app.VideoLoadView();
      videoLoadView.render();

      var boxView = this.createBoxView();
      boxView.setNestedView(videoLoadView);
      boxView.render();

      videoLoadView.focus();

      boxView.listenToOnce(
        videoLoadView,
        'thumbLoaded',
        this.onVideoThumbLoaded.bind(this, boxView)
      );
    },

    /**
     * Вызывается, когда пользователь указал адрес видео и нажал submit
     */
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
      boxView.render();

      boxView.enableResize({keepRatio: false});
      boxView.enableDrag();
    },

    /**
     * Показывает box с информацией
     */
    showInfoBox: function() {
      var infoView = new app.InfoView();
      infoView.render();

      var boxView = this.createBoxView();
      boxView.model.set('height', 'auto');

      boxView.setNestedView(infoView);
      boxView.render();
      boxView.updateModel();

      boxView.enableDrag();
    }
  }, {
    NEW_BOX_PADDING: 50,
    NEW_BOX_WIDTH: 324,
    NEW_BOX_HEIGHT: 200
  });

})();
