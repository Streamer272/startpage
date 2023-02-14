<script>
	export let label = '';
</script>

<div class="w-96 flex items-center justify-center flex-col">
	{#if label}
		<h1 class="text-4xl">{label}</h1>
	{/if}
	<div class="w-full h-px border-none bg-neutral-100" />
	<slot />
</div>
