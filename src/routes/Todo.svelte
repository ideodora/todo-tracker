<script lang="ts">
	import type { TimeTracker } from '$lib/time-tracker';
	import type { Observable } from 'rxjs';
	import { Duration } from '$lib/duration';

	type Todo = {
		title: string;
		timeTracker: TimeTracker;
	};

	export let tick: Observable<number>;
	export let todo: Todo;

	let duration = new Duration(0).fullWidth();
	let isRunning = todo.timeTracker.isRunning();

	const start = () => {
		todo.timeTracker.start();
	};

	const stop = () => {
		todo.timeTracker.stop();
	};

	$: if ($tick) {
		duration = new Duration(todo.timeTracker.durationInSeconds()).fullWidth();
		isRunning = todo.timeTracker.isRunning();
	}
</script>

<div
	class="flex w-full cursor-pointer items-center gap-x-4 rounded-md border px-4 py-1 hover:bg-indigo-50"
>
	<div class="w-96">
		<p class="text-normal">{todo.title}</p>
		<p class="text-xs text-gray-400">Creato / Development</p>
	</div>
	<div class="ml-auto flex items-center gap-x-4">
		{#if isRunning}
			<button class="text-red-700" type="button" on:click={stop}>■</button>
		{:else}
			<button class="text-green-700" type="button" on:click={start}>▶︎</button>
		{/if}
		<p class="w-16 text-xs">{duration}</p>
	</div>
</div>
