import type { Repository } from "./getOrgRepos";
export type Project = Awaited<Promise<Repository[]>>[number];

export type ProjectGroups = {
  valid: Project[];
  archived: Project[];
};

export type Result<T, E = undefined> = {ok: true, value: T} | {ok: false, error: E | undefined}; 
export const Ok = <T>(data: T): Result<T, never> => {
  return {ok: true, value: data};
}
export const Err = <E>(error?: E): Result<never, E> => {
  return {ok: false, error};
}