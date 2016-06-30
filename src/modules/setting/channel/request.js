'use strict';

import { post }  from '../../../common/util/service';

/**
 * 获取渠道信息
 * @return {Promise}
 */
export function getInfo (param) {
    return post('/channelInfo/detail.json', param);
}

/**
 * 获取渠道列表
 * @return {Promise}
 */
export function getList (param) {
    return post('/channelInfo/list.json', param);
}

/**
 * 保存渠道
 * @return {Promise}
 */
export function save (param) {
    return post('/channelInfo/add.json', param);
}

/**
 * 编辑渠道
 * @return {Promise}
 */
export function saveEdit (param) {
    return post('/channelInfo/edit.json', param);
}


/**
 * 删除渠道
 * @return {Promise}
 */
export function del (param) {
    return post('/channelInfo/del.json', param);
}

/**
 * 启用／禁用渠道
 * @return {Promise}
 */
export function disable (param) {
    return post('/channelInfo/disable.json', param);
}
