

'use strict';

import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Upload from '../../../common/components/Upload.vue';
import Select from '../../../../dep/vue-strap/src/Select.vue';
import config from "../config";
import { checkUploadProcessStatus, getSchoolList } from '../request';
import formRequest  from '../../../common/plugin/formRequest';

export default {
	data () {
		return {
			importType: 1,
			fileName: '',
			file: null,
			scene: 'upload',
			processProgress: '0',
			timer: null,
			processStatus: {},
			schoolOptions: [],
			schoolId: -1
		};
	},
	events: {
		onFileChange (data) {
			this.file = data[0];
			this.fileName = data[0].name;
		}
	},
	created() {
		this.getOptions();
	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	components: {
		Modal: Modal,
		Upload: Upload,
		vSelect: Select
	},
	vuex: {
		actions: {
			complete ({ dispatch }) {
				this.$dispatch('importsuccess');
				dispatch('HIDE_BATCH_IMPORT');
			},
			hideBatchImport ({ dispatch }, isRefresh) {

				dispatch('HIDE_BATCH_IMPORT');

				if (isRefresh) {
					this.$dispatch('importsuccess');
				}
			}
		}
	},
	methods: {
		getOptions() {
			getSchoolList()
				.then((res) => {
					let schoolList = res.data.list;
				
					schoolList.forEach(function(item) {
						item.value = item.id.toString();
						item.label = item.name;
					});
					
					schoolList.splice(0, 0, {'value': '-1', 'label': '请选择'});
					this.schoolOptions = schoolList;
				})
		},
		// 移除文件
		removeFile (event) {
			this.fileName = '';
		},
		uploadFile (event) {
			var btn = $(event.target);
			var file = this.file;
			var self = this;
			if (this.schoolId == -1) {
				dispatch('TOAST', '请先选择校区');
				return;
			}
			if (!(file && this.fileName)) {
				dispatch('TOAST', '请先选择上传文件');
				return;
			}

			btn.prop('disabled', true);

			var fd = new FormData();
    		fd.append('file', file);

			$.ajax({
				url: `${config.getImportRequest(self.$parent.tab)}?override=${self.importType}&schoolId=${self.schoolId}`,
                type: 'POST',
                contentType: false,
                data: fd,
                dataType: 'json',
                processData: false,
                error: function () {
                	dispatch('TOAST', '网络异常');
                },
                success: function (res) {
                	if (res.code == 0) {

                		self.scene = 'process';
                		self.checkUploadProcessStatusHandler(res.data.taskId);

                	} else {
                		dispatch('TOAST', res.msg);
                	}
                }
            })
            .always(function () {
            	btn.prop('disabled', false);
            });
		},
		// 重新上传
		reUpload () {
			this.scene = 'upload';
			this.clearTimer();
		},
		// 清除定时器
		clearTimer () {
			clearTimeout(this.timer);
		},
		// 检查上传进度
		checkUploadProcessStatusHandler (taskId) {

			var self = this;
			var params = {
				taskId: taskId,
				uploadType: 1
			};

			checkUploadProcessStatus(params)
				.then(function (res) {

					var progress = res.data.completeRate;

					if (progress < 100) {

						self.processProgress = progress;
						self.timer = setTimeout(function () {
							self.checkUploadProcessStatusHandler(taskId);
						}, 500);

					} else {
						self.scene = 'complete';
						self.processStatus = res.data;
						self.clearTimer();
					}

				}, function () {
					self.scene = 'upload';
				});
		},
		exportError () {
			formRequest(this.processStatus.errorFileUrl);
		}
	},
	destroyed () {
		this.clearTimer();
	}
}