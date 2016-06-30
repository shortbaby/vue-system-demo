
<template>
    <div v-show="show">
        <alert :duration="duration" :type="type" :width="width" :placement="placement">
            <button v-show="dismissable" type="button" class="close"
                @click="hide()">
                <span>&times;</span>
            </button>
            <span class="icon-info-circled alert-icon-float-left"></span>
            <slot></slot>
        </alert>
    </div> 
</template>

<script>
    import Alert from '../../../dep/vue-strap/src/Alert.vue';
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            dismissable: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'success'
            },
            width: {
                type: String,
                default: '400px'
            },
            placement: {
                type: String,
                default: 'top'
            },
            duration: {
                type: Number,
                default: 3000
            }
        },
        components: {
            Alert: Alert
        },
        methods: {
            hide() {
                this.show = false;
            }
        },
        watch: {
            show(val) {
                if (this._timeout) clearTimeout(this._timeout)
                if (val && Boolean(this.duration)) {
                  this._timeout = setTimeout(()=> dispatch('HIDE_ALERT'), this.duration)
                }
            }
        }
    }
</script>
<style lang="sass">
button.close {
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: 0 0;
    border: 0;
    outline: none;
    &:active {
        outline: none;
    }
}
.close {
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: .2;
}
</style>