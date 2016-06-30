'use strict';

import { post }  from '../../common/util/service';

export function getQuestionList (params) {
	return post('/question/list.json', params);
}

export function addQuestion (params) {
	return post('/question/add.json', params);
}

export function editQuestion (params) {
	return post('/question/edit.json', params);
}

export function getQuestionDetail (params) {
	return post('/question/detail.json', params);
}

export function getQuestionOptions (params) {
	return post('/question/getOptions.json', params);
}

export function questionDown (params) {
	return post('/question/down.json', params);
}

export function questionUp (params) {
	return post('/question/up.json', params);
}

export function getClassesMap (params) {
	return post('/assignment/getClassesMap.json', params);
}

export function getStudentsMap (params) {
	return post('/assignment/getStudentsMap.json', params);
}

export function assign (params) {
	return post('/assignment/assign.json', params);
}

export function getAssignments (params) {
	return post('/assignment/getAssignments.json', params);
}

export function getClasses (params) {
	return post('/assignment/getClasses.json', params);
}

export function getStudents (params) {
	return post('/assignment/getStudents.json', params);
}

export function getQuestions (params) {
	return post('/assignment/getQuestions.json', params);
}

export function correct (params) {
	return post('/assignment/correct.json', params);
}

export function getAssignmentOptions (params) {
	return post('/assignment/getOptions.json', params);
}

export function getTeacherByName (params) {
	return post('/teacher/teacherByName.json', params);
}
/**
 * 获取校区列表
 * @return {Promise}
 */
export function getSchoolList (param) {
	return post('/clue/getSchoolList.json', param);
}