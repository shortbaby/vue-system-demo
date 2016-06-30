'use strict';

import { post, postJSON }  from '../../../common/util/service';

export function getAssignments (params) {
	return post('/wechat/student/getAssignments.json', params);
}

export function getQuestions (params) {
	return post('/wechat/student/getQuestions.json', params);
}

export function submitQuestion (params) {
	return postJSON('/wechat/student/submitQuestion.json', params);
}

export function submitAssignment (params) {
	return post('/wechat/student/submitAssignment.json', params);
}

export function getAssignmentDetail(params) {
	return post('/wechat/student/getAssignmentDetail.json', params);
}