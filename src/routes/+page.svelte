<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Time from '$lib/components/Time.svelte';
	import Tile from '$lib/components/Tile.svelte';
	import Weather from '$lib/components/Weather.svelte';
	import { DEFAULT_ENABLE_SEARCH, getSetting } from '$lib/types/settings';
	import type { Row } from '$lib/types/tile';
	import { newShortcut, newWeather } from '$lib/types/tile';

	const rows: Row[] = [[newWeather(), newShortcut(), newShortcut()]];
</script>

<div class="flex items-center justify-center flex-col">
	<a href="/settings" class="absolute top-4 right-4 visited:text-inherit">
		<span class="material-symbols-outlined text-5xl visited:text-inherit">settings</span>
	</a>

	<Time />
	{#if getSetting('enableSearch', DEFAULT_ENABLE_SEARCH)}
		<div class="h-6" />
		<Search />
	{/if}
	<div class="h-10" />
	{#each rows as row}
		<div class="flex items-center justify-center">
			{#each row as tile}
				{#if tile.type === 'Weather'}
					<Weather />
				{:else if tile.type === 'Shortcut'}
					<Tile>Shortcut</Tile>
				{/if}
			{/each}
		</div>
	{/each}
</div>
