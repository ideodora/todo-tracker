<script lang="ts">
	import '../app.css';
	import { titleSuffix } from '$lib/store/title-suffix';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: theTitle = data.appName + ($titleSuffix ? ` | ${$titleSuffix}` : '');
</script>

<slot />

<svelte:head>
	<title>{theTitle}</title>
</svelte:head>
