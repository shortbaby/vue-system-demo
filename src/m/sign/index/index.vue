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
                            <div v-if="item.signStatus == 0" class="unsign">
                                未签到
                            </div>
                            <div v-if="item.signStudents > 0">
                                <span>签到</span>
                                <br/>
                                <span>{{item.signStudents}}/{{item.totalStudents}}</span>
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
                                {{item.subTypeName}}第{{item.index}}节
                                </span>
                            </span>
                            <span class="class-room">
                                <span class="icon-classroom">
                                </span>
                                {{item.roomName}}
                            </span>
                        </p>
                    </div>
                    <div class="sign-type clearfix">
                    </div>
                </li>
            </ul>
        </div>
        <loading :show="!list"></loading>
        <div class="none-list" v-if="!list"><span>暂无数据</span></div>
    </div>
</template>

<script>
	import IndexMixins from './indexMixins.js';
	export default {
		mixins: [IndexMixins]
	};
</script>
<style lang="sass">
.timetable-item.spec {
    > div {
        background: #fff;
        color: #66ccff;
        padding: .3rem 2rem .3rem .5rem;  
    }
    .sign-type {
        border-top: 1px solid #ccc;
        padding: .5rem 0;
        span {
            display: inline-block;
            width: 50%;
            float: left;
            box-sizing: border-box;
            text-align: center;
            &:first-child {
                border-right: 1px solid #ccc;
            }
        }   
    }
}
</style>