import { FilterHandler, FilterData } from "./FilterHandler";
import { SortHandler, SortData } from "./SortHandler";
import { UrlHandler } from "./UrlHandler";

class FormHandler {
  filterForm: HTMLFormElement;
  sortForm: HTMLFormElement;
  constructor(filterFormId: string, sortFormId: string) {
    this.filterForm = document.getElementById(filterFormId) as HTMLFormElement;
    this.sortForm = document.getElementById(sortFormId) as HTMLFormElement;
    this.setupListeners();
  }
  setupListeners() {
    const sortHandler = new SortHandler();
    this.sortForm.addEventListener("change", (_) => {
      const formData = new FormData(this.sortForm);
      const sortData = new SortData(formData);

      sortHandler.sort(sortData);
    });

    const filterHandler = new FilterHandler("project");
    this.filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.filterForm.addEventListener("input", (e) => {
      const formData = new FormData(this.filterForm);
      const filterData = new FilterData(formData);

      filterHandler.filter(filterData);

      const urlChangeEvent = new CustomEvent("url_change", {
        bubbles: true,
        detail: { data: formData },
      });
      e.target?.dispatchEvent(urlChangeEvent);

      const countChangeEvent = new CustomEvent("count_change", {
        bubbles: true,
      });
      e.target?.dispatchEvent(countChangeEvent);
    });
    this.filterForm.addEventListener("reset", (e) => {
      filterHandler.clearFilters();
      const urlChangeEvent = new CustomEvent("url_change", {
        bubbles: true,
        detail: { data: new FormData() },
      });
      const countChangeEvent = new CustomEvent("count_change", {
        bubbles: true,
      });
      e.target?.dispatchEvent(countChangeEvent);
      e.target?.dispatchEvent(urlChangeEvent);
    });

    new UrlHandler(filterHandler);
  }
}

new FormHandler("formFilter", "formSort");
