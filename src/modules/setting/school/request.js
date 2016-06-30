'use strict';

import { post }  from '../../../common/util/service';

/**
 * 获取校区信息
 * @return {Promise}
 */
export function getInfo (param) {
    return post('/school/detail.json', param);
}

/**
 * 获取校区列表
 * @return {Promise}
 */
export function getList (param) {
    return post('/school/list.json', param);
}

/**
 * 保存校区
 * @return {Promise}
 */
export function save (param) {
    return post('/school/add.json', param);
}

/**
 * 编辑校区
 * @return {Promise}
 */
export function saveEdit (param) {
    return post('/school/edit.json', param);
}


/**
 * 删除校区
 * @return {Promise}
 */
export function del (param) {
    return post('/school/del.json', param);
}


/**
 * 下拉选项
 * @return {Promise}
 */
export function getOptions (param) {
    return post('/school/getOptions.json', param);
}

/**
 * 输入联想
 * @return {Promise}
 */
export function inference (param) {
    return post('/user/userByName.json', param);
}
