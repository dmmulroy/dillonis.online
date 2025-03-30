import { writable } from 'svelte/store';

export type Mode = 'NORMAL' | 'INSERT' | 'VISUAL';

let mode = $state<Mode>('NORMAL');
let currentSequence = $state<string>('');

export function getMode(): Mode {
	return mode;
}

export function setMode(newMode: Mode): void {
	mode = newMode;

	// Reset sequence if not in INSERT mode
		if (mode !== 'INSERT') {
			currentSequence = '';
		}

		const root = document.querySelector(':root');

		if (!root) {
			return;
		}
		switch (newMode) {
			case 'NORMAL': {
				// @ts-expect-error
				root.style.setProperty('--mode-color', 'rgb(var(--ctp-blue))');
				break;
			}
			case 'INSERT': {
				// @ts-expect-error
				root.style.setProperty('--mode-color', 'rgb(var(--ctp-green))');
				break;
			}
			case 'VISUAL': {
				// @ts-expect-error
				root.style.setProperty('--mode-color', 'rgb(var(--ctp-mauve))');
				break;
			}
		}
}

// Export a getter function for the sequence state
export function getCurrentShortcutSequence(): string {
	return currentSequence;
}

// Functions to modify the sequence
export function updateShortcutSequence(key: string): void {
	currentSequence += key;
}

export function resetShortcutSequence(): void {
	currentSequence = '';
}

export function removeLastShortcutChar(): void {
	currentSequence = currentSequence.slice(0, -1);
}
