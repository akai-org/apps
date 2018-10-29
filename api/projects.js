function getProjects() {
  return [
    {
      title: "Trios",
      url: "http://trios.akai.org.pl/",
      image: "http://trios.akai.org.pl/vectors/trios_logo.svg",
      category: "main",
      color: "#e2fdff",
      slug: "trios"
    },
    {
      title: "Hackathons collector",
      url: "http://hackathons.akai.org.pl/",
      image: "/static/Hackathons.svg",
      category: "main",
      color: "#fff8e2",
      slug: "hackathons"
    },
    {
      title: "Rozkład ekrany",
      url: "https://akai-org.github.io/rozklad-ekrany/",
      image:
        "https://github.com/akai-org/rozklad-ekrany/blob/master/images/maps/PP72.png?raw=true",
      category: "main",
      color: "#3c5082",
      slug: "rozklady"
    },
    {
      title: "Zdrowieton",
      url: "http://zdrowieton.akai.org.pl/",
      image: "http://zdrowieton.akai.org.pl/images/stworek.png",
      category: "members",
      color: "#c4ffd3",
      slug: "zdrowieton"
    },
    {
      title: "Symbols",
      url: "http://symbols.rudol.pl/",
      image: "/static/symbols.png",
      category: "members",
      color: "#F0E5C1",
      slug: "symbols"
    },
    {
      title: "Jaki środek transportu",
      url: "https://jakisrodektransportu.netlify.com",
      image: "",
      category: "newcomers",
      slug: "transport"
    }
  ];
}

function getProject(slug) {
  return getProjects().filter(project => project.slug === slug)[0];
}

module.exports = {
  getProjects,
  getProject
};
