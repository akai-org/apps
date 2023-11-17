import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: import.meta.env.GH_API_TOKEN,
});
