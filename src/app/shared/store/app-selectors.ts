import { MatDrawerMode } from "@angular/material/sidenav";
import { createSelector } from "@ngrx/store";
import { buildMenu } from "../models/app-menu";
import { defaultSideDisplayMode } from "../models/side-display-mode";
import { AppState } from "./app-state";


const appThemeGetter = (state: AppState) => state.theme;
const currentPageGetter = (state: AppState) => state.pageContext;
const appMenuGetter = (state: AppState) => state.menu;

export const selectLanguage = createSelector(currentPageGetter, context => context.language);

export const selectCurrentPage = createSelector(currentPageGetter, context => context);

export const selectAppTheme = createSelector(appThemeGetter, theme => theme);

export const selectAppMenu = createSelector(currentPageGetter, appMenuGetter, (page, menu) => {
    return buildMenu(page.language);
});

export const selectThemeColorsStyles = createSelector(appThemeGetter, theme => {
    const fontName = theme?.font ? theme.font.replace(/[^a-zA-Z\-]/g, '-').toLowerCase() : 'default';
    const colorLight = theme?.lightThemeOff ? 'dark' : 'light';
    return [`${fontName}-font`, 'colors', colorLight];
});

export const selectSideViewDisplayMode = createSelector(currentPageGetter, page => {
    const mode = defaultSideDisplayMode();
    mode.opened = page.menuShowMode !== "hidden";
    mode.mode = mode.opened ? page.menuShowMode.replace("visibility-", "") as MatDrawerMode : "side";
    return mode;
});

export const selectLoadingPageFlag = createSelector(currentPageGetter, page => page.isLoading);
export const selectPageLayout = createSelector(currentPageGetter, page => page.layout);