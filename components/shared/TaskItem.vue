<template>
	<li
		class="bg-slate-300 dark:bg-slate-300 text-black rounded cursor-pointer"
		:data-id="task.id"
	>
		<SharedModal v-if="!editName" title="DETAILS">
			<template #trigger>
				<div
					class="flex items-center justify-between gap-2 w-full py-3 px-4"
					@touchstart.native.stop="() => console.log(task.name)"
				>
					{{ task.name }}
					<Icon
						icon="mdi:rename"
						class="h-6 w-6 hover:scale-150 transition"
						@click="editName = true"
					/>
				</div>
			</template>
			<template #header>
				<div class="flex flex-col gap-2 p-5 border mt-3">
					<div class="flex items-center gap-1">
						<p class="font-bold text-slate-500">{{ $t('STATUS') }}:</p>
						<p>{{ task.status }}</p>
					</div>
					<div class="flex items-center gap-1 flex-wrap">
						<p class="font-bold text-slate-500">{{ $t('PERFORMER') }}:</p>
						<p v-if="task.performer && !detailsEdit">{{ task.performer }}</p>
						<Icon
							icon="mdi:add"
							class="cursor-pointer hover:scale-150 transition"
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
					<div class="flex items-center gap-1 flex-wrap">
						<p class="font-bold text-slate-500">
							{{ $t('RESPONSIBLE_PERSON') }}:
						</p>
						<p v-if="task.responsiblePerson && !detailsEdit">
							{{ task.responsiblePerson }}
						</p>
						<Icon
							icon="mdi:add"
							class="cursor-pointer hover:scale-150 transition"
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
						<p class="text-lg" v-if="!detailsEdit">{{ task.name }}</p>
						<Input v-else v-model="taskData.name" />
					</li>
					<li class="flex items-center gap-2 flex-wrap">
						<p class="font-bold text-slate-500">{{ $t('DESCRIPTION') }}:</p>
						<div class="text-lg break-words max-w-full" v-if="!detailsEdit">
							{{ task.description }}
						</div>
						<Textarea v-else v-model="taskData.description" />
					</li>
					<li class="flex items-center gap-2 flex-wrap">
						<p class="font-bold text-slate-500">{{ $t('PRIORITY') }}:</p>
						<div
							v-if="!detailsEdit"
							class="w-2 h-2 rounded-full p-2"
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
			class="flex items-center justify-between gap-2 py-1 px-4"
			v-if="editName"
		>
			<Input v-model="taskData.name" type="text" class="w-full dark:bg-white" />
			<Icon
				icon="mdi:content-save"
				class="hover:scale-150 h-6 w-6 transition cursor-pointer"
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

const taskData = ref(props.task);

const editName = ref<boolean>(false);
const detailsEdit = ref<boolean>(false);

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
