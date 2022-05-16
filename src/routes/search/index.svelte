<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';

	let allResources = [];
	let loading = false;

	let address = '';
	let resources = [];
	let errors = '';
	let summary = '';

	onMount(() => {
		document.getElementsByTagName('body')[0].style.overflow = 'auto';
	});

	async function getTokens() {
		resources = [];
		loading = true;

		if (!allResources?.length) {
			await getAllResources();
		}

		const response = await fetch('https://pool.pm/wallet/' + address);

		loading = false;

		resources = (await response.json())?.tokens?.filter(
			(t) => t.policy == '650296faadaccf9bb9852678ce0e881c5c09f1a6da9cb7531b3c23bb'
		);

		if (!resources?.length) {
			errors = 'No Cardania Resources found!';
		} else {
			errors = '';

			resources = allResources.map((r, index) => {
				return {
					name: r,
					hasResource: resources.some((a) => a.name === r),
					quantity: resources.filter((a) => a.name === r)[0]?.quantity ?? '',
					delay: (index + 1) * 50
				};
			});

			let missing = resources.filter((r) => !r.hasResource).length;
			if (missing) {
				summary = `Missing ${missing} Cardania Resources!`;
			} else {
				summary = 'No Cardania Resources missing!';
			}
		}
	}

	async function getAllResources() {
		const response = await fetch(base + '/resources.txt');
		allResources = (await response.text())?.split(',');

		if (!allResources?.length) {
			errors = 'Could not load all resources!';
		} else {
			errors = '';
		}
	}

	async function handleEnter(event) {
		if (event.key === 'Enter') {
			document.getElementById('address').blur();
			await getTokens();
		}
	}
</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Search an address for Cardania resources" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
	/>
</svelte:head>

<div class="container">
	<h1>Search</h1>

	<div class="search-control">
		<input
			id="address"
			name="address"
			aria-label="Address"
			placeholder="Enter Address"
			bind:value={address}
			on:keypress={handleEnter}
			inputmode="search"
		/>

		<button disabled={loading} id="search" on:click={getTokens}>
			{#if loading}
				<i class="fa fa-spinner fa-spin" />
			{:else}
				<i class="fa fa-search" />
			{/if}
		</button>
	</div>

	{#if errors}
		<h2 in:fade id="error">
			{errors}
		</h2>
	{:else if summary}
		<h2 in:fade id="summary">
			{summary}
		</h2>
	{/if}

	{#if resources}
		<div class="results">
			{#each resources as resource (resource.name)}
				<tr transition:fade|local={{ delay: resource.delay }}>
					<td>
						{#if resource.hasResource}
							<pre class="green-check">✓</pre>
						{:else}
							<pre class="red-ex">X</pre>
						{/if}
					</td>
					<td>
						{resource.hasResource ? resource.name + ' (' + resource.quantity + ')' : resource.name}
					</td>
				</tr>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.search-control {
		display: flex;
		margin: 0 0 0.5rem 0;
	}

	.results pre {
		margin: 0 0.5rem 0.5rem 0;
		max-width: var(--column-width);
	}

	input {
		width: 100%;
		border: 1px solid var(--primary-color);
		background: rgba(255, 255, 255, 0.05);
	}

	button {
		width: 20%;
		border: 1px solid var(--accent-color);
		background-color: var(--accent-color);
		color: var(--pure-white);
		margin-left: 0.5em;
	}

	button:hover {
		box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	}

	input:focus-visible {
		box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #ff3e00 !important;
		outline: none;
	}

	.search-control input,
	button {
		font-size: 1.5em;
		transition-duration: 0.4s;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		border-radius: 8px;
	}

	.green-check {
		background-color: green;
		color: var(--pure-white);
	}

	.red-ex {
		background-color: red;
		color: var(--pure-white);
	}
</style>
