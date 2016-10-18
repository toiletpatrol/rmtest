/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.ImageModel = Backbone.Model.extend({
    defaults: {
      src: '',
      alt: ''
    }
  });
})();
