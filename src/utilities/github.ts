import { Octokit } from "octokit";
import { isProd } from "./env";

export const octokit = new Octokit({
  auth: import.meta.env.GH_API_TOKEN,
});

export async function getProjects() {
  const projects: any[] = []; // temporarily :P
  const per_page = isProd ? 100 : 3;
  let page = 1;
  do {
    const { data } = await octokit.request(
      `GET /orgs/{org}/repos?page={page}&per_page={per_page}`,
      {
        org: "akai-org",
        page: page,
        per_page: per_page,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    projects.push(...data);
    page += 1;
  } while (isProd && projects.length >= per_page * (page - 1))

  return projects;
}
