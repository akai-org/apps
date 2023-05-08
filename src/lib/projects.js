import { readFileSync, readdirSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import rehypeAttr from "rehype-attr";

const projectsDirectory = path.join(process.cwd(), "projects");

export function getSortedProjectsData() {
  const allProjectsData = getProjectNames().map((projectName) => {
    // Read markdown project as string
    const fullPath = path.join(
      projectsDirectory,
      projectName,
      "description.md"
    );
    const fileContents = readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the projectName
    return {
      projectName,
      ...matterResult.data
    };
  });
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

export async function getProjectData(projectName) {
  const fullPath = path.join(projectsDirectory, projectName, "description.md");
  const fileContents = readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .use(rehypeAttr, {
      h2: { className: "text-3xl font-bold" },
      p: { className: "text-red-500" }
    })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the projectName and contentHtml
  return {
    projectName,
    contentHtml,
    ...matterResult.data
  };
}
