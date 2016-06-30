/**
 * @filter 飞渡-线索API
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post , postJSON}  from '../../common/util/service';

/**
 * 增加线索
 * @return {Promise}
 */
export function addClue (param) {
	return post('/clue/add.json', param);
}

export function addMyClue (param) {
	return post('/clue/addMy.json', param);
}

/**
 * 编辑线索
 * @return {Promise}
 */
export function editClue (param) {
	return post('/clue/edit.json', param);
}

export function editMyClue (param) {
	return post('/clue/editMy.json', param);
}

export function editInvalidClue (param) {
	return post('/clue/editInvalid.json', param);
}

/**
 * 获取线索列表
 * @return {Promise}
 */
export function getClueList (param) {
	return post('/clue/list.json', param);
}

/**
 * 获取公共线索列表
 * @return {Promise}
 */
export function getCommonList (param) {
	return post('/clue/commonList.json', param);
}

/**
 * 获取无效列表
 * @return {Promise}
 */
export function getInvalidList (param) {
	return post('/clue/invalidList.json', param);
}


/**
 * 线索查重
 * @return {Promise}
 */
export function clueDuplicate (param) {
	return post('/clue/duplicate.json', param);
}

/**
 * 公共线索－线索详情
 * @return {Promise}
 */
export function getDetail (param) {
	return post('/clue/detail.json', param);
}
/**
 * 我的线索－线索详情
 * @return {Promise}
 */
export function getMyDetail (param) {
	return post('/clue/detailMy.json', param);
}
/**
 * 无效线索－线索详情
 * @return {Promise}
 */
export function getInvalidDetail (param) {
	return post('/clue/detailInvalid.json', param);
}

/**
 * 激活线索状态
 * @return {Promise}
 */
export function activeClue (param) {
	return post('/clue/activateClue.json', param);
}

/**
 * 无效线索状态
 * @return {Promise}
 */
export function disableClue (param) {
	return post('/clue/disableClue.json', param);
}

export function disableMyClue (param) {
	return post('/clue/disableClueMy.json', param);
}

/**
 * 检测上传处理状态
 * @return {Promise}
 */
export function checkUploadProcessStatus (param) {
	return post('/common/import/progress.json', param);
}

/**
 * 线索导入结果
 * @return {Promise}
 */
export function importResult (param) {
	return post('/common/import/result.json', param);
}

/**
 * 批量删除线索
 * @return {Promise}
 */
export function batchDel (param) {
	return post('/clue/del.json', param);
}
/**
 * 批量分配线索
 * @return {Promise}
 */
export function batchAllocation (param) {
	return post('/clue/batchAllocation.json', param);
}

/**
 * 释放线索
 * @return {Promise}
 */
export function releaseClue (param) {
	return post('/clue/release.json', param);
}

/**
 * 获取校区列表
 * @return {Promise}
 */
export function getSchoolList (param) {
	return post('/clue/getSchoolList.json', param);
}

/**
 * 线索来源列表
 * @return {Promise}
 */
export function getOriginList (param) {
	return post('/clue/getOriginList.json', param);
}

/**
 * 咨询顾问列表
 * @return {Promise}
 */
export function getAdviserList (param) {
	return post('/clue/getAdviserList.json', param);
}

/**
 * 咨询课程列表
 * @return {Promise}
 */
export function getSubjectList (param) {
	return post('/clue/getSubjectList.json', param);
}

/**
 * 线索导入
 * return {Promise}
 */
export function importClue (param) {
	return post('/common/importClue.json', param);
}

/**
 * 线索导出
 * return {Promise}
 */
export function exportClue (param) {
	window.location.href = '/common/exportClue.json?ids=' + param.join(',');
	//return post('/common/exportClue.json', param.join());
}

/**
 * 线索导出
 * return {Promise}
 */
export function exportMyClue (param) {
	window.location.href = '/common/exportClueMy.json?ids=' + param.join(',');
	//return post('/common/exportClueMy.json', param.join());
}

/**
 * 线索导出错误文件
 * return {Promise}
 */
export function exportError (param) {
	return post('/common/exportError.json', param);
}

/**
 * 获取班主任列表
 * @return {Promise}
 */
export function getOwnerList (param) {
	return post('/student/getOwnerList.json', param);
}

export function getBelongToList(param) {
	return post('/clue/getBelongOption.json', param)
}

