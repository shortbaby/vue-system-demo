/**
 * @fileOverview weixin service
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post, get }  from '../../common/util/service';

/**
 * 发送验证码
 * @param {Object} data
 * @prototype {number} data.mobile
 * @prototype {number} data.orgId
 * @return {Promise}
 */
export function smsSend (data) {
	return post('/sms/send.json', data);
}

export function bindTel (params) {
	return get('/wechat/webauth/bind.json', params);
}

export function getDetail(params) {
	return post('/wechat/student/msgDetail.json', params);
}
