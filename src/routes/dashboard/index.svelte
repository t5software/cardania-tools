<script>
	import '../../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	import Card from '$lib/Card.svelte';

	import { getAllAssets, getAddressFromHex } from '$lib/api';

	let allAssets = [];
	// const test = $page.url.searchParams.get('addr');

	$: distinctAssetTypes = [...new Set(allAssets.map((a) => a.cardania))];

	let network = '';
	let address = '';
	let error = '';
	let isNamiEnabled = false;
	let loading = false;

	onMount(async () => {
		document.getElementsByTagName('body')[0].style.overflow = 'auto';

		const test = $page.url.searchParams.get('addr');

		if (test) {
			console.log('test: ' + test);
			allAssets = await getAllAssets(test);
		}
	});

	async function connectWallet() {
		loading = true;
		let Cardano = window.cardano;
		// let Nami = Cardano.nami;
		try {
			let Nami = await Cardano.nami.enable();
			isNamiEnabled = await Cardano.nami.isEnabled();

			try {
				let networkId = await Nami.getNetworkId();
				if (networkId === 1) {
					network = 'mainnet';
				} else {
					network = 'testnet';
					return;
				}
			} catch (err) {
				console.error(err);
				error = 'Unable to get network from Nami';
			}

			try {
				let tempAddress = (await Nami.getUsedAddresses())[0];
				address = getAddressFromHex(tempAddress);
				console.log(address);
				allAssets = await getAllAssets(address);
			} catch (err) {
				console.error(err);
				error = 'Unable to get address from Nami';
			}
		} catch (err) {
			console.error(err);
			error = 'Unable to enable Nami';
		}

		loading = false;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Search for Cardania Assets by Wallet Address" />
</svelte:head>

{#if allAssets.length > 0}
	<div in:fade class="cards">
		{#each distinctAssetTypes as asset, index}
			<Card delay={(index + 1) * 1000} assets={allAssets.filter((a) => a.cardania === asset)} />
		{/each}
	</div>
{:else if !isNamiEnabled}
	<div in:fade class="content">
		<h1>Dashboard</h1>
		<h2>See all your Cardania assets in one place</h2>

		<button on:click={connectWallet}>Connect Wallet</button>

		<p>*Nami wallet only.</p>
	</div>
{:else if network !== 'mainnet'}
	<div in:fade class="content">
		<h2>Switch your wallet to mainnet and refresh this page.</h2>
	</div>
{:else if loading}
	<div in:fade class="content">
		<h2>Loading...</h2>
	</div>
{:else}
	<div in:fade class="content">
		<h2>No Cardania assets found in your wallet!</h2>
	</div>
{/if}

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		text-align: center;
		background-color: var(--background-without-opacity);
		border-radius: 8px;
	}
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	button {
		border: 1px solid var(--accent-color);
		background-color: var(--accent-color);
		color: var(--pure-white);
		font-size: 1.5em;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		border-radius: 8px;
	}
</style>
