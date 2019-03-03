var app = app || {};

(function () {
  'use strict';

  /**
   * BoxView - абстрактный контейнер для контрента на экране,
   * добавляемый пользователем. Наследуется от ResizableView
   */
  app.BoxView = app.ResizableView.extend({
    tagName:  'div',
    className: 'box',
    template: _.template($('#box-view').html()),
    events: _.extend({}, app.ResizableView.prototype.events, {
      'click .box__close': 'close'
    }),

    initialize: function() {
      this.listenTo(this.model, 'change:zIndex', (function() {
        this.$el.css('z-index', this.model.get('zIndex'));
      }).bind(this));
    },

    render: function() {
      var h = this.model.get('height');
      var w = this.model.get('width');

      /* CSS контейнера */
      var styles = {
        /* isNumeric - могут быть проценты или auto */
        height: $.isNumeric(h) ? (h + 'px') : h,
        width: $.isNumeric(w) ? (w + 'px') : h,
        left: this.model.get('left') + 'px',
        top: this.model.get('top') + 'px',
        'z-index': this.model.get('zIndex')
      };

      this.$el.html(this.template()).css(styles);

      if (this.nestedView) {
        this.$el.append(this.nestedView.$el);
      }

      return this;
    },

    /**
     * Обновляет модель по фактическим размерам блока
     */
    updateModel: function() {
      this.model.set({
        left: this.$el.position().left,
        top: this.$el.position().top,
        width: this.$el.width(),
        height: this.$el.height()
      });
    },

    /**
     * Сеттит контент
     */
    setNestedView: function(view) {
      this.nestedView && this.nestedView.remove();
      this.nestedView = view;
    },

    /**
     * Обновляет модель по фактическим размерам блока
     */
    enableDrag: function() {
      this.$el.draggable({
        cancel: app.ResizableView.commonControlSelector,
        stop: this.updateModel.bind(this),
        start: (function() { this.trigger('dragStart'); }).bind(this)
      }).on('click', (function() { this.trigger('dragStart'); }).bind(this));
    },

    /**
     * Закрывает и удаляет
     */
    close: function() {
      this.trigger('close');
    }
  });
})();
