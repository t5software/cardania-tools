<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let characters = [
		'AntigravityParticles.png',
		'Bones.png',
		'Cardanium.png',
		'Coconuts.png',
		'Copper.png',
		'CursedLiquid.png',
		'CustodialNanites.png',
		'Darkwood.png',
		'Energy.png',
		'Faith.png',
		'FreshWater.png',
		'FungalSpores.png',
		'FunkyLiquid.png',
		'Fur.png',
		'Gems.png',
		'Greens.png',
		'Ice.png',
		'Iron.png',
		'Leather.png',
		'Lightwood.png',
		'MachineComponents.png',
		'Magma.png',
		'Meat.png',
		'Meteorite.png',
		'Prismaleaf.png',
		'PrismaticDust.png',
		'QuantumDarkEnergy.png',
		'Radium.png',
		'ResearchPoints.png',
		'RunesBlue.png',
		'RunesGreen.png',
		'RunesOrange.png',
		'RunesPurple.png',
		'RunesRed.png',
		'RunesTimelost.png',
		'RunesYellow.png',
		'Saltwater.png',
		'Sand.png',
		'Stone.png',
		'ToxicWaste.png'
	];

	let confetti = new Array(80)
		.fill()
		.map((_, i) => {
			return {
				src: characters[i % characters.length],
				x: Math.random() * 80,
				y: -20 - Math.random() * 100,
				r: 0.1 + Math.random() * 1
			};
		})
		.sort((a, b) => a.r - b.r);

	onMount(() => {
		document.getElementsByTagName('body')[0].style.overflow = 'hidden';

		let frame;

		function loop() {
			frame = requestAnimationFrame(loop);

			confetti = confetti.map((emoji) => {
				emoji.y += 0.7 * emoji.r;
				if (emoji.y > 120) emoji.y = -20;
				return emoji;
			});
		}

		loop();

		return () => cancelAnimationFrame(frame);
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Search for Cardania Assets by Wallet Address" />
</svelte:head>

<div class="content">
	<h1>What is this?</h1>

	<p>
		See What Cardania Resources Your Wallet is Missing <a href={base + '/search'}>Try it out!</a>
	</p>
	<div id="icons">
		{#each confetti as c}
			<span style="left: {c.x}%; top: {c.y}%; transform: scale({c.r})">
				<img loading="lazy" width="64" height="64" src={base + '/resource-img/' + c.src} alt="" />
			</span>
		{/each}
	</div>
</div>

<style>
	span {
		position: absolute;
		font-size: 5vw;
		user-select: none;
		z-index: -1;
	}

	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		text-align: center;
		background-color: var(--background-without-opacity);
		border-radius: 8px;
	}
</style>
