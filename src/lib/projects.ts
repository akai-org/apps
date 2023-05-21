import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { z } from "zod";

const ProjectMetadataSchema = z.object({
  title: z.string(),
  technologies: z.array(z.string()),
  date: z.string(),
  authors: z.array(z.string()),
});

export type ProjectMetadata = z.infer<typeof ProjectMetadataSchema>;
export interface ProjectMetadataWithName extends ProjectMetadata {
  projectName: string;
}

const projectsDirectory = path.join(process.cwd(), "projects");

export function getSortedProjectsData() {
  const projectNames = getProjectNames();
  const allProjectsData: ProjectMetadataWithName[] = [];

  for (const projectName of projectNames) {
    // Read markdown project as string
    const fullPath = path.join(
      projectsDirectory,
      projectName,
      "description.md"
    );
    const fileContents = readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const parsedMetadata = ProjectMetadataSchema.safeParse(matterResult.data);

    if (!parsedMetadata.success) {
      console.warn(
        `Type errors in metadata in file projects/${projectName}/description.md, fix them to include this project: \n${parsedMetadata.error.issues
          .map((issue) => `-> ${issue.path.join(".")}: ${issue.message}`)
          .join("\n")}`
      );
      continue;
    }

    allProjectsData.push({
      projectName,
      ...parsedMetadata.data,
    });
  }

  // Sort projects by date
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });
}

export function getProjectNames() {
  return readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export async function getProjectData(projectName: string) {
  const fullPath = path.join(projectsDirectory, projectName, "description.md");
  const fileContents = readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the projectName and contentHtml
  return {
    projectName,
    contentHtml,
    ...matterResult.data,
  };
}
