import React from "react";
import { Label, Card, Image } from "semantic-ui-react";
import ReactGA from "react-ga";

import fallbackIcon from "../images/akai-logo.svg";

function Icon({ name, background, icon, language, open_issues_count, url }) {
  const iconImage = icon || fallbackIcon;
  const backgroundColor = background;

  const colors = {
    JavaScript: "yellow",
    PHP: "violet",
    HTML: "pink",
    Elixir: "purple",
    Python: "blue",
    Ruby: "red",
    CSS: "orange",
    Java: "black",
  };

  return (
    <a
      className="Icon"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: "#fff",
        textAlign: "center",
      }}
      onClick={() => ReactGA.pageview(window.location.pathname + "/" + name)}
    >
      <Card
        style={{
          background: backgroundColor,
          boxShadow: "none",
          padding: "10px",
          marginBottom: "5px",
        }}
      >
        <Image src={iconImage} style={{ background: "none" }} />
        <Label
          color={colors[language] || "Grey"}
          size={"mini"}
          floating
          style={{
            left: 0,
            top: "auto",
            right: "auto",
            transform: "translateY(-100%) scale(0.8)",
          }}
        >
          {language}
        </Label>
        {open_issues_count !== 0 && (
          <Label
            circular
            color={"red"}
            floating
            size={"tiny"}
            style={{ bottom: "-5px", top: "auto" }}
          >
            {open_issues_count}
          </Label>
        )}
        <div />
      </Card>
      <h3
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "calc(100% + 30px)",
          marginLeft: "-15px",
          fontSize: "1em",
          fontWeight: "400",
          marginTop: "0.3em",
          marginBottom: "0",
        }}
      >
        {name}
      </h3>
    </a>
  );
}

export default Icon;
