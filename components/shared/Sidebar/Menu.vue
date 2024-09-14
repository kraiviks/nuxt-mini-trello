<template>
	<div>
		<header class="p-4">
			<div class="flex items-center gap-2 w-max">
				<Logo />
				<p class="font-bold animate-pulse">Nuxt-Mini-Trello</p>
			</div>
		</header>
		<div class="px-4 grow">
			<div class="grid gap-2">
				<NuxtLink
					v-for="item in items"
					:key="item.title"
					:to="localePath(item.href)"
					@click="emit('close')"
					class="flex items-center gap-2 px-2 py-1 transition rounded cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-600"
				>
					<Icon :icon="item.icon" class="h-6 w-6" />
					<span>{{ $t(item.title) }}</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
const localePath = useLocalePath();
const emit = defineEmits(['close']);

const items = ref([
	{ title: 'PROJECTS', href: '/', icon: 'mdi:folder' },
	{ title: 'DASHBOARD', href: '/dashboard', icon: 'mdi:view-dashboard' },
]);
</script>
