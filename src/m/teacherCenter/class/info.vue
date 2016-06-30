<!--
	@file 飞渡-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
<div class="class-info">
	<div class="base-info">
		<p>
			<span>班级名称</span>
			<span>{{classesInfo.info.name}}</span>
		</p>
		<p>
			<span>总课时</span>
			<span>{{classesInfo.info.totalLesson}}</span>
		</p>
		<p>
			<span>人数</span>
			<span>{{classesInfo.info.capacity}}</span>
		</p>
		<p>
			<span>班级班制</span>
			<span>{{classesInfo.info.classesTypeName}}</span>
		</p>
		<p>
			<span>校区</span>
			<span>{{classesInfo.info.schoolName}}</span>
		</p>
	</div>
	<div class="clearfix">
		<div>
			<span>课程详情</span>
		</div>
		<div>
			<p v-for="item in classesInfo.classesDetails" track-by="$index">
				<span>{{item.name}}</span>
				<span>{{item.totalLesson}}课次</span>
			</p>
		</div>
	</div>
	<div>
		<p>课节列表({{summarys.length}}次)</p>
		<table>
			<tr>
				<td>上课时间</td>
				<td>时间</td>
				<td>科目</td>
				<td>教室</td>
				<td>校区</td>
			</tr>
			<tr v-for="item in summarys" track-by="$index">
				<td>{{item.day}}</td>
				<td>{{item.section}}</td>
				<td>{{item.subTypeName}}第{{item.index}}节</td>
				<td>{{item.roomName}}</td>
				<td>{{item.schoolName}}</td>
			</tr>
		</table>
	</div>
</div>	
</template>

<script>
	import InfoMixins from './infoMixins.js';
	export default {
		mixins: [InfoMixins]
	};
</script>
<style lang="sass">
.class-info {
	> div {
		font-size: 1.4rem;
		background: #fff;
		&:nth-child(2) {
			margin-top: .5rem;
			position: relative;
			div {
				&:first-child {
					position: absolute;
					left: 0;
					top: .8rem;
					padding-left: 1rem;
					font-size: 1.6rem;
				}
				&:last-child {
					float: right;
					padding: 1rem;
					margin-left: 8rem;
					text-align: right;
					p {
						display: inline-block;
						span {
							margin-right: .5rem;
						}
					}
				}
			}
		}
		&:nth-child(3) {
			margin-top: .5rem;
		}
		&.base-info {
			p {
				span {
					&:last-child {
						float: right;
					} 
				}
			}
		}
		> p {
			background: #fff;
			height: 4rem;
			line-height: 4rem;
			padding: 0 1rem;
			border-bottom: 1px solid #ddd;
			font-size: 1.6rem;
			span {
				&:nth-child(2) {
					font-size: 1.4rem;
				}
			}
			
		}
		> div {
			display: inline-block;
		}
		table {
			width: 100%;
			font-size: 1.4rem;
			background: #edf0f5;
			tr {
				td {
					text-align: center;
					padding: .5rem 0;
				}
			}
		}
	}
}
</style>