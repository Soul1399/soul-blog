import { nameof } from "ts-simple-nameof";
import { AppMenu } from "../models/app-menu";
import { AppPageContext } from "../models/app-page-context";
import { AppTheme } from "../models/app-theme";
import { IEntity } from "../models/ientity";

export const POIRET_FONT = 'Poiret One';
export const GRUPPO_FONT = 'Gruppo';

export const HAND_FONT = 'Fuzzy Bubbles';
export const UPPER_FONT = 'Cinzel Decorative';
export const DEFAULT_FONT = POIRET_FONT;

export const DEFAULT_LANGUAGE = { code: 'en', name: 'English' };

export interface AppState {
    theme: AppTheme;
    pageContext: AppPageContext;
    menu: AppMenu
}

export function cloneStateData(data: any) : AppTheme | AppPageContext | null {
    if (data.font !== undefined) {
        return Object.assign({}, data) as AppTheme;
    }
    else if (data instanceof AppPageContext) {
        return Object.assign(new AppPageContext(), data);
    }
    return null;
}