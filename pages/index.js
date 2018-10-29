import React from "react";

import "../src/styles.scss";

import { getProjects } from "../api/projects";
import Project from "../src/components/project";
import Layout from "../src/components/layout";

const Index = () => {
  return (
    <Layout>
      <div className="projects">
        <h2>Production ready</h2>
        <section>
          {getProjects()
            .filter(project => project.category === "main")
            .map((project, i) => (
              <Project key={i} {...project} />
            ))}
        </section>
        <br />
        <br />
        <h2>Newcomers' projects - 2018</h2>
        <section className="medium">
          {getProjects()
            .filter(project => project.category === "newcomers")
            .map((project, i) => (
              <Project key={i} {...project} />
            ))}
        </section>
        <br />
        <br />
        <h2>Our members' projects</h2>
        <section className="small">
          {getProjects()
            .filter(project => project.category === "members")
            .map((project, i) => (
              <Project key={i} {...project} />
            ))}
        </section>
      </div>
      <small>Created by AKAI</small>
    </Layout>
  );
};

export default Index;
