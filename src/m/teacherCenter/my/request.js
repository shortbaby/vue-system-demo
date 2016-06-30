/**
 * @filter 老师中心-班级-API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post, postJSON, get }  from '../../../common/util/service';

export function getTeacherInfo (params) {
	return post('/wechat/teacher/info.json', params);
};

export function getTeacherDetail(params) {
	return post('/wechat/teacher/detail.json', params);
}

export function getTeacherCalendar (params) {
	return post('/wechat/teacher/getCalendar.json', params);
};

export function addTeacherCalendar (params) {
	return postJSON('/wechat/teacher/addCalendar.json', params);
};

export function unbind (params) {
	return get('/wechat/common/unbind.json', params);
}