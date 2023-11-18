import { getOrgRepos } from "./getOrgRepos";

export async function getProjects() {
  return await getOrgRepos();
}
export type Project = Awaited<ReturnType<typeof getProjects>>[number];
