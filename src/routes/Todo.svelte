<script lang="ts">
	import type { TimeTracker } from '$lib/time-tracker';
	import type { Observable } from 'rxjs';

	export let tick: Observable<number>;
	export let tracker: TimeTracker;

	let duration = 0;
	let isRunning = tracker.isRunning();

	const start = () => {
		tracker.start();
	};

	const stop = () => {
		tracker.stop();
	};

	$: if ($tick) {
		duration = tracker.durationInSeconds();
		isRunning = tracker.isRunning();
	}
</script>

<div class="flex gap-x-4 rounded-md border p-2 px-4">
	<p>Tracker</p>
	{#if isRunning}
		<button class="text-red-700" type="button" on:click={stop}>stop</button>
	{:else}
		<button class="text-green-700" type="button" on:click={start}>start</button>
	{/if}
	<p class="w-28">duration: {duration}</p>
</div>
