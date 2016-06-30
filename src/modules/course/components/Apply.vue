<template>
    <div>
        <modal :show.sync="show" :width="420">
            <div slot="modal-header" class="modal-header">
                <h4 class="modal-title" >申请排课</h4>
                <span class="icon-times" title="关闭" @click.stop="hide()"></span>
            </div>
            <div slot="modal-body" class="modal-body">

                <div class="input-control apply-date">
                    <label>开课日期:</label>
                    <div @click.stop="showCalendar($event)">
                        <input type="text" class="time-input" v-model="startTime" class="medium">
                        <calendar :show.sync="calendarShow" :value.sync="startTime" :x="calendarX" :y="calendarY" :range="calendarRange" :type.sync="calendarType"></calendar>
                    </div>
                </div>
            </div>
            <div slot="modal-footer">
                <div class="modal-footer">
                    <button @click.stop="submit($event)" class="btn btn-primary">保存</button>
                    <button @click.stop="hide()" class="btn btn-default">取消</button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import Modal from '../../../../dep/vue-strap/src/Modal.vue';
import Calendar from '../../../common/components/Calendar.vue';
import { applySchedule } from '../request';
export default {
    data() {
        return {
            startTime: '',
            calendarShow: false,
            calendarType: "date",
            calendarX: 0,
            calendarY: 0,
            calendarRange: false
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false,
            twoWay: true
        },
        id: {
            type: Number,
            default: -1,
            twoWay: true
        }
    },
    methods: {
        hide() {
            this.show = false;
            $('body').removeClass('modal-open');
        },
        showCalendar(event) {
            event.stopPropagation();
            var that=this;
            that.calendarShow=true;
            that.calendarX=0;
            that.calendarY=event.currentTarget.offsetHeight+8;
            var bindHide=function(event){
                event.stopPropagation();
                that.calendarShow=false;
                document.removeEventListener('click',bindHide,false);
            };
            setTimeout(function(){
                document.addEventListener('click',bindHide,false);
            },500);
        },
        submit (e) {
            let btn = $(e.target);
            btn.prop('disabled', true);
            let self = this;
            applySchedule({
                classesId: this.id,
                startTime: new Date().fromFormattedString(this.startTime, 'yyyy/MM/dd').getTime()
            })
                .then((res) => {
                    dispatch('TOAST', '申请排课成功', 'success');
                    setTimeout(function() {
                        self.hide();
                    }, 1000);
                }).always(() => {
                    btn.prop('disabled', false);
                })
        }
    },
    components: {
        Modal: Modal,
        Calendar: Calendar
    }
}
</script>
<style lang="sass">
.modal-body {
    // padding: px 0;
    > .apply-date {
        margin: 15px 0;
        > div {
            position: relative;
            display: inline-block;
            &:before {
               position: absolute;
                font-family: 'icomoon';
                right: 10px;
                top: 6px;
                font-size: 16px;
                content: "\e900";
                color: #999;
                z-index: 10;
            }
            > .time-input {
                width: 240px;
                display: inline-block;
                height: 24px;
            }
        }
    }
}
</style>