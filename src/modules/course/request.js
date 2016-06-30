'use strict';

import { post, postJSON }  from '../../common/util/service';

/**
 * 获取课程信息
 * @return {Promise}
 */
export function getInfo (param) {
	return post('/course/detail.json', param);
}

/**
 * 获取课程列表
 * @return {Promise}
 */
export function getList (param) {
	return post('/course/search.json', param);
}

/**
 * 保存课程
 * @return {Promise}
 */
export function save (param) {
	return postJSON('/course/add.json', param);
}

/**
 * 编辑课程
 * @return {Promise}
 */
export function saveEdit (param) {
	return postJSON('/course/edit.json', param);
}


/**
 * 删除课程
 * @return {Promise}
 */
export function del (param) {
	return post('/course/del.json', param);
}

/**
 * 删除课程
 * @return {Promise}
 */
export function close (param) {
	return post('/course/close.json', param);
}

/**
 * 校区
 * @return {Promise}
 */
export function getSchoolList (param) {
	return post('/school/getOptions.json', param);
}

/**
 * 课程一级分类搜索
 * @return {Promise}
 */
export function searchSubjectList (param) {
	return post('/subject/listSubject.json', param);
}

/**
 * 课程一级分类搜索
 * @return {Promise}
 */
export function editSubject (param) {
	return post('/subject/editSubject.json', param);
}

/**
 * 课程一级分类搜索
 * @return {Promise}
 */
export function delSubject (param) {
	return post('/subject/delSubject.json', param);
}

/**
 * 课程分类
 * @return {Promise}
 */
export function getSubjectList (param) {
	return post('/clue/getSubjectList.json', param);
}

/**
 * 申请排课
 * @return {Promise}
 */
export function applySchedule (param) {
	return post('/edu/apply/applySchedule.json', param);
}

/**
 * 课程二级分类
 * @return {Promise}
 */
export function getSubTypeList (param) {
	return post('/subject/getSubTypeList.json', param);
}

/**
 * 课程分类搜索列表
 * @return {Promise}
 */
export function getCourseCategoryList (param) {
	return post('/subject/search.json', param);
}

/**
 * 添加课程一级分类
 * @return {Promise}
 */
export function saveSubject (param) {
	return post('/subject/add.json', param);
}

/**
 * 添加课程二级分类
 * @return {Promise}
 */
export function saveSubtype (param) {
	return post('/subject/addSubItem.json', param);
}

/**
 * 编辑课程二级分类
 * @return {Promise}
 */
export function saveEditSubtype (param) {
	return post('/subject/edit.json', param);
}

/**
 * 删除课程二级分类
 * @return {Promise}
 */
export function delSubtype (param) {
	return post('/subject/del.json', param);
}