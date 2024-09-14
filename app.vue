<template>
	<NuxtLayout>
		<NuxtRouteAnnouncer />
		<NuxtPage />
	</NuxtLayout>
</template>

<script lang="ts" setup>
const dashboardStore = useProjectsStore();

onMounted(() => {
	dashboardStore.init();
});
</script>
