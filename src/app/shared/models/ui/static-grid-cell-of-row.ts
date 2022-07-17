import { Observable } from "rxjs";
import { SelectItem } from "./select-item";
import { StaticGridCellType } from "./static-grid-cell-type";
import { StaticGridEditMode } from "./static-grid-edit-mode";
import { StaticGridHeader } from "./static-grid-header";
import { StaticGridRowContext } from "./static-grid-row-context";
import { StaticGridValueFormatter } from "./static-grid-valule-formatter";

export interface StaticGridCellOfRow {
    valueField: string | null;
    cellType?: StaticGridCellType;
    cellEditMode?: StaticGridEditMode | null;
    displayField?: string | null;
    editedValue?: string | null;
    width?: number | null;
    formatter?: StaticGridValueFormatter | null;
    headers: StaticGridHeader[] | ((context: StaticGridRowContext) => StaticGridHeader[]);
    cssClass?: string[] | ((context: StaticGridRowContext) => string[]);
    placeItem?: string | null;
    visible?: boolean | ((context: StaticGridRowContext) => boolean);
    enabled?: boolean | ((context: StaticGridRowContext) => boolean);
    relatedValues?: SelectItem[] | ((context: StaticGridRowContext) => SelectItem[] | Observable<SelectItem[]>);
    params?: any;
}
