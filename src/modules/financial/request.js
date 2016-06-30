'use strict';

import {
	post
} from '../../common/util/service';

export function selectSigner(params) {
	return post('/agreement/selectSigner.json', params);
}

export function getFuzzyName(params) {
	return post('/agreement/getFuzzyName.json', params);
}

export function getParentFuzzyName(params) {
	return post('/agreement/getParentFuzzyName.json', params);
}

export function getFuzzyMobile(params) {
	return post('/agreement/getFuzzyMobile.json', params);
}

export function getParentFuzzyMobile(params) {
	return post('/agreement/getParentFuzzyMobile.json', params);
}

export function getAgreementType(params) {
	return post('/agreement/getAgreementType.json', params);
}

export function getSchoolNames(params) {
	return post('/roomDetail/schoolNames.json', params);
}



export function getClassInfo(params) {
	return post('/agreement/getClassInfo.json', params);
}

export function getPayType(params) {
	return post('/agreement/getPayType.json', params);
}

export function save(params) {
	return post('/agreement/save.json', params);
}

export function getStudentById(params) {
	return post('/agreement/getStudentById.json', params)
}

export function getAgreementStatus(params) {
	return post('/agreement/getAgreementStatus.json', params);
}

export function getAgreementList(params) {
	return post('/agreement/list.json', params);
}

export function getDetailById(params) {
	return post('/agreement/getDetailById.json', params);
}

export function queryAgreement(params) {
	return post('/agreement/query.json', params);
}

export function delAgreement(params) {
	return post('/agreement/delete.json', params);
}

export function modifyAgreement(params) {
	return post('/agreement/modify.json', params);
}

export function exportAgreement (param) {
	window.location.href = '/agreement/export.json?ids=' + param.join(',');
}

export function getAgreementInfo (param) {
	return post('/agreement/getAgreementInfo.json', param)
}

export function getOperator(params) {
	return post('/refund/operator.json', params);
}

export function getRefundFuzzyName(params) {
	return post('/refund/getFuzzyName.json', params);
}

export function getRefundFuzzyMobile(params) {
	return post('/refund/getFuzzyMobile.json', params);
}

export function getRefundList(params) {
	return post('/refund/list.json', params);
}

export function queryRefund(params) {
	return post('/refund/query.json', params);
}

export function exportRefund(params) {
	//window.open("http://www.jb51.net"); 
	window.location.href = '/refund/export.json?ids=' + params.join(',');
	//return post('/refund/export.json', params);
}

export function selectStudent(params) {
	return post('/refund/selectStudent.json', params);
}

export function getSchool(params) {
	return post('/refund/getSchool.json', params);
}

export function getClasses(params) {
	return post('/refund/getClasses.json', params);
}

export function getClassDetail(params) {
	return post('/refund/showClassDetail.json', params);
}

export function refundApply(params) {
	return post('/refund/refundApplySubmit.json', params);
}

export function checkRefundApply(params) {
	return post('/refund/checkApply.json', params);
}

export function refund(params) {
	return post('/refund/refund.json', params);
}

export function getRefundDetail(params) {
	return post('/refund/getRefundDetail.json', params);
}

export function getDetailAfterPass(params) {
	return post('/refund/getDetailAfterPass.json', params);	
} 
export function getAgreementNumberOptions(params) {
	return post('/refund/getAgreementNumber.json', params);
}




