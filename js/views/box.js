var app = app || {};

(function () {
  'use strict';

  app.BoxView = Backbone.View.extend({
    tagName:  'div',
    className: 'box',

    initialize: function() {

    },

    render: function() {
      return this.$el.css({
        height: this.model.get('height') + 'px',
        width: this.model.get('width') + 'px',
        left: this.model.get('left') + 'px',
        top: this.model.get('top') + 'px'
      });
    },

    resizeNE: function(event) {
      if (typeof this.ratio == 'undefined') {
        this.ratio = this.$el.width()/this.$el.height();
      }

      // Bottom of the box relative to parent
      var b = this.$el.position().top + this.$el.height();

      var w = event.pageX - this.$el.offset().left;
      var h = this.$el.offset().top + this.$el.height() - event.pageY;
      
      // Check dimentions
      w = w < 0 ? 0 : w;
      h = h < 0 ? 0 : h;

      // Keep the ratio
      if (w / h > this.ratio) {
        h = w / this.ratio;
      } else {
        w = h * this.ratio;
      }

      // Stick to the same bottom line
      var t = b - h;

      this.$el.css({
        width: w,
        height: h,
        top: t
      });
    },

    updateModel: function() {
      this.model.set({
        left: this.$el.position().left,
        top: this.$el.position().top,
        width: this.$el.width(),
        height: this.$el.height()
      });
    },

    appendView: function(view) {
      this.$el.append(view.$el);
      this.$nestedEl = view.$el;
    },

    fitToContent: function() {
      console.log(this.$nestedEl);
      if (this.$nestedEl) {
        this.$el.css({
          width: this.$nestedEl.width(),
          height: this.$nestedEl.height()
        });

        this.updateModel();
      }
    },

    enableResize: function() {
      if (this.$resize) {
        this.$resize.show();
      } else {
        this.$resize = $('<div class="box_resize"></div>').appendTo(this.$el);
      }
    },

    disableResize: function() {
      this.$resize.hide();
    },

    enableDrag: function() {
      this.$el.draggable({ 
        cancel: '.box_resize, input, button',
        stop: this.updateModel.bind(this)
      });
    },

    events: {
      'mousedown .box_resize': 'startResizeNE'
    },

    startResizeNE: function(event) {
      var that = this;

      event.preventDefault();
      
      $('body').one('mouseup', function() {
        that.stopResize();
      }).on('mousemove', this.resizeNE.bind(this));
    },

    stopResize: function() {
      $('body').off('mousemove');
      this.updateModel();
    }
  }, Backbone.Events);
})();