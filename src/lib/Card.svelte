<script>
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	export let assets;
	export let delay;

	const name = assets[0]?.cardania;
	const image = assets[0]?.image;
	let quantity;

	if (name === 'Resources') {
		quantity = assets.length;
	} else {
		quantity = assets.reduce((partial, b) => partial + b?.quantity, 0);
	}
</script>

<div in:fly={{ x: -200, duration: 2000, delay: delay }} class="card">
	<img src={base + '/assets/' + image} alt={name} />
	<div class="container">
		<h1>{quantity}</h1>
		<h2>{name}</h2>
	</div>
</div>

<style>
	img {
		width: 100%;
		border-radius: 2em;
	}

	.card {
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		width: 15em;
		border-radius: 2em;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 2em;
	}

	.card:hover {
		box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
	}

	/*img {*/
	/*  border-radius: 2em;*/
	/*}*/

	.container {
		/*padding: 2px 16px;*/
		/*padding: 0.5em;*/
		text-align: center;
	}
</style>
