/**
 * @File 下拉菜单操作
 */

'use strict';

Vue.directive('down', {
    params: ['option'],
    bind: function () {
       
        var ul = $('.down-popover-menu');
        var loaded = false;
        var self = this;

        if (!ul.length) {

            var processItem = '';
            var option = this.params.option || [];

            option.forEach(function (item) {
                processItem += '<li data-command="' + item.command + '">' + item.text + '</li>';
            });

            $('body').append('<ul class="dropdown-menu down-popover-menu">' + processItem + '</ul>');
            ul = $('.down-popover-menu');

        } else {
            loaded = true;
        }

        $(this.el)
            .on('click', function (event) {
                var target = $(event.currentTarget);
                var offset = target.offset();
                var name = target.attr('data-name');
                var id = target.attr('data-id');

                $('body')
                    .data('id', id)
                    .data('name', name);

                event.stopPropagation();
                
                var _x = offset.left;
                ul
                    .css({
                        top: offset.top + target.outerHeight(),
                        left: offset.left
                    })
                    .slideDown('fast');
            });
        let vueComponent = self.vm;
        function _bodyClick(event) {
            // debugger;
            var command = $(event.target).data('command');
            var data = $('body').data();

            if (command) {
                vueComponent.$emit(command, +data.id, data.name);
            }
            ul&&ul.slideUp('fast');
        }

        self._bodyClick = _bodyClick;

        if (!loaded) {
            $('body').bind('click', self._bodyClick);
            window.router.beforeEach(function () {
                $('body').unbind('click', self._bodyClick);
                if (ul) {
                    ul.remove();
                    ul = null;
                }
            });
        }
    },
    unbind: function () {
        // debugger;
        // $('body').unbind('click', this._bodyClick);
        // setTimeout(function () {
        //     $('.down-popover-menu').remove();
        // });
    }
});