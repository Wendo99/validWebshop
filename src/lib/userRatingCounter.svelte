<script lang="ts">
	import type { Rating } from '../routes/+page.server';
	export let rating: Rating;

</script>

<div class="grid grid-cols-2  items-center">
	<img src="userGroup.svg" class="scale-50" alt="user rating counter"/>
	<div id="count" class="text-gray-500">{rating.count}</div>
</div>
