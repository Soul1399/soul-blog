import { DEFAULT_LANGUAGE } from "../store/app-state";
import { Languages } from "./app-languages";
import { AppPageNames } from "./app-page-names";

export type MenuShowMode = "hidden" | "visible-over" | "visible-push" | "visible-side";

export class AppPageContext {
    language: string;
    names: { [lang: string]: AppPageNames };
    menuShowMode: MenuShowMode;
    isLoading: boolean;
    layout: string;

    constructor(language: string = DEFAULT_LANGUAGE.code) {
        this.language = language;
        this.names = {};
        this.menuShowMode = "hidden";
        this.isLoading = true;
        this.layout = '';
        Languages.reduce((obj, l) => {
            obj[l.code.toString()] = new AppPageNames();
            return obj;
        }, this.names);
    }

    get pageTitle() {
        if (!this.names || !this.names[this.language]) return '';
        return this.names[this.language].title || this.names[this.language].name;
    }
}

export function defaultPageContext() {
    return new AppPageContext();
}