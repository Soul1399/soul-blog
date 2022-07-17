import { createAction, props } from "@ngrx/store";
import { AppPageContext, MenuShowMode } from "../models/app-page-context";

export const toggleLightTheme = createAction('[App] Toggle Light Theme', props<{ forcedSwitchValue?: 'off' | 'on' }>());
export const changeGlobalFont = createAction('[App] Change Global Font', props<{ name: string }>());
export const changeLanguage = createAction('[App] Change Language', props<{ code: string }>());
export const changePageLoading = createAction('[App] Change Page Loading', props<{ value: boolean }>());
export const changePageContextByCode = createAction('[App] Change Page Context By Code', props<{ code: string }>());
export const changePageContext = createAction('[App] Change Page Context', props<AppPageContext>());
export const toggleSideMenu = createAction('[App] Toggle Side Menu', props<{ mode?: MenuShowMode }>());
