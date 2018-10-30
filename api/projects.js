function getTech(key) {
  return [
    {
      key: "php7",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
    },
    {
      key: "mysql",
      image: "https://upload.wikimedia.org/wikipedia/en/6/62/MySQL.svg"
    }
  ].filter(e => e.key === key)[0];
}

function getProjects() {
  return [
    {
      title: "Trios",
      url: "http://trios.akai.org.pl/",
      image: "http://trios.akai.org.pl/vectors/trios_logo.svg",
      category: "main",
      color: "#e2fdff",
      slug: "trios",
      description: "A website for solving trios",
      github: "https://github.com/akai-org/trios",
      tech: [getTech("php7"), getTech("mysql")],
      authors: [
        {
          fullname: "Marcin Ławniczak",
          email: "marcin.lawniczak@akai.org.pl"
        },
        {
          fullname: "Michał Dolata",
          email: "michal.dolata@akai.org.pl"
        }
      ]
    },
    {
      title: "Hackathons collector",
      url: "http://hackathons.akai.org.pl/",
      image: "/static/Hackathons.svg",
      category: "main",
      color: "#fff8e2",
      slug: "hackathons",
      github: "https://github.com/akai-org/hackathons",
      authors: [
        {
          fullname: "Rafał Rudol",
          email: "rafal.rudol@akai.org.pl"
        }
      ]
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
      slug: "zdrowieton",
      github: "https://github.com/akai-org/zdrowieton2017",
      description:
        "This is the result of 7 hours of work during zdrowieton.js in 2017. \n\n We will clean it up and make available for everyone, once we find time.",
      authors: [
        {
          fullname: "Marcin Ławniczak",
          email: "marcin.lawniczak@akai.org.pl"
        },
        {
          fullname: "Mikołaj Rozwadowski",
          email: "mikolaj.rozwadowski@akai.org.pl"
        },
        {
          fullname: "Tomasz Gil",
          email: "tomasz.gil@akai.org.pl"
        },
        {
          fullname: "Marta Sitkowska",
          email: "marta.sitkowska@akai.org.pl"
        },
        {
          fullname: "Rafał Rudol",
          email: "rafal.rudol@akai.org.pl"
        }
      ]
    },
    {
      title: "Symbols",
      url: "http://symbols.rudol.pl/",
      image: "/static/symbols.png",
      category: "members",
      color: "#F0E5C1",
      slug: "symbols",
      authors: [
        {
          fullname: "Rafał Rudol",
          email: "rafal.rudol@akai.org.pl"
        }
      ]
    },
    {
      title: "Jaki środek transportu",
      url: "https://jakisrodektransportu.netlify.com",
      image: "",
      category: "newcomers",
      slug: "transport",
      authors: [
        {
          fullname: "Tomasz Gil",
          email: "tomasz.gil@akai.org.pl"
        }
      ]
    },
    {
      title: "vworks",
      url: "https://vworks.netlify.com",
      image: "https://vworks.netlify.com/logo.svg",
      category: "members",
      slug: "vworks",
      authors: [
        {
          fullname: "Piotr Ptak",
          email: "piotr.ptak@akai.org.pl"
        }
      ]
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
