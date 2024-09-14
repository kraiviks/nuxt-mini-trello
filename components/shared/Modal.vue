<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';

defineProps({
	title: { type: String, default: '' },
	showCloseButton: { type: Boolean, default: true },
});
</script>

<template>
	<Dialog>
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

			<DialogFooter>
				<slot name="footer" />
				<DialogClose v-if="showCloseButton" asChild>
					<slot name="triggerButton" />
				</DialogClose>
				<slot v-else name="triggerButton" />
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
