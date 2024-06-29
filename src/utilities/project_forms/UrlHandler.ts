import { FilterHandler, FilterData } from "./FilterHandler";

export class UrlHandler {
  filterHandler: FilterHandler;
  constructor(filterHandler: FilterHandler) {
    this.filterHandler = filterHandler;
    this.setupListeners();
  }
  applyFilters() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("search") && params.get("search") !== "") {
      const input: HTMLInputElement = document.querySelector(`#search`)!;
      input.value = params.get("search") ?? "";
    }
    if (params.has("language")) {
      for (const language of params.getAll("language")) {
        const inputId = `lang-${language.toLowerCase()}`;
        const input = document.querySelector<HTMLInputElement>(`#${inputId}`);
        if (input) {
          input.checked = true;
        }
      }
    }
    const data = new FilterData(params as any);
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
    window.addEventListener("DOMContentLoaded", () => {
      this.applyFilters();
    });
  }
  changeState(event: DocumentEventMap["url_change"]) {
    window.history.replaceState(
      null,
      "",
      `${location.pathname}${formDataToQueryParams(event.detail.data)}`,
    );
  }
}

function formDataToQueryParams(formData: FormData): string {
  const convertedFormEntries = Array.from(formData, ([key, value]) => [
    key,
    typeof value === "string" ? value : "",
  ]).filter(([_, value]) => value !== "");
  const params = new URLSearchParams(convertedFormEntries);
  const paramsStr = params.toString();
  return paramsStr ? `?${paramsStr}` : "";
}
