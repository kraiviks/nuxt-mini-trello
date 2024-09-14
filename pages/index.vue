<template>
	<header
		class="bg-slate-300 dark:bg-slate-600 px-4 py-2 flex items-center justify-between rounded-sm"
	>
		<h2 class="text-lg font-bold">Project Management</h2>
		<div class="flex gap-2 items-center">
			<SharedColorModeToggle />
		</div>
	</header>
	<main class="mt-3">
		<!-- Form to Add New Project -->
		<form @submit.prevent="handleSubmit" class="mb-4 flex gap-2 items-center">
			<Input
				v-model="newProjectName"
				type="text"
				placeholder="Enter project name"
				class="border border-slate-300 p-2 rounded w-full dark:bg-slate-800 dark:text-white"
				required
			/>
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-nowrap"
			>
				Add Project
			</button>
		</form>

		<ul>
			<SharedProjectItem
				v-for="project in dashboardStore.projects"
				:key="project.id"
				:project="project"
			/>
		</ul>
	</main>
</template>

<script setup lang="ts">
const newProjectName = ref('');
const dashboardStore = useProjectsStore();

const handleSubmit = () => {
	if (newProjectName.value.trim()) {
		dashboardStore.addProject(newProjectName.value);
		newProjectName.value = '';
	}
};
</script>
