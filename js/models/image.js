/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  /**
   * Модель Image
   */
  app.ImageModel = Backbone.Model.extend({
    defaults: {
      src: '',
      alt: ''
    }
  });
})();
