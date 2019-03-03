var app = app || {};

(function () {
  'use strict';

  /**
   * VideoLoadView - загрузка видео
   */
  app.VideoLoadView = Backbone.View.extend({
    tagName:  'div',
    className: 'video-load',
    template: _.template($('#video-load-view').html()),
    events: {
      'click button': 'buttonPressed',
      'change input': 'resetErrorState',
      'keyup input': 'resetErrorState',
      'keydown input': 'onPressKey',
      'keydown button': 'onPressKey'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    /**
     * Ставит фокус на инпут
     */
    focus: function() {
      this.$el.find('input').focus();
    },

    /**
     * Вызывается на нажание кнопки submit
     */
    buttonPressed: function() {
      var input =  this.$el.find('input');

      if (input.val()) {
        this.loadPreview(input.val());
      } else {
        input.addClass('error').focus();
      }
    },

    /**
     * Загружает превью видео
     */
    loadPreview: function(src) {
      var url = app.VideoModel.getThumbURL(src);
      var downloadingImage = new Image();

      downloadingImage.onload = function(){
        this.trigger('thumbLoaded', src);
      }.bind(this);

      downloadingImage.src = url;
    },

    /**
     * Удаляет ошибку и все ее атрибуты
     */
    resetErrorState: function() {
      this.$el.find('input').removeClass('error');
    },

    /**
     * Обрабатывает нажатие кнопки Enter клавиатуры
     */
    onPressKey: function(e) {
      if (e.keyCode == 13) { this.buttonPressed() }
    }
  });
})();
