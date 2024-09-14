<template>
	<Button variant="ghost" size="icon" @click="isDark = !isDark">
		<Icon
			:icon="isDark ? 'radix-icons:sun' : 'radix-icons:moon'"
			class="h-6 w-6"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useStorage } from '@vueuse/core';
import { onMounted, watch } from 'vue';

const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});
</script>
