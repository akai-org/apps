/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { getProjectData } from "@components/lib/projects";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
 const projectData = await getProjectData(params.id);

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
};

export default ProjectPage;
