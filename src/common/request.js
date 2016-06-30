/**
 * @file 飞渡 common request
 * @author xuguanlong
 */

'use strict';

import {post, get} from './util/service';

export function login(param) {
	return post('/login.do', param);
}
// export function getOrgInfo() {
// 	return post('/org/info.json');
// }

/**
 * 获取表头设置
 * @return {Promise}
 */
export function getHeaderConfig (param) {
	return post('/common/getConfig.json', param);
}

/**
 * 设置表头
 * @return {Promise}
 */
export function setHeaderConfig (param) {
	return post('/common/setConfig.json', param);
}

/**
 * 设置跟进记录
 * @return {Promise}
 */
export function getCommentList (param) {
	return post('/comment/list.json', param);
}

/**
 * 添加跟进记录
 * @return {Promise}
 */
export function addComment (param) {
	return post('/comment/add.json', param);
}

/**
 * 编辑跟进记录
 * @return {Promise}
 */
export function editComment (param) {
	return post('/comment/edit.json', param);
}

/**
 * 删除跟进记录
 * @return {Promise}
 */
export function delComment (param) {
	return post('/comment/del.json', param);
}

/**
 * 保存调查问卷
 * @return {Promise}
 */
export function saveQuestionnaire (param) {
	return post('/common/saveQuestionnaire.json', param);
}

/**
 * 获取调查问卷
 * @return {Promise}
 */
export function getQuestionnaire (param) {
	return post('/common/getQuestionnaire.json', param);
}

export function getArea(param) {	 
	return get('/area.html', param); 
}
/**
 * 上传文件
 * @return {Promise}
 */
export function upload (param) {
	return post('/common/upload.json', param);
}

/**
 * 获取左侧导航菜单
 * @return {Promise}
 */
export function getModules(param) {
	return post('/common/getModules.json', param);
}


/**
 * 获取微信api签名
 */
export function getWechatSignature (param) {
	return post('/wechat/common/getJsticket.json', param);
};

export function getColleagueList(param) {
	return post('/common/getColleagueList.json', param);
}

/**
 * 消息中心
 */

export function queryNewCount(param) {
	return post('/stationMessageQuery/queryAllNewCount.json', param);
}

export function queryBatch(param) {
	return post('/stationMessageQuery/queryBatch.json', param)
}

export function queryNewById(param) {
	return post('/stationMessageQuery/queryNewByMinId.json', param);
}

export function readBatch(param) {
	return post('/stationMessageQuery/readBatch.json', param);
}




