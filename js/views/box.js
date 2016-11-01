var app = app || {};

(function () {
  'use strict';

  app.BoxView = app.ResizableView.extend({
    tagName:  'div',
    className: 'box',
    template: _.template($('#box-view').html()),

    initialize: function() {
      this.listenTo(this.model, 'change:zIndex', (function() {
        this.$el.css('z-index', this.model.get('zIndex'));
      }).bind(this));


    },

    render: function() {
      this.$el.html(this.template()).css({
        height: this.model.get('height') + 'px',
        width: this.model.get('width') + 'px',
        left: this.model.get('left') + 'px',
        top: this.model.get('top') + 'px',
        'z-index': this.model.get('zIndex')
      });

      if (this.nestedView) {
        this.$el.append(this.nestedView.$el);
      }

      return this;
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
      this.nestedView && this.nestedView.remove();
      this.nestedView = view;
      this.render();
    },

    enableDrag: function() {
      this.$el.draggable({ 
        cancel: app.ResizableView.commonControlSelector,
        stop: this.updateModel.bind(this),
        start: (function() { this.trigger('dragStart'); }).bind(this)
      }).on('click', (function() { this.trigger('dragStart'); }).bind(this));
    },

    events: _.extend({}, app.ResizableView.prototype.events, {
      'click .box__close': 'close'
    }),

    close: function() {
      this.trigger('close');
    }

  });
})();