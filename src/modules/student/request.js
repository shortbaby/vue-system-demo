
'use strict';

import { post, postJSON }  from '../../common/util/service';


/**
 * 编辑学员
 * @return {Promise}
 */
export function editStudent (param) {
	return post('/student/edit.json', param);
}

/**
 * 获取学生列表 我的学生
 * @return {Promise}
 */
export function getMyStudentList (param) {
	return post('/student/list.json', param);
}

/**
 * 获取学生列表 学生档案
 * @return {Promise}
 */
export function getStudentList (param) {
	return post('/student/studentList.json', param);
}

/**
 * 批量分配学员
 * @return {Promise}
 */
export function batchAllocation (param) {
	return post('/student/batchAllocation.json', param);
}

/**
 * 获取学生详情
 * @return {Promise}
 */
export function getStudentDetail (param) {
	return post('/student/detail.json', param);
}

/**
 * 检测上传处理状态
 * @return {Promise}
 */
export function checkUploadProcessStatus (param) {
	return post('/common/import/progress.json', param);
}

/**
 * 学员导入结果
 * @return {Promise}
 */
export function importResult (param) {
	return post('/common/import/result.json', param);
}

/**
 * 批量删除学员
 * @return {Promise}
 */
export function delStudent (param) {
	return post('/student/del.json', param);
}

/**
 * 学员退班
 * @return {Promise}
 */
export function quitClass (param) {
	return post('/student/quitClass.json', param);
}

/**
 * 班级列表
 * @return {Promise}
 */
export function myClasses (param) {
	return post('/student/myClasses.json', param);
}

/**
 * 班级详情
 * @return {Promise}
 */
export function courseDetail(param) {
	return post('/student/courseDetail.json', param);
}

/**
 * 课节列表
 * @return {Promise}
 */
export function subList(param) {
	return post('/student/subList.json', param);
}

/**
 * 修改课节备注
 * @return {Promise}
 */
export function editCourseRemark(param) {
	return post('/student/editCourseRemark.json', param);
}

/**
 * 获取班主任列表
 * @return {Promise}
 */
export function getOwnerList (param) {
	return post('/student/getOwnerList.json', param);
}

/**
 * 学员导入
 * return {Promise}
 */
export function importStudent (param) {
	return post('/common/importStudent.json', param);
}

/**
 * 学员导出
 * return {Promise}
 */
export function exportStudent (param) {
	window.location.href = '/common/exportStudent.json?ids=' + param.join(',');
}

/**
 * 学员导出错误文件
 * return {Promise}
 */
export function exportError (param) {
	return post('/common/exportError.json', param);
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
 * 获取校区列表
 * @return {Promise}
 */
export function getSchoolList (param) {
	return post('/clue/getSchoolList.json', param);
}

/**
 * 咨询课程列表
 * @return {Promise}
 */
export function getSubjectList (param) {
	return post('/clue/getSubjectList.json', param);
}

/**
 * 发送通知
 * return {Promise}
 */
export function sendMsg(param) {
	return post('/student/sendMsg.json', param);
}
/**
 * 模糊检索班级
 */

export function getFuzzyClasses(param) {
	return post('/student/getFuzzyClasses.json', param);
}

/**
 * 学员课表
 * return {Promise}
 */
export function classSchedule(param) {
	return post('/student/classSchedule.json', param);
}

/**
 * 冻结学员
 * return {Promise}
 */

export function freezeStudent(param) {
	return post('/student/freezeAccount.json', param);
}

/**
 * 解冻学员
 * return {Promise}
 */

export function unFreezeStudent(param) {
	return post('/student/unFreezeAccount.json', param);
}
