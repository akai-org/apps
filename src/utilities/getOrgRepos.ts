import { akaiOrgName } from "./constants";
import { gql, octokit } from "./github";

interface Repository {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  languages: {
    nodes: {
      name: string;
    }[];
  };
}

interface OrgReposResponse {
  organization: {
    repositories: {
      nodes: Repository[];
    };
  };
}

const orgReposQuery = gql`
  query ($orgName: String!, $cursor: String) {
    organization(login: $orgName) {
      repositories(first: 100, after: $cursor) {
        nodes {
          name
          description
          url
          stargazerCount
          languages(first: 100) {
            nodes {
              name
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export async function getOrgRepos() {
  const { organization } = await octokit.graphql.paginate<OrgReposResponse>(
    orgReposQuery,
    {
      orgName: akaiOrgName,
    },
  );

  return organization.repositories.nodes.map((repo) => ({
    ...repo,
    languages: repo.languages.nodes.map((lang) => lang.name),
  }));
}
