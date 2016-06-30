/**
 * @filter virgo 老师-配置
 * @author Zhang Chi(zhangchi03@baijiahulian.com)
 */

'use strict';

export default {
    header: [
        {
            name: 'name',
            showName: '姓名'
        },
        {
            name: 'mobile',
            showName: '手机号'
        },
        {
            name: 'statusName',
            showName: '状态'
        },
        {
            name: 'userType',
            showName: '老师类型'
        },
        {
            name: 'gender',
            showName: '性别'
        },
        {
            name: 'schoolName',
            showName: '所属校区'
        },
        {
            name: 'subjectNames',
            showName: '教授科目'
        },
        {
            name: 'creatorName',
            showName: '添加人'
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
            value: 2,
            label: '禁用'
        }
    ],

    userTypeOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '全职'
        },
        {
            value: 1,
            label: '兼职'
        }
    ],

    genderOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '男'
        },
        {
            value: 1,
            label: '女'
        },
        {
            value: 2,
            label: '其他'
        }
    ],

    educationOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '小学'
        },
        {
            value: 1,
            label: '初中'
        },
        {
            value: 2,
            label: '高中'
        },
        {
            value: 3,
            label: '专科'
        },
        {
            value: 4,
            label: '本科'
        },
        {
            value: 5,
            label: '研究生'
        },
        {
            value: 6,
            label: '博士'
        },
        {
            value: 7,
            label: '博士后'
        },
        {
            value: 8,
            label: '其他'
        }
    ],

    getStatus: (id) => {
        if (id >= 0) {
            return ['正常', '删除', '禁用'][id];
        } else {
            return '';
        }
    },

    getUserType: (id) => {
        if (id >= 0) {
            return ['全职', '兼职'][id];
        } else {
            return '';
        }
    },

    getGender: (id) => {
        if (id >= 0) {
            return ['男', '女', '其他'][id];
        } else {
            return '';
        }
    },

    getEducationType: (id) => {
        if (id >= 0) {
            return ['高中', '中专', '大专', '本科', '研究生', '博士', '其他'][id];
        } else {
            return '';
        }
    },

    getAttendence: (id) => {
        if (id >= 0) {
            return ['未签到','已签到','请假','旷课','缺勤','迟到'][id];
        } else {
            return '';
        }
    },

    getColor: (id) => {
        return ['#d0021b','#f7cb1b','#f674dd','#6b4ab7','#ff0000', '#9dff00'][id];
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