/**
 * @filter feidu  API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post }  from '../../common/util/service';

/**
 * 粉丝列表
 * @return {Promise}
 */
export function fansList (param) {
	return post('/fans/list.json', param);
}

/**
 * 粉丝分组
 * @return {Promise}
 */
export function fansAllot (param) {
	return post('/fans/allot.json', param);
}

/**
 * 添加分组
 * @return {Promise}
 */
export function addGroup (param) {
	return post('/fans/addGroup.json', param);
}

/**
 * 分组列表
 * @return {Promise}
 */
export function listGroup (param) {
	return post('/fans/listGroup.json', param);
}

export function editGroup(param) {
	return post('/fans/editGroup.json', param);
}

export function delGroup(param) {
	return post('/fans/delGroup.json', param);
}

export function queryFuzzyName(param) {
	return post('/fans/fuzzyQuery.json', param);
}

/**
 * 获取校区列表
 * @return {Promise}
 */
export function schoolList(param) {
	return post('/school/getSchools.json', param);
}
