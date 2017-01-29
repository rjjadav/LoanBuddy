/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('demoBanking')
    .constant('malarkey', malarkey)
    .constant('moment', moment);

})();
