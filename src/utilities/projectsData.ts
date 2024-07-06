import { getOrgRepos } from "./getOrgRepos";
import type { ProjectGroups } from "./types";

export async function getProjects() {
  return await getOrgRepos();
}

export const projects = await getProjects();

export const projectGroups: ProjectGroups = {
  valid: [],
  archived: [],
};
for (const project of projects) {
  if (project.metadata.ok) {
    projectGroups.valid.push(project);
  } else {
    projectGroups.archived.push(project);
  }
}
export const countValidProjects = projectGroups["valid"]?.length;
export const countArchivedProjects = projects.length - countValidProjects!;
export const languages = new Set(projects.map((project) => project.languages).flat());

