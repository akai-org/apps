declare global {
  interface DocumentEventMap {
    url_change: CustomEvent<{ data: FormData }>;
    count_change: CustomEvent;
  }
}
export {};
