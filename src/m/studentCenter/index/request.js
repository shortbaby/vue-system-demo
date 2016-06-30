'use strict';

import { post }  from '../../../common/util/service';

export function afterTimeSchedule (params) {
	return post('/wechat/student/afterTimeSchedule.json', params);
};
