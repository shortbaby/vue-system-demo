<!--
    @file 百度地图
    @author XiaoBin Li(lixiaobin@baijiahulian.com)
-->

<template>
	<div>
		<modal :show.sync="show">
			<div slot="modal-header" class="modal-header">
		    	<h4 class="modal-title">查看地图</h4>
		    	<span class="icon-times" title="关闭" @click.stop="close()"></span>
		  	</div>
		  	<div slot="modal-body" class="modal-body">
				<div class="big-map">
				    <div id="big-map"></div>
				    <span class="map-oper">
				        <button class="btn btn-sm btn-warning btn-over" @click="saveAddress()">保存位置</button>
				        <button class="btn btn-sm btn-default btn-initial" @click="initialAddress()">回原位置</button>
				        <span class="bg"></span>
				    </span>
				    <input type="hidden" name="lng" ng-model="lng" />
				    <input type="hidden" name="lat" ng-model="lat" />
				</div>
		  	</div>
		  	<div slot="modal-footer"></div>
		</modal>
	</div>
</template>

<script>

	import Modal from '../../../dep/vue-strap/src/Modal.vue';
	import * as baiduMap from '../plugin/baidu';

	export default {
		props: {
			show: {
				type: Boolean,
				default: false,
				twoWay: true
			},
			area: {
				type: String,
				default: '北京'
				
			},
			lng: {
				type: Number,
				default: 0
			},
			lat: {
				type: Number,
				default: 0
			}
		},
		components: {
			Modal: Modal
		},
		created () {
			var self = this;
			Vue.nextTick(function () {
				self.bindEvent();
			});
		},
		methods: {
			/**
	         * dispose map
	         */
			disposeMap() {
				var existedMap = baiduMap.getExistedMap();
				this.$set('show', false);
				existedMap['big-map'] = null;
			},
            
            /**
             * 回到原点
             */
            initialAddress () {
                this.getAreaToMap(this.area, this.lng, this.lat);
            },

            /**
             * 保存位置
             */
            saveAddress() {
                var formElement =  $('.big-map'); 
                var lng = formElement.find('input[name="lng"]').val();
                var lat = formElement.find('input[name="lat"]').val();

				this.$dispatch('savebaidumapaddress', {
					lng: lng,
					lat: lat
				});
                this.disposeMap();
            },

            /**
             * 绑定事件
             */
            bindEvent () {
            	this.getAreaToMap(this.area, this.lng, this.lat);
            },

            close () {
            	this.disposeMap();
            },

            /*
             * 获取当前用户编辑的省市区地址信息，并定位地图
             * 如果有lng,lat 经纬度优先定位
             * @property area 省市区信息
             * @property lng、lat 经纬度信息
             */
            getAreaToMap (area, lng, lat) {
                // require(['BaiduMap'], function () {
                if (lng && lat) {
                    baiduMap.addrReso('big-map', area, lng, lat);
                } else {
                    baiduMap.addrReso('big-map', (area || '北京'));
                }
                // });
            }
		}
	}
</script>

<style lang="sass">
	.big-map {
	    #big-map {
	        width: 570px;
	        height: 380px;
	        border: 1px solid #ddd;
	    }

	    .map-oper {
	        position: absolute;
	        left: 0;
	        bottom: 0;
	        width: 100%;
	        height: 36px;
	        text-align: center;
	        button {
	            position: relative;
	            z-index: 2;
	            margin-top: 5px;
	        }
	        .btn-default {
	            margin-left: 5px;
	        }
	        .bg {
	            /*@include opacity(0.5);*/
	            background-color: #000;
	            position: absolute;
	            left: 0;
	            top: 0;
	            width: 100%;
	            height: 100%;
	            z-index: 1;
	        }
	    }

	}
</style>