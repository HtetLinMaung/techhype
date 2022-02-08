import mm from "../constants/mm.json";

export const getTranslation = (lang, key) => {
  if (lang === "en") {
    return key;
  } else {
    return mm[key];
  }
};
