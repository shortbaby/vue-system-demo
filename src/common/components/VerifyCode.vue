<!--
    @file VerifyCode 验证码组件
    @author xuguanlong
-->
<template>
    <div id="verify-code" v-show="show" >
        <div class="form-li">
            <input type="text" class="code" name="verifycode" v-model="code" placeholder="请输入验证码" :class="{'error': check}">
            <a class="code-wrap" @click="refreshCode()">
                <img v-bind:src="codeUrl">
                <span>点击刷新验证码</span>
            </a>
        </div>
  </div>
</template>

<script>
    import store from '../../store';
    export default {
        props: {
            code: {
                type: String
            },
            show: {
                type: Boolean
            },
            check: {
                type: Boolean
            },
            mobile: {
                type: String
            }
        },
        computed: {
            codeUrl () {
                return store.state.codeUrl + '&mobile=' + this.mobile;
            }
        },
        methods: {
            refreshCode() {
                dispatch('CHANGE_CODE_URL');
            }
        }
    }
</script>

<style lang="sass">
#verify-code {
    .code {
        height: 40px;
        border: 1px solid #ddd;
        width: 180px;
        float: left;
        padding: 2px 10px;
        margin-right: 15px;
        box-sizing: border-box;
    }
    .code-wrap {
        height: 40px;
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
        img {
            width: 98px;
            height: 38px;
            border: 1px solid #ddd;
        }
        span {
            position: relative;
            top: -15px;
        }
    }
}

</style>