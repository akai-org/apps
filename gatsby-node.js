/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fetch = require("node-fetch");

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;

  async function processData(data) {
    data = await Promise.all(
      data.map(async repo => {
        try {
          const info = await fetch(
            `https://raw.githubusercontent.com/${
              repo.full_name
            }/master/package.json`
          ).then(res => res.json());
          return { ...repo, info };
        } catch (err) {
          return repo;
        }
      })
    );

    // data = await Promise.all(
    //   data.map(async repo => ({
    //     ...repo,
    //     icon: await fetch(
    //       `https://raw.githubusercontent.com/${repo.full_name}/master/icon.png`
    //     )
    //       .then(res =>
    //         res.status === 200
    //           ? `https://raw.githubusercontent.com/${
    //               repo.full_name
    //             }/master/icon.png`
    //           : "https://raw.githubusercontent.com/akai-org/akai-assets/master/public/svg/logo-color.svg"
    //       )
    //       .catch(() => "https://raw.githubusercontent.com/akai-org/akai-assets/master/public/svg/logo-color.svg"),
    //   }))
    // );

    //
    data = await Promise.all(
      data.map(async repo => ({
        ...repo,
        icon: await fetch(
          // https://github.com/akai-org/frontend-workshops/raw/master/logo.png
          `https://raw.githubusercontent.com/${repo.full_name}/master/icon.png`
        )
          .then(res => {
            if (res.status !== 200) {
              console.log("nope 200", repo.full_name);
              return "https://raw.githubusercontent.com/akai-org/akai-assets/master/public/svg/logo-color.svg";
            }
            return `https://github.com/${repo.full_name}/raw/master/icon.png`;
          })
          .catch(
            () =>
              console.log("catch", repo.full_name) ||
              "https://raw.githubusercontent.com/akai-org/akai-assets/master/public/svg/logo-color.svg"
          ),
      }))
    );

    return data
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        background: "#fff",
        language: repo.language,
        datetime: Date.parse(repo.updated_at),
        open_issues_count: repo.open_issues_count,
        stargazers_count: repo.stargazers_count,
        url: repo.html_url,
        info: repo.info || {},
        icon: repo.icon,
      }))
      .map(repo => ({
        ...repo,
        background: repo.info.background ? repo.info.background : "#fff",
      }))
      .sort((a, b) => {
        if (a.stargazers_count === b.stargazers_count) {
          return b.datetime - a.datetime;
        }
        return b.stargazers_count - a.stargazers_count;
      })
      .filter(repo => !(repo.info.private || !repo.language))
      .filter((_, i) => i < 24)
      .map(repo => ({
        id: "" + repo.id,
        parent: null,
        children: [],
        internal: {
          mediaType: "application/json",
          type: `Repo`,
          content: JSON.stringify(repo),
          contentDigest: createContentDigest(repo),
        },
        icon: repo.icon,
      }));
  }
  // Create nodes here, generally by downloading data
  // from a remote API.
  const data = await processData(
    await fetch(process.env.REPO).then(data => data.json())
  );

  // Process data into nodes.
  data.forEach(datum => createNode(datum));

  // We're done, return.
  return;
};
