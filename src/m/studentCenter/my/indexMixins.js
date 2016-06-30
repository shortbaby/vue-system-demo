'use strict';

import StudentCenterFooter from '../../common/components/StudentCenterFooter.vue';
import {getStudentInfo, unbind} from './request';
import {getCookie} from '../../../common/function/cookie';
export default {
	data() {
		return {
			info: {}
		}
	},
	components: {
		StudentCenterFooter: StudentCenterFooter
	},
	created() {
		this.getStudentInfo();

	},
	methods: {
		getStudentInfo() {
			getStudentInfo()
				.then((res) => {
					this.info = res.data;
					let token = getCookie('FEIDU_COOKIE_ID');
					this.$set('info.token', token);
				})
		},
		unbind(){
			unbind()
				.then((res) => {
					dispatch('TOAST', '解绑成功', 'success');
					window.location.href = res.data.url;
				})
		}
	}
};