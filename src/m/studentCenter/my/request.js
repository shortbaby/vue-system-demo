'use strict';

import { post, get }  from '../../../common/util/service';

export function getStudentInfo (params) {
	return post('/wechat/student/info.json', params);
};

export function unbind (params) {
	return get('/wechat/common/unbind.json', params);
}