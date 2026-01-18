<script lang="ts">
	import { ExternalLinkIcon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	type Talk = {
		title: string;
		event: string;
		date: string;
		location: string;
		description?: string;
		links: {
			label: string;
			url: string | null;
		}[];
	};

	type Podcast = {
		title: string;
		show: string;
		date: string;
		duration: string;
		description: string;
		links: {
			label: string;
			url: string | null;
		}[];
	};

	let selectedIndex = $state(0);
	let items: Array<{ type: 'talk' | 'podcast'; index: number }> = $state([]);

	const talks: Talk[] = [
		{
			title: 'Event Driven Redux',
			event: 'NationJS Frontrunners React 2019',
			date: 'December 6, 2019',
			location: 'Washington, DC',
			links: [
				{
					label: 'Conference Playlist',
					url: 'https://www.youtube.com/playlist?list=PLeGxIOPLk9EIcn3_m4Qb8NHctlOp8obUe'
				}
			]
		},
		{
			title: 'Melange: The next frontier in type-safe web development',
			event: 'RVA JS Conf 2023',
			date: '2023',
			location: 'Richmond, VA',
			links: []
		},
		{
			title: 'Maybe OCaml Was the Friends We Made Along the Way',
			event: 'FUN OCaml 2024',
			date: 'September 16-17, 2024',
			location: 'Berlin, Germany',
			links: [
				{
					label: 'Watch OCaml',
					url: 'https://watch.ocaml.org/videos/watch/cebc2faf-3df3-4179-8ea8-64a50e1d84ff'
				},
				{ label: 'YouTube Channel', url: 'https://www.youtube.com/@FUNOCaml' }
			]
		},
		{
			title: 'Your next favorite programming language: Gleam',
			event: 'Carolina Code Conference 2024',
			date: 'August 23-24, 2024',
			location: 'Greenville, SC',
			links: [
				{ label: 'YouTube', url: 'https://www.youtube.com/watch?v=vyEWc0-kbkw' },
				{
					label: 'Conference Playlist',
					url: 'https://www.youtube.com/playlist?list=PLxeenGqMmmw_CXKRZxA8RmcsFZcmWsf_E'
				},
				{ label: 'Channel', url: 'https://www.youtube.com/@CodesCarolina' }
			]
		},
		{
			title: 'Effect Meetup',
			event: 'Effect Meetup San Francisco',
			date: 'October 21, 2024',
			location: 'San Francisco, CA',
			links: [
				{ label: 'Event Page', url: 'https://luma.com/gmk2jzd2' },
				{ label: 'YouTube Channel', url: 'https://www.youtube.com/@effect-ts' }
			]
		},
		{
			title: 'Effect Days Talk',
			event: 'Effect Days 2025',
			date: 'March 19-21, 2025',
			location: 'Livorno, Italy',
			links: [
				{ label: 'Event Page', url: 'https://effect.website/events/effect-days' },
				{ label: 'YouTube Channel', url: 'https://www.youtube.com/@effect-ts' }
			]
		},
		{
			title: 'Result types for error handling in React applications',
			event: 'React Miami 2025',
			date: 'April 17-18, 2025',
			location: 'Miami, FL',
			description:
				'Introducing the Result type as a simple, powerful, and pragmatic game-changer for managing errors in React applications',
			links: []
		}
	];

	const podcasts: Podcast[] = [
		{
			title: '#4: From Skeptic to Advocate, Scaling Effect at Vercel',
			show: 'Cause & Effect Podcast',
			date: 'August 4, 2025',
			duration: '53:53',
			description:
				'Personal journey with Effect and how Vercel adopted Effect across their Domains platform',
			links: [
				{ label: 'YouTube', url: 'https://www.youtube.com/watch?v=rPKohHGPqCY' },
				{ label: 'Podcast Page', url: 'https://effect.website/podcast/' },
				{ label: 'YouTube Channel', url: 'https://www.youtube.com/@effect-ts' }
			]
		},
		{
			title: 'Dillon Mulroy - Fullstack Dev',
			show: 'Origins.fm: Developer Origins',
			date: 'February 10, 2024',
			duration: '1:28:00',
			description:
				'Journey from a small state school to working at one of the most widely used deployment platforms',
			links: [
				{
					label: 'Apple Podcasts',
					url: 'https://podcasts.apple.com/podcast/dillon-mulroy-fullstack-dev/id1770285804?i=1000671532358'
				},
				{ label: 'Episode Page', url: 'https://origins.fm/episodes' }
			]
		}
	];

	onMount(() => {
		items = [
			...talks.map((_, i) => ({ type: 'talk' as const, index: i })),
			...podcasts.map((_, i) => ({ type: 'podcast' as const, index: i }))
		];

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === 'j') {
				event.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
			} else if (event.key === 'k') {
				event.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
			} else if (event.key === 'Enter' || event.key === 'o') {
				event.preventDefault();
				const item = items[selectedIndex];
				if (!item) return;

				const data = item.type === 'talk' ? talks[item.index] : podcasts[item.index];
				const firstLink = data.links.find((link) => link.url);
				if (firstLink?.url) {
					window.open(firstLink.url, '_blank');
				}
			} else if (event.key === 'g' && event.shiftKey) {
				event.preventDefault();
				selectedIndex = items.length - 1;
			} else if (event.key === 'g') {
				const handler = (e: KeyboardEvent) => {
					if (e.key === 'g') {
						e.preventDefault();
						selectedIndex = 0;
					}
					window.removeEventListener('keydown', handler);
				};
				window.addEventListener('keydown', handler);
				setTimeout(() => window.removeEventListener('keydown', handler), 500);
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<main class="flex flex-col mx-auto mt-12 text-ctp-text font-mono w-3/4 max-w-4xl">
	<!-- Header section -->
	<div class="flex flex-col gap-3 mb-8 items-center">
		<div class="text-ctp-crust bg-mode-color px-3 py-1 text-lg">
			talks.md
		</div>
		<a
			href="/"
			class="text-ctp-blue hover:text-mode-color hover:bg-[#313346] px-2 py-0.5 transition-colors"
		>
			← :bprev
		</a>
	</div>

	<!-- Conference Talks Section -->
	<div class="flex flex-col gap-4 mb-12">
		<div class="text-ctp-mauve font-bold text-lg mb-2">" === Conference Talks ===</div>
		<div class="flex flex-col gap-3">
			{#each talks as talk, i}
				{@const itemIndex = items.findIndex((item) => item.type === 'talk' && item.index === i)}
				{@const isSelected = selectedIndex === itemIndex}
				<div
					class="group hover:bg-[#313346] transition-colors px-3 py-3 cursor-pointer {isSelected
						? 'bg-[#313346]'
						: ''}"
					onclick={() => {
						selectedIndex = itemIndex;
					}}
					role="button"
					tabindex={i}
				>
					<div class="flex flex-row items-start gap-3">
						<span class="text-ctp-overlay0 shrink-0 select-none">{i + 1}.</span>
						<div class="flex flex-col gap-1.5 grow min-w-0">
							<div class="flex flex-row items-baseline gap-2 flex-wrap">
								<span class="text-ctp-text font-semibold">{talk.title}</span>
								<span class="text-ctp-subtext0">@</span>
								<span class="text-ctp-subtext1">{talk.event}</span>
							</div>
							<div class="flex flex-row gap-4 text-sm text-ctp-subtext0 flex-wrap">
								<span>{talk.date}</span>
								<span class="text-ctp-overlay0">|</span>
								<span>{talk.location}</span>
							</div>
							{#if talk.description}
								<div class="text-sm text-ctp-subtext1 italic mt-0.5">{talk.description}</div>
							{/if}
							{#if talk.links.length > 0}
								<div class="flex flex-row gap-2 mt-0.5 text-sm flex-wrap">
									{#each talk.links as link, linkIndex}
										{#if link.url}
											<a
												href={link.url}
												target="_blank"
												rel="noopener noreferrer"
												class="text-ctp-blue hover:text-mode-color hover:underline flex items-center gap-1"
											>
												<ExternalLinkIcon size={12} />
												{link.label}
											</a>
											{#if linkIndex < talk.links.length - 1}
												<span class="text-ctp-overlay0">|</span>
											{/if}
										{:else}
											<span class="text-ctp-overlay0 opacity-50">{link.label} (Soon)</span>
										{/if}
									{/each}
								</div>
							{:else}
								<div class="text-sm text-ctp-overlay0 italic mt-0.5">Recording coming soon</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Podcast Appearances Section -->
	<div class="flex flex-col gap-4 mb-12">
		<div class="text-ctp-peach font-bold text-lg mb-2">" === Podcast Appearances ===</div>
		<div class="flex flex-col gap-3">
			{#each podcasts as podcast, i}
				{@const itemIndex = items.findIndex(
					(item) => item.type === 'podcast' && item.index === i
				)}
				{@const isSelected = selectedIndex === itemIndex}
				<div
					class="group hover:bg-[#313346] transition-colors px-3 py-3 cursor-pointer {isSelected
						? 'bg-[#313346]'
						: ''}"
					onclick={() => {
						selectedIndex = itemIndex;
					}}
					role="button"
					tabindex={talks.length + i}
				>
					<div class="flex flex-row items-start gap-3">
						<span class="text-ctp-overlay0 shrink-0 select-none">{i + 1}.</span>
						<div class="flex flex-col gap-1.5 grow min-w-0">
							<div class="flex flex-row items-baseline gap-2 flex-wrap">
								<span class="text-ctp-text font-semibold">{podcast.title}</span>
								<span class="text-ctp-subtext0">on</span>
								<span class="text-ctp-subtext1">{podcast.show}</span>
							</div>
							<div class="flex flex-row gap-4 text-sm text-ctp-subtext0 flex-wrap">
								<span>{podcast.date}</span>
								<span class="text-ctp-overlay0">|</span>
								<span>{podcast.duration}</span>
							</div>
							<div class="text-sm text-ctp-subtext1 mt-0.5">{podcast.description}</div>
							<div class="flex flex-row gap-2 mt-0.5 text-sm flex-wrap">
								{#each podcast.links as link, linkIndex}
									{#if link.url}
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											class="text-ctp-peach hover:text-mode-color hover:underline flex items-center gap-1"
										>
											<ExternalLinkIcon size={12} />
											{link.label}
										</a>
										{#if linkIndex < podcast.links.length - 1}
											<span class="text-ctp-overlay0">|</span>
										{/if}
									{:else}
										<span class="text-ctp-overlay0 opacity-50">{link.label} (Soon)</span>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer -->
	<div class="text-ctp-overlay0 text-sm mt-4 mb-4">
		" Note: Twitch stream uploads excluded from this list
	</div>

	<!-- Help text -->
	<div class="text-ctp-overlay0 text-xs mb-12">
		" Navigation: j/k (down/up), gg (top), G (bottom), Enter/o (open first link)
	</div>
</main>
