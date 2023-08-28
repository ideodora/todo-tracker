<script lang="ts">
	import { titleSuffix } from '$lib/store/title-suffix';
	import type { PageData } from './$types';

	import { TimeTracker } from '$lib/time-tracker';
	import { onMount } from 'svelte';

	import Todo from './Todo.svelte';

	import { timer } from 'rxjs';

	export let data: PageData;

	let tick = timer(0, 200);

	let timeTrackers: TimeTracker[] = [];

	let timeTracker = new TimeTracker();

	onMount(() => {
		timeTracker.start();
	});

	const start = () => {
		timeTracker.start();
		console.log('start tracker:', timeTracker.durationInSeconds());
	};

	const stop = () => {
		timeTracker.stop();
		console.log('stop tracker:', timeTracker.durationInSeconds());
	};

	const addTracker = () => {
		const tracker = new TimeTracker();
		timeTrackers = [...timeTrackers, tracker];
	};

	$titleSuffix = '';
</script>

<div class="flex h-full flex-col items-center justify-center">
	<h1 class="text-3xl text-gray-700">Welcome to {data.appName}</h1>
	<p class="text-blue-500">
		<a href="/next">next</a>
	</p>
	<p class="mb-4">
		<button type="button" on:click={addTracker}>addTracker</button>
		<button type="button" on:click={start}>start</button>
		<button type="button" on:click={stop}>stop</button>
	</p>
	<div class="space-y-2">
		{#each timeTrackers as tracker}
			<Todo {tracker} {tick} />
		{/each}
	</div>
</div>
