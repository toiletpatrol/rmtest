var app = app || {};

(function () {
  'use strict';

  /**
   * ResizableView - абстрактная view для инкапсуляции логики ресайза
   */
  app.ResizableView = Backbone.View.extend({
    tagName:  'div',
    className: 'resizable',
    events: {
      'mousedown .resize__ne': 'startResize',
      'mousedown .resize__nw': 'startResize',
      'mousedown .resize__se': 'startResize',
      'mousedown .resize__sw': 'startResize'
    },

    constructor: function() {
      this.options = { keepRatio: false };
      Backbone.View.apply(this, arguments);
    },

    render: function() { return this.$el; },

    /**
     * Ресайз за верхний правый край
     */
    resizeNE: function(event) {
      // Bottom of the box relative to parent
      var b = this.$el.position().top + this.$el.height();

      var w = event.pageX - this.$el.offset().left;
      var h = this.$el.offset().top + this.$el.height() - event.pageY;

      // Check dimentions
      w = w < 0 ? 0 : w;
      h = h < 0 ? 0 : h;

      if (this.options.keepRatio) {
        // Keep the ratio
        if (w / h > this.ratio) {
          h = w / this.ratio;
        } else {
          w = h * this.ratio;
        }
      }

      // Stick to the same bottom line
      var t = b - h;

      this.$el.css({
        width: w,
        height: h,
        top: t
      });
    },

    /**
     * Ресайз за верхний левый край
     */
    resizeNW: function(event) {
      // Bottom of the box relative to parent
      var b = this.$el.position().top + this.$el.height();

      // Right side of the box relative to parent
      var r = this.$el.position().left + this.$el.width();

      var w = this.$el.offset().left + this.$el.width() - event.pageX;
      var h = this.$el.offset().top + this.$el.height() - event.pageY;

      // Check dimentions
      w = w < 0 ? 0 : w;
      h = h < 0 ? 0 : h;

      if (this.options.keepRatio) {
        // Keep the ratio
        if (w / h > this.ratio) {
          h = w / this.ratio;
        } else {
          w = h * this.ratio;
        }
      }

      // Stick to the same bottom line
      var t = b - h;
      var l = r - w;

      this.$el.css({
        width: w,
        height: h,
        top: t,
        left: l
      });
    },

    /**
     * Ресайз за нижний правый край
     */
    resizeSE: function(event) {
      var w = event.pageX - this.$el.offset().left;
      var h = event.pageY - this.$el.offset().top;

      // Check dimentions
      w = w < 0 ? 0 : w;
      h = h < 0 ? 0 : h;

      if (this.options.keepRatio) {
        // Keep the ratio
        if (w / h > this.ratio) {
          h = w / this.ratio;
        } else {
          w = h * this.ratio;
        }
      }

      this.$el.css({
        width: w,
        height: h
      });
    },

    /**
     * Ресайз за нижний левый край
     */
    resizeSW: function(event) {
      var w = this.$el.offset().left - event.pageX + this.$el.width();
      var h = event.pageY - this.$el.offset().top;

      // Right side of the box relative to parent
      var r = this.$el.position().left + this.$el.width();

      // Check dimentions
      w = w < 16 ? 16 : w;
      h = h < 16 ? 16 : h;

      if (this.options.keepRatio) {
        // Keep the ratio
        if (w / h > this.ratio) {
          h = w / this.ratio;
        } else {
          w = h * this.ratio;
        }
      }

      var l = r - w;

      this.$el.css({
        width: w,
        height: h,
        left: l
      });
    },

    /**
     * Включает возможность ресайзить блок, добавляет контролы
     */
    enableResize: function(options) {
      this.options = _.extend(this.options, options);
      this.$el.append('<div class="resize__ne"></div>');
      this.$el.append('<div class="resize__nw"></div>');
      this.$el.append('<div class="resize__se"></div>');
      this.$el.append('<div class="resize__sw"></div>');
    },

    /**
     * Выключает возможность ресайзить блок, удаляет контролы
     */
    disableResize: function() {
      this.$el.find('[class^="resize__"]').remove();
    },

    /**
     * Вызывается, когда пользователь нажал на кнопку мыши,
     * наведя на контрол ресайза
     */
    startResize: function(event) {
      event.preventDefault();

      this.ratio = this.$el.width()/this.$el.height();

      var handler = function() {};
      if (event.target.className == 'resize__ne') handler = this.resizeNE;
      if (event.target.className == 'resize__nw') handler = this.resizeNW;
      if (event.target.className == 'resize__se') handler = this.resizeSE;
      if (event.target.className == 'resize__sw') handler = this.resizeSW;

      $(document).one('mouseup', this.stopResize.bind(this));
      $('body').on('mousemove', handler.bind(this));
    },

    /**
     * Вызывается, когда пользователь отпустил контрол ресайза
     */
    stopResize: function() {
      $('body').off('mousemove');
      this.updateModel();
    }
  }, {
    commonControlSelector: '[class^="resize__"]'
  });
})();
