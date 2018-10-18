import React, { Component } from 'react';
import './App.css';
import Project from "./components/project";

const projects = [
  {
    title: "Trios",
    url: "http://trios.akai.org.pl/",
    image: "http://trios.akai.org.pl/vectors/trios_logo.svg",
    category: "main",
    color: "#e2fdff"
  },
  {
    title: "Hackathons collector",
    url: "http://hackathons.akai.org.pl/",
    image: "/Hackathons.svg",
    category: "main",
    color: "#fff8e2"
  },
  {
    title: "Rozkład ekrany",
    url: "https://akai-org.github.io/rozklad-ekrany/",
    image: "https://github.com/akai-org/rozklad-ekrany/blob/master/images/maps/PP72.png?raw=true",
    category: "main",
    color: "#3c5082"
  },
  {
    title: "Zdrowieton",
    url: "http://zdrowieton.akai.org.pl/",
    image: "http://zdrowieton.akai.org.pl/images/stworek.png",
    category: "members",
    color: "#c4ffd3"
  },
  {
    title: "Symbols",
    url: "http://symbols.rudol.pl/",
    image: "/symbols.png",
    category: "members",
    color: "#F0E5C1"
  },
  {
    title: "Jaki środek transportu",
    url: "https://jakisrodektransportu.netlify.com",
    image: "",
    category: "newcomers"
  }
]
class App extends Component {
  constructor() {
    super();
    this.state = { aa: 0 };
    this.increment = this.increment.bind(this);
  }
  increment() {
    this.setState({ aa: this.state.aa + 1 })
  }
  render() {
    return (
      <div className={"wrapper " + ((this.state.aa > 5 && this.state.aa % 4) ? "marquee" : "")}>
        <div className="background"></div>
        <h1 onClick={this.increment}>AKAI <span>A</span>pps</h1>
        <div className="projects">
          <h2>Production ready</h2>
          <section>
            {projects.filter(project => project.category === 'main').map((project, i) => <Project key={i} {...project} />)}
          </section>
          <br />
          <br />
          <h2>Newcomers' projects - 2018</h2>
          <section className="medium">
            {projects.filter(project => project.category === 'newcomers').map((project, i) => <Project key={i} {...project} />)}
          </section>
          <br />
          <br />
          <h2>Our members' projects</h2>
          <section className="small">
            {projects.filter(project => project.category === 'members').map((project, i) => <Project key={i} {...project} />)}
          </section>
        </div>
        <small>Created by AKAI</small>
      </div>
    );
  }
}

export default App;