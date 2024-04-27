import { FilterHandler, FilterData } from "./FilterHandler";

export class UrlHandler {
  params: URLSearchParams;
  filterHandler: FilterHandler;
  constructor(filterHandler: FilterHandler) {
    this.params = new URLSearchParams(window.location.search);
    this.filterHandler = filterHandler;
    this.setupListeners();
  }
  hasSearch(): boolean {
    return this.params.get("search") !== "";
  }
  hasLangs(): boolean {
    return this.params.has("language");
  }
  applyFilters() {
    if (this.hasSearch()) {
      const input: HTMLInputElement = document.querySelector(`#search`)!;
      input.value = this.params.get("search")!;
    }
    if (this.hasLangs()) {
      for (const language of this.params.getAll("language")) {
        const inputId = `lang-${language.toLowerCase()}`;
        const input: HTMLInputElement = document.querySelector(
          `#${inputId}`,
        )!;
        input.checked = true;
      }
    }
    const data = new FilterData(this.params as any);
    this.filterHandler.filter(data);
    const countChangeEvent = new CustomEvent("count_change", {
      bubbles: true,
    });
    document.dispatchEvent(countChangeEvent);
  }
  setupListeners() {
    document.addEventListener("url_change", (e) => {
      this.changeState(e);
    });
    window.addEventListener("DOMContentLoaded", (_) => {
      this.applyFilters();
    });
  }
  changeState(event: any) {
    this.params = new URLSearchParams(event.detail.data);
    window.history.replaceState(
      {},
      "",
      `${location.pathname}?${this.params.toString()}`,
    );
  }
}
