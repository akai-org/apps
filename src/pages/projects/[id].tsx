// import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getProjectNames, getProjectData } from "../../lib/projects";

export default function Project({ projectData }: any) {
  console.log(projectData);

  return (
    <div>
      <h1>{projectData.title}</h1>
      <p>{projectData.technologies}</p>
      <p>{projectData.date}</p>
      <p>{projectData.authors}</p>
      {/* <article>
        <ReactMarkdown children={projectData.contentHtml} />
      </article> */}
      <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getProjectNames().map((projectName) => {
    return {
      params: {
        id: projectName
      }
    };
  });
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const projectData = await getProjectData(params.id);
  return {
    props: {
      projectData
    }
  };
}
