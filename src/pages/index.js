import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Icon from "../components/icon";

const IndexPage = () => {
  const { allRepo } = useStaticQuery(
    graphql`
      query github {
        allRepo {
          edges {
            node {
              id
              internal {
                content
              }
              localImage {
                publicURL
              }
            }
          }
        }
      }
    `
  );

  const repos = Object.values(allRepo.edges)
    .map(edge => edge.node)
    .map(node => ({
      ...JSON.parse(node.internal.content),
      icon: node.localImage ? node.localImage.publicURL : "",
    }));

  return (
    <Layout>
      <SEO title="Projects" keywords={[`akai`, `politechnika`, `poznańska`, 'koło', 'naukowe', 'projekty', 'it']} />
      <div className="IconWrapper">
        {repos.map(repo => (
          <Icon key={repo.id} {...repo} />
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
