export const beautify = (str: string) => {
  return (str || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replaceAll("/", "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
