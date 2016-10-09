(function () {
  'use strict';

  app.BoxesCollection = Backbone.Collection.extend({
    model: app.BoxModel,

    bottom: function() {
      var top = 0;
      
      this.each(function(box, index) {
        top = box.bottom() > top ? box.bottom() : top;        
      });

      return top;
    }
  });
})();