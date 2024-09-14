<template>
	<div class="flex items-center justify-center h-screen animate-pulse text-3xl">
		<NuxtLink :to="localePath('/')">{{ $t('SELECT_PROJECT') }}</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
useHead({
	title: 'Dashboard | Nuxt-Mini-Trello',
});

const localePath = useLocalePath();
</script>
