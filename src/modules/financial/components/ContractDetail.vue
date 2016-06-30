

<template>
	<div class="contract-detail-modal">
		<modal :show.sync="show" :width="940">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">合同详情</h4>
		    	<span class="icon-times" title="关闭" @click.stop="hide()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<div class="info top">
					<ul class="clearfix">
						<li>
							<div class="base-info">
								<p>{{agreement.name}}</p>
								<p><span class="sign">姓名</span></p>
								<p>{{agreement.number}}</p>
								<p><span class="sign">合同编号</span></p>
							</div>
						</li>
						<li>
							<div class="course">
								<p><span>{{agreement.price | money 100}}</span><span>{{agreement.realPayAmount | money 100}}</span><span>{{agreement.payTypeStr}}</span></p>
								<p><span>应收总额</span><span>实收总额</span><span>支付方式</span></p>
							</div>
						</li>
						<li>
							<div class="school">
								<p><span>{{agreement.signer}}</span><span>{{agreement.signTime | date 'yyyy-MM-dd'}}</span><span>{{agreement.agreementTypeStr}}</span></p>
								<p><span>合同签订人</span><span>签约日期</span><span>合同类型</span></p>
							</div>
						</li>
					</ul>
				</div>
				<div class="list">
					<h3>合同明细</h3>
					<table>
						<tr>
							<td>课程名称</td>
							<td>课程费用</td>
							<td>折扣</td>
							<td>赠送金额</td>
							<td>应收费用</td>
							<td>实收费用</td>
						</tr>
						<tr v-for="item in agreement.details">
							<td>{{item.name}}</td>
							<td>{{item.price | money 100}}</td>
							<td>{{item.discount}}</td>
							<td>{{item.grantAmount | money 100}}</td>
							<td>{{item.receivalbleExpense | money 100}}</td>
							<td>{{item.realPayAmount | money 100}}</td>
						</tr>
					</table>
					<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
				</div>
		  	</div>
		  	<div slot="modal-footer">
		  		<div class="modal-footer">
		  			<span @click.stop="hide()" class="btn btn-primary">关闭</span>
		  		</div>
		  	</div>
		</modal>
	</div>
</template>

<script>
	import contractDetailMixins from './contractDetailMixins';
	export default {
		mixins: [contractDetailMixins]
	}
</script>
<style lang="sass">
.contract-detail-modal {
	.info-group {
		display: inline-block;
		width: 280px;
	}
	.info {
		background: #fff;
		padding: 10px;
		ul {
			li {
				list-style: none;
				display: inline-block;
				position: relative;
				float: left;
				height: 120px;
				border-right: 1px solid #edf0f5;
				&:last-child {
					border-right: none;
				}
				div {
					p {
						text-align: center;
						&:nth-child(odd) {
							font-weight: 500;
						}
						&:nth-child(even) {
							color: #ccc;
						}
						span {
							display: inline-block;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
				.base-info {
					p {
						width: 160px;
						height: 32px;
						&:first-child {
							font-size: 20px;
						}
						.status {
							font-weight: 400;
							display: inline-block;
							background: #66ccff;
							font-size: 12px;
							padding: 3px 10px;
							color: #fff;
							border-radius: 18px;
						}
					}
				}
				.course {
					p {
						width: 320px;
						height: 32px;
						line-height: 32px;
						position: relative;
						top: 20px;
						&:first-child {
							font-size: 20px;
						}
						span {
							width: 100px;
						}
					}
				}
				.school {
					p {
						width: 400px;
						height: 32px;
						line-height: 32px;
						position: relative;
						top: 20px;
						&:first-child {
							font-size: 20px;
						}
						span {
							width: 120px;
						}
					}
				}
			}
		}
	}
	.list {
		margin-top: 10px;
		border-top: 1px solid #66ccff;
		background: #fff;
		padding: 10px;
		h3 {
			font-size: 16px;
			font-weight: 400;
		}
		table {
			width: 100%;
			margin-top: 10px;
			tr {
				border: 1px solid #ccc;
				td {
					border-right: 1px solid #ccc;
					text-align: center;
					padding: 8px 0;
				}
			}
		}
	}
	
}
</style>