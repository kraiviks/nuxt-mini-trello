<template>
	<li
		:key="project.id"
		class="flex justify-between items-center border-b border-slate-300 py-2 cursor-pointer w-full lg:max-w-sm"
	>
		<NuxtLink
			:to="`/dashboard/${project.id}`"
			v-if="!editProjectName"
			class="w-full"
		>
			{{ project.name }}
		</NuxtLink>
		<div
			class="flex items-center gap-3"
			:class="editProjectName ? 'w-full' : ''"
		>
			<Icon
				icon="mdi:rename"
				class="hover:scale-150 transition"
				v-if="!editProjectName"
				@click="editProjectName = true"
			/>
			<div
				class="flex items-center justify-between gap-2 w-full"
				v-if="editProjectName"
			>
				<Input v-model="project.name" type="text" class="h-6" />
				<Icon
					icon="mdi:content-save"
					class="hover:scale-150 transition"
					@click="editProjectName = false"
				/>
			</div>
			<Icon
				icon="mdi:delete"
				class="hover:scale-150 transition"
				@click="dashboardStore.deleteProject(project.id)"
			/>
		</div>
	</li>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const editProjectName = ref(false);

const dashboardStore = useProjectsStore();
defineProps({
	project: {
		type: Object,
		required: true,
	},
});
</script>

<style></style>
