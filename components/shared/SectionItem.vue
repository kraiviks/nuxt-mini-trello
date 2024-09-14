<template>
	<section
		class="bg-white dark:bg-slate-600 rounded-lg p-4 min-w-[300px] border h-max"
	>
		<h2 class="text-lg font-bold mb-3">{{ section.status }}</h2>

		<draggable
			v-model="section.tasks"
			:group="{ name: 'tasks', pull: true, put: true }"
			tag="ul"
			class="space-y-2"
			item-key="id"
			@end="onEnd"
			:data-status="section.status"
			:animation="300"
		>
			<template #item="{ element }">
				<SharedTaskItem
					:key="element.id"
					:task="element"
					:sectionStatus="section.status"
					:projectId="projectId"
					@edit="projectStore.editTask"
					@delete="projectStore.deleteTask"
				/>
			</template>
		</draggable>

		<div class="flex justify-end mt-5">
			<SharedModal :title="$t('ADD_TASK')" :locked="isLocked">
				<template #trigger>
					<Icon
						icon="mdi:add"
						class="cursor-pointer h-5 w-5 hover:scale-150 transition"
					/>
				</template>
				<template #content>
					<div class="flex flex-col gap-3">
						<Input
							type="text"
							:placeholder="`${$t('NAME')}*`"
							v-model="task.name"
							:class="errors.name && 'border-red-500'"
						/>
						<Textarea
							v-model="task.description"
							:placeholder="`${$t('DESCRIPTION')}*`"
							:class="errors.description && 'border-red-500'"
						/>
						<SharedSelect
							:placeholder="$t('SELECT_RESPONSIBLE_PERSON')"
							:options="responsiblePersonList"
							@onChange="selectResponsiblePerson"
						/>
						<SharedSelect
							:placeholder="$t('SELECT_PERFORMER')"
							:options="performerList"
							@onChange="selectPerformer"
						/>
						<SharedSelect
							:placeholder="$t('SELECT_PRIORITY')"
							:options="PriorityOptions"
							@onChange="selectPriority"
						/>
					</div>
				</template>
				<template #triggerButton>
					<Button variant="outline" @click="addTask"> {{ $t('ADD') }} </Button>
				</template>
			</SharedModal>
		</div>
	</section>
</template>

<script setup>
import draggable from 'vuedraggable';
import { Icon } from '@iconify/vue';
import { nanoid } from 'nanoid';
import { Priority, useProjectsStore } from '~/stores/useProjectsStore';
import {
	PriorityOptions,
	performerList,
	responsiblePersonList,
} from '~/lib/constants';

const props = defineProps({
	section: Object,
	projectId: String,
});

const projectStore = useProjectsStore();

const errors = ref({
	name: false,
	description: false,
});

const isLocked = computed(() => {
	return errors.value.name || errors.value.description;
})

const task = ref({
	name: '',
	description: '',
	performer: '',
	priority: Priority.Low,
});

const addTask = () => {
	if (!task.value.name) {
		errors.value.name = true;
		return;
	} else {
		errors.value.name = false;
	}
	if (!task.value.description) {
		errors.value.description = true;
		return;
	} else {
		errors.value.description = false;
	}
	projectStore.addTask(props.projectId, props.section.status, {
		id: nanoid(),
		name: task.value.name,
		responsiblePerson: task.value.responsiblePerson,
		performer: task.value.performer,
		description: task.value.description,
		priority: task.value.priority,
		status: props.section.status,
	});

	task.value = {
		name: '',
		description: '',
		performer: '',
		priority: Priority.Low,
	};
};

const selectResponsiblePerson = (responsiblePerson) => {
	task.value.responsiblePerson = responsiblePerson;
};
const selectPerformer = (performer) => {
	task.value.performer = performer;
};
const selectPriority = (priority) => {
	task.value.priority = priority;
};

const onEnd = (event) => {
	const { to, item } = event;
	const toStatus = to.dataset.status;
	const taskId = item.dataset.id;

	projectStore.moveTask(props.projectId, taskId, toStatus);
};
</script>
