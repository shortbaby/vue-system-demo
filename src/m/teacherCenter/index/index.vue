<!--
	@file 老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="main">
		<div class="timetable-item spec">
    	    <div>
    	    今日签到（{{time | date 'yyyy-MM-dd'}} {{weekType | weektype}})
    	    </div>
    	    <ul class="timetable-list">
    	        <li class="timetable-list-item" v-for="item in list" @click="forward(item)">
    	            <div class="tabletime-time over">
    	                <p>
    	                    {{item.startTime | date 'HH:mm'}}
    	                </p>
    	                <p>
    	                    ~
    	                </p>
    	                <p>
    	                   {{item.endTime | date 'HH:mm'}}
    	                </p>
    	            </div>
    	            <div class="timetable-content">
    	                <div class="sign-info" :class="{unsigned: item.signStatus == 0}">
                            <div class="unsign">
                                {{item.signStatusStr}}
                            </div>
                        </div>
    	                <p class="text-line-1">
    	                    <span class="class-name">
    	                      	{{item.name}}
    	                    </span>
    	                </p>
    	          
    	                <p class="text-line-2">
    	                    <span class="class-people">
    	                        <span class="icon-people">
    	                        </span>
    	                        {{item.teacherName}}
    	                    </span>
    	                    <span class="class-room">
    	                        <span class="icon-classroom">
    	                        </span>
    	                        {{item.roomName}}
    	                    </span>
    	                </p>
    	            </div>
    	        </li>
    	    </ul>
    	</div>
    	<div class="timetable-item spec" v-if="unsign.startTime">
    	    <div>
    	    	<p>最近一次待签到课程</p>
    	    	<p>{{unsign.startTime | date 'yyyy-MM-dd'}} {{unsign.weekType | weektype}}</p>
    	    </div>
    	    <ul class="timetable-list">
    	        <li class="timetable-list-item" @click="forward(unsign)">
    	            <div class="tabletime-time over">
    	                <p>
    	                    {{unsign.startTime | date 'HH:mm'}}
    	                </p>
    	                <p>
    	                    ~
    	                </p>
    	                <p>
    	                    {{unsign.endTime | date 'HH:mm'}}
    	                </p>
    	            </div>
    	            <div class="timetable-content">
    	                <div class="sign-info" :class="{unsigned: unsign.signStatus == 0}">
    	                    <div class="unsign">
    	                        {{unsign.signStatusStr}}
    	                    </div>
    	                </div>
    	                <p class="text-line-1">
    	                    <span class="class-name">
    	                      	{{unsign.name}}
    	                    </span>
    	                </p>
    	          
    	                <p class="text-line-2">
    	                    <span class="class-people">
    	                        <span class="icon-people">
    	                        </span>
                                {{unsign.teacherName}}
    	                    </span>
    	                    <span class="class-room">
    	                        <span class="icon-classroom">
    	                        </span>
    	                        {{unsign.roomName}}
    	                    </span>
    	                </p>
    	            </div>
    	        </li>
    	    </ul>
    	</div>
        <loading :show="!list"></loading>
        <div class="none-list" v-if="!list"><span>暂无数据</span></div>
	</div>
    <teacher-center-footer current="index"></teacher-center-footer>
</template>

<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
.timetable-item.spec {
	border: 1px solid #ccc;
	padding: 0;
	margin: 1rem;
	> div {
		padding: 1rem;	
	}
	.timetable-list {
		border-top: 1px solid #ccc;
		background: #fff;
		padding: 1rem;
		margin-top: 0;
	}
}
</style>