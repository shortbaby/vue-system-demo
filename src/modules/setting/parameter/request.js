'use strict';

import { post }  from '../../../common/util/service';

export function getList (param) {
    return post('/system/configList.json', param);
}

export function saveEdit (param) {
    return post('/system/modConfig.json', param);
}