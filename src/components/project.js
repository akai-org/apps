import React, { PureComponent } from 'react';

class Project extends PureComponent {
  render() {
    const { title, url, image, color } = this.props;
    return <div className="project">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image ? image : "https://akai.org.pl/wp-content/themes/akai-new/images/logo.svg"} alt={title} style={{ background: color }} />
        <span>{title}</span>
      </a>
    </div>
  }
}

export default Project;