<script lang="ts">
	import Html5Logo from './html5-logo.svelte';
	import { getMode, getFocusedIndex } from './mode.svelte.ts';

	// Calculate index and displayRow reactively in the script block
	let index = $derived(getFocusedIndex());
	let displayRow = $derived(index === undefined ? 1 : index + 1);
</script>

<div
	id="status-line"
	class="bg-ctp-mantle w-full flex flex-row lg:text-[22px] text-base"
>
	<span class="h-full sm:px-2 px-0.5 font-bold bg-mode-color text-ctp-mantle"
		>{getMode()}</span
	><span class="pl-2">~/index.html</span>
	<span class="grow"></span>
	<span class="flex flex-row justify-end sm:pr-4 px-1 gap-2"
		><Html5Logo size="22px" />html</span
	>
	<span class="sm:pl-7 px-1 sm:pr-3 bg-[#313346] text-mode-color">Top</span>
	<span class="sm:pl-10 sm:pr-3 px-1 bg-mode-color text-ctp-crust"
		>{displayRow}:1</span
	>
</div>
