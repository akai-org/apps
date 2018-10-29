const withSass = require("@zeit/next-sass");
const { getProjects } = require("./api/projects");

module.exports = {
  ...withSass(),
  exportPathMap: async function(defaultPathMap) {
    return {
      "/": { page: "/" },
      ...getProjects().reduce(
        (acc, project) => ({
          "/": { page: "/" },
          ...acc,
          [`/project/${project.slug}`]: {
            page: "/project",
            query: { slug: project.slug }
          }
        }),
        {}
      )
    };
  }
};
