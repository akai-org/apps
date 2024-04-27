import type { Project } from "./types";
export class SortData {
  sortType: string;
  sortOrder: string;
  constructor(data: FormData) {
    const dataSplitted = data.get("sort")?.toString().split("_")!;
    this.sortType = dataSplitted[0];
    this.sortOrder = dataSplitted[1];
  }
}

export class SortHandler {
  projectsCont: Project[][]; // Array of arrays because we are sorting separately projects which are grouped in two different containers
  containerEls: Element[];
  constructor() {
    this.projectsCont = [[], []];
    this.containerEls = [...document.getElementsByClassName("projects_cont")];
    for (const [idx, cont] of this.containerEls.entries()) {
      const projects = [...cont.querySelectorAll(".project")];
      for (const projectEl of projects) {
        const project: Project = {
          project: projectEl,
          title: projectEl
            .getAttribute("data-title")
            ?.toLowerCase() as string,
          starCount: parseInt(projectEl.getAttribute("data-stars")!),
          updateDate: new Date(
            projectEl.getAttribute("data-updateDate")!,
          ).getTime(),
        };
        this.projectsCont[idx].push(project);
      }
    }
    this.sort({ sortType: "alpha", sortOrder: "ascend" });
  }
  sort(sortData: SortData) {
    const isDescending = sortData.sortOrder === "descend";
    let sortFunction: (a: Project, b: Project) => number;
    switch (sortData.sortType) {
      case "alpha":
        sortFunction = this.sortAlpha;
        break;
      case "star":
        sortFunction = this.sortStars;
        break;
      case "date":
        sortFunction = this.sortDate;
        break;
    }
    this.projectsCont.forEach((container) => {
      container.sort(sortFunction);
      if (isDescending) container.reverse();
    });
    this.applySort();
  }
  applySort() {
    for (const [idx, cont] of this.containerEls.entries()) {
      for (const project of this.projectsCont[idx]) {
        cont.appendChild(project.project);
      }
    }
  }
  sortAlpha(a: Project, b: Project): number {
    if (a.title === b.title) return 0;
    return a.title > b.title ? 1 : -1;
  }
  sortStars(a: Project, b: Project): number {
    if (a.starCount === b.starCount) return 0;
    return a.starCount! > b.starCount! ? 1 : -1;
  }
  sortDate(a: Project, b: Project): number {
    if (a.updateDate === b.updateDate) return 0;
    return a.updateDate! > b.updateDate! ? 1 : -1;
  }
}
