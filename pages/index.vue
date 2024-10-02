<template>
	<div class="max-w-screen-md mx-auto ">
		<header
			class="flex items-center justify-between px-4 py-2 rounded-sm bg-slate-300 dark:bg-slate-600"
		>
			<h2 class="text-lg font-bold">{{ $t('PROJECT_HEADER_TITLE') }}</h2>
		</header>
		<main class="mt-3">
			<!-- Form to Add New Project -->
			<form @submit.prevent="handleSubmit" class="flex items-center gap-2 mb-4">
				<Input
					v-model="newProjectName"
					type="text"
					:placeholder="$t('ENTER_PROJECT_NAME')"
					class="w-full p-2 border rounded border-slate-300 dark:bg-slate-800 dark:text-white"
					required
				/>
				<button
					type="submit"
					class="px-4 py-2 font-bold rounded bg-slate-300 text-slate-800 dark:bg-slate-500 hover:bg-slate-500 hover:text-white dark:hover:bg-slate-700 dark:text-white text-nowrap"
				>
					{{ $t('ADD_PROJECT') }}
				</button>
			</form>

			<ul v-auto-animate>
				<SharedProjectItem
					v-for="project in dashboardStore.projects"
					:key="project.id"
					:project="project"
				/>
			</ul>
		</main>
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Projects | Nuxt-Mini-Trello',
});

const newProjectName = ref('');
const dashboardStore = useProjectsStore();

const handleSubmit = () => {
	if (newProjectName.value.trim()) {
		dashboardStore.addProject(newProjectName.value);
		newProjectName.value = '';
	}
};
</script>
