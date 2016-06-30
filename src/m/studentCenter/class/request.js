'use strict';

import { post }  from '../../../common/util/service';

export function getCourseDetail (params) {
	return post('/wechat/student/courseDetail.json', params);
};
