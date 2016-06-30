
<template>
	<div class="follow-wrap">
		<div class="left">
			<span class="mark-btn user-select-none" :class="{active: searchMark}" @click="setMark()">成长记录</span>
			<ul class="follow-logs" v-if="!noRes">
				<li  v-for="item in commentList" v-zoomimage v-bind:id="item.commentId" class="follow-item follow-item-{{item.commentId}}" >
					<div class="time-info">
						<span class="follow-time">{{item.zhTime}}</span>
						<div class="follow-type">
							<span class="type icon-xueyuan"></span>
							<br/>
							<span class="type-txt">{{item.followStr}}</span>
						</div>
						<!-- <div class="line"></div> -->
					</div>
					<div class="log-msg">
						<div class="log-content">
							<div v-if = "!item.disabled" class="triangle-left">
							</div>
							<span v-if = "!item.disabled" v-down v-bind:option="[{text:'编辑', command:'modify'}, {text:'删除', command:'del'}]" class="icon-down"
							data-id="{{item.commentId}}"></span>
							<div class="log-detail">
								<h3>张怡宁<span class="role">(咨询顾问)</span><span class="time">{{item.createTime | date 'HH:mm'}}</span></h3>
								<p class="log">
									{{item.content}}
								</p>
								<div class="image-wrap" v-if="item.hasImage">
									<a class="slider-log-img" v-for="s in item.imageList" href="{{s}}" track-by="$index">
										<img :src="s"/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div class="more" v-if="!noRes">
				<span class="user-select-none" v-if="more" v-show="!loading" @click="loadMore()">加载更多...</span>
				<div class="spinner" v-show="loading">
					  <div class="double-bounce1"></div>
					  <div class="double-bounce2"></div>
				</div>
			</div>
			<div class="none-list" v-if="noRes">
				<span >没有跟进记录</span>
			</div>
		</div>
		<div class="right">
			<div class="log-wrap">
				<textarea placeholder="在这里填写跟进内容吧" v-model="comment.content" id="log-txt" name="log-txt" rows="18" cols="34"></textarea>
				<div class="mark">
					<div class="small-pics">
						<a class="slider-small-img" v-for="m in comment.imageList" href="{{m}}" track-by="$index">
							<img :src="m"/>
						</a>
					</div>
					<input type="checkbox" name="landmark" id="landmark" v-model="comment.isMilestone"/><label for="landmark">成长记录</label>
				</div>
				
			</div>
			<div class="log-oprations">
				<div class="pic">
					<upload>
						<div>
							<span class="icon-edit"></span>
							<span>图片</span>
						</div>	
					</upload>
				</div>
				<div class="link">
					<span class="icon-xueyuan"></span>
					<span>同事</span>
				</div>
				<v-select :options="followFieldOptions" :close-on-select="true" :value.sync="followField | str"></v-select>
				<span class="btn btn-primary">发布</span>
			</div>
		</div>
	</div>
</template>

<script>
import FollowMixins from './followMixins';
export default {
	mixins: [FollowMixins]
}
</script>

<style lang="sass">
</style>