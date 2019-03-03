(function () {
  'use strict';

  /**
   * Коллекция BoxesCollection
   */
  app.BoxesCollection = Backbone.Collection.extend({
    model: app.BoxModel,

    /**
     * Возвращает самую нижнюю точку, занимаемую объектами в canvas
     */
    bottom: function() {
      var top = 0;

      this.each(function(box, index) {
        top = box.bottom() > top ? box.bottom() : top;
      });

      return top;
    },

    /**
     * Возвращает самый маленький z-index в коллекции
     */
    minIndex: function() {
      if (this.length == 0) { return 0; }

      var min = this.at(0).get('zIndex');

      this.each(function(box, index) {
        min = box.get('zIndex') < min ? box.get('zIndex') : min;
      });

      return min;
    },

    /**
     * Возвращает самый большой z-index в коллекции
     */
    maxIndex: function() {
      var max = 0;

      this.each(function(box, index) {
        max = box.get('zIndex') > max ? box.get('zIndex') : max;
      });

      return max;
    },

    /**
     * Оптимизирует z-index, чтобы они до небес не вырастали
     * в процессе работы. На каждый клик блок получает z-index равный
     * max + 1
     */
    optimize: function() {
      var min = this.minIndex();

      this.each(function(box, index) {
        var z = box.get('zIndex') - min;
        box.set({'zIndex': z});
      });
    }
  });
})();
