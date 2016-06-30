

'use strict';

import Modal from '../../../../../dep/vue-strap/src/Modal.vue';
import {getPermissions, getRoleDetail, addRole,  editRole} from '../request';

export default {
	data () {
		return {
			roleDetail: {
				name: null,
				types: [],
				permissions: []
			},
			roleTree: []
		};
	},
	created() {
		this.getPermissionsList();
		this.getRoleDetail();
	},
	events: {
		
	},
	props: {
		id: {
			type: Number
		},
		show: {
			type: Boolean,
			default: false,
			twoWay: true
		}
	},
	components: {
		Modal: Modal
	},
	
	methods: {
		expand(id) {
			let li = $('#li-' + id);
			if (li.find('> ul').css("display") == 'block') {
				li.find('ul').slideUp('fast');
			} else {
				li.find('> ul').slideDown('fast');
			}	
		},
		getRoleDetail() {
			if (!this.id) {
				return;
			}
			getRoleDetail({
				id: this.id
			})
				.then((res) => {
					this.roleDetail = res.data;
				})
		},
		inPermissions(id) {
			let res = false;
			let l = this.roleDetail.permissions.length;
			for (let i = 0; i < l; i++) {
				if (this.roleDetail.permissions[i] == id) {
					res = true;
					break;
				}
			};
			return res;
		},
		add(id) {
			if (this.inPermissions(id)) {
				return;
			} else {
				this.roleDetail.permissions.push(id.toString());
			}
		},
		del(id) {
			let l = this.roleDetail.permissions.length;
			let index = -1;
			for (let i = 0; i < l; i++) {
				if (this.roleDetail.permissions[i] == id) {
					index = i;
					break;
				}
			};
			if (index > -1) {
				this.roleDetail.permissions.splice(index, 1);
			} else {
				return
			}
		},
		checked(item) {
			let self = this;
			this.add(item.id);
			if (item.suervisorId) {
				this.add(item.suervisorId);
			}
			if (item.grandpaId) {
				this.add(item.grandpaId);
			}
			if (item.children.length > 0) {
				item.children.forEach(function(t) {
					self.checked(t);
				})
			}
		},
		unchecked(item) {
			let self = this;
			this.del(item.id);
			if (item.children.length > 0) {
				item.children.forEach(function(t) {
					self.unchecked(t);
				})
			}
		},
		select(event, item) {
			let target = $(event.target);
			let self = this;
			let check = target.prop('checked');
			if (!check) {
				this.unchecked(item)
			} else {
				this.checked(item);
			}
			//console.log(this.roleDetail.permissions);
		},
		getPermissionsList() {
			let self = this;
			getPermissions()
				.then(function (res) {
					var data = res.data;
					self.roleTree = data;
					self.roleTree.forEach(function(item) {
						if (item.children.length > 0) {
							item.expand = false;
							item.children.forEach(function(t) {
								if (t.children.length > 0) {
									t.expand = false;
									t.children.forEach(function(i) {
										if (i.children.length > 0) {
											i.expand = false;
										}
									})
								}
							})
						}
					});
				}, function () {
					self.roleTree = [];
				});
		},
		save() {
			let self = this;
			if (self.id) {
				editRole({
					id: self.id,
					name: self.roleDetail.name,
					types: self.roleDetail.types.toString(),
					permissions: self.roleDetail.permissions.toString()
				})
					.then((res) => {
						if(res.code == 0) {
							dispatch('TOAST', '修改职位成功', 'success');
							self.$dispatch('success');
							setTimeout(function() {
								self.hide();
							}, 1000);
						}
					})
			} else {

				addRole({
					name: self.roleDetail.name,
					types: self.roleDetail.types.toString(),
					permissions: self.roleDetail.permissions.toString()
				})
					.then((res) => {
						if(res.code == 0) {
							dispatch('TOAST', '添加职位成功', 'success');
							self.$dispatch('success');
							setTimeout(function() {
								self.hide();
							}, 1000);
						}
					})
			}
		},
		hide() {
			this.show = false;
			$('body').removeClass('modal-open');
		}
	}
}