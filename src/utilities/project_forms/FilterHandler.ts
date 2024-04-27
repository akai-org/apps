import type { Project } from "./types";
export class FilterData {
  search: string;
  languages: string[];
  constructor(data: FormData) {
    this.search = data.get("search") as string;
    this.languages = data.getAll("language") as string[];
  }
}
export class FilterHandler {
  projectClass: string;
  projects: Project[];
  filterData: FilterData;
  hiddenProjects: Element[];

  constructor(containerClass: string) {
    this.projectClass = containerClass;
    this.projects = [...document.getElementsByClassName(containerClass)].map(
      (project) => {
        return {
          project: project,
          title: project.getAttribute("data-title")?.toLowerCase() as string,
          languages: project.getAttribute("data-langs")?.split(","),
        };
      },
    );
    this.filterData = new FilterData(new FormData());
    this.hiddenProjects = [];
  }
  clearFilters() {
    for (const project of this.hiddenProjects) {
      this.toggleVisibility(project, true);
    }
    this.hiddenProjects = [];
  }
  filter(filterData: FilterData) {
    this.filterData = filterData;
    this.hiddenProjects = [];
    for (const project of this.projects) {
      const projectTitle = project.title;
      const projectLangs = project.languages;

      const hasTitle = this.hasTitle(projectTitle);
      const hasLang = this.hasLangs(projectLangs);

      if (!hasLang) {
        this.toggleVisibility(project.project, false);
        this.hiddenProjects.push(project.project);
      }
      if (!hasTitle) {
        this.toggleVisibility(project.project, false);
        this.hiddenProjects.push(project.project);
      }
      if (hasTitle && hasLang) {
        this.toggleVisibility(project.project, true);
      }
    }
  }
  toggleVisibility(project: Element, visible: boolean) {
    if (visible) {
      project.classList.remove("hidden");
    } else {
      project.classList.add("hidden");
    }
  }
  hasTitle(projectTitle: string) {
    const search = this.filterData.search;
    return search ? projectTitle?.indexOf(search) !== -1 : true;
  }
  hasLangs(projectLangs: string[] | undefined) {
    const langs = this.filterData.languages;
    return langs.length !== 0 || !langs
      ? projectLangs?.some((lang) => langs.includes(lang!))
      : true;
  }
}
