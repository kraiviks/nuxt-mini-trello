<template>
	<NuxtLayout>
		<NuxtRouteAnnouncer />
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
	title: 'Nuxt-Mini-Trello',
});

const dashboardStore = useProjectsStore();

onMounted(() => {
	dashboardStore.init();
});
</script>
