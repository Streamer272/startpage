<script lang="ts">
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import {
		DAY_FORMAT_OPTIONS,
		DEFAULT_DAY_FORMAT,
		DEFAULT_ENABLE_DATE,
		DEFAULT_ENABLE_GREETING,
		DEFAULT_ENABLE_TIME,
		DEFAULT_HOUR_FORMAT,
		DEFAULT_MONTH_FORMAT,
		DEFAULT_SHOW_SECONDS,
		DEFAULT_YEAR_FORMAT,
		MONTH_FORMAT_OPTIONS,
		YEAR_FORMAT_OPTIONS,
		getSetting,
		DEFAULT_ENABLE_INTRODUCTION
	} from '$lib/scripts/settings';

	let greeting = '';
	let time = '';
	let date = '';
	let timeFormat = '';
	let dateFormat = '';

	function updateTime() {
		if (timeFormat) time = dayjs().format(timeFormat);
		if (dateFormat) date = dayjs().format(dateFormat);
	}

	$: {
		greeting = '';
		timeFormat = '';
		dateFormat = '';

		// introduction
		if (getSetting('enableIntroduction', DEFAULT_ENABLE_INTRODUCTION)) {
			if (getSetting('enableGreeting', DEFAULT_ENABLE_GREETING)) {
				const now = dayjs();
				if (0 <= now.get('hour') && now.get('hour') < 6) {
					greeting = 'Good night';
				} else if (6 <= now.get('hour') && now.get('hour') < 12) {
					greeting = 'Good morning';
				} else if (12 <= now.get('hour') && now.get('hour') < 18) {
					greeting = 'Good afternoon';
				} else if (18 <= now.get('hour') && now.get('hour') < 24) {
					greeting = 'Good evening';
				}
			}
			if (
				getSetting('enableTime', DEFAULT_ENABLE_TIME) ||
				getSetting('enableDate', DEFAULT_ENABLE_DATE)
			) {
				if (greeting) greeting += ", it's";
				else greeting += "It's";
			}
		}

		// time
		if (getSetting('enableTime', DEFAULT_ENABLE_TIME)) {
			const seconds = getSetting('showSeconds', DEFAULT_SHOW_SECONDS) ? ':ss' : '';
			if (getSetting('hourFormat', DEFAULT_HOUR_FORMAT) == '12 hour') {
				timeFormat = `h:mm${seconds} A`;
			} else {
				timeFormat = `HH:mm${seconds}`;
			}
		}

		// date
		if (getSetting('enableDate', DEFAULT_ENABLE_DATE)) {
			const day = ['ddd ', 'dddd ', ' '].at(
				DAY_FORMAT_OPTIONS.indexOf(getSetting('dayFormat', DEFAULT_DAY_FORMAT))
			);
			const month = ['MMM', 'MMMM'].at(
				MONTH_FORMAT_OPTIONS.indexOf(getSetting('monthFormat', DEFAULT_MONTH_FORMAT))
			);
			const year = [', YY', ', YYYY', ''].at(
				YEAR_FORMAT_OPTIONS.indexOf(getSetting('yearFormat', DEFAULT_YEAR_FORMAT))
			);
			dateFormat = `${day}${month} D${year}`;
		}
	}

	onMount(() => {
		updateTime();
		setInterval(() => {
			updateTime();
		}, 500);
	});

	export const prerendered = false;
</script>

<div class="flex items-center justify-center flex-col">
	{#if greeting}
		<p class="text-4xl p-0 m-0 text-neutral-100">{greeting}</p>
	{/if}
	{#if time}
		<p class="text-4xl p-0 m-0 text-neutral-200">{time}</p>
	{/if}
	{#if date}
		<p class="text-3xl p-0 m-0 text-neutral-300">{date}</p>
	{/if}
</div>
