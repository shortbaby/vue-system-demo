<!--
	@file 飞渡-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div>
	<div class="class-detail-sign">
		<div class="sign-info">
			<p>签到2/5</p>	
		</div>
		<p>{{classInfo.name}}</p>
		<p>第{{classInfo.index}}节</p>
		<p>{{classInfo.date}} {{classInfo.startTime}} ~ {{classInfo.endTime}}</p>
		<p>{{classInfo.classroom}}</p>
	</div>
	<div class="sign-list">
		<ul class="clearfix">
			<li>
				<span>张三</span>
				<span class="icon-check"></span>
			</li>
			<li>
				<span>张三</span>
				<span class="icon-check"></span>
			</li>
			<li>
				<span>张三</span>
				<span class="icon-check"></span>
			</li>
		</ul>
	</div>
</div>	
</template>

<script>
	export default {
		data () {
			return {
				list: [],
				classInfo: {
					name: 'SAT密卷班',
					index: 3,
					date: '04月02日',
					startTime: '08:30',
					endTime: '10:30',
					classroom: '创世纪203'
				}
			}
		},
		route: {
			data(transition) {
				//this.classInfo = transition.to.params.obj;
			}
		},
		created () {
			console.log(this.$route.params.id);
		},
		methods: {
			manualSign(item) {
			},
			/**
			 * 签到
			 */
			// sign (item, signStatus) {
			// 	if (item.signStatus == signStatus) {
			// 		signStatus = 0;
			// 	}
			// 	var params = {
			// 		signDtos: [{
			// 			lessonId: this.$route.params.lessonId,
			// 			signStatus: signStatus,
			// 			studentId: item.studentId
			// 		}]
			// 	};

			// 	batchSign(params)
			// 		.then((res) => {
			// 			dispatch('TOAST', '保存成功', 'success');
			// 			Vue.set(item, 'signStatus', signStatus);
			// 		});
			// },

			/**
			 * 全部签到
			 */
			signAll () {
				this.students.forEach((item) => {
					if (!item.signStatus) {
						Vue.set(item, 'signStatus', 1);
					}

					var signDtos = [];

					this.students.forEach((item) => {
						if (item.signStatus || item.signStatus == 0) {
							signDtos.push({
								lessonId: item.lessonId,
								studentId: item.studentId,
								signStatus: item.signStatus
							});
						}
					});
					var params = {
						signDtos: signDtos
					};
					batchSign(params)
						.then((res) => {
							dispatch('TOAST', '保存成功', 'success');
						});
					});
			},
			doSign () {
				var self = this;
				window.wx.scanQRCode({
					needResult: 1,
					scanType: ["qrCode"],
					success: function(res) {
						var studentId = res.resultStr;
						if (!/^\d+$/.test(studentId)) {
							dispatch('TOAST', '请扫描正确的二维码');
							return;
						}
						// batchSign(
						// 	{
						// 		signDtos: [
						// 			{
						// 				lessonId: self.$route.params.lessonId,
						// 				signStatus: 1,
						// 				studentId: studentId,
						// 				type: 1
						// 			}
						// 		]
						// 	})
						// 	.then(function(res) {
						// 		// 更新一下列表
						// 		self.getLessonStudent();
						// 		self.qrSign();
						// 	});
					}
				});
			},

			/**
			 * 二维码签到
			 */
			qrSign () {
				var now = Math.floor(+new Date() / 1000);
				var timestamp = wechatConfig.timestamp;
				if (now - timestamp > 7200) {
					qrSign(wechatConfig).then(this.doSign);
				} else {
					this.doSign();
				}
			}
		}
	};
</script>
<style lang="sass">
</style>