import React from "react";
import { Header as H } from "semantic-ui-react";

function Header({ title, description }) {
  return (
    <header style={{ padding: "5px 10px", marginBottom: "25px" }}>
      <H as="h1" floated="left" style={{ color: "#fff", fontSize: "9px", fontWeight: "700" }}>
        {title}
      </H>
      <H as="h2" floated="right" style={{ color: "#fff", fontSize: "9px", fontWeight: "700" }}>
        {description}
      </H>
    </header>
  );
}

export default Header;
