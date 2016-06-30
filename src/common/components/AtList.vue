<template>
	<div class="at-list-ul" v-show="show"  :style="{'left':x+'px','top':y+'px'}">
		<div>
			<ul>
				<li v-for="item in list" @click="select(item)">
					<span>{{item.name}}</span>
				</li>	
			</ul>
			<!-- <i class="arrow-down"></i> -->	
		</div>
		
	</div>
</template>
<script>
import {getColleagueList} from '../request';
export default {
	data() {
		return {
			list: []
		}
	},
	created() {
		this.getMates();
	},
	props: {
		show: {
            type: Boolean,
            twoWay: true,
            default:false   
        },
		x: {
            type: Number,
            default:0 
        },
        y: {
            type: Number,
            default:0
        },
	},
	methods: {
		getMates(){
			getColleagueList()
				.then((res) => {
					this.list = res.data.list;
				})
		},
		select(item) {
			this.$dispatch('at', item);
			this.show = false;
		}
	}
}	
</script>
<style lang="sass">
.at-list-ul {
    width: 100px;
    height: 200px;
    overflow: auto;
    //padding: 5px;
    background: #fff;
    position: absolute;
    border: 1px solid #DEDEDE;
    border-radius: 2px;
    opacity:.95;
    transition: all .5s ease;
    z-index: 100;
    > div {
    	position: relative;
    }
    .arrow-down {
    	display: inline-block;
    	position: absolute;
	    width:0; 
	    height:0; 
	    border-left:20px solid transparent;
	    border-right:20px solid transparent;
	    border-top:20px solid #0066cc;
	}
    
    // &::before {
    // 	position: absolute;
	   //  left:30px;
	   //  top: -10px;
	   //  content: "";
	   //  border:5px solid rgba(0, 0, 0, 0);
	   //  border-bottom-color: #DEDEDE;	
    // }
    // &::after {
    // 	position: absolute;
	   //  left:30px;
	   //  top: -9px;
	   //  content: "";
	   //  border:5px solid rgba(0, 0, 0, 0);
	   //  border-bottom-color: #fff;
    // }
    ul {
    	li {
    		padding: 5px;
    		list-style: none;
    		border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    		transition: all .2s ease;
    		&:hover {
    			background: #edf0f5;
    		}
    	}
    }
}
</style>