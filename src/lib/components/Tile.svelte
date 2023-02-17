<script lang="ts">
	export let title = '';
</script>

<div class="bg-neutral-800 rounded-xl w-40 h-28 flex items-center justify-center flex-col mx-3 relative">
    {#if title}
        <p class="text-xl font-bold">{title}</p>
    {/if}
	<slot />
</div>
