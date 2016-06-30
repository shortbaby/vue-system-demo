
<template>
	<div class="follow-wrap">
		<div class="left">
			<span class="mark-btn user-select-none" :class="{active: searchMark}" @click="setMark()">成长记录</span>
			<ul class="follow-logs" v-if="!noRes">
				<li  v-for="item in commentList" v-zoomimage v-bind:id="item.commentId" class="follow-item follow-item-{{item.commentId}}" >
					<div class="time-info">
						<span class="follow-time">{{item.zhTime}}</span>
						<div class="follow-type">
							<span v-if="item.followType == -1" class="type icon-xueyuan"></span>
							<span v-if="item.followType == 0" class="type icon-phone"></span>
							<span v-if="item.followType == 1" class="type icon-consult"></span>
							<span v-if="item.followType == 2" class="type icon-qq"></span>
							<span v-if="item.followType == 3" class="type icon-wechat2"></span>
							<span v-if="item.followType == 4" class="type icon-users"></span>
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
								<h3>{{item.userName}}<span class="role"></span><span class="time">{{item.createTime | date 'HH:mm'}}</span></h3>
								<p class="log">
									{{item.content}}
								</p>
								<div class="image-wrap" v-if="item.hasImage">
									<a class="slider-log-img" v-for="s in item.imageList" href="{{s}}" track-by="$index">
										<img :src="s | compressImage 60 60"/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<pager :page-no.sync="pageDto.pageNum" v-on:page-change="pageChange" :count="pageDto.count"></pager>
			<!-- <div class="more" v-if="!noRes">
				<span class="user-select-none" v-if="more" v-show="!loading" @click="loadMore()">加载更多...</span>
				<div class="spinner" v-show="loading">
					  <div class="double-bounce1"></div>
					  <div class="double-bounce2"></div>
				</div>
			</div> -->
			<div class="none-list" v-if="noRes">
				<span >没有跟进记录</span>
			</div>
		</div>
		<div class="right">
			<div class="log-wrap">
				<textarea placeholder="在这里填写跟进内容吧" v-model="comment.content" id="log-txt" name="log-txt" rows="18" cols="34"></textarea>
				<div class="mark">
					<div class="small-users">
						<a v-for="item in atUsers" href="javascript:void(0)" track-by="$index">
							<span>{{item.name}}</span>
							<span class="icon-times" @click.stop="delAtUser($event, item)"></span>
						</a>
					</div>
					<div class="small-pics">
						<a class="slider-small-img" v-for="m in comment.imageList" href="{{m}}" track-by="$index">
							<img :src="m | compressImage 45 45"/>
							<span class="icon-times" @click.stop="delImage($event, m)"></span>
						</a>
					</div>
					<input v-if="type =='student'" class="fl" type="checkbox" name="send" id="send" v-model="sendToStudent"/><label v-if="type =='student'" for="send" class="fl">发至学生微信</label>
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
				<div class="link" @click="showAt($event)">
					<span class="icon-xueyuan"></span>
					<span>同事</span>
				</div>
				<at-list :show.sync="atMatesShow" :x="atX" :y="atY"></at-list>
				<v-select :options="followFieldOptions" :close-on-select="true" :value.sync="followField | str"></v-select>
				<span class="btn btn-primary" @click="save()">发布</span>
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