
'use strict';

import { post }  from '../../common/util/service';

export function getFuncList(param) {
	return post('/record/getFuncList.json', param);
}

export function getLogList(param) {
	return post('/record/list.json', param);
}

export function queryFuzzyName(param) {
	return post('/record/fuzzyQuery.json', param);
}