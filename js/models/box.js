/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.BoxModel = Backbone.Model.extend({
    defaults: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
      zIndex: 0
    },

    bottom: function() {
      return this.get('top') + this.get('height');
    }
  });
})();
