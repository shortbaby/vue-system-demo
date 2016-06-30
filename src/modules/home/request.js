
'use strict';

import { post }  from '../../common/util/service';

export function getBackLogList(param) {
	return post('/backlog/list.json', param);
}

export function addBackLog(param) {
	return post('/backlog/add.json', param);
}

export function markBackLog(param) {
	return post('/backlog/mark.json', param);
}

export function getSubordinateList(param) {
	return post('/common/getSubordinateList.json', param);
}