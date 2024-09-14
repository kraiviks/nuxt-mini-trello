<template>
	<div class="relative">
		<div
			class="z-50 flex items-center justify-between w-full h-full p-4 lg:hidden"
		>
			<Logo />
			<Icon
				class="z-50 cursor-pointer left-2 top-2 w-10 h-10"
				icon="mdi:menu"
				@click="open = true"
			/>
			<div
				v-if="open"
				class="fixed bg-white dark:bg-gray-500 top-0 left-0 z-[999] w-full h-screen"
			>
				<Icon
					class="absolute z-50 cursor-pointer right-4 top-4 w-10 h-10"
					icon="mdi:close"
					@click="open = false"
				/>
				<SharedSidebarMenu @close="open = false" />
				<SharedColorModeToggle class="absolute right-20 top-4" />
				<SharedLanguageToggle class="mt-10" />
			</div>
		</div>
		<div
			class="hidden lg:flex w-[250px] h-screen flex-col justify-between border-r"
		>
			<SharedSidebarMenu />
			<div class="flex items-center justify-between ga-3 p-3">
				<SharedColorModeToggle />
				<SharedLanguageToggle />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
const open = ref(false);
</script>
