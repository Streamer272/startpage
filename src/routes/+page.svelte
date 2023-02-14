<script>
	import Search from '$lib/components/Search.svelte';
	import Time from '../lib/components/Time.svelte';
</script>

<div>
	<a href="/settings" class="absolute top-4 right-4">
		<span class="material-symbols-outlined text-5xl">settings</span>
	</a>

	<Time />
	<div class="h-8" />
	<Search />
</div>
