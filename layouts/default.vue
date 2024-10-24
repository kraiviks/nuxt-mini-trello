<template>
	<div class="grid items-start h-screen overflow-hidden lg:flex">
		<SharedSidebar />
		<div class="w-full p-4 overflow-hidden">
			<slot />
		</div>
	</div>
</template>
