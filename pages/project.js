import React from "react";
import Layout from "../src/components/layout";
import Card from "../src/components/card";
import { getProject } from "../api/projects";

import "../src/styles.scss";

const ProjectPage = ({ project }) => (
  <Layout>
    <Card>
      <h2>{project.title}</h2>
      <img src={project.image} alt="logo" />
      <p>{project.description}</p>
      {project.url && <a href={project.url}>Website</a>}
      {project.github && <a href={project.github}>Source</a>}
    </Card>
  </Layout>
);

ProjectPage.getInitialProps = async ({ query }) => {
  return { project: getProject(query.slug) };
};

export default ProjectPage;
