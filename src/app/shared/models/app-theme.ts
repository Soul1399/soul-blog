import { POIRET_FONT } from "../store/app-state";

export interface AppTheme {
    font: string | null;
    lightThemeOff: boolean;
}

export function defaultTheme() : AppTheme {
    return { font: POIRET_FONT, lightThemeOff: true };
}
