<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
const props = defineProps({
	title: { type: String, default: '' },
	locked: { type: Boolean, default: false },
});

const isOpen = ref(false);

const closeDialog = () => {
	if (!props.locked) {
		isOpen.value = false;
	}
};
</script>

<template>
	<Dialog v-model:open="isOpen">
		<DialogTrigger class="w-full flex justify-end">
			<slot name="trigger" />
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{{ $t(title) }}:</DialogTitle>
				<slot name="header" />
			</DialogHeader>
			<DialogDescription>
				<slot name="description" />
			</DialogDescription>

			<div>
				<slot name="content" />
			</div>

			<DialogFooter class="flex-col items-center gap-2">
				<slot name="footer" />
				<div @click="closeDialog">
					<slot name="triggerButton" />
				</div>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
