import { getOrgRepos } from "./getOrgRepos";
import type { Repository } from "./getOrgRepos";
export async function getProjects() {
  return await getOrgRepos();
}
export type Project = Awaited<Promise<Repository[]>>[number];

export type Result<T, E = undefined> = {ok: true; value: T} | {ok: false; error: E | undefined}; // simple result
export const Ok = <T>(data: T): Result<T, never> => {
  return {ok: true, value: data};
}
export const Err = <E>(error: E): Result<never, E> => {
  return {ok: false, error};
}