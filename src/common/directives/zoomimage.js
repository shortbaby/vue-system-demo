/**
 * @File 表格里操作指定
 */

'use strict';

Vue.directive('zoomimage', {
    params: ['id'],
    bind: function () {
        var self = this;
        $(this.el).find('.slider-log-img').zoomimage();
    }
});