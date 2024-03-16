
export const capitalize = (text: string) =>
  `${text.charAt(0).toUpperCase().concat(text.slice(1))}`;
export const placeWhitespaces = (name: string) => name.replaceAll("_", " ").replaceAll("-", " ");
