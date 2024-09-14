# [Nuxt-Mini-Trello](https://nuxt-mini-trello.vercel.app/)

This is a Nuxt.js 3.13.0 project designed with modern web development practices. It leverages several powerful libraries such as Pinia for state management, VueUse for utilities, and TailwindCSS for styling, along with drag-and-drop functionality and persisted state management.

## Features

- **Nuxt.js 3.13.0**: A powerful framework for Vue.js with server-side rendering, static site generation, and more.
- **Pinia**: State management with persisted state using `pinia-plugin-persistedstate`.
- **VueUse**: A collection of essential Vue Composition Utilities integrated with `@vueuse/nuxt`.
- **TailwindCSS**: Utility-first CSS framework with additional animations via `tailwindcss-animate`.
- **Shadcn-Nuxt**: UI components based on Radix UI.
- **Drag-and-Drop**: Drag-and-drop functionality using `vuedraggable`.
- **Icons**: Powered by Iconify and Radix icons.
- **Dark Mode Support**: Managed via `@nuxtjs/color-mode`.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kraiviks/nuxt-mini-trello.git
   cd nuxt-mini-trello

2. Install the dependencies:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run dev

## Scripts

- **npm run dev:** Start the development server.
- **npm run build:** Build the project for production.
- **npm run generate:** Generate a static version of the site.
- **npm run preview:** Preview the generated static site.
- **npm run postinstall:** Runs Nuxt prepare after install.

## Dependencies

- **@pinia/nuxt:** Pinia state management for Nuxt.
- **@vueuse/core & @vueuse/nuxt:** Vue utilities for state and reactivity management.
- **class-variance-authority:** Class utility for managing variance in TailwindCSS.
- **clsx:** Utility for conditionally joining class names.
- **nanoid:** A tiny, secure URL-friendly unique ID generator.
- **nuxt:** The core framework for this project.
- **pinia-plugin-persistedstate:** Plugin for persisting Pinia store data.
- **shadcn-nuxt:** Shadcn UI integration for Vue.js with Radix UI.
- **tailwind-merge:** Utility for merging TailwindCSS classes.
- **tailwindcss-animate:** Animation utilities for TailwindCSS.
- **vuedraggable:** Drag-and-drop support for Vue.js.

## Dev Dependencies

- **@iconify-json/radix-icons:** Iconify Radix icons.
- **@iconify/vue:** Iconify Vue components.
- **@nuxtjs/color-mode:** Dark mode integration for Nuxt.
- **@nuxtjs/tailwindcss:** TailwindCSS integration for Nuxt.
- **typescript:** TypeScript support.

## License

This project is licensed under the [MIT License](LICENSE).
