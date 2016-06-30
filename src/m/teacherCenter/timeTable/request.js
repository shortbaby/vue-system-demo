/**
 * @filter 老师中心-班级-API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post }  from '../../../common/util/service';

export function getTeacherSchedule (params) {
	return post('/wechat/teacher/mySchedule.json', params);
};