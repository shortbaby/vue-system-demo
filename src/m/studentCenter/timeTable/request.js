'use strict';

import { post }  from '../../../common/util/service';

export function getStudentLessons (params) {
	return post('/wechat/student/mySchedule.json', params);
};