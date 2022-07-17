import { StaticGridCellOfRow } from "./static-grid-cell-of-row";

export interface StaticGridHeader {
    label: string;
    shortLabel?: string | null;
    width?: number | null;
    cssClass?: string[] | null;
    visible?: boolean;
    enabled?: boolean;
    relatedCells?: StaticGridCellOfRow[];
}