var app = app || {};

(function () {
  'use strict';

  app.BoxView = app.ResizableView.extend({
    tagName:  'div',
    className: 'box',

    initialize: function() {},

    render: function() {
      return this.$el.css({
        height: this.model.get('height') + 'px',
        width: this.model.get('width') + 'px',
        left: this.model.get('left') + 'px',
        top: this.model.get('top') + 'px'
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

    setNestedView: function(view) {
      this.$nestedEl && this.$nestedEl.remove();
      this.$el.append(view.$el);
      this.$nestedEl = view.$el;
    },

    fitToContent: function() {
      if (this.$nestedEl) {
        this.$el.css({
          width: this.$nestedEl.width(),
          height: this.$nestedEl.height()
        });

        this.updateModel();
      }
    },

    enableDrag: function() {
      this.$el.draggable({ 
        cancel: app.ResizableView.commonControlSelector,
        stop: this.updateModel.bind(this)
      });
    }
  });
})();