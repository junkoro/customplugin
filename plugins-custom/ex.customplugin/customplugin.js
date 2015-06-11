'use strict';

var exec = require('cordova/exec');

var customplugin = {

  showNotification: function(title, text) {
    exec(null, null, 'customplugin', 'showNotification', [title, text]);
  }

};

module.exports = customplugin;
