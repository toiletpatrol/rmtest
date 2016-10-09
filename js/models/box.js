/*global Backbone */
var app = app || {};

(function () {
  'use strict';

  app.BoxModel = Backbone.Model.extend({

    defaults: {
      width: DEFAULT_BOX_WIDTH,
      height: DEFAULT_BOX_HEIGHT,
      left: 0,
      top: 0
    },

    bottom: function() {
      return this.get('top') + this.get('height');
    }
  });
})();
