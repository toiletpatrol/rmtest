/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  /**
   * Модель Box
   */
  app.BoxModel = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      zIndex: 0
    },

    /**
     * Возвращает позицию нижней точки box в координатах canvas
     */
    bottom: function() {
      return this.get('top') + this.get('height');
    }
  });
})();
