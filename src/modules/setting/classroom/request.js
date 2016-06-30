'use strict';

import { post }  from '../../../common/util/service';

/**
 * 获取教室信息
 * @return {Promise}
 */
export function getInfo (param) {
    return post('/roomDetail/detail.json', param);
}

/**
 * 获取教室列表
 * @return {Promise}
 */
export function getList (param) {
    return post('/roomDetail/list.json', param);
}

/**
 * 保存教室
 * @return {Promise}
 */
export function save (param) {
    return post('/roomDetail/add.json', param);
}

/**
 * 编辑教室
 * @return {Promise}
 */
export function saveEdit (param) {
    return post('/roomDetail/edit.json', param);
}


/**
 * 删除教室
 * @return {Promise}
 */
export function del (param) {
    return post('/roomDetail/del.json', param);
}

/**
 * 启用／禁用教室
 * @return {Promise}
 */
export function disable (param) {
    return post('/roomDetail/disable.json', param);
}


/**
 * 下拉选项
 * @return {Promise}
 */
export function getOptions (param) {
    return post('/school/getOptions.json', param);
}
