import { marked } from "marked";
import { akaiOrgName } from "./constants";
import { gql, octokit } from "./github";

interface Metadata {
  name?: string;
  description?: string;
  technologies?: string[];
}

interface RepositoryResponse {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  languages: {
    nodes: {
      name: string;
    }[];
  };
  metadata: {
    entries: {
      name: string;
      object: {
        text?: string;
      };
    }[];
  }
}

type RepositoryTemp = Omit<RepositoryResponse, "metadata" | "languages">

interface TRepository extends RepositoryTemp {
  metadata: Metadata;
  languages: string[];
  hasData: boolean;
}

interface OrgReposResponse {
  organization: {
    repositories: {
      nodes: RepositoryResponse[];
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
          metadata: object(expression: "main:.akai/"){
            ... on Tree {
              entries {
                name
                object {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          }
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

  return organization.repositories.nodes.map((repo: RepositoryResponse) => {
    let config: Metadata = {};
    const metadata = repo.metadata;
    let hasData = false;
    if (metadata) {
      hasData = true;
      for (const entry of metadata.entries) { // entries jest w oryginalnym responsie z githuba
        if (entry.name == "config.json") {
          config = { ...JSON.parse(entry.object.text!) };
        }
        if (entry.name.toLowerCase() == "readme.md") {
          const html = marked.parse(entry.object.text!);
          config.description = html.toString();
        }
      }
    }
    return {
      ...repo,
      metadata: config,
      hasData: hasData,
      languages: repo.languages.nodes.map((lang) => lang.name),
    }
  });
}

export type Repository = TRepository; 
