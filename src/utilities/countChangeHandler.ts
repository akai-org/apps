import { getLangFromUrl } from "@i18n/utils";

function getCurrentLang(): string {
    return getLangFromUrl(new URL(window.location.href));
}
function getPolishSummary(count: number): string {
    let summary = "";
    const unityNumber = count % 10;
    if (count === 1) {
        summary = "projekt";
      } else if (count >= 10 && count <= 21) {
        summary = "projektów";
      } else if (
        count >= 5 &&
        (unityNumber <= 1 || (unityNumber >= 5 && unityNumber <= 9))
      ) {
        summary = "projektów";
      } else if (unityNumber <= 4 && unityNumber > 0) {
        summary = "projekty";
      }
    return summary;
}
function getEnglishSummary(count: number): string {
    return count > 1 ? "projects" : "project";
}

function formatSummary(count: number, currentLang: string): string {
    return currentLang === "pl" ? getPolishSummary(count) : getEnglishSummary(count);
  }

  const getChildrenCount = (parent: HTMLElement): number =>
    parent.childElementCount -
    parent.querySelectorAll(":scope > .hidden").length;

  const getCountSummary = (count: number, currentLang: string): string =>{
    const emptyLang = currentLang === "pl" ? "brak" : "none"
    return count > 0 ? `${count} ${formatSummary(count, currentLang)}` : emptyLang;
  }

  const preventClick = (e: Event) => {
    e.preventDefault();
  };
  const countChangeHandler = () => {
    /**
     * These element handles need to be in the handler,
     * because after you navigate to a project page and then back to the index,
     * the "old" handles would not be available anymore
     * (they point to the DOM elements prior the navigation - scripts run only once with ViewTransitions enabled)
     * which breaks counters,
     * so we need to reassign them at least on every page change/swap event
     * (here - on every "count_change" event because I'm lazy).
     */
    const archivedCont = document.getElementById("cont_archived");
    const validCont = document.getElementById("cont_valid");
    const totalCounter = document.getElementById("totalShownCounter");
    const validCounter = document.getElementById("validCounter");
    const archivedCounter = document.getElementById("archivedCounter");
    const archivedContToggle = document.getElementById("archivedContToggle");
    const validContToggle = document.getElementById("validContToggle");

    if (
      !archivedCont ||
      !validCont ||
      !totalCounter ||
      !validCounter ||
      !archivedCounter ||
      !archivedContToggle ||
      !validContToggle
    )
      return;

    const archivedCount = getChildrenCount(archivedCont);
    const validCount = getChildrenCount(validCont);
    const totalCount = archivedCount + validCount;

    if (archivedCount === 0) {
      archivedContToggle.removeAttribute("open");
      archivedContToggle.addEventListener("click", preventClick);
    } else {
      archivedContToggle.setAttribute("open", "true");
      archivedContToggle.removeEventListener("click", preventClick);
    }
    if (validCount === 0) {
      validContToggle.removeAttribute("open");
      validContToggle.addEventListener("click", preventClick);
    } else {
      validContToggle.setAttribute("open", "true");
      validContToggle.removeEventListener("click", preventClick);
    }
    const currentLang = getCurrentLang();
    totalCounter.textContent = getCountSummary(totalCount, currentLang);
    validCounter.textContent = getCountSummary(validCount, currentLang);
    archivedCounter.textContent = getCountSummary(archivedCount, currentLang);
  };
  countChangeHandler();
  document.addEventListener("count_change", countChangeHandler);