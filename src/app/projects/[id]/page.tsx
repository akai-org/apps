/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import InfoBox from "@components/components/InfoBox";
import { InfoBoxTitleType } from "@components/components/InfoBoxTitle";
import { getProjectData } from "@components/lib/projects";
import { CalendarDaysIcon, LinkIcon } from '@heroicons/react/24/outline'

const ProjectPage = async ({ params }: { params: { id: string } }) => {
 const projectData = await getProjectData(params.id);

 return (
  <div>
    <InfoBox icon={<LinkIcon className="w-6 h-6" />} title="DEMO APLIKACJI" linkTo="https://github.com/" type={InfoBoxTitleType.LINK} />
    <InfoBox icon={<CalendarDaysIcon className="w-6 h-6" />} title="CZAS REALIZACJI">
      Od 12.12.2020
    </InfoBox>
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
