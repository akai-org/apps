import React, { PureComponent } from "react";
import { Link } from "../../routes";

// href="/project" as={`/project/${slug}`}

class Project extends PureComponent {
  render() {
    const { title, url, image, color, slug, inprogress } = this.props;
    return (
      <div className="project">
        <Link route="project" params={{ slug }}>
          <a href="#">
            <img
              src={
                image
                  ? image
                  : "https://akai.org.pl/wp-content/themes/akai-new/images/logo.svg"
              }
              alt={title}
              style={{ background: color }}
            />
            <span>
              {title}
              <small>{inprogress ? " [in progress]" : ""}</small>
            </span>
          </a>
        </Link>
      </div>
    );
  }
}

export default Project;
