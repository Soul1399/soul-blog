import { MatDrawerMode } from "@angular/material/sidenav";
import { createSelector } from "@ngrx/store";
import { defaultSideDisplayMode } from "../models/side-display-mode";
import { AppState } from "./app-state";


const appThemeGetter = (state: AppState) => state.theme;
const currentPageGetter = (state: AppState) => state.pageContext;

export const selectLanguage = createSelector(currentPageGetter, context => context.language);

export const selectCurrentPage = createSelector(currentPageGetter, context => context);

export const selectAppTheme = createSelector(appThemeGetter, theme => theme);

export const selectSideViewDisplayMode = createSelector(currentPageGetter, page => {
    const mode = defaultSideDisplayMode();
    mode.opened = page.menuShowMode !== "hidden";
    mode.mode = mode.opened ? page.menuShowMode.replace("visibility-", "") as MatDrawerMode : "side";
    return mode;
});