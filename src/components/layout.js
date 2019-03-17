import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import Header from "./header";
import PageWrapper from "./pageWrapper";
import "./layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <PageWrapper>
        <Header
          title={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        />
        <div>
          <main>{children}</main>
          <footer style={{ textAlign: 'center', fontSize: '10px', padding: "10px" }}>
            © <a style={{color: 'white', textDecoration: "none"}} href="https://akai.org.pl">AKAI</a> {new Date().getFullYear()}, Built with
            {` `}
            <a style={{color: 'white', textDecoration: "none"}} href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </PageWrapper>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
