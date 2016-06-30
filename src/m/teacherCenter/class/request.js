/**
 * @filter 老师中心-班级-API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post }  from '../../../common/util/service';

export function getCourseDetail (params) {
	return post('/wechat/teacher/courseDetail.json', params);
};

export function scheduleDetail(params) {
	return post('/wechat/teacher/scheduleDetail.json', parmas);
};

export function listFeedBack (params) {
	return post('/wechat/teacher/listFeedBack.json', params);
};

export function addFeedBack(params) {
	return post('/wechat/teacher/addFeedBack.json', params);
};

export function editFeedBack(params) {
	return post('/wechat/teacher/editFeedBack.json', params);
};