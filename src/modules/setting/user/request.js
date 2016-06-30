'use strict';

import { post }  from '../../../common/util/service';

/**
 * 获取用户信息
 * @return {Promise}
 */
export function getInfo (param) {
    return post('/user/detail.json', param);
}

/**
 * 获取用户列表
 * @return {Promise}
 */
export function getList (param) {
    return post('/user/list.json', param);
}

/**
 * 保存用户
 * @return {Promise}
 */
export function save (param) {
    return post('/user/add.json', param);
}

/**
 * 编辑用户
 * @return {Promise}
 */
export function saveEdit (param) {
    return post('/user/edit.json', param);
}


/**
 * 删除用户
 * @return {Promise}
 */
export function del (param) {
    return post('/user/del.json', param);
}

/**
 * 禁用用户
 * @return {Promise}
 */
export function disable (param) {
    return post('/user/disable.json', param);
}

/**
 * 启用用户
 * @return {Promise}
 */
export function enable (param) {
    return post('/user/enable.json', param);
}

/**
 * 重置密码
 * @return {Promise}
 */
export function reset (param) {
    return post('/user/reset.json', param);
}

/**
 * 转移业务
 * @return {Promise}
 */
export function transf (param) {
    return post('/user/transf.json', param);
}

/**
 * 搜索选项
 * @return {Promise}
 */
export function getOptions (param) {
    return post('/user/getOptions.json', param);
}

/**
 * 输入联想
 * @return {Promise}
 */
export function inference (param) {
    return post('/user/userByName.json', param);
}
