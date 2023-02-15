<script>
	export let label = '';
</script>

<div class="w-96 flex items-center justify-center flex-col mb-10 last:mb-0">
	{#if label}
		<h1 class="text-3xl mb-2">{label}</h1>
	{/if}
	<div class="w-full h-px border-none gradient mb-4" />
	<slot />
</div>

<style lang="postcss">
	.gradient {
		background-image: linear-gradient(
			45deg,
			theme(colors.neutral.900),
			theme(colors.neutral.400),
			theme(colors.neutral.400),
			theme(colors.neutral.900)
		);
	}
</style>
