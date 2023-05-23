<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';

	export let userEmail: string | undefined;
</script>

{#if userEmail != undefined}
	<form action="/logging/signIn?/logout" method="POST">
		<ButtonDefault type="submit" class="items-center">
			<div>Logout</div>
			<ImageDefault width="50" height="50" src="/login.svg" alt="logout button" />
		</ButtonDefault>
	</form>
{:else if userEmail == undefined}
	<a href="/logging/signIn">
		<ButtonDefault type="button" class="items-center"
			><div>Login</div>
			<ImageDefault width="50" height="50" src="/login.svg" alt="login button" />
		</ButtonDefault>
	</a>
{/if}
