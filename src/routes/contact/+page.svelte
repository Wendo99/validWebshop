<script>
	import ButtonDefault from '$lib/types/ButtonDefault.svelte';
	import InputDefault from '$lib/types/InputDefault.svelte';
	import RequieredStar from '$lib/types/RequieredStar.svelte';
</script>

<svelte:head><title>Juvenile &#8226; Contact us</title></svelte:head>

<main class="min-h-screen p-2 max-w-5xl">
	<h1 class="text-3xl font-bold mb-4">Contact Form</h1>
	<h2 class="mb-4">Please use this form if you wish to contact us!</h2>

	<form action="" method="POST" class="grid grid-flow-row gap-y-2">
		<div>
			<label for="name" class="block text-xs font-medium tracking-widest text-gray-500"
				>Name<RequieredStar /></label
			>
			<InputDefault type="text" name="name" id="name" required />
		</div>
		<div>
			<label for="email" class="block text-xs font-medium tracking-widest text-gray-500"
				>Email<RequieredStar /></label
			>
			<InputDefault type="email" name="email" id="email" required />
		</div>
		<div>
			<label for="message" class="block text-xs font-medium tracking-widest text-gray-500"
				>Message<RequieredStar /></label
			>
			<textarea
				class="bg-white rounded-md p-2 border border-gray-200 shadow-md drop-shadow-md outline-green"
				name="message"
				id="message"
				cols="30"
				rows="10"
				required
			/>
		</div>
		<section>
			<input type="checkbox" name="privacyPolicy" id="privacyPolicy" required /><RequieredStar
				class="pl-1"
			/>
			<label for="privacyPolicy"
				><span class="text-sm font-medium tracking-widest text-gray-500">DSVGO</span>
				<span class="text-xs font-medium tracking-widest text-gray-500"
					>- By using this form, you consent to the use and storage of your data by this website.</span
				></label
			>
			<a
				class="inline-block mt-2 hover:underline hover:underline-offset-4 hover:decoration-gray-500"
				href="/privacyPolicy"
				><span class="text-sm font-medium tracking-widest text-gray-700">(Privacy policy)</span></a
			>
		</section>
		<ButtonDefault class="h-auto w-16 mt-8 " type="submit">Send</ButtonDefault>
	</form>
</main>
