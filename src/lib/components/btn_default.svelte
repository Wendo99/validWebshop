<script lang="ts">
	export let text: string;

	enum ButtonTypes {
		'button',
		'submit',
		'reset',
		null,
		undefined
	}
</script>

<button
	class="rounded-full border-2 t p-2 min-w-min max-w-fit h-14 text-1xl font-semibold"
	type="button">{text}</button
>
