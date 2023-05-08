import { Inter } from "next/font/google";
import { getSortedProjectsData } from "../lib/projects.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ allProjectsData }: any) {
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
}

export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData();
  return {
    props: {
      allProjectsData
    }
  };
}
