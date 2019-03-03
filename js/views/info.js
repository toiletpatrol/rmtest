var app = app || {};

(function () {
  'use strict';

  /**
   * InfoView - немного текста о приложении
   */
  app.InfoView = Backbone.View.extend({
    tagName:  'div',
    className: 'info',
    template: _.template($('#info-view').html()),

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
})();
