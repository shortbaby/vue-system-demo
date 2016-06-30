<!--
	@file 签到-component-签到底部
	@author xuguanlong
-->

<template>
	<div class="fixed-footer">
		<ul>
			<li :class="{'active': current == 'sign'}"><a v-link="{path: '/index'}">签到</a></li>
			<li :class="{'active': current == 'history'}" ><a v-link="{path: '/signhistory'}">历史签到记录</a></li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			current: {
				type: String,
				default: 'sign'
			}
		}
	};
</script>