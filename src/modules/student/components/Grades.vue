
<template>
	<div class="wrap">
		<ul class="grades-list">
			<template v-for="item in list">
				<li class="item"  id="grade-{{item.id}}" data-id ="{{item.id}}" @mouseenter = "changeHoverId($event)" @mouseleave="mouseleave($event)" @click="showGradeDetail($event)">
					<div>
						<p>{{item.name}}({{item.number}})</p>
					</div>
					<div>
						<p>{{item.statusStr}}</p>
					</div>
					<div>
						<p class="status">
							<span class="done" :style="{width: (item.signLessons / item.totalLessons) * 300 + 'px'  }"></span>
						</p>
						<p><span class="s1"></span><span>已上课次{{item.signLessons}}</span> <span class="s2"></span><span>总课次{{item.totalLessons}}</span></p>
					</div>
					<div>
						<span class="btn btn-primary" v-disable="item.status" @click.stop="quit($event)">退班</span>
						<!-- <span class="btn btn-primary"   @click.stop="sign($event)">签到</span> -->
					</div>
				</li>
				<li class="detail">
					<div v-for="m in item.lessons">
						<p>{{m.name}}dddddd<span>{{m.finishLesson}}/{{m.totalLesson}}</span></p>
					</div>
				</li>
			</template>
		</ul>
		<div class="none-list" v-if="noRes">
			<span >没有班级记录</span>
		</div>
		<div class="more" v-if="!noRes">
			<span class="user-select-none" v-if="more" v-show="!loading" @click="loadMore()">加载更多...</span>
			<div class="spinner" v-show="loading">
				  <div class="double-bounce1"></div>
				  <div class="double-bounce2"></div>
			</div>
		</div>
		<grade-detail v-if="showDetail" :show.sync = "showDetail" :id.sync = "hoverId"  :studentid="id"></grade-detail>
		<quit-class v-if="isQuit" :show.sync = "isQuit" :studentid="id" :id.sync = "hoverId"></quit-class>
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
	background:#ffffff;
	border:1px solid #e0e0e0;
	padding: 30px 30px 65px ;
	overflow: auto;
	.grades-list {
		li {
			list-style: none;
		}
		.item {
			border: 1px dashed #e0e0e0;
			height: 80px;
			padding: 20px;
			box-sizing: border-box;
			min-width: 1120px;
			> div {
				float: left;
				width: 260px;
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
						// width: 30%;
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
					&.disabled {
						background: #999;
						cursor: auto;
						border: none;
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
	.more {
        text-align: center;
        padding: 10px;
        span {
            cursor: pointer;
            font-size: 15px;
            &:hover {
                color: #66ccff;
            }
        }
        .spinner {
            width: 40px;
            height: 40px;
            position: relative;
            margin: 0 auto;
        }
        .double-bounce1,
        .double-bounce2 {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #66ccff;
            opacity: 0.6;
            position: absolute;
            top: 0;
            left: 0;
            -webkit-animation: bounce 2.0s infinite ease-in-out;
            animation: bounce 2.0s infinite ease-in-out;
        }
        .double-bounce2 {
            -webkit-animation-delay: -1.0s;
            animation-delay: -1.0s;
        }
    }
}
</style>