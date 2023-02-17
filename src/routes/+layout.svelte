<script lang="ts">
	import '../app.css';
</script>

<slot />
<a href="https://github.com/Streamer272/startpage" class="absolute top-2 left-3 text-xl text-inherit visited:text-inherit">repo</a>

<svelte:head>
	<title>Start</title>
</svelte:head>

<style lang="postcss">
	:global(html) {
		font-family: 'Ubuntu', sans-serif;
		color: theme(colors.neutral.100);
		background-color: theme(colors.neutral.900);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
