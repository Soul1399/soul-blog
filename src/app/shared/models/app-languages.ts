import { DEFAULT_LANGUAGE } from "../store/app-state";
import { IEntity } from "./ientity";

export const Languages: IEntity[] = [
    DEFAULT_LANGUAGE,
    { code: 'fr', name: 'Français' },
    { code: 'tu', name: 'Türk' }
];