'use strict';

import { post }  from '../../../common/util/service';

/**
 * 权限树形列表
 * @return {Promise}
 */
export function getPermissions (param) {
	return post('/role/getPermissions.json', param);
}

/**
 * 职位列表
 * @return {Promise}
 */
export function getRoleList (param) {
	return post('/role/list.json', param);
}

/**
 * 职位详情
 * @return {Promise}
 */
export function getRoleDetail (param) {
	return post('/role/detail.json', param);
}

/**
 * 职位添加
 * @return {Promise}
 */
export function addRole (param) {
	return post('/role/add.json', param);
}

/**
 * 职位修改
 * @return {Promise}
 */
export function editRole (param) {
	return post('/role/edit.json', param);
}

/**
 * 职位删除
 * @return {Promise}
 */
export function delRole (param) {
	return post('/role/del.json', param);
}