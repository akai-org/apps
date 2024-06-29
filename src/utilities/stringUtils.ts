export const upperFirst = (text: string) =>
  text.charAt(0).toUpperCase().concat(text.slice(1));

export const capitalize = (text: string) =>
  text
    .split(" ")
    .map((word) => upperFirst(word))
    .join(" ");

export const placeWhitespaces = (name: string) =>
  name.replaceAll("_", " ").replaceAll("-", " ");
