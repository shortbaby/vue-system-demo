/**
 * @filter virgo 校区-配置
 * @author Zhang Chi(zhangchi03@baijiahulian.com)
 */

'use strict';

export default {

    schoolTypeOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '总校'
        },
        {
            value: 1,
            label: '直营分校区'
        }
    ],

    colorOptions: [
        {
            value: '#d0021b',
            label: '<span class="color-block" style="background: #d0021b;"></span>'
        },
        {
            value: '#d76e34',
            label: '<span class="color-block" style="background: #d76e34;"></span>'
        },
        {
            value: '#ff674d',
            label: '<span class="color-block" style="background: #ff674d;"></span>'
        },
        {
            value: '#ffc438',
            label: '<span class="color-block" style="background: #ffc438;"></span>'
        },
        {
            value: '#6b4ab7',
            label: '<span class="color-block" style="background: #6b4ab7;"></span>'
        },
        {
            value: '#a171d8',
            label: '<span class="color-block" style="background: #a171d8;"></span>'
        },
        {
            value: '#6d9bfb',
            label: '<span class="color-block" style="background: #6d9bfb;"></span>'
        },
        {
            value: '#f09ef0',
            label: '<span class="color-block" style="background: #f09ef0;"></span>'
        },
        {
            value: '#1d1d21',
            label: '<span class="color-block" style="background: #1d1d21;"></span>'
        },
        {
            value: '#7e98b3',
            label: '<span class="color-block" style="background: #7e98b3;"></span>'
        },
        {
            value: '#a0acbf',
            label: '<span class="color-block" style="background: #a0acbf;"></span>'
        },
        {
            value: '#d8d8d8',
            label: '<span class="color-block" style="background: #d8d8d8;"></span>'
        },
        {
            value: '#4a90e2',
            label: '<span class="color-block" style="background: #4a90e2;"></span>'
        },
        {
            value: '#21ceff',
            label: '<span class="color-block" style="background: #21ceff;"></span>'
        },
        {
            value: '#90d1f4',
            label: '<span class="color-block" style="background: #90d1f4;"></span>'
        },
        {
            value: '#24cfd1',
            label: '<span class="color-block" style="background: #24cfd1;"></span>'
        },
        {
            value: '#68cf84',
            label: '<span class="color-block" style="background: #68cf84;"></span>'
        },
        {
            value: '#7ed321',
            label: '<span class="color-block" style="background: #7ed321;"></span>'
        },
        {
            value: '#c8ff2b',
            label: '<span class="color-block" style="background: #c8ff2b;"></span>'
        },
        {
            value: '#ffec24',
            label: '<span class="color-block" style="background: #ffec24;"></span>'
        }
    ],

    getSchoolType: (id) => {
        if (id >= 0) {
            return ['总校', '直营分校区'][id];
        } else {
            return '';
        }
    },

    getColorBlock: (code) => {

    },

    optionMap: function (data, hasBlank) {
        let options = [];
        for (let k in data) {
            options.push({
                value: k,
                label: data[k]
            });
        }

        if (hasBlank) {
            return this.addBlank(options);
        } else {
            return options;
        }
    },

    addBlank: function (ary) {
        ary.unshift({
            value: '-1',
            label: '请选择'
        });
        return ary;
    }

};