<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import Tile from '$lib/components/Tile.svelte';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import {
		HOUR_FORMAT_OPTIONS,
		DAY_FORMAT_OPTIONS,
		MONTH_FORMAT_OPTIONS,
		YEAR_FORMAT_OPTIONS,
		DEFAULT_ROWS,
		DEFAULT_ENABLE_SEARCH,
		DEFAULT_ENABLE_DATE,
		DEFAULT_DAY_FORMAT,
		DEFAULT_MONTH_FORMAT,
		DEFAULT_YEAR_FORMAT,
		DEFAULT_ENABLE_INTRODUCTION,
		DEFAULT_ENABLE_GREETING,
		DEFAULT_ENABLE_TIME,
		DEFAULT_SHOW_SECONDS,
		DEFAULT_HOUR_FORMAT,
		getSetting,
		setSetting
	} from '$lib/types/settings';
	import type { Row } from '$lib/types/tile';
	import { TileTypes } from '$lib/types/tile';

	// introduction
	let enableIntroduction = getSetting('enableIntroduction', DEFAULT_ENABLE_INTRODUCTION);
	let enableGreeting = getSetting('enableGreeting', DEFAULT_ENABLE_GREETING);
	$: setSetting('enableIntroduction', enableIntroduction);
	$: setSetting('enableGreeting', enableGreeting);

	// time
	let enableTime: boolean = getSetting('enableTime', DEFAULT_ENABLE_TIME);
	let showSeconds: boolean = getSetting('showSeconds', DEFAULT_SHOW_SECONDS);
	let hourFormat: string = getSetting('hourFormat', DEFAULT_HOUR_FORMAT);
	$: setSetting('enableTime', enableTime);
	$: setSetting('showSeconds', showSeconds);
	$: setSetting('hourFormat', hourFormat);

	// date
	let enableDate: boolean = getSetting('enableDate', DEFAULT_ENABLE_DATE);
	let dayFormat: string = getSetting('dayFormat', DEFAULT_DAY_FORMAT);
	let monthFormat: string = getSetting('monthFormat', DEFAULT_MONTH_FORMAT);
	let yearFormat: string = getSetting('yearFormat', DEFAULT_YEAR_FORMAT);
	$: setSetting('enableDate', enableDate);
	$: setSetting('dayFormat', dayFormat);
	$: setSetting('monthFormat', monthFormat);
	$: setSetting('yearFormat', yearFormat);

	// search
	let enableSearch: boolean = getSetting('enableSearch', DEFAULT_ENABLE_SEARCH);
	$: setSetting('enableSearch', enableSearch);

	// rows
	let rows: Row[] = getSetting('rows', DEFAULT_ROWS);

	let newTile = 'Weather';

	function createRow() {
		const temp = rows;
		temp.push([]);
		rows = temp;
		setSetting('rows', rows);
	}

	function createTile(rowIndex: number) {
		const temp = rows;
		temp[rowIndex].push(TileTypes[newTile]());
		rows = temp;
		setSetting('rows', rows);
	}

	function removeRow(rowIndex: number) {
		const temp = rows;
		temp.splice(rowIndex, 1);
		rows = temp;
		setSetting('rows', rows);
	}

	function removeTile(rowIndex: number, tileIndex: number) {
		const temp = rows;
		temp[rowIndex].splice(tileIndex, 1);
		rows = temp;
		setSetting('rows', rows);
	}
</script>

<div class="flex items-center justify-center flex-col my-8">
	<a href="/" class="absolute top-4 right-4 visited:text-inherit">
		<span class="material-symbols-outlined text-5xl">home</span>
	</a>

	<Section label={'Introduction'}>
		<FormField align={'end'}>
			<Switch bind:checked={enableIntroduction} />
			<span slot="label">Enable introduction</span>
		</FormField>

		<FormField align={'end'}>
			<Switch bind:checked={enableGreeting} />
			<span slot="label">Enable greeting</span>
		</FormField>
	</Section>

	<Section label={'Time'}>
		<FormField align={'end'}>
			<Switch bind:checked={enableTime} />
			<span slot="label">Enable time</span>
		</FormField>

		<FormField align={'end'}>
			<Switch bind:checked={showSeconds} />
			<span slot="label">Show seconds</span>
		</FormField>

		<Select bind:value={hourFormat} label="Hour format">
			{#each HOUR_FORMAT_OPTIONS as option}
				<Option value={option}>{option}</Option>
			{/each}
		</Select>
	</Section>

	<Section label={'Date'}>
		<FormField align={'end'}>
			<Switch bind:checked={enableDate} />
			<span slot="label">Enable date</span>
		</FormField>

		<Select bind:value={dayFormat} label="Day format">
			{#each DAY_FORMAT_OPTIONS as option}
				<Option value={option}>{option}</Option>
			{/each}
		</Select>

		<Select bind:value={monthFormat} label="Month format">
			{#each MONTH_FORMAT_OPTIONS as option}
				<Option value={option}>{option}</Option>
			{/each}
		</Select>

		<Select bind:value={yearFormat} label="Year format">
			{#each YEAR_FORMAT_OPTIONS as option}
				<Option value={option}>{option}</Option>
			{/each}
		</Select>
	</Section>

	<Section label={'Search'}>
		<FormField align={'end'}>
			<Switch bind:checked={enableSearch} />
			<span slot="label">Enable search</span>
		</FormField>
	</Section>

	{#each rows as row, index}
		<Section label={'Row'} remove={() => removeRow(index)}>
			<div class="flex items-center justify-center">
				{#each row as tile}
					<Tile>
						<p>{tile.type}</p>
					</Tile>
				{/each}
				{#if row.length < 3}
					<Tile>
						<Select bind:value={newTile} label="New tile type">
							{#each Object.keys(TileTypes) as type}
								<Option value={type}>{type}</Option>
							{/each}
						</Select>
						<button on:click={() => createTile(index)}>
							<span class="material-symbols-outlined text-neutral-100 text-3xl">add</span>
						</button>
					</Tile>
				{/if}
			</div>
		</Section>
	{/each}

	<button on:click={createRow}>
		<span class="material-symbols-outlined text-neutral-100 text-5xl">add</span>
	</button>
</div>
