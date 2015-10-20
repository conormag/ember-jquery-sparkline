'use strict';

var JQUERY_SPARKLINE_VERSION = '2.1.2'

module.exports = {
  description: 'Installs jquery.sparkline as a dependency',

  normalizeEntityName: function() {},

  afterInstall: function(options) { 
    // https://github.com/rendro/easy-pie-chart
    return this.addBowerPackageToProject('jquery.sparkline.dist', JQUERY_SPARKLINE_VERSION);
  }
};
