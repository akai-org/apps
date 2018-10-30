function getTech(key) {
  return [
    {
      key: "php7",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
    },
    {
      key: "mysql",
      image: "https://upload.wikimedia.org/wikipedia/en/6/62/MySQL.svg"
    },
    {
      key: "react",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    },
    {
      key: "vanillajs",
      image: "http://zdrowieton.akai.org.pl/images/icons/vanillajs.svg"
    },
    {
      key: "js",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
    },
    {
      key: "socketio",
      image: "https://cdn-images-1.medium.com/max/2000/0*xAADmPJN52Yy6XJV.jpg"
    },
    {
      key: "nodejs",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/7/7e/Node.js_logo_2015.svg"
    },
    {
      key: "emotion",
      image:
        "https://camo.githubusercontent.com/209bdea972b9b6ef90220c59ecbe66d35ffefa8a/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67"
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
      tech: [getTech("react"), getTech("emotion")],
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
      slug: "rozklady",
      tech: [getTech("js"), getTech("nodejs")],
      authors: [
        {
          fullname: "Marcin Ławniczak",
          email: "marcin.lawniczak@akai.org.pl"
        },
        {
          fullname: "Marcin Jachymski",
          email: "marcin.jachymski@akai.org.pl"
        }
      ]
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
      tech: [getTech("vanillajs")],
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
        },
        {
          fullname: "Tomasz Jeznach",
          email: "beater0sao@hotmail.com"
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
      tech: [getTech("socketio"), getTech("nodejs")],
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
      tech: [getTech("react")],
      authors: [
        {
          fullname: "Piotr Ptak",
          email: "piotr.ptak@akai.org.pl"
        },
        {
          fullname: "Agata Bączkiewicz",
          email: "agata.baczkiewicz@akai.org.pl"
        }
      ]
    },
    {
      title: "Polifood",
      category: "newcomers",
      slug: "polifood",
      github: "https://github.com/akai-org/polifood"
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
