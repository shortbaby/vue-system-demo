'use strict';

import { post }  from '../../../common/util/service';

/**
 * 获取老师信息
 * @return {Promise}
 */
export function getInfo (param) {
    return post('/teacher/detail.json', param);
}

/**
 * 获取老师列表
 * @return {Promise}
 */
export function getList (param) {
    return post('/teacher/list.json', param);
}

/**
 * 保存老师
 * @return {Promise}
 */
export function save (param) {
    return post('/teacher/add.json', param);
}

/**
 * 编辑老师
 * @return {Promise}
 */
export function saveEdit (param) {
    return post('/teacher/edit.json', param);
}


/**
 * 删除老师
 * @return {Promise}
 */
export function del (param) {
    return post('/teacher/del.json', param);
}

/**
 * 禁用老师
 * @return {Promise}
 */
export function disable (param) {
    return post('/teacher/disable.json', param);
}

/**
 * 启用老师
 * @return {Promise}
 */
export function enable (param) {
    return post('/teacher/enable.json', param);
}

/**
 * 重置密码
 * @return {Promise}
 */
export function reset (param) {
    return post('/teacher/reset.json', param);
}

/**
 * 搜索选项
 * @return {Promise}
 */
export function getOptions (param) {
    return post('/teacher/getOptions.json', param);
}

/**
 * 获取考勤信息
 * @return {Promise}
 */
export function getAttendances (param) {
    return post('/teacher/viewAttendances.json', param);
}

/**
 * 导出考勤信息
 * @return {Promise}
 */
export function exportAttendance (param) {
    return post('/teacher/export.json', param);
}

export function getTeacherByName (params) {
    return post('/teacher/teacherByName.json', params);
}
