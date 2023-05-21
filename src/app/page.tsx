import { Fragment } from "react";
import { getSortedProjectsData } from "../lib/projects";

const HomePage = async () => {
  const allProjectsData = getSortedProjectsData();

  return (
    <div>
      <h1>Index.tsx</h1>
      {allProjectsData.map(({ title, authors, date }) => (
        <Fragment key={title}>
          <hr />
          <p>{title}</p>
          <p>{authors}</p>
          <p>{date}</p>
        </Fragment>
      ))}
    </div>
  );
};

export default HomePage;
