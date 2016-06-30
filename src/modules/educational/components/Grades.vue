
<template>
	<div class="wrap">
		<ul class="grades-list">
			<li class="item" id="grade-1" data-id = "1" @mouseenter = "changeHoverId($event)" @click="showGradeDetail($event)">
				<div>
					<p>托福冲刺班（TOVXC0305)</p>
				</div>	
				<div>
					<p>已排课</p>
				</div>
				<div>
					<p class="status">
						<span class="done"></span>
					</p>
					<p><span class="s1"></span><span>已上课次20</span> <span class="s2"></span><span>总课次60</span></p>
				</div>
				<div>
					<span class="btn btn-primary">退班</span>
					<span class="btn btn-primary">签到</span>
				</div>
			</li>
			<li class="detail">
				<div>
					<p>听力<span>6/15</span></p>
				</div>
				<div>
					<p>口语<span>6/15</span></p>
				</div>
				<div>
					<p>阅读<span>6/15</span></p>
				</div>
				<div>
					<p>模考<span>6/15</span></p>
				</div>
				<div>
					<p>作文<span>6/15</span></p>
				</div>
			</li>
			<li class="item" id="grade-2" data-id = "2" @mouseenter = "changeHoverId($event)" @click="showGradeDetail($event)">
				<div>
					<p>托福冲刺班（TOVXC0305)</p>
				</div>	
				<div>
					<p>已排课</p>
				</div>
				<div>
					<p class="status">
						<span class="done"></span>
					</p>
					<p><span class="s1"></span><span>已上课次20</span> <span class="s2"></span><span>总课次60</span></p>
				</div>
				<div>
					<span class="btn btn-primary">退班</span>
					<span class="btn btn-primary">签到</span>
				</div>
			</li>
			<li class="detail">
				<div>
					<p>听力<span>6/15</span></p>
				</div>
				<div>
					<p>口语<span>6/15</span></p>
				</div>
				<div>
					<p>阅读<span>6/15</span></p>
				</div>
				<div>
					<p>模考<span>6/15</span></p>
				</div>
				<div>
					<p>作文<span>6/15</span></p>
				</div>
			</li>
			<li class="detail">
				<div>
					<p>听力<span>6/15</span></p>
				</div>
				<div>
					<p>口语<span>6/15</span></p>
				</div>
				<div>
					<p>阅读<span>6/15</span></p>
				</div>
				<div>
					<p>模考<span>6/15</span></p>
				</div>
				<div>
					<p>作文<span>6/15</span></p>
				</div>
			</li>
			<li class="item" id="grade-3" data-id = "3" @mouseenter = "changeHoverId($event)" @click="showGradeDetail($event)">
				<div>
					<p>托福冲刺班（TOVXC0305)</p>
				</div>	
				<div>
					<p>已排课</p>
				</div>
				<div>
					<p class="status">
						<span class="done"></span>
					</p>
					<p><span class="s1"></span><span>已上课次20</span> <span class="s2"></span><span>总课次60</span></p>
				</div>
				<div>
					<span class="btn btn-primary">退班</span>
					<span class="btn btn-primary">签到</span>
				</div>
			</li>
			<li class="detail">
				<div>
					<p>听力<span>6/15</span></p>
				</div>
				<div>
					<p>口语<span>6/15</span></p>
				</div>
				<div>
					<p>阅读<span>6/15</span></p>
				</div>
				<div>
					<p>模考<span>6/15</span></p>
				</div>
				<div>
					<p>作文<span>6/15</span></p>
				</div>
			</li>
		</ul>
		<grade-detail v-if="showDetail" :show.sync = "showDetail" :id.sync = "hoverId"></grade-detail>
	</div>
</template>

<script>
import GradesMixins from './gradesMixins';

export default {
	mixins: [GradesMixins]
}
</script>

<style lang="sass">
.wrap {
	padding-bottom: 20px;
	overflow: auto;
	.grades-list {
		li {
			list-style: none;
		}
		.item {
			padding: 0 10px;
			background: #fff;
			margin-bottom: 15px;
			min-width: 1120px;
			> div {
				position: relative;
				width: 260px;
				display: inline-block;
				height: 84px;
				line-height: 84px;
				&:nth-child(2) {
					width: 200px;
				}
				&:nth-child(3) {
					width: 360px;
					margin-right: 30px;
				}
				&:nth-child(4) {
					width: 150px;
				}
				.status {
					position: absolute;
					border: 1px solid #66ccff;
					width: 300px;
					height: 12px;
					border-radius: 8px;
					top: 20px;
					> span {
						position: absolute;
						display: inline-block;
						background: #66ccff;
						width: 30%;
						height: 10px;
						border-radius: 8px;
						border: 1px solid #66ccff;
						left: -2px;
					}
					+ p {
						position: relative;
						top: 16px;
						width: 300px;
						text-align: center;
					}
				}
				span {
					&.btn {
						margin-right: 15px;
					}
					&.s1 {
						display: inline-block;
						background: #66ccff;
						width: 20px;
						height: 10px;
						margin-right: 10px;
					}
					&.s2 {
						display: inline-block;
						background: #fff;
						width: 18px;
						height: 10px;
						border: 1px solid #66ccff;
						margin-left: 20px;
						margin-right: 10px;
					}
				}
			}
		}
		.detail {
			padding: 0 10px;
			background: #ddd;
			margin-bottom: 10px;
			min-width: 1120px;
			position: relative;
			top: -15px;
			display: none;
			> div {
				position: relative;
				width: 220px;
				display: inline-block;
				height: 48px;
				line-height: 48px;
				p {
					span {
						margin-left: 25px;
					}
				}
			}
		}
	}
}
</style>