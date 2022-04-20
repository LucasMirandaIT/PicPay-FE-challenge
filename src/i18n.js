import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

const globalEN = require("./locales/en/global.json");
const globalPT = require("./locales/pt/global.json");

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    global: globalEN,
  },
  pt: {
    global: globalPT,
  },
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      order: [
        "querystring",
        "navigator",
        "cookie",
        "localStorage",
        "sessionStorage",
        "htmlTag",
        "path",
        "subdomain",
      ],
      lookupQuerystring: "language",
    },
    fallbackLng: "pt", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
