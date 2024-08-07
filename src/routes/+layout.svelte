<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import '../app.css';
	import { getMode, setMode } from './mode.svelte';
	import StatusLine from './status-line.svelte';
	import SignColumn from './sign-column.svelte';
	let { children }: { children: Snippet } = $props();

	if (browser) {
		let focusedItemIdx = $state<number>();

		window.addEventListener('keypress', (event) => {
			const root = document.querySelector(':root');
			const github = document.getElementById('github');
			const twitter = document.getElementById('twitter');
			const twitch = document.getElementById('twitch');
			const youtube = document.getElementById('youtube');
			const linkedin = document.getElementById('linkedin');
			const talks = document.getElementById('talks');
			const email = document.getElementById('email');

			const menuItems = [
				github,
				twitter,
				twitch,
				youtube,
				linkedin,
				talks,
				email
			];

			if (
				!root ||
				!github ||
				!twitter ||
				!twitch ||
				!youtube ||
				!linkedin ||
				!talks ||
				!email
			) {
				return;
			}

			if (event.key === 'j' || event.key === 'k') {
				if (getMode() === 'NORMAL') {
					if (focusedItemIdx === undefined) {
						menuItems[0]?.focus();
						focusedItemIdx = 0;
						return;
					}

					if (event.key === 'j') {
						if (focusedItemIdx === menuItems.length - 1) {
							return;
						}

						menuItems[++focusedItemIdx]?.focus();
						return;
					}

					if (focusedItemIdx === 0) {
						return;
					}
					menuItems[--focusedItemIdx]?.focus();
					return;
				}
			}

			if (event.key === 'i') {
				if (focusedItemIdx !== undefined) {
					menuItems[focusedItemIdx]?.blur();
				}
				setMode('INSERT');
				return;
			}

			if (event.key === 'n' || event.key === 'Escape') {
				setMode('NORMAL');

				if (focusedItemIdx !== undefined) {
					menuItems[focusedItemIdx]?.focus();
				}
				return;
			}

			if (event.key.toLowerCase() === 'v') {
				if (focusedItemIdx !== undefined) {
					menuItems[focusedItemIdx]?.blur();
				}
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
