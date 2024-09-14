// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/tailwindcss',
		'shadcn-nuxt',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/i18n',
		'@formkit/auto-animate',
	],
	colorMode: {
		classSuffix: '',
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: '',
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: './components/ui',
	},
	i18n: {
		locales: [
			{ code: 'en', iso: 'en-US', file: 'en.json' },
			{ code: 'uk', iso: 'uk-UA', file: 'uk.json' },
		],
		lazy: false,
		langDir: 'locales/',
		defaultLocale: 'en',
		strategy: 'prefix_except_default',
	},
});
