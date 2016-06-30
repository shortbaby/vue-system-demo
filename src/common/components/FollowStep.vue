
<template>
	<div id="follow-step-wrap">
		<modal :show.sync="show" :width="600">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">快速添加跟进记录</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hideFollowStep()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
		  		<div class="log-wrap">
					<textarea placeholder="在这里填写跟进内容吧" id="log-txt" name="log-txt" rows="15"></textarea>
				</div>
				<div class="log-oprations">
					<div class="clue-name">
						<input type="text" v-model="name" placeholder="请输入要添加跟进记录的姓名" @change="refreshNameList()"/>
						<ul class="name-list" v-show="showNameList">
							<li v-for="item in nameList" @click="select($event, item)" track-by="$index" class="name-item">
								<span>{{ item }}</span>
							</li>
						</ul>
					</div>
					<div class="pic">
						<span class="icon-edit"></span>
						<span>图片</span>
					</div>
					<div class="link">
						<span class="icon-xueyuan"></span>
						<span>同事</span>
					</div>
					<v-select :options="followFieldOptions" :close-on-select="true" :value.sync="followField | str"></v-select>
				</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<span @click.stop="publish($event)" class="btn btn-primary">发布</span>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import Modal from '../../../dep/vue-strap/src/Modal.vue';
	import Select from '../../../dep/vue-strap/src/Select.vue';
	import getSelectOptions from '../function/getSelectOptions';
	export default {
		computed: {
			showNameList() {
				return this.nameList.length > 0;
			}
		},
		data () {
			return {
				followFieldOptions: getSelectOptions().followFieldOptions,
				followField: 0,
				name: '',
				nameList: ['刘得花', '刘得花', '刘得花', '刘得花', '刘得花', '刘得花', '刘得花','刘得花', '刘得花', '刘得花','刘得花']
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false,
				twoWay: true
			}
		},
		components: {
			Modal: Modal,
			vSelect: Select
		},
		methods: {
			hideFollowStep() {
				dispatch('HIDE_FOLLOW_STEP');
			},
			publish (event) {
				var btn = $(event.target);
				var self = this;
			},
			refreshNameList() {

			},
			select(event, name) {
				this.name = name;
				this.nameList = [];
			}
		}
	}
</script>
<style lang="sass">
#follow-step-wrap {
	.log-wrap {
		position: relative;
		margin: 0 10px 10px 10px;
		border: 1px solid #ccc;
		border-radius: 8px;
		background: #fff;
		.mark {
			text-align: right;
			padding-right: 10px;
		}
		textarea {
			border: none;
			width: 540px;
			border-radius: 8px;
			outline: none;
			padding: 5px 10px;
			box-sizing: border-box;
			&:focus {
				border: none;
			}
		}

	}
	.log-oprations {
		padding: 10px 10px;
		.pic {
			display: inline-block;
			width: 40px;
			cursor: pointer;
			font-size: 12px;
			margin-right: 20px;
			span {
				&:first-child {
					font-size: 26px;
				}
			}
		}
		.link {
			width: 40px;
			display: inline-block;
			cursor: pointer;
			font-size: 12px;
			margin-right: 20px;
			span {
				&:first-child {
					font-size: 26px;
				}
			}
		}
		.clue-name {
			display: inline-block;
			position: relative;
			top: -12px;
			margin-right: 20px;
			.name-list {
				position: absolute;
				left: 0px;
				top: 34px;
				width: 200px;
				background: #fff;
				border: 1px solid #ccc;
				border-radius: 5px;
				padding: 0 10px;
				max-height: 220px;
				overflow: auto;
				li {
					list-style: none;
					padding: 5px 10px;
					border-bottom: 1px dashed #eee;
				}
			}
			input {
				padding: 5px 10px;
				width: 200px;
				border-radius: 5px;
				border: 1px solid #ccc;
			}
		}
		.btn-group {
			position: relative;
			top: -15px;
			&.open {
				.dropdown-toggle {
					box-shadow: none;
				}
			}
			.btn-default {
				background: #fff;
				&:hover {
					background: #fff;
					box-shadow: none;
				}
				&:active {
					background: #fff;
					box-shadow: none;
				}
			}
		}
	}
	.btn-primary {
		position: relative;
		width: 100px;
	}

}
</style>