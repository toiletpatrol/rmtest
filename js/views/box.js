var app = app || {};

(function () {
  'use strict';

  app.BoxView = Backbone.View.extend({
    tagName:  'div',
    className: 'box',

    initialize: function() {

    },

    render: function() {
      this.$el.append('<div class="box_resize"></div>');

      return this.$el.css({
        height: this.model.get('height') + 'px',
        width: this.model.get('width') + 'px',
        left: this.model.get('left') + 'px',
        top: this.model.get('top') + 'px'
      }).draggable({ 
        cancel: '.box_resize, input, button',
        stop: this.updateModel.bind(this)
      });
    },

    resizeNE: function(event) {
      var w = event.pageX - this.$el.offset().left;
      var h = this.$el.offset().top + this.$el.height() - event.pageY;
      var t = event.pageY - this.$el.offsetParent().offset().top;

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
    },

    events: {
      'mousedown .box_resize': 'startResizeNE'
    },

    startResizeNE: function(event) {
      var that = this;
      
      $('body').one('mouseup', function() {
        that.stopResize();
      }).on('mousemove', this.resizeNE.bind(this));
    },

    stopResize: function() {
      $('body').off('mousemove');
      this.updateModel();
    }
  });
})();