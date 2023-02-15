<script>
	import Section from '$lib/components/Section.svelte';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';
	import { HOUR_FORMAT_OPTIONS, DAY_FORMAT_OPTIONS, MONTH_FORMAT_OPTIONS, YEAR_FORMAT_OPTIONS} from '$lib/types/options';

	// introduction
	let enableIntroduction = true;
	let enableGreeting = false;

	// time
	let enableTime = true;
	let showSeconds = false;
	let hourFormat = '12 hour';

	// date
	let enableDate = true;
	let dayFormat = 'Short (Mon)';
	let monthFormat = 'Short (Jan)';
	let yearFormat = 'Long (2023)';

	// search
	let enableSearch = true;

	// rows
	let rows = [];
</script>

<div>
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
</div>
