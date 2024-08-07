<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import '../app.css';
	import { setMode } from './mode.svelte';
	import StatusLine from './status-line.svelte';
	import SignColumn from './sign-column.svelte';
	let { children }: { children: Snippet } = $props();

	if (browser) {
		window.addEventListener('keypress', (event) => {
			const root = document.querySelector(':root');

			if (!root) {
				return;
			}

			if (event.key === 'i') {
				setMode('INSERT');
				return;
			}

			if (event.key === 'n' || event.key === 'Escape') {
				setMode('NORMAL');
				return;
			}

			if (event.key.toLowerCase() === 'v') {
				setMode('VISUAL');
				return;
			}
		});
	}

	injectSpeedInsights();
</script>

<div
	class="w-screen h-screen bg-ctp-base flex flex-col text-ctp-subtext0 justify-between overflow-auto"
>
	<div class="flex flex-row sm:gap-4 grow">
		<SignColumn />
		{@render children()}
	</div>
	<StatusLine />
</div>
