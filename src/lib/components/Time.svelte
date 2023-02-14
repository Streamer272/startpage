<script lang="ts">
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';

	let time = '';
	let date = '';
	const timeFormat = 'h:mm:ss';
	const dateFormat = 'ddd MMM D, YYYY';

	function update() {
		time = dayjs().format(timeFormat);
		date = dayjs().format(dateFormat);
	}

	onMount(() => {
		update();
		setInterval(() => {
			update();
		}, 500);
	});
</script>

<div class="flex items-center justify-center flex-col">
	<p class="text-4xl p-0 m-0 text-neutral-100">It's</p>
	<p class="text-4xl p-0 m-0 text-neutral-200">{time}</p>
	<p class="text-3xl p-0 m-0 text-neutral-300">{date}</p>
</div>
