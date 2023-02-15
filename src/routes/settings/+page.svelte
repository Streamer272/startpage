<script>
	import Section from '$lib/components/Section.svelte';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';
	import Select, { Option } from '@smui/select';

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
			<Option value={'12 hour'}>12 hour</Option>
			<Option value={'24 hour'}>24 hour</Option>
		</Select>
	</Section>
	
	<Section label={'Date'}>
	</Section>
</div>
