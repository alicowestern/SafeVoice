import "server-only"

const dictionaries = {
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
    am: () => import("@/dictionaries/am.json").then((module) => module.default),
    ti: () => import("@/dictionaries/ti.json").then((module) => module.default),
}

export const getDictionary = async (locale: string) => {
    if (locale in dictionaries) {
        return dictionaries[locale as keyof typeof dictionaries]()
    }
    return dictionaries.en()
}
