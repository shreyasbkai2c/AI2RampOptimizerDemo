import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translations
import deCommon from "./locales/de/common.json"
import deDashboard from "./locales/de/dashboard.json"
import deLogistiker from "./locales/de/logistiker.json"

import enCommon from "./locales/en/common.json"
import enDashboard from "./locales/en/dashboard.json"
import enLogistiker from "./locales/en/logistiker.json"

const resources = {
    de: {
        common: deCommon,
        dashboard: deDashboard,
        logistiker: deLogistiker,
    },
    en: {
        common: enCommon,
        dashboard: enDashboard,
        logistiker: enLogistiker,
    },
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "de",
        supportedLngs: ["de", "en"],
        defaultNS: "common",
        ns: ["common", "dashboard", "logistiker"],

        detection: {
            order: ["localStorage", "navigator"],
            lookupLocalStorage: "ai2_lang",
            caches: ["localStorage"],
        },

        interpolation: {
            escapeValue: false, // React already escapes
        },

        react: {
            useSuspense: false,
        },
    })

export default i18n
