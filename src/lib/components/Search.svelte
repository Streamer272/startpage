<script>
	let value = '';
</script>

<div
	class="flex items-center justify-center p-3 w-96 rounded-full bg-neutral-800 border border-solid border-neutral-700"
>
	<a href="https://www.google.com" class="inline-block">
		<img src="/google.png" alt="Google" class="w-8 h-8" />
	</a>
	<input
		placeholder="Search"
		bind:value
		class="bg-inherit border-b-1 border-neutral-100 border-solid mx-4 focus:outline-none focus:border-none text-xl"
	/>
	<a href="https://www.google.com/search?q={value}">
		<span class="material-symbols-outlined text-3xl w-8 h-8">search</span>
	</a>
</div>
