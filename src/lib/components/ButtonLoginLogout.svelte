<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	
	export let userEmail: string|undefined;
</script>

{#if userEmail != undefined}
	<form action="/logging/signIn?/logout" method="POST">
		<ButtonDefault type="submit">
			<div class=" justify-self-start">Logout</div>
			<ImageDefault
				width="80"
				height="80"
				classStyle=" justify-self-end"
				src="/login.svg"
				alt="logout button"
			/>
		</ButtonDefault>
	</form>
{:else if userEmail == undefined}
	<a href="/logging/signIn">
		<ButtonDefault type="button"
			><div class=" justify-self-start">Login</div>
			<ImageDefault
				width="80"
				height="80"
				classStyle=" justify-self-end"
				src="/login.svg"
				alt="login button"
			/>
		</ButtonDefault>
	</a>
{/if}
