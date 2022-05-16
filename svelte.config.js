// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

// TARGET gets populated in the CI/CD .github/workflows/deploy-*.yml
// Be sure to set it to a value to run npm build locally
if (!process.env.TARGET) {
	throw Error('Need to set process.env.TARGET!');
}

// In CI/CD the env variable is preceded with the github username
// i.e. username/repo
// we just need "repo"
const target = '/' + process.env.TARGET.split('/').pop();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter: adapter()
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
			// precompress: false
		}),

		prerender: {
			// This can be false if you're using a fallback (i.e. SPA mode)
			default: true
		},

		paths: {
			base: dev ? '' : target
		}
	}
};

export default config;
