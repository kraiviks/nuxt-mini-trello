<template>
	<header
		class="flex items-center justify-between px-4 py-2 rounded-sm bg-slate-300 dark:bg-slate-600"
		ref="headerRef"
		v-if="project?.name"
	>
		<h1 class="text-lg font-bold">{{ project.name }}</h1>
	</header>
	<main class="flex gap-4 p-4 overflow-x-auto overflow-y-hidden h-[calc(100vh-90px)]">
		<SharedSectionItem
			v-for="section in project?.dashboard"
			:key="section.status"
			:section="section"
			:projectId="project.id"
		/>
	</main>
</template>

<script lang="ts" setup>
const projectStore = useProjectsStore();
const { params } = useRoute();
const project = ref();

const headerRef = ref<HTMLElement | null>(null);
provide('headerRef', headerRef);

onMounted(() => {
	const selectProject = projectStore.getProject(params.id as string);
	project.value = selectProject;

	useHead({
		title: `${project?.value?.name} | Nuxt-Mini-Trello`,
	});
});
</script>
