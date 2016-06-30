/**
 * @fileOverview  飞渡-老师中心-主页
 * @author  XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

import TeacherCenterFooter from '../../common/components/TeacherCenterFooter.vue';
import {getTeacherInfo, unbind} from './request';
import {getCookie} from '../../../common/function/cookie';
export default {
	data() {
		return {
			info: {}
		}
	},
	components: {
		TeacherCenterFooter: TeacherCenterFooter
	},
	created() {
		this.getTeacherInfo();
	},
	methods: {
		getTeacherInfo() {
			getTeacherInfo()
				.then((res) => {
					this.info = res.data;

					let token = getCookie('FEIDU_COOKIE_ID');
					//console.log(token);
					this.$set('info.token', token);
				})
		},
		unbind(){
			unbind()
				.then((res) => {
					dispatch('TOAST', '解绑成功', 'success');
					window.location.href = res.data.url;
				})
		},
		detail() {
			window.router.go('/mydetail/');
		},
		set() {
			window.router.go('/myunavailable');
		}
	}
};
