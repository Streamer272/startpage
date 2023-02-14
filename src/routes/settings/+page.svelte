<script>
	import Section from '$lib/components/Section.svelte';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';

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
	<a href="/" class="absolute top-4 right-4">
		<span class="material-symbols-outlined text-5xl">home</span>
	</a>

	<Section label={'Introduction'}>
		<FormField>
			<Switch bind:checked={enableIntroduction} />
			<span slot="label">Enable introduction</span>
		</FormField>

		<FormField>
			<Switch bind:checked={enableGreeting} />
			<span slot="label">Enable greeting</span>
		</FormField>
	</Section>
</div>
