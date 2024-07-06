import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { Template, templateOptions } from "@utilities/og_image/template";
import { getProjects } from "@utilities/projectsData";

export async function getStaticPaths() {
  const projects = await getProjects();
  const projectData = projects.map((project) => {
    let name = project.name;
    if (project.metadata.ok) {
      const metadata = project.metadata.value;
      name = metadata.config.ok ? metadata.config.value.name! : name;
    }
    return {
      params: { name: project.name },
      props: {
        name: name,
        description: project.description,
      },
    };
  });
  return projectData;
}

type Props = {
  name: string;
  description: string;
};

export const GET: APIRoute<Props> = async function ({ props }) {
  const satoriImg = await satori(Template(props), await templateOptions());
  const image = sharp(Buffer.from(satoriImg)).png();
  const imageData = await image.toBuffer();
  return new Response(imageData, {
    status: 200,
    headers: {
      "Content-type": "image/png",
    },
  });
};
