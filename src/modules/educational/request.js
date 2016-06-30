'use strict';

import {
	post, postJSON
} from '../../common/util/service';

export function search(param) {
	return post('/edu/apply/search.json', param);
}

export function applySchedule(param) {
	return post('/edu/apply/applySchedule.json', param);
}

export function release(param) {
	return post('/edu/apply/release.json', param);
}

export function receive(param) {
	return post('/edu/apply/receive.json', param);
}

export function getMyCourse(param) {
	return post('/edu/schedule/getMyCourse.json', param);
}

export function getScheduledCourseList(param) {
	return post('/edu/schedule/getScheduledCourseList.json', param);
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

export function getSubTypeList(param) {
	return post('/subject/getSubTypeList.json', param);
}

export function getSubTypeListByClassesId(param) {
	return post('/subject/getSubTypeByClassesId.json', param);
}
export function getTeacherList(param) {
	return post('/teacher/availableTeacherList.json', param);
}

export function getRoomList(param) {
	return post('/roomDetail/availableRoomList.json', param);
}

export function getClassesDetail(param) {
	return post('/edu/schedule/classesDetail.json', param);
}

export function addSchedule(param) {
	return post('/edu/schedule/addSchedule.json', param);
}

export function editSchedule(param) {
	return post('/edu/schedule/edit.json', param);
}

export function deleteSchedule(param) {
	return post('/edu/schedule/delete.json', param);
}

export function getscheduleRecordDetail(param) {
	return post('/edu/schedule/scheduleRecordDetail.json', param);
}

export function getScheduledTimeTable(param) {
	return post('/edu/schedule/search.json', param)
}

export function schoolList(param) {
	return post('/school/getSchools.json', param);
}

export function subjectList(param) {
	return post('/subject/list.json', param);
}

export function getTeacherByName(param) {
	return post('/teacher/teacherByName.json', param);
}

export function getStudentByName(param) {
	return post('/common/getFuzzyInfo.json', param)
}

export function getRoomsBySchoolId(param) {
	return post('/roomDetail/getRoomsBySchoolId.json', param)
}

export function getClassesByName(param) {
	return post('/course/fuzzyQuery.json', param);
}

export function getCheckinDetail(param) {
	return post('/checkin/detail.json', param);
}
export function lessonList(param) {
	return post('/checkin/lessonList.json', param);
}
export function manualSign(param) {
	return postJSON('/checkin/manualSign.json', param);
}

