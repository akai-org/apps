import React, { PureComponent } from 'react';

class Project extends PureComponent {
  render() {
    const { title, url, image } = this.props;
    return <div className="project">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
        <span>{title}</span>
      </a>
    </div>
  }
}

export default Project;