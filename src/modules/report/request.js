/**
 * @filter feidu  API请求
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import { post,  get }  from '../../common/util/service';

/**
 * 获取校区列表
 * @return {Promise}
 */
export function schoolList(param) {
	return post('/school/getOptions.json', param);
}

/**
 * 校区课程报表
 * @return {Promise}
 */
export function schoolCourseReport(param) {
    return post('/report/schoolcourse.json', param);
}

/**
 * 校区学生报表
 * @return {Promise}
 */
export function schoolStudentReport(param) {
    return post('/report/schoolstudent.json', param);
}

/**
 * 招生来源报表
 * @return {Promise}
 */
export function studentSource(param) {
    return post('/recruitAnalysis/culeSource.json', param);
}

/**
 * 渠道转化率报表
 * @return {Promise}
 */
export function channelConversionRate(param) {
    return post('/recruitAnalysis/conversion.json', param);
}




export function getIncomeReport(param) {
	return post('/financeReport/income.json', param);
}

export function getRefundReport(param) {
	return post('/financeReport/refund.json', param);
}

export function getAdviserReport(param) {
	return post('/report/getAdviserReport.json', param);
}

export function getConsultantConversionReport(param) {
	return post('/consultantReport/conversion.json', param);
}

export function getConsultantVisitedReport(param) {
	return post('/consultantReport/visited.json', param);
}
