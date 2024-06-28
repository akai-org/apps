import { Octokit } from "octokit";
import { paginateGraphQL } from "@octokit/plugin-paginate-graphql";

const OctokitExtended = Octokit.plugin(paginateGraphQL);
export const octokit = new OctokitExtended({
  auth: import.meta.env.GH_API_TOKEN,
});
export const gql = String.raw;
