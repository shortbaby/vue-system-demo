/**
 * @filter virgo 课程-配置
 * @author Zhang Chi(zhangchi03@baijiahulian.com)
 */

import { getDetail, getMyDetail, getInvalidDetail, addClue, addMyClue,
    editClue, editMyClue, editInvalidClue, disableClue, disableMyClue,
    exportClue, exportMyClue } from './request';

const COMMON = 'commonClue';
const MY = 'myClue';
const INVALID = 'invalidClue';

export default {

    common: COMMON,

    my: MY,

    invalid: INVALID,

    getDetailRequest: function (tab) {
        if (tab === COMMON) {
            return getDetail;
        } else if (tab === MY) {
            return getMyDetail;
        } else if (tab === INVALID) {
            return getInvalidDetail;
        }
    },

    getAddRequest (tab) {
        if (tab === COMMON) {
            return addClue;
        } else if (tab === MY) {
            return addMyClue;
        }
    },

    getEditRequest: function (tab) {
        if (tab === COMMON) {
            return editClue;
        } else if (tab === MY) {
            return editMyClue;
        } else if (tab === INVALID) {
            return editInvalidClue;
        }
    },

    getDisableRequest: function (tab) {
        if (tab === COMMON) {
            return disableClue;
        } else if (tab === MY) {
            return disableMyClue;
        }
    },

    getImportRequest (tab) {
        if (tab === COMMON) {
            return '/common/importClue.json';
        } else if (tab === MY) {
            return '/common/importClueMy.json';
        }
    },

    getExportRequest (tab) {
        if (tab === COMMON) {
            return exportClue;
        } else if (tab === MY) {
            return exportMyClue;
        }
    }
}