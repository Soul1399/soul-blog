
import { createReducer, on } from "@ngrx/store";
import { createImmerReducer, immerOn } from 'ngrx-immer/store';
import { buildMenu } from "../models/app-menu";
import { AppPageContext, defaultPageContext } from "../models/app-page-context";
import { defaultTheme } from "../models/app-theme";
import { changeGlobalFont, changeLanguage, changePageContext, changePageContextByCode, changePageLoading, toggleLightTheme, toggleSideMenu } from "./app-actions";
import { cloneStateData, DEFAULT_LANGUAGE } from "./app-state";

export const themeReducer = createImmerReducer(
    defaultTheme(),
    immerOn(changeGlobalFont, (theme, actionValue) => {
        theme.font = actionValue.name;
    }),
    immerOn(toggleLightTheme, (theme, actionValue) => {
        theme.lightThemeOff = actionValue.forcedSwitchValue ? actionValue.forcedSwitchValue === 'off' : !theme.lightThemeOff;
    })
)

// export const themeReducer = createReducer(
//     defaultTheme(),
//     on(changeGlobalFont, (theme, actionValue) => ({ ...theme, font: actionValue.name })),
//     on(toggleLightTheme, (theme, actionValue) => ({ ...theme, lightThemeOff: actionValue.forcedSwitchValue ? actionValue.forcedSwitchValue === 'off' : !theme.lightThemeOff }))
// );

export const menuReducer = createReducer(
    buildMenu(),
);

export const pageContextReducer = createImmerReducer(
    defaultPageContext(),
    immerOn(changePageLoading, (context, actionValue) => {
        context.isLoading = actionValue.value;
    }),
    immerOn(changePageContextByCode, (context, actionValue) => {
        context.names['en'].key = actionValue.code;
        context.names['en'].name = actionValue.code;
        context.isLoading = false;
    }),
    immerOn(changePageContext, (context, newContext) => {
        Object.assign(context, newContext);
    }),
    immerOn(toggleSideMenu, (context, actionValue) => {
        context.menuShowMode = actionValue.mode || (context.menuShowMode === "hidden" ? "visible-over" : "hidden");
    }),
    immerOn(changeLanguage, (context, actionValue) => {
        context.language = actionValue.code || DEFAULT_LANGUAGE.code;
    })
);

// export const pageContextReducer = createReducer(
//     defaultPageContext(),
//     on(changePageLoading, (context, actionValue) => Object.assign(new AppPageContext(), {...context, isLoading: actionValue.value })),
//     on(changePageContextByCode, (context, actionValue) => {
//         const newContext = new AppPageContext(context?.language || DEFAULT_LANGUAGE.code);
//         newContext.names['en'].key = actionValue.code;
//         newContext.names['en'].name = actionValue.code;
//         newContext.isLoading = false;
//         return newContext;
//     }),
//     on(changePageContext, (context, newContext) => {
//         const c = Object.assign(new AppPageContext(), newContext);
//         return c;
//     }),
//     on(toggleSideMenu, (context, actionValue) => {
//         const newContext = cloneStateData(context) as AppPageContext;
//         newContext.menuShowMode = actionValue.mode || (newContext.menuShowMode === "hidden" ? "visible-over" : "hidden");
//         return newContext;
//     }),
//     on(changeLanguage, (context, actionValue) => {
//         const newContext = cloneStateData(context) as AppPageContext;
//         newContext.language = actionValue.code || DEFAULT_LANGUAGE.code;
//         return newContext;
//     })
// );


