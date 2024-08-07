<script lang="ts">
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
</script>

<main class="flex flex-col mx-auto mt-16 gap-5 items-center text-ctp-text">
	<Ascii />
	<p class="text-center lg:text-3xl text-xl text-ctp-crust bg-mode-color p-3">
		software engineer @ vercel ▲
	</p>
	<ul class="flex flex-col w-1/2 gap-2 lg:mt-8 mt-2 mb-8 lg:text-[22px] text-base">
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><Github class="group-hover:text-[#2dba4e]" />GitHub</span
			>ggh
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><TwitterIcon class="group-hover:text-[#1D9BF0]" />Twitter/𝕏</span
			>gx
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><TwitchIcon class="group-hover:text-[#6441a5]" />Twitch</span
			>gt
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><YoutubeIcon class="group-hover:text-[#FF1A1A]" />YouTube</span
			>gyt
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><LinkedinIcon class="group-hover:text-[#0a66c2]" />LinkedIn</span
			>gli
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><MicVocalIcon class="group-hover:text-ctp-peach" />Conference Talks</span
			>gct
		</li>
		<li
			class="group p-1 cursor-none hover:cursor-pointer flex flex-row gap-2 items-center justify-between hover:bg-[#313346]"
		>
			<span class="flex flex-row gap-4 items-center"
				><MailPlusIcon class="group-hover:text-ctp-mauve" />Contact Me</span
			>gcm
		</li>
	</ul>
</main>
