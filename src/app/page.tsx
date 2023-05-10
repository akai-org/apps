import { getSortedProjectsData } from "../lib/projects.js";

const HomePage = async () => {
 const allProjectsData = getSortedProjectsData();
 return (
  <div>
   <h1>Index.tsx</h1>
   {allProjectsData.map(({ title, authors, date }: any) => {
    return (
     <>
      <hr />
      <p>{title}</p>
      <p>{authors}</p>
      <p>{date}</p>
     </>
    );
   })}
  </div>
 );
};

export default HomePage;
