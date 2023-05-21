import { ClientSideTime } from "@components/components/CurrentTime";
import { getProjectData } from "@components/lib/projects";
import { notFound } from "next/navigation";

export const revalidate = 60 * 60 * 24; // 1 day
export const dynamic = "force-static";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const projectData = await getProjectData(params.id);

  if (!projectData) notFound();

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
      <ClientSideTime generatedAt={new Date().toLocaleString("pl")} />
    </div>
  );
};

export default ProjectPage;
