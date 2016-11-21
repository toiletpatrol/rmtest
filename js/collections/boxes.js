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
    },

    minIndex: function() {
      if (this.length == 0) { return 0; }

      var min = this.at(0).get('zIndex');

      this.each(function(box, index) {
        min = box.get('zIndex') < min ? box.get('zIndex') : min;        
      });

      return min;
    },

    maxIndex: function() {
      var max = 0;

      this.each(function(box, index) {
        max = box.get('zIndex') > max ? box.get('zIndex') : max;        
      });

      return max;
    },

    optimize: function() {
      var min = this.minIndex();

      this.each(function(box, index) {
        var z = box.get('zIndex') - min;
        box.set({'zIndex': z});
      });
    }
  });
})();