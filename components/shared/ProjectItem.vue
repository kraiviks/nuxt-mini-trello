<template>
	<li
		:key="project.id"
		class="flex items-center justify-between w-full py-2 border-b cursor-pointer border-slate-300"
	>
		<NuxtLink
			:to="localePath(`/dashboard/${project.id}`)"
			v-if="!editProjectName"
			class="w-full truncate h-7 animated-text"
			:title="project.name"
		>
			{{ project.name }}
		</NuxtLink>
		<div
			class="flex items-center gap-5"
			:class="editProjectName ? 'w-full' : ''"
		>
			<Icon
				icon="mdi:rename"
				class="transition hover:scale-150 w-7 h-7"
				v-if="!editProjectName"
				@click="editProjectName = true"
			/>
			<div
				class="flex items-center justify-between w-full gap-2"
				v-if="editProjectName"
			>
				<Input v-model="project.name" type="text" class="h-full" />
				<Icon
					icon="mdi:content-save"
					class="transition hover:scale-150 w-7 h-7"
					@click="editProjectName = false"
				/>
			</div>
			<Icon
				icon="mdi:delete"
				class="transition hover:scale-150 hover:text-red-500 w-7 h-7"
				@click="dashboardStore.deleteProject(project.id)"
			/>
		</div>
	</li>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const editProjectName = ref(false);
const localePath = useLocalePath();

const dashboardStore = useProjectsStore();
defineProps({
	project: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.animated-text {
	background: none;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: initial;
	transition: background 0.5s, -webkit-text-fill-color 0.5s;
}

.animated-text:hover {
	background: linear-gradient(90deg, #ffff00, #00e676, #00b8d9);
	background-size: 400% 100%;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: gradient-animation 5s ease infinite;
}

@keyframes gradient-animation {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
