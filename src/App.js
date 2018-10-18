import React, { Component } from 'react';
import './App.css';
import Project from "./components/project";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="background"></div>
        <div className="projects">
          <h2>Production ready</h2>
          <section>
            <Project title="Trios" url="http://trios.akai.org.pl/" image="http://trios.akai.org.pl/vectors/trios_logo.svg" />
            <Project title="Hackathons collector" url="http://hackathons.akai.org.pl/" image="https://akai.org.pl/wp-content/themes/akai-new/images/logo.svg" />
          </section>
        </div>
      </div>
    );
  }
}

export default App;