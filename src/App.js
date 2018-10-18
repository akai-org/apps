import React, { Component } from 'react';
import './App.css';
import Project from "./components/project";

const projects = [
  {
    title: "Trios",
    url: "http://trios.akai.org.pl/",
    image: "http://trios.akai.org.pl/vectors/trios_logo.svg",
    category: "main"
  },
  {
    title: "Hackathons collector",
    url: "http://hackathons.akai.org.pl/",
    image: "https://akai.org.pl/wp-content/themes/akai-new/images/logo.svg",
    category: "main"
  },
  {
    title: "Rozkład ekrany",
    url: "https://akai-org.github.io/rozklad-ekrany/",
    image: "",
    category: "main"
  },
  {
    title: "Zdrowieton",
    url: "http://zdrowieton.akai.org.pl/",
    image: "",
    category: "poc"
  }
]
class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="background"></div>
        <h1>AKAI Apps</h1>
        <div className="projects">
          <h2>Production ready</h2>
          <section>
            {projects.filter(project => project.category === 'main').map((project, i) => <Project key={i} {...project} />)}
          </section>
          <br />
          <br />
          <h2>Proofs of Concept</h2>
          <section>
            {projects.filter(project => project.category === 'poc').map((project, i) => <Project key={i} {...project} />)}
          </section>
          <br />
          <br />
          <h2>Our members' projects</h2>
          <section>
            {projects.filter(project => project.category === 'poc').map((project, i) => <Project key={i} {...project} />)}
          </section>
        </div>
      </div>
    );
  }
}

export default App;