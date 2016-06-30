/**
 * @filter virgo 校区-配置
 * @author Zhang Chi(zhangchi03@baijiahulian.com)
 */

'use strict';

export default {

    header: [
        {
            name: 'name',
            showName: '教室名称'
        },
        {
            name: 'capacity',
            showName: '教室容量'
        },
        {
            name: 'orgSchool',
            showName: '所属校区'
        },
        {
            name: 'status',
            showName: '状态'
        }
    ],

    statusOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '正常'
        },
        {
            value: 1,
            label: '禁用'
        }
    ],

    getStatus: (id) => {
        if (id >= 0) {
            return ['正常', '禁用'][id];
        } else {
            return '';
        }
    }

};