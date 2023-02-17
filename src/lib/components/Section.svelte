<script lang="ts">
	export let label = '';
	export let remove: Function | undefined = undefined;
</script>

<div class="w-96 flex items-center justify-center flex-col mb-10">
	{#if label || remove}
		<div class="flex items-center justify-center">
			{#if label}
				<h1 class="text-3xl mb-2">{label}</h1>
			{/if}
			{#if remove}
				<button on:click={() => remove && remove()} class="bg-transparent border-none">
					<span class="material-symbols-outlined text-3xl ml-2">delete</span>
				</button>
			{/if}
		</div>
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
