import { akaiOrgName } from "./constants";
import { gql, octokit } from "./github";
import { cache } from "./cache";
import { Duration } from "./Duration.enum";
import { Metadata } from "./repoMetadata";
import { Ok, Err, type Result } from "./types";

interface RepositoryResponse {
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  updatedAt: string;
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
  };
}

type RepositoryTemp = Omit<RepositoryResponse, "metadata" | "languages">;

interface TRepository extends RepositoryTemp {
  metadata: Result<Metadata>;
  languages: string[];
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
          updatedAt: pushedAt
          metadata: object(expression: "main:.akai/") {
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
  const {
    organization: { repositories },
  } = await cache({
    key: "orgRepos",
    queryFn: octokit.graphql.paginate<OrgReposResponse>(orgReposQuery, {
      orgName: akaiOrgName,
    }),
    ttl: 60 * Duration.Minute,
    condition: process.env.NODE_ENV === "development",
  });

  return repositories.nodes.map((repo: RepositoryResponse) => {
    let config: Result<Metadata>;
   
    if(!repo.metadata) {
      config = Err();
    } else {
      const metaEntries = Object.fromEntries(repo.metadata.entries.map(item => {
        return [item.name.split(".")[0], [item.name, item.object]];
      }));
      config = Ok(new Metadata(repo.name, metaEntries));
    }

    return {
      ...repo,
      metadata: config,
      languages: repo.languages.nodes.map((lang) => lang.name),
    };
  });
}

export type Repository = TRepository;
