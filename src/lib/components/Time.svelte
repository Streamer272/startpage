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
		YEAR_FORMAT_OPTIONS
	} from '$lib/types/defaults';
	import { browser } from '$app/environment';
	import type { prerendered } from '$service-worker';

	let greeting = '';
	let time = '';
	let date = '';
	let timeFormat = '';
	let dateFormat = '';

	export function getSetting<T>(name: string, defaultValue: T): T {
		if (typeof window === 'undefined') return defaultValue;

		console.log('reading', name);
		const value = localStorage.getItem(name);
		return value ? JSON.parse(value) : defaultValue;
	}

	function updateTime() {
		time = dayjs().format(timeFormat);
		date = dayjs().format(dateFormat);
	}

	$: {
		greeting = '';
		timeFormat = '';
		dateFormat = '';

		if (browser) {
			// greeting
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
				greeting += "It's";
			}

			const seconds = getSetting('showSeconds', DEFAULT_SHOW_SECONDS) ? ':ss' : '';
			if (getSetting('hourFormat', DEFAULT_HOUR_FORMAT) == '12 hour') {
				timeFormat = `h:mm${seconds} A`;
			} else {
				timeFormat = `HH:mm${seconds}`;
			}

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

	export const prerendered = false
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
