
'use strict';
import Comment from '../../common/components/Comment.vue';
import {listFeedBack} from './request';
export default {
	data () {
		return {
			list: [],
			classInfo: {},
			showComment: false,
			modify: false,
			student: null,
			comment: {
				id: null,
				content: ''
			}
		}
	},
	events: {
		refresh() {
			listFeedBack({
				scheduleId: this.classInfo.id,
				classesId: this.classInfo.classesId
			})
				.then((res) => {
					this.list = res.data;
				})
		}
	},
	route: {
		data(transition) {
			if (transition.to.params.obj) {
				//console.log(transition.to.params.obj);
				this.classInfo = transition.to.params.obj;
				listFeedBack({
					scheduleId: transition.to.params.obj.id,
					classesId: transition.to.params.obj.classesId
				})
					.then((res) => {
						this.list = res.data;
					})
			}	
		}
	},
	methods: {
		add(item) {
			this.student = item;
			this.modify = false;
			this.comment.content = '';
			this.showComment = true;
		},
		modifyComment(item) {
			this.student = item;
			this.modify = true;
			this.showComment = true;
			this.comment.id = item.feedBackId;
			this.comment.content = item.content;
		}
	},
	components: {
		Comment: Comment
	}
}