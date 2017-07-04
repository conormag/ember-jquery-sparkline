/* eslint-env node */
'use strict';

module.exports = {
    name: 'ember-jquery-sparkline',

    included: function(app) {
        this.app = app;
        this._super.included(app);

        app.import(app.bowerDirectory + '/jquery.sparkline.dist/dist/jquery.sparkline.js');
    }
};