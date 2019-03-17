import React from "react";
import { StaticQuery, graphql } from "gatsby"

const gradient = `linear-gradient(rgba(15, 131,255, 0.45), rgba(5, 0, 0, 0.55))`;

function PageWrapper({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query {
          placeholderImage: file(relativePath: { eq: "winter.jpeg" }) {
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      `}
      render={data => (
        <div
          id="wrapper"
          className="PageWrapper"
          style={{ background: `${gradient}, url(${data.placeholderImage.childImageSharp.fluid.src})` }}
        >
          {children}
        </div>
      )}
    />
  );
}

export default PageWrapper;
