/**
 * @filter 班主任签到
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post, postJSON }  from '../../../common/util/service';

export function afterTimeSchedule (params) {
	return post('/wechat/staff/afterTimeSchedule.json', params);
}

/**
 * 获取微信api签名
 */
export function getWechatSignature (params) {
	return post('/wechat/signature.json', params);
}

export function checkInList(params) {
	return post('/wechat/staff/checkInList.json', params);
} 

export function lessonDetail(params) {
	return post('/wechat/staff/lessonDetail.json', params);
}

export function manualSign(params) {
	return postJSON('/wechat/staff/manualSign.json', params);
}

export function scanCodeSign(params) {
	return post('/wechat/student/scanCodeSign.json', params);
}