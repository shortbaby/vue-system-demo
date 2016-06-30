/**
 * @filter virgo 课程-配置
 * @author Zhang Chi(zhangchi03@baijiahulian.com)
 */

'use strict';

export default {
    header: [
        {
            name: 'name',
            showName: '课程名称'
        },
        {
            name: 'number',
            showName: '班号'
        },
        {
            name: 'subjectName',
            showName: '课程类型'
        },
        {
            name: 'totalPrice',
            showName: '总价',
            type: 'currency',
            minWidth: 100
        },
        {
            name: 'price',
            showName: '课单价',
            type: 'currency',
            minWidth: 80
        },
        {
            name: 'lessonStat',
            showName: '已上/总课时'
        },
        {
            name: 'capacity',
            showName: '人数'
        },
        {
            name: 'classesType',
            showName: '班级班制'
        },
        {
            name: 'signCount',
            showName: '已报名人数'
        },
        {
            name: 'startTime',
            showName: '开班日期'
        },
        {
            name: 'classesStatus',
            showName: '状态'
        }
    ],

    subjectHeader: [
        {
            name: 'name',
            showName: '课程一级分类名称'
        },
        {
            name: 'code',
            showName: '分类代码'
        },
        {
            name: 'initialTime',
            showName: '创建时间'
        }
    ],

    categoryHeader: [
        {
            name: 'subTypeName',
            showName: '课程二级分类名称'
        },
        {
            name: 'name',
            showName: '所属课程一级分类名称'
        },
        {
            name: 'initialTime',
            showName: '创建时间'
        }
    ],

    lessonHeader: [
        {
            name: 'day',
            showName: '上课日期'
        },
        {
            name: 'section',
            showName: '时间'
        },
        {
            name: 'lessonDetail',
            showName: '科目'
        },
        {
            name: 'roomName',
            showName: '教室'
        },
        {
            name: 'teacherName',
            showName: '老师'
        }
    ],

    classesStatusOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '招生中'
        },
        {
            value: 1,
            label: '已关闭'
        },
        {
            value: 2,
            label: '上课中'
        },
        {
            value: 3,
            label: '已结课'
        }
    ],

    studyPhaseOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: '基础班'
        },
        {
            value: 1,
            label: '强化班'
        },
        {
            value: 2,
            label: '冲刺班'
        },
        {
            value: 3,
            label: '其他'
        }
    ],

    classesTypeOptions: [
        {
            value: -1,
            label: '请选择'
        },
        {
            value: 0,
            label: 'VIP'
        },
        {
            value: 1,
            label: '班课'
        }
    ],

    detailTabs: [
        {
            text: '课程安排',
            value: 'arrangement'
        },
        {
            text: '课程详情',
            value: 'information'
        }
    ],

    getType: function (id) {
        if (id >= 0) {
            return ['VIP', '班课'][id];
        } else {
            return '';
        }
    },

    getStatus: function (id) {
        if (id >= 0) {
            return ['招生中', '已关闭', '上课中', '已结课'][id];
        } else {
            return '';
        }
    }

};