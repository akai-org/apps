import React from "react";
import Layout from "../src/components/layout";
import Card from "../src/components/card";
import { getProject } from "../api/projects";
import gravatar from "gravatar-api";

import "../src/styles.scss";

const ProjectPage = ({ project }) => (
  <Layout>
    <Card>
      <h2>{project.title}</h2>
      <img src={project.image} alt="logo" />
      {project.description
        ? project.description.split("\n").map((p, i) => <p key={i}>{p}</p>)
        : ""}
      {project.authors ? (
        <React.Fragment>
          <h3>Authors:</h3>
          <ul className="authors">
            {project.authors.map((author, i) => (
              <li key={i}>
                <img
                  alt={author.fullname}
                  src={gravatar.imageUrl({ email: author.email })}
                />
                <span>
                  {author.fullname}{" "}
                  <a href={"mailto://" + author.email}>{author.email}</a>
                </span>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ) : (
        ""
      )}
      {project.tech ? (
        <div className="technologies">
          <h3>Technologies:</h3>
          {project.tech.map((t, i) => (
            <div key={i}>
              <img src={t.image} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      {project.url && (
        <a className="button-link" href={project.url}>
          Website
        </a>
      )}
      {project.github && (
        <a className="button-link" href={project.github}>
          Source
        </a>
      )}
    </Card>
  </Layout>
);

ProjectPage.getInitialProps = async ({ query }) => {
  return { project: getProject(query.slug) };
};

export default ProjectPage;
