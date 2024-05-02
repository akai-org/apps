import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { Template, templateOptions } from "@utilities/og_image/template";
import { getProjects } from "@utilities/data";

export async function getStaticPaths() {
  const projects = await getProjects();
  const projectData = projects.map(project => {
    return {
      params: { name: project.name },
      props: {
        name: project.metadata.name && project.name,
        description: project.description
      }
    }
  })
  return projectData;
}

type Props = {
  name: string;
  description: string;
};

export const GET: APIRoute = async function({ props }) {
  const satoriImg = await satori(Template({ ...(props as Props) }), await templateOptions());
  const image = sharp(Buffer.from(satoriImg)).png();
  const imageData = await image.toBuffer();
  return new Response(imageData, {
    status: 200,
    headers: {
      "Content-type": "image/png"
    }
  });
}
