import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"

export function LanguageToggle() {
    const { i18n } = useTranslation()
    const [lang, setLang] = useState(i18n.resolvedLanguage || "de")

    // Sync state with i18n when language changes externally
    useEffect(() => {
        const handleChange = (lng: string) => {
            setLang(lng)
        }
        i18n.on("languageChanged", handleChange)
        return () => {
            i18n.off("languageChanged", handleChange)
        }
    }, [i18n])

    const toggleLanguage = () => {
        const newLang = lang === "de" ? "en" : "de"
        i18n.changeLanguage(newLang)
        localStorage.setItem("ai2_lang", newLang)
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-1.5 h-8 px-2 text-xs font-medium"
        >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
        </Button>
    )
}
