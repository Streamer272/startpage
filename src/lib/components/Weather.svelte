<script lang="ts">
	import CircularProgress from '@smui/circular-progress';
	import Tile from '$lib/components/Tile.svelte';
	import axios from 'axios';
	import { getCookie, setCookie } from '$lib/scripts/settings';
	import { onMount } from 'svelte';

	let temp = '';
	let weatherImage = '';

	onMount(async () => {
		function getImageFromWeatherCode(code: number): string | undefined {
			if (0 <= code && code <= 5) return '/sunny.png';
			else if (6 <= code && code <= 19) return '/clouds.png';
			else if (20 <= code && code <= 29) return '/rain.png';
			else if (30 <= code && code <= 49) return '/clouds.png';
			else if (50 <= code && code <= 69) return '/rain.png';
			else if (70 <= code && code <= 79) return '/snow.png';
			else if (80 <= code && code <= 99) return '/rain.png';
			else return undefined;
		}

		async function loadWeather(latitude?: number, longitude?: number) {
			if (latitude === undefined || longitude === undefined) {
				return;
			}

			const weather = await axios.get(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=celsius`
			);
			if (weather.status !== 200 || weather.data?.current_weather?.temperature === undefined)
				return;

			temp = `${Math.floor(weather.data.current_weather.temperature)} °C`;
			weatherImage = getImageFromWeatherCode(weather.data.current_weather.weathercode) ?? '';
			const expires = new Date();
			expires.setHours(expires.getHours() + 1);
			setCookie('temp', temp, expires);
			setCookie('weatherImage', weatherImage, expires);
		}

		if (getCookie('temp')) {
			temp = getCookie('temp')!!;
			weatherImage = getCookie('weatherImage') ?? '';
		}

		navigator.geolocation.getCurrentPosition(
			async (data) => {
				// success
				await loadWeather(data.coords.latitude, data.coords.longitude);
			},
			async () => {
				// error
				const location = await axios.get('https://www.geolocation-db.com/json/');
				if (
					location.status !== 200 ||
					location.data?.latitude === undefined ||
					location.data?.longitude === undefined
				) {
					temp = "Couldn't load temp";
					return;
				}

				await loadWeather(location.data.latitude, location.data.longitude);
			}
		);
	});
</script>

<Tile>
	<div class="flex items-center justify-center">
		{#if temp}
			<p class="p-0 m-0 text-xl">{temp}</p>
			{#if weatherImage}
				<img src={weatherImage} alt="Weather" class="w-8 h-8 ml-3" />
			{/if}
		{:else}
			<CircularProgress indeterminate style="width: 2rem; height: 2rem;" />
		{/if}
	</div>
</Tile>
