
<template>
	<div class="bread-navs user-select-none">
		<span v-for="nav in navs" class="nav" @click="handle(nav.command)">{{nav.name}} <span class="grep">•</span> </span> 
	</div>
</template>

<script>
	export default {
        props: {
			taps: {
				type: Array
			}
        },
        computed: {
        	navs() {
        		return this.taps;
        	}
        },
        methods: {
        	handle(command) {
        		if (command) {
        			this.$dispatch(command);
        		}
        	}
        	// go(url) {
        	// 	if (url) {
        	// 		window.router.go({name: url});
        	// 	}
        	// }
        }
    }
</script>

<style lang="sass">
.bread-navs {
	border-bottom:1px solid #e0e0e0;
	color:#6f7276;
	background: #fff;
	padding: 10px 0 10px 10px;
	.nav {
		cursor: pointer;
		.grep {
			padding: 0 px;
		}
		&:last-child {
			.grep {
				display: none
			}
		}
		&:hover {
			color: #00a6fb;
		}
	}
}
</style>