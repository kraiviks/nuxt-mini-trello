<script setup lang="ts">
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

defineProps({
	title: { type: String, default: '' },
});
</script>

<template>
	<Dialog>
		<DialogTrigger class="w-full flex justify-end">
			<slot name="trigger" />
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>{{ title }}</DialogTitle>
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
				<DialogTrigger>
					<slot name="triggerButton" />
				</DialogTrigger>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
