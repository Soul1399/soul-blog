import { Action, createReducer, on } from "@ngrx/store";
import { AppPageContext, defaultPageContext } from "../models/app-page-context";
import { AppTheme, defaultTheme } from "../models/app-theme";
import { changeGlobalFont, changePageContext, toggleLightTheme, toggleSideMenu } from "./app-actions";
import { cloneStateData, DEFAULT_LANGUAGE } from "./app-state";


export const themeReducer = createReducer(
    defaultTheme(),
    on(changeGlobalFont, (theme, actionValue) => ({ ...theme, font: actionValue.name })),
    on(toggleLightTheme, (theme, actionValue) => ({ ...theme, lightThemeOff: actionValue.forcedSwitchValue ? actionValue.forcedSwitchValue === 'off' : !theme.lightThemeOff }))
);

export const pageContextReducer = createReducer(
    defaultPageContext(),
    on(changePageContext, (context, actionValue) => {
        const newContext = new AppPageContext(context?.language || DEFAULT_LANGUAGE.code);
        newContext.names['en'].key = actionValue.code;
        newContext.names['en'].name = actionValue.code;
        return newContext;
    }),
    on(toggleSideMenu, (context, actionValue) => {
        const newContext = cloneStateData(context) as AppPageContext;
        newContext.menuShowMode = actionValue.mode || (newContext.menuShowMode === "hidden" ? "visible-side" : "hidden");
        return newContext;
    })
);

