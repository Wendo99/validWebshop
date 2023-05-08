<script lang="ts">
	import type { Rating } from '../routes/+page.server';
	export let rating: Rating;

</script>

<div class="grid grid-cols-2  items-center">
	<img src="star.svg" class="scale-50" alt="star rating"/>
	<div id="rate" class="text-gray-500">{rating.rate}</div>
</div>
