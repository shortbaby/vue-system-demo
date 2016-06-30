

'use strict';

import TimeTable from '../../../common/components/TimeTable.vue';
export default {
	computed: {
	},
	data () {
		return {
			showClassInfo: false
		}
	},
	props: {
		id: {
			type: Number
		}
	},
	components: {
		TimeTable: TimeTable
	}
}