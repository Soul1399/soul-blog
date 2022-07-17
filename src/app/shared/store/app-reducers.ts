
import { createReducer, on } from "@ngrx/store";
import { buildMenu } from "../models/app-menu";
import { AppPageContext, defaultPageContext } from "../models/app-page-context";
import { defaultTheme } from "../models/app-theme";
import { changeGlobalFont, changeLanguage, changePageContext, changePageContextByCode, changePageLoading, toggleLightTheme, toggleSideMenu } from "./app-actions";
import { cloneStateData, DEFAULT_LANGUAGE } from "./app-state";


export const themeReducer = createReducer(
    defaultTheme(),
    on(changeGlobalFont, (theme, actionValue) => ({ ...theme, font: actionValue.name })),
    on(toggleLightTheme, (theme, actionValue) => ({ ...theme, lightThemeOff: actionValue.forcedSwitchValue ? actionValue.forcedSwitchValue === 'off' : !theme.lightThemeOff }))
);

export const menuReducer = createReducer(
    buildMenu(),
);

export const pageContextReducer = createReducer(
    defaultPageContext(),
    on(changePageLoading, (context, actionValue) => Object.assign(new AppPageContext(), {...context, isLoading: actionValue.value })),
    on(changePageContextByCode, (context, actionValue) => {
        const newContext = new AppPageContext(context?.language || DEFAULT_LANGUAGE.code);
        newContext.names['en'].key = actionValue.code;
        newContext.names['en'].name = actionValue.code;
        newContext.isLoading = false;
        return newContext;
    }),
    on(changePageContext, (context, newContext) => {
        const c = Object.assign(new AppPageContext(), newContext);
        return c;
    }),
    on(toggleSideMenu, (context, actionValue) => {
        const newContext = cloneStateData(context) as AppPageContext;
        newContext.menuShowMode = actionValue.mode || (newContext.menuShowMode === "hidden" ? "visible-over" : "hidden");
        return newContext;
    }),
    on(changeLanguage, (context, actionValue) => {
        const newContext = cloneStateData(context) as AppPageContext;
        newContext.language = actionValue.code || DEFAULT_LANGUAGE.code;
        return newContext;
    })
);

