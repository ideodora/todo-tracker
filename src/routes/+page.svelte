<script lang="ts">
	import { titleSuffix } from '$lib/store/title-suffix';
	import type { PageData } from './$types';

	import { TimeTracker } from '$lib/time-tracker';
	import { onMount } from 'svelte';

	import Todo from './Todo.svelte';

	import { timer } from 'rxjs';

	export let data: PageData;

	let tick = timer(0, 200);

	type Todo = {
		title: string;
		timeTracker: TimeTracker;
	};

	let todos: Todo[] = [];
	let timeTrackers: TimeTracker[] = [];

	let timeTracker = new TimeTracker();

	let floatingInput: HTMLInputElement;

	let placeholder = '何する？...(Command + k on focus)';

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

	const addTracker = (title: string) => {
		const tracker = new TimeTracker();
		const todo = {
			title,
			timeTracker: tracker
		};
		timeTrackers = [...timeTrackers, tracker];
		todos = [...todos, todo];
	};

	const shortcut = (event: KeyboardEvent) => {
		console.log(event.key, 'eventcode');
		if (event.key === 'k' && event.metaKey) {
			floatingInput.focus();
		}

		if (event.key === 'Enter' && event.metaKey) {
			const value = floatingInput.value;
			floatingInput.value = '';
			addTracker(value);
		}
	};

	const forcusInput = () => {
		placeholder = '何する？ ... (Command + Enter to dterminate';
	};

	const blurInput = () => {
		placeholder = '何する？ ... (Command + k on focus';
	};

	$titleSuffix = '';
</script>

<div class="flex h-full flex-col items-center justify-center">
	<h1 class="text-3xl text-gray-700 mb-6">
		<a href="/next">{data.appName}</a>
	</h1>
	<div class="w-[clamp(50px,_90%,_70ch)] space-y-2">
		{#each todos as todo}
			<Todo {todo} {tick} />
		{/each}
	</div>
</div>
<div class="absolute bottom-0 flex w-full justify-center">
	<div class="w-[clamp(300px,_80%,_650px)] rounded-t-lg bg-indigo-500 px-4 py-px">
		<input
			type="text"
			class="w-full bg-transparent text-2xl font-semibold text-white placeholder:font-normal placeholder:text-gray-300 placeholder-shown:text-sm"
			{placeholder}
			aria-keyshortcuts="N"
			bind:this={floatingInput}
			on:focus={forcusInput}
		/>
	</div>
</div>

<svelte:window on:keydown={shortcut} />
