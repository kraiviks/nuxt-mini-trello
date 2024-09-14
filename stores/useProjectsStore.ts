import { defineStore } from 'pinia';

import { nanoid } from 'nanoid';

export interface Task {
	id: string;
	status: string;
	performer: string;
	responsiblePerson: string;
	description: string;
	priority: Priority;
}
export interface Section {
	status: string;
	tasks: Task[];
}
export interface Project {
	id: string;
	name: string;
	dashboard: Section[];
}

export enum Priority {
	Low = 'low',
	Medium = 'medium',
	High = 'high',
}

export const useProjectsStore = defineStore({
	id: 'projects-store',
	state: () => ({
		projects: [] as Project[],
	}),
	actions: {
		init() {
			const initProject: Project = {
				id: nanoid(),
				name: 'Test project',
				dashboard: [
					{ status: 'Todo', tasks: [] },
					{ status: 'In progress', tasks: [] },
					{ status: 'Done', tasks: [] },
				],
			};

			if (this.projects.length === 0) {
				this.projects.push(initProject);
			}
		},
		addProject(name: string) {
			const newProject: Project = {
				id: nanoid(),
				name,
				dashboard: [
					{ status: 'Todo', tasks: [] },
					{ status: 'In progress', tasks: [] },
					{ status: 'Done', tasks: [] },
				],
			};
			this.projects.push(newProject);
		},
		getProject(id: string): Project | undefined {
			return this.projects.find((project) => project.id === id);
		},
		deleteProject(id: string) {
			const filteredProjects = this.projects.filter(
				(project) => project.id !== id
			);
			this.projects = filteredProjects;
		},

		addTask(projectId: string, status: string, task: Task) {
			const projectIndex = this.projects.findIndex((p) => p.id === projectId);
			if (projectIndex !== -1) {
				const section = this.projects[projectIndex].dashboard.find(
					(s) => s.status === status
				);
				if (section) {
					section.tasks.push(task);
					this.projects[projectIndex] = {
						...this.projects[projectIndex],
						dashboard: [...this.projects[projectIndex].dashboard],
					};
				}
			}
		},
		editTask({
			projectId,
			status,
			task,
		}: {
			projectId: string;
			status: string;
			task: Task;
		}) {
			const projectIndex = this.projects.findIndex((p) => p.id === projectId);
			if (projectIndex !== -1) {
				const section = this.projects[projectIndex].dashboard.find(
					(s) => s.status === status
				);
				if (section) {
					const taskIndex = section.tasks.findIndex((t) => t.id === task.id);
					if (taskIndex !== -1) {
						section.tasks[taskIndex] = task;
						this.projects[projectIndex] = {
							...this.projects[projectIndex],
							dashboard: [...this.projects[projectIndex].dashboard],
						};
					}
				}
			}
		},
		moveTask(projectId: string, taskId: string, toStatus: string) {
			const projectIndex = this.projects.findIndex((p) => p.id === projectId);
			if (projectIndex !== -1) {
				const fromSection = this.projects[projectIndex].dashboard.find((s) =>
					s.tasks.some((t) => t.id === taskId)
				);
				const toSection = this.projects[projectIndex].dashboard.find(
					(s) => s.status === toStatus
				);
				if (fromSection && toSection) {
					const taskIndex = fromSection.tasks.findIndex((t) => t.id === taskId);
					if (taskIndex !== -1) {
						const [task] = fromSection.tasks.splice(taskIndex, 1);
						task.status = toStatus;
						toSection.tasks.push(task);
						this.projects[projectIndex] = {
							...this.projects[projectIndex],
							dashboard: [...this.projects[projectIndex].dashboard],
						};
					}
				}
			}
		},
		deleteTask({
			projectId,
			status,
			taskId,
		}: {
			projectId: string;
			status: string;
			taskId: string;
		}) {
			const projectIndex = this.projects.findIndex((p) => p.id === projectId);
			if (projectIndex !== -1) {
				const section = this.projects[projectIndex].dashboard.find(
					(s) => s.status === status
				);
				if (section) {
					const taskIndex = section.tasks.findIndex((t) => t.id === taskId);
					if (taskIndex !== -1) {
						section.tasks.splice(taskIndex, 1);
						this.projects[projectIndex] = {
							...this.projects[projectIndex],
							dashboard: [...this.projects[projectIndex].dashboard],
						};
					}
				}
			}
		},
	},
	persist: true,
});
