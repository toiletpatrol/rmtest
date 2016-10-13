var app = app || {};

(function () {
  'use strict';

  app.ResizableView = Backbone.View.extend({
    tagName:  'div',
    className: 'resizable',

    /**
     * Both feel like a maintenance nightmare to me because 
     * a) you have to remember to give each subclass the property, 
     * b) the code is no longer isolated to one spot, and 
     * c) you're missing out on the beauty of inheritance.
     * (c) Eric Hynds
     */
    constructor: function() {
      this.options = { keepRatio: false };
      Backbone.View.apply(this, arguments);
    },

    render: function() { return this.$el; },

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

    enableResize: function(options) {
      this.options = _.extend(this.options, options);
      this.$el.append('<div class="resize__ne"></div>');
      this.$el.append('<div class="resize__nw"></div>');
      this.$el.append('<div class="resize__se"></div>');
      this.$el.append('<div class="resize__sw"></div>');
    },

    disableResize: function() {
      this.$el.find('[class^="resize__"]').remove();
    },

    events: {
      'mousedown .resize__ne': 'startResize',
      'mousedown .resize__nw': 'startResize',
      'mousedown .resize__se': 'startResize',
      'mousedown .resize__sw': 'startResize'
    },

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

    stopResize: function() {
      $('body').off('mousemove');
      this.updateModel();
    }
  }, {
    commonControlSelector: '[class^="resize__"]'
  });
})();