import React from "react";

import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1 style={{ textAlign: "center" }}>NOT FOUND</h1>
    <iframe
      title="Sound of Silence"
      style={{
        position: "relative",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      width="560"
      height="315"
      src="https://www.youtube.com/embed/4zLfCnGVeL4?autoplay=1"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
    <Link
      style={{
        color: "white",
        margin: "10px 0",
        display: "block",
        textAlign: "center",
      }}
      to="/"
    >
      Back to home
    </Link>
  </Layout>
);

export default NotFoundPage;
