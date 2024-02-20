import { getOrgRepos } from "./getOrgRepos";
import type { Repository } from "./getOrgRepos";
export async function getProjects() {
  return await getOrgRepos();
}
export type Project = Awaited<Promise<Repository[]>>[number];
