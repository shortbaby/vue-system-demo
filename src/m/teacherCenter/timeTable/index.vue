<!--
	@file feidu-老师中心
	@author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div class="time-table-wrap">
		<div class="timetable-item time" v-for="item in list">
    	    <div>
    	    {{item.time}} {{item.list[0].weekType | weektype}}
    	    </div>
    	    <ul class="timetable-list">
    	        <li class="timetable-list-item" v-for="t in item.list" @click="forward(t)">
    	            <div class="tabletime-time over">
    	                <p>
                            {{t.startTime | date 'HH:mm'}}
                        </p>
                        <p>
                            ~
                        </p>
                        <p>
                           {{t.endTime | date 'HH:mm'}}
                        </p>
    	            </div>
    	            <div class="timetable-content">
    	                <div class="sign-info" :class="{unsigned: t.signStatus == 0}">
    	                    <div class="unsign">
    	                        {{t.signStatusStr}}
    	                    </div>
    	                </div>
    	                <p class="text-line-1">
    	                    <span class="class-name">
    	                      	{{t.name}}
    	                    </span>
    	                </p>
    	          
    	                <p class="text-line-2">
    	                    <span class="class-people">
    	                        <span class="icon-people">
    	                        </span>
    	                    </span>
    	                    <span class="class-room">
    	                        <span class="icon-classroom">
    	                        </span>
    	                        {{t.roomName}}
    	                    </span>
    	                </p>
    	            </div>
    	        </li>
    	    </ul>
    	</div>
    	<loading :show="!list"></loading>
        <div class="none-list" v-if="!list"><span>暂无数据</span></div>
	</div>
    <teacher-center-footer current="timetable"></teacher-center-footer>
</template>

<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
    .time-table-wrap {
        margin-bottom: 5rem;
    }
	.timetable-item.time {
		>div {
			background: #fff;
			display: inline-block;
			padding: .5rem;
			width: 12rem;
		}
	}
</style>