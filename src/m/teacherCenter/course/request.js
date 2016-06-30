/**
 * @filter 老师中心-班级-API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post }  from '../../../common/util/service';

export function getTeacherCourse (params) {
	return post('/wechat/teacher/myCourse.json', params);
};

