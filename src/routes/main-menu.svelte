<script lang="ts">
	import { browser } from '$app/environment';
	import Ascii from './ascii.svelte';
	import {
		Github,
		LinkedinIcon,
		MailPlusIcon,
		MicVocalIcon,
		TwitchIcon,
		TwitterIcon,
		YoutubeIcon
	} from 'lucide-svelte';
	import { getCurrentShortcutSequence } from './mode.svelte.ts';

	// Define shortcuts locally for rendering the text easily
	const shortcuts = {
		github: 'ggh',
		twitter: 'gx',
		twitch: 'gt',
		youtube: 'gyt',
		linkedin: 'gli',
		talks: 'gct',
		email: 'gcm'
	};
</script>

<main
	id="main"
	class="flex flex-col mx-auto mt-16 gap-5 items-center text-ctp-text"
>
	<Ascii />
	<p class="text-center lg:text-3xl text-xl text-ctp-crust bg-mode-color p-3">
		software engineer @ vercel ▲
	</p>
	<ul
		class="flex flex-col lg:w-1/2 w-3/4 gap-2 lg:mt-8 mt-2 mb-8 lg:text-[22px] text-base"
	>
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="github"
				class="flex group/link flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://github.com/dmmulroy"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><Github
						class="group-hover:text-[#2dba4e] group-focus/link:text-[#2dba4e]"
					/>GitHub</span
				>
				<span>
					{#each shortcuts.github.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
				{/each}
			</span></a
		>
	</li>
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="twitter"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://x.com/dillon_mulroy"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><TwitterIcon
						class="group-hover:text-[#1D9BF0] group-focus/link:text-[#1D9BF0]"
					/>Twitter/𝕏</span
				>
				<span>
					{#each shortcuts.twitter.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span></a
			>
		</li>
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="twitch"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://twitch.tv/dmmulroy"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><TwitchIcon
						class="group-hover:text-[#6441a5] group-focus/link:text-[#6441a5]"
					/>Twitch</span
				>
				<span>
					{#each shortcuts.twitch.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span></a
			>
		</li>
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="youtube"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://www.youtube.com/@dmmulroy"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><YoutubeIcon
						class="group-hover:text-[#FF1A1A] group-focus/link:text-[#FF1A1A]"
					/>YouTube</span
				>
				<span>
					{#each shortcuts.youtube.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span></a
			>
		</li>
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="linkedin"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://www.linkedin.com/in/dillon-mulroy"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><LinkedinIcon
						class="group-hover:text-[#0a66c2] group-focus/link:text-[#0a66c2]"
					/>LinkedIn</span
				>
				<span>
					{#each shortcuts.linkedin.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span>
			</a>
		</li>
		<!-- <li class="group cursor-none hover:cursor-pointer">
			<a
				id="talks"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="https://dillonis.online/talks"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><MicVocalIcon
						class="group-hover:text-ctp-peach group-focus/link:text-ctp-peach "
					/>Conference Talks</span
				>
				<span>
					{#each shortcuts.talks.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span></a
			>
		</li> -->
		<li class="group cursor-none hover:cursor-pointer">
			<a
				id="email"
				class="group/link flex flex-row h-full w-full p-2 focus:outline-none focus:bg-[#313346] gap-2 items-center justify-between hover:bg-[#313346]"
				href="mailto:dillon.mulroy@gmail.com"
				target="_blank"
			>
				<span class="flex flex-row gap-4 items-center"
					><MailPlusIcon
						class="group-hover:text-ctp-mauve group-focus/link:text-ctp-mauve"
					/>Contact Me</span
				>
				<span>
					{#each shortcuts.email.split('') as char, i}
						{@const currentShortcutSequence = getCurrentShortcutSequence()}
						<span class={i < currentShortcutSequence.length && char === currentShortcutSequence[i] ? 'bg-ctp-subtext0 text-ctp-base' : ''}>{char}</span>
					{/each}
				</span></a
			>
		</li>
	</ul>
</main>
