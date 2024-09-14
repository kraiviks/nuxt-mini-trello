<script setup lang="ts">
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Icon } from '@iconify/vue';
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
	placeholder: string;
	options: string[];
	value?: string;
}>();

const selectedItem = ref(props.value || '');

const emit = defineEmits(['onChange']);

watch(
	() => props.value,
	(newValue) => {
		selectedItem.value = newValue || '';
	}
);

watch(selectedItem, (value) => {
	emit('onChange', value);
});

const resetSelection = () => {
	selectedItem.value = '';
	emit('onChange', selectedItem.value);
};
</script>

<template>
	<div class="flex w-full">
		<Select v-model="selectedItem" class="flex">
			<SelectTrigger>
				<SelectValue :placeholder="placeholder" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem v-for="option in options" :key="option" :value="option">
						{{ option.slice(0, 1).toUpperCase() + option.slice(1) }}
					</SelectItem>
				</SelectGroup>
			</SelectContent>
			<Button
				v-if="selectedItem"
				class="ml-1 p-2"
				variant="ghost"
				@click="resetSelection"
			>
				<Icon icon="mdi:close" />
			</Button>
		</Select>
	</div>
</template>
