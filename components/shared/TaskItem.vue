<template>
	<li
		class="mr-1 text-black rounded cursor-pointer bg-slate-300 dark:bg-slate-300"
		:class="{
			'drag-handle': windowSieze.width.value > 640,
			'border-l-4 border-blue-500': task.priority === Priority.Low,
			'border-l-4 border-yellow-500': task.priority === Priority.Medium,
			'border-l-4 border-red-500': task.priority === Priority.High,
		}"
		:data-id="task.id"
	>
		<SharedModal v-if="!editName" title="DETAILS">
			<template #trigger>
				<div class="flex items-center justify-between w-full gap-2 px-4 py-3">
					<div
						class="flex items-center"
						:title="task.name.length > 20 && task.name"
					>
						<div class="hidden cursor-move drag-handle max-sm:block">
							<Icon icon="mdi:drag" class="w-6 h-6 transition" />
						</div>
						{{
							task.name.length > 20 ? task.name.slice(0, 20) + '...' : task.name
						}}
					</div>

					<Icon
						icon="mdi:rename"
						class="w-6 h-6 transition hover:scale-150"
						@click="editName = true"
					/>
				</div>
			</template>
			<template #header>
				<div class="flex flex-col gap-2 p-5 mt-3 border">
					<div class="flex items-center gap-1">
						<p class="font-bold text-slate-500">{{ $t('STATUS') }}:</p>
						<p>{{ task.status }}</p>
					</div>
					<div class="flex flex-wrap items-center gap-1">
						<p class="font-bold text-slate-500">{{ $t('PERFORMER') }}:</p>
						<p v-if="task.performer && !detailsEdit">{{ task.performer }}</p>
						<Icon
							icon="mdi:add"
							class="transition cursor-pointer hover:scale-150"
							v-if="!task.performer && !detailsEdit"
							@click="detailsEdit = true"
						/>
						<SharedSelect
							v-if="detailsEdit"
							:placeholder="$t('SELECT_PERFORMER')"
							:options="performerList"
							@onChange="selectPerformer"
							:value="taskData.performer"
						/>
					</div>
					<div class="flex flex-wrap items-center gap-1">
						<p class="font-bold text-slate-500">
							{{ $t('RESPONSIBLE_PERSON') }}:
						</p>
						<p v-if="task.responsiblePerson && !detailsEdit">
							{{ task.responsiblePerson }}
						</p>
						<Icon
							icon="mdi:add"
							class="transition cursor-pointer hover:scale-150"
							v-if="!task.responsiblePerson && !detailsEdit"
							@click="detailsEdit = true"
						/>
						<SharedSelect
							v-if="detailsEdit"
							:placeholder="$t('SELECT_RESPONSIBLE_PERSON')"
							:options="responsiblePersonList"
							@onChange="selectResponsiblePerson"
							:value="taskData.responsiblePerson"
						/>
					</div>
				</div>
			</template>
			<template #content>
				<ul class="flex flex-col gap-2 max-w-[450px]">
					<li class="flex items-center gap-2">
						<p class="font-bold text-slate-500">{{ $t('NAME') }}:</p>
						<p
							class="text-lg max-w-[400px] overflow-auto px-3"
							v-if="!detailsEdit"
							:title="task.name"
						>
							{{ task.name }}
						</p>
						<Input v-else v-model="taskData.name" />
					</li>
					<li class="flex flex-wrap items-center gap-2">
						<p class="font-bold text-slate-500">{{ $t('DESCRIPTION') }}:</p>
						<div
							class="max-w-full overflow-auto text-lg break-words max-h-28"
							v-if="!detailsEdit"
						>
							{{ task.description }}
						</div>
						<Textarea v-else v-model="taskData.description" />
					</li>
					<li class="flex flex-wrap items-center gap-2">
						<p class="font-bold text-slate-500">{{ $t('PRIORITY') }}:</p>
						<div
							v-if="!detailsEdit"
							class="w-2 h-2 p-2 rounded-full"
							:class="{
								'bg-blue-500': task.priority === Priority.Low,
								'bg-yellow-500': task.priority === Priority.Medium,
								'bg-red-500': task.priority === Priority.High,
							}"
						/>
						<SharedSelect
							v-else
							:placeholder="$t('SELECT_PRIORITY')"
							:options="PriorityOptions"
							@onChange="selectPriority"
							:value="taskData.priority"
						/>
					</li>
				</ul>
			</template>
			<template #footer>
				<div class="flex justify-between w-full">
					<Button variant="destructive" @click="deleteTask">
						{{ $t('REMOVE') }}
					</Button>
					<Button
						v-if="!detailsEdit"
						variant="outline"
						@click="detailsEdit = true"
					>
						{{ $t('EDIT') }}
					</Button>
					<Button
						v-else
						variant="outline"
						@click="
							() => {
								detailsEdit = false;
								saveTask();
							}
						"
					>
						{{ $t('SAVE') }}
					</Button>
				</div>
			</template>
			<template #triggerButton>
				<Button variant="outline" @click="editName = false">
					{{ $t('CLOSE') }}
				</Button>
			</template>
		</SharedModal>
		<div
			class="flex items-center justify-between gap-2 px-4 py-1"
			v-if="editName"
		>
			<Input v-model="taskData.name" type="text" class="w-full dark:bg-white" />
			<Icon
				icon="mdi:content-save"
				class="w-6 h-6 transition cursor-pointer hover:scale-150"
				@click.native.stop="saveTask"
			/>
		</div>
	</li>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import {
	performerList,
	PriorityOptions,
	responsiblePersonList,
} from '~/lib/constants';

const props = defineProps({
	projectId: { type: String, required: true },
	task: { type: Object, required: true },
	sectionStatus: { type: String, required: true },
});

const emit = defineEmits(['edit', 'delete']);
const windowSieze = useWindowSize();

const taskData = ref(props.task);
const editName = ref<boolean>(false);
const detailsEdit = ref<boolean>(false);

console.log(windowSieze.width.value);
const saveTask = () => {
	emit('edit', {
		projectId: props.projectId,
		status: props.sectionStatus,
		task: {
			...taskData.value,
			priority: taskData.value.priority || Priority.Low,
		},
	});
	editName.value = false;
};

const deleteTask = () => {
	emit('delete', {
		projectId: props.projectId,
		status: props.sectionStatus,
		taskId: props.task.id,
	});
};

const selectPerformer = (performer: string) => {
	taskData.value.performer = performer;
};

const selectPriority = (priority: string) => {
	taskData.value.priority = priority;
};

const selectResponsiblePerson = (responsiblePerson: string) => {
	taskData.value.responsiblePerson = responsiblePerson;
};
</script>

<style></style>
