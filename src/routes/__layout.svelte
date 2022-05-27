<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	const tipAddress =
		'addr1qy047pejncekqrqm8qu33hx3sjzpv4vh4lal3ud906qnn44a6vchc2wrqstx29vnzfe58swdae7jczh2hj6kam3nf5zs5gfhan';
	const short = tipAddress.substring(0, 9) + '...' + tipAddress.substring(tipAddress.length - 5);

	let message = 'Click to copy';

	function clickToCopy() {
		navigator.clipboard.writeText(tipAddress);

		message = 'Copied!';
	}

	function hoverFunction() {
		message = 'Click to copy';
	}
</script>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>Tips Welcome</p>
	<div class="tooltip">
		<button
			id="addressButton"
			on:click={clickToCopy}
			on:mouseout={hoverFunction}
			on:blur={hoverFunction}
		>
			<span class="tooltiptext">{message}</span>
			{short}
		</button>
	</div>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}

	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 140px;
		background-color: #555;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		position: absolute;
		z-index: 1;
		bottom: 150%;
		left: 50%;
		margin-left: -75px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.tooltip .tooltiptext::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: #555 transparent transparent transparent;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
		opacity: 1;
	}

	button {
		background: none !important;
		border: none;
		font-family: arial, sans-serif;
		color: var(--accent-color);
		text-decoration: underline;
		cursor: pointer;
	}
</style>
