import { Octokit } from "octokit";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";
import { GH_API_TOKEN } from "astro:env/server";

const OctokitExtended = Octokit.plugin(paginateGraphQL);
export const octokit = new OctokitExtended({
  auth: GH_API_TOKEN,
});
export const gql = String.raw;
