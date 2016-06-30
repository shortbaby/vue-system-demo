
'use strict';

import { post }  from '../../common/util/service';

export function getAuditMessageList(param) {
	return post('/audit/myAudit.json', param);
}

export function getApplyMessageList(param) {
	return post('/audit/myApply.json', param);
}

export function queryBatch(param) {
	return post('/stationMessageQuery/queryBatch.json', param)
}

export function queryNewById(param) {
	return post('/stationMessageQuery/queryNewByMinId.json', param);
}

export function readBatch(param) {
	return post('/stationMessageQuery/readBatch.json', param);
}
// export function getLogList(param) {
// 	return post('/record/list.json', param);
// }

// export function queryFuzzyName(param) {
// 	return post('/record/fuzzyQuery.json', param);
// }

export function refuse(param) {
	return post('/audit/refuse.json', param);
}

export function pass(param) {
	return post('/audit/passed.json', param);
}