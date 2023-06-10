<script lang="ts">
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import ImageDefault from '$lib/types/ImageDefault.svelte';
	import { page } from '$app/stores';
	export let userEmail: string | null;

	$: signInUrl = buildSignInUrl($page.url);

	function buildSignInUrl(old: URL): string {
		const url = new URL('/logging/signIn', old.origin);
		url.searchParams.set('returnTo', old.pathname);
		return url.href;
	}
</script>

{#if userEmail != null}
	<form action="/logging/signIn?/logout" method="POST">
		<ButtonDefault type="submit">
			<div>Logout</div>
			<ImageDefault width="50" height="50" src="/login.svg" alt="logout button" />
		</ButtonDefault>
	</form>
{:else if userEmail == null}
	<a href={signInUrl}>
		<ButtonDefault type="button"
			><div>Login</div>
			<ImageDefault width="50" height="50" src="/login.svg" alt="login button" />
		</ButtonDefault>
	</a>
{/if}
