
<template>
	<div class="time-table-wrap">
		<time-table :show-schedule-class-info="showClassInfo" :student-id="id"></time-table>
	</div>
</template>

<script>
import ScheduleMixins from './scheduleMixins';
export default {
	mixins: [ScheduleMixins]
}
</script>
<style lang="sass">
</style>