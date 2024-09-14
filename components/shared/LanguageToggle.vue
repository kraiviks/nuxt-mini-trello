<script setup>
const { locale, setLocale } = useI18n();
const locales = ['en', 'uk'];
</script>

<template>
	<div class="flex gap-2 items-center justify-center p-2">
		<button
			v-for="l in locales"
			:key="l"
			@click="setLocale(l)"
			class="px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600"
			:class="{
				'shadow font-bold bg-neutral-200 dark:bg-neutral-700 dark:text-white ':
					locale === l,
			}"
		>
			{{ l.toUpperCase() }}
		</button>
	</div>
</template>
