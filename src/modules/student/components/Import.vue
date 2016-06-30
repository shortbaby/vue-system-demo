<!--
	@file 线索-导入线索
	@author xuguanlong
-->

<template>
	<div class="upload-dialog">
		<modal :show.sync="true">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">导入学生档案</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideBatchImport(1)"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<ul class="upload-progress">
					<li class="num active">1</li>
					<li class="progress-item">
						<span v-if="scene=='upload'"></span>
						<span v-if="scene=='process' || scene=='complete'" class="full"></span>
					</li>
					<li class="num" :class="{active: scene=='process' || scene=='complete'}">2</li>
					<li class="progress-item">
						<span v-if="scene=='process'"></span>
						<span v-if="scene=='complete'" class="full"></span>
					</li>
					<li class="num" :class="{active:scene=='complete'}">3</li>
				</ul>
				<ul class="step">
					<li>上传文档</li>
					<li>导入数据</li>
					<li>完成</li>
				</ul>
				<ul class="upload-notice" v-if="scene=='upload'">
					<li>
						<h3><span>1</span>按要求填写模版文件<a download="学员导入模板" href="http://file.gsxservice.com/0tianxiao/dcc7e5908b8fa3cdb127bcd93f9f85e0/%E5%AD%A6%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx">下载学员导入模板</a></h3>
						<ol class="upload-body">
							<li>模板中的表头名称不可更改，顺序不能更改，表头行不能删除</li>
							<li>姓名、手机号为必填项</li>
							<li>单次导数据不能超过5000条</li>
						</ol>
					</li>
					<li>
						<h3><span>2</span>请选择数据重复时的操作方式</h3>
						<div class="upload-body">
							<p>重复规则：学员手机号和学员姓名同时相同，则为重复数据</p>
							<ul class="import-type-select">
								<li><label><input type="radio" name="importType" value="1" v-model="importType">覆盖导入</label></li>	
								<li><label><input type="radio" name="importType" value="0" v-model="importType">不覆盖导入</label></li>
							</ul>
						</div>
					</li>
					<li>
						<h3><span>3</span>选择需要导入的文件，并开始导入</h3>
						<div class="upload-body">
							<label class="required">选择校区</label>
							<v-select :options="schoolOptions" :close-on-select="true" :value.sync="schoolId | str"></v-select>	
							<span class="red">(必选)</span>
						</div>
					</li>
					<li>
						<h3><span>4</span>选择需要导入的文件，并开始导入</h3>
						<div class="upload-body">
							<div v-if="!fileName">
									<upload key="importFile" tip="上传文件大小不能超过1M" :multiple="false" accept="text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
										<div><span class="btn btn-primary">添加文件</span></div>
									</upload>
							</div>

							<div v-if="fileName">
								<ul>
									<li class="file-name">
										{{ fileName }}
										<span class="icon-times" title="删除文件" @click.stop="removeFile"></span>
									</li>
								</ul>
							</div>
						</div>
					</li>
				</ul>

				<ul class="process-progress" v-if="scene=='process'">
					<li><span :style="{width:processProgress + '%'}">&nbsp;</span></li>
				</ul>
				<ul class="complete" v-if="scene=='complete'">
					<li>
						<span>本次导入数据共</span>
						<span >{{ processStatus.totalCount }}</span>
						<span>条</span>
					</li>
					<li>
						<span>成功导入数据</span>
						<span class="brand">{{ processStatus.successCount }}</span>
						<span>条</span>
					</li>
					<li>
						<span>错误数据</span>
						<span class="text-danger">{{ processStatus.failCount }}</span>
						<span>条</span>
					</li>
					<li>
						<span>重复数据</span>
						<span class="text-repeat">{{ processStatus.repeatCount }}</span>
						<span>条</span>
					</li>
					<!-- <li class="complete-sign">
						<span class="icon-chenggong"></span>导入完成
					</li> -->
				</ul>
				<!-- <ul class="complete" v-if="scene=='complete'">
					<li>
						共{{ processStatus.totalCount }}个学员已成功上传<span  >{{ processStatus.successCount }}</span>个，错误信息<span class="text-danger">{{ processStatus.failCount }}</span>条, 重复数据<span class="text-repeat">{{processStatus.repeatCount}}</span>条
					</li>
					<li class="complete-sign">
						<span class="icon-chenggong"></span>导入完成
					</li>
				</ul> -->

		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer" v-if="scene=='upload'">
		  			<button @click.stop="uploadFile($event)" class="btn btn-primary">开始上传</button>
		  		</div>

		  		<div class="modal-footer" v-if="scene=='process'">
		  			<button @click.stop="reUpload()" class="btn btn-primary">重新上传</button>
		  		</div>
		  		<div class="modal-footer" v-if="scene=='complete'">
		  			<button @click.stop="exportError()" v-if=" processStatus.totalCount != processStatus.successCount " class="btn btn-warning">导出错误信息</button>
		  			<button @click.stop="complete()" class="btn btn-primary">完成</button>
		  		</div>

		  	</div>
		</modal>
	</div>
</template>

<script>
	import ImportMixins from './importMixins';

	export default {
		mixins: [ImportMixins]
	}
</script>