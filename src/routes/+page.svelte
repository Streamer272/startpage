<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import Time from '$lib/components/Time.svelte';
	import Tile from '$lib/components/Tile.svelte';
	import Weather from '$lib/components/Weather.svelte';
	import { DEFAULT_ENABLE_SEARCH, getSetting } from '$lib/types/settings';
	import type { Row } from '$lib/types/tile';
	import { newShortcut, newWeather } from '$lib/types/tile';

	const rows: Row[] = [
		[
			newWeather(),
			newShortcut(
				'https://reddit.com',
				'Reddit',
				'https://reddit.com/favicon.ico',
				'https://new.svitan.dev',
				'New',
				'https://new.svitan.dev/favicon.ico'
			),
			newShortcut(
				'https://console.firebase.google.com',
				'Firebase',
				'http://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_96dp.png'
			)
		]
	];
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
		<div class="flex items-center justify-center mb-6 last:mb-0">
			{#each row as tile}
				{#if tile.type === 'Weather'}
					<Weather />
				{:else if tile.type === 'Shortcut'}
					<Tile>
						{#if tile.link1}
							<a
								href={tile.link1}
								class="flex items-center justify-center flex-row text-inherit visited:text-inherit"
							>
								{#if tile.icon1}
									<img src={tile.icon1} alt={tile.title1} class="w-8 h-8" />
								{/if}
								<p class="ml-2">{tile.title1}</p>
							</a>
						{/if}
						{#if tile.link2}
							<div class="h-2" />
							<a
								href={tile.link2}
								class="flex items-center justify-center flex-row text-inherit visited:text-inherit"
							>
								{#if tile.icon2}
									<img src={tile.icon2} alt={tile.title2} class="w-8 h-8" />
								{/if}
								<p class="ml-2 text-lg">{tile.title2}</p>
							</a>
						{/if}
					</Tile>
				{/if}
			{/each}
		</div>
	{/each}
</div>
