import { DEFAULT_LANGUAGE } from "../store/app-state";
import { RefPages } from "./ui/ref-pages";


export class AppMenu {
    links: AppMenuLink[]
    constructor() {
        this.links = [];
    }
}

export interface AppMenuLink {
    name: string;
    label: string;
    url: string;
    iconCode?: string | null;
}

export function buildMenu(languageCode: string = DEFAULT_LANGUAGE.code) {
    const menu = new AppMenu();
    for (const [key, value] of RefPages) {
        menu.links.push({
            name: value.name,
            label: (languageCode || DEFAULT_LANGUAGE.code) == DEFAULT_LANGUAGE.code || !value.localize
                ? value.linkName || value.title || value.name
                : value.localize[languageCode].linkName || value.localize[languageCode].title || value.localize[languageCode].name,
            url: key.toLowerCase(),
            iconCode: value.menuIcon
        });
    }
    return menu;
}