<script lang="ts">
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import '../app.css';
	import {
		getMode,
		setMode,
		setFocusedIndex,
		getCurrentShortcutSequence,
		updateShortcutSequence,
		resetShortcutSequence,
		removeLastShortcutChar
	} from './mode.svelte';
	import StatusLine from './status-line.svelte';
	import SignColumn from './sign-column.svelte';
	let { children }: { children: Snippet } = $props();

	if (browser) {
		let focusedItemIdx = $state<number>();
		setFocusedIndex(undefined); // Initialize focused index state
		let lastKeyPressTime = $state<number>(0); // Track last key press time

		// Helper function to get menu items
		function getMenuItems(): (HTMLElement | null)[] {
			// Query all menu item links within the list
			return Array.from(document.querySelectorAll('#main ul > li > a'));
		}

		window.addEventListener('keydown', (event) => {
			const root = document.querySelector(':root');

			// Check for rapid "jj" key presses
			if (event.key === 'j' && getMode() !== 'NORMAL') {
				const currentTime = Date.now();
				if (currentTime - lastKeyPressTime < 200) {
					// Rapid "jj" detected, exit insert mode
					resetShortcutSequence();
					setMode('NORMAL');
					event.preventDefault();
					return;
				}
				lastKeyPressTime = currentTime; // Update last key press time
			}

			const github = document.getElementById('github');
			const twitter = document.getElementById('twitter');
			const twitch = document.getElementById('twitch');
			const youtube = document.getElementById('youtube');
			const linkedin = document.getElementById('linkedin');
			const email = document.getElementById('email'); // Corrected

			const menuItems = [
				github,
				twitter,
				twitch,
				youtube,
				linkedin,
				email // Corrected
			];

			if (
				!root ||
				!github ||
				!twitter ||
				!twitch ||
				!youtube ||
				!linkedin ||
				!email
			) {
				return;
			}

			if (event.key === 'j' || event.key === 'k') {
				if (getMode() === 'NORMAL') {
					if (focusedItemIdx === undefined) {
						menuItems[0]?.focus();
						focusedItemIdx = 0;
						setFocusedIndex(0);
						return;
					}

					if (event.key === 'j') {
						if (focusedItemIdx === menuItems.length - 1) {
							return;
						}

						focusedItemIdx++;
						setFocusedIndex(focusedItemIdx);
						menuItems[focusedItemIdx]?.focus();
						return;
					}

					if (focusedItemIdx === 0) {
						return;
					}
					focusedItemIdx--;
					setFocusedIndex(focusedItemIdx);
					menuItems[focusedItemIdx]?.focus();
					return;
				}
			}

			const shortcuts: Record<string, string> = {
				ggh: 'https://github.com/dmmulroy',
				gx: 'https://x.com/dillon_mulroy',
				gt: 'https://twitch.tv/dmmulroy', // Corrected
				gyt: 'https://www.youtube.com/@dmmulroy',
				gli: 'https://www.linkedin.com/in/dillon-mulroy',
				gcm: 'mailto:dillon.mulroy@gmail.com'
			};
			const shortcutKeys = Object.keys(shortcuts);

			const mode = getMode(); // Get current mode

			// Always handle Escape/n in INSERT mode to exit
			if (mode === 'INSERT' && (event.key === 'Escape' || event.key.toLowerCase() === 'n')) {
				event.preventDefault();
				resetShortcutSequence();
				// Re-focus previously focused item if applicable and update index state
				if (focusedItemIdx !== undefined) {
					menuItems[focusedItemIdx]?.focus();
					setFocusedIndex(focusedItemIdx);
				} else {
					setFocusedIndex(undefined);
				}
				setMode('NORMAL');
				return;
			}

			// Ignore modifier keys to prevent unintended behavior
			if (event.metaKey || event.ctrlKey || event.altKey) {
				return;
			}

			// Ensure root element exists for mode color changes
			if (!root) {
				return;
			}

			if (event.key === 'j' || event.key === 'k') {
				if (getMode() === 'NORMAL') {
					if (focusedItemIdx === undefined) {
						menuItems[0]?.focus();
						focusedItemIdx = 0;
						setFocusedIndex(0);
						return;
					}

					if (event.key === 'j') {
						if (focusedItemIdx === menuItems.length - 1) {
							return;
						}

						focusedItemIdx++;
						setFocusedIndex(focusedItemIdx);
						menuItems[focusedItemIdx]?.focus();
						return;
					}

					if (focusedItemIdx === 0) {
						return;
					}
					focusedItemIdx--;
					setFocusedIndex(focusedItemIdx);
					menuItems[focusedItemIdx]?.focus();
					return;
				}
			}

			// Handle 'i' to enter INSERT mode (only when NORMAL)
			if (event.key === 'i') {
				if (mode === 'NORMAL') {
					if (focusedItemIdx !== undefined) {
						menuItems[focusedItemIdx]?.blur();
						// Optional: focusedItemIdx = undefined; // Keep index for potential re-focus
					}
					setMode('INSERT');
					setFocusedIndex(undefined); // Clear focused index when entering insert mode
					resetShortcutSequence(); // Ensure sequence is reset
					event.preventDefault();
					return;
				}
			}

			// Handle 'v' to enter VISUAL mode (only when NORMAL)
			if (event.key.toLowerCase() === 'v') {
				if (mode === 'NORMAL') {
					if (focusedItemIdx !== undefined) {
						menuItems[focusedItemIdx]?.blur();
						// focusedItemIdx remains for potential re-focus on exit
					}
					setMode('VISUAL');
					setFocusedIndex(undefined); // Clear focused index when entering visual mode
					event.preventDefault();
					return;
				}
			}

			// Handle Backspace in INSERT mode
			if (mode === 'INSERT' && event.key === 'Backspace') {
				removeLastShortcutChar();
				event.preventDefault();
				return;
			}

			// Handle starting a shortcut sequence in NORMAL mode
			if (mode === 'NORMAL' && /^[a-z]$/i.test(event.key)) {
				const potentialStarters = shortcutKeys.filter((s) => s.startsWith(event.key.toLowerCase()));
				if (potentialStarters.length > 0) {
					if (focusedItemIdx !== undefined) {
						menuItems[focusedItemIdx]?.blur();
						// focusedItemIdx remains for potential re-focus on exit
					}
					setFocusedIndex(undefined); // Clear focused index when starting shortcut
					setMode('INSERT');
					updateShortcutSequence(event.key.toLowerCase());
					event.preventDefault();
					// Check if the single key is already a full shortcut using the getter
					const fullMatchUrl = shortcuts[getCurrentShortcutSequence()];
					if (fullMatchUrl) {
						window.open(fullMatchUrl, '_blank');
						resetShortcutSequence();
						// No need to setFocusedIndex here, already undefined
						setMode('NORMAL');
					}
					return;
				}
			}

			// Handle shortcut sequence typing in INSERT mode
			if (mode === 'INSERT' && /^[a-z]$/i.test(event.key)) {
				const pressedKey = event.key.toLowerCase();
				const nextSequence = getCurrentShortcutSequence() + pressedKey;
				const potentialMatches = shortcutKeys.filter((s) => s.startsWith(nextSequence));

				if (potentialMatches.length > 0) {
					updateShortcutSequence(pressedKey);
					event.preventDefault();

					const fullMatchUrl = shortcuts[getCurrentShortcutSequence()];
					if (fullMatchUrl) {
						window.open(fullMatchUrl, '_blank');
						resetShortcutSequence();
						// No need to setFocusedIndex here, already undefined
						setMode('NORMAL');
					}
				} else {
					// Key does not extend any potential shortcut, ignore it
					event.preventDefault();
				}
				return; // Handled shortcut key
			}

			// Prevent default for unhandled keys in INSERT mode (except Esc/n handled above)
			if (mode === 'INSERT') {
				event.preventDefault();
			}
		});
	}

	injectAnalytics();
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
