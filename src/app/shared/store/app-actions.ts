import { createAction, props } from "@ngrx/store";
import { MenuShowMode } from "../models/app-page-context";

export const toggleLightTheme = createAction('[App] Toggle Light Theme', props<{ forcedSwitchValue?: 'off' | 'on' }>());
export const changeGlobalFont = createAction('[App] Change Global Font', props<{ name: string }>());
export const changeLanguage = createAction('[App] Change Language', props<{ name: string }>());
export const changePageContext = createAction('[App] Change Page Context', props<{ code: string }>());
export const toggleSideMenu = createAction('[App] Toggle Side Menu', props<{ mode?: MenuShowMode }>());
